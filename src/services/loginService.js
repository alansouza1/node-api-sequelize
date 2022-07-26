const { User } = require('../database/models');

const login = async (email, password) => {
  if (!email || !password) return { code: 400, message: 'Some required fields are missing' };

  const result = await User.findOne({ where: { email } });

  if (!result) return { code: 400, message: 'Invalid fields' };

  const user = result.dataValues;
  
  if (user.password !== password) return { code: 400, message: 'Invalid fields' };

  return { code: 200, user };
};

module.exports = {
  login,
};