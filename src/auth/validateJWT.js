require('dotenv').config();
const jwt = require('jsonwebtoken');

const { User } = require('../database/models');

const secret = process.env.JWT_SECRET;

module.exports = async (request, response, next) => {
  const token = request.headers.authorization;
  console.log(token);
  if (!token) {
    return response.status(401).json({ message: 'Token not found' });
  }

  try {
    const decoded = jwt.verify(token, secret);
    const user = await User.findOne({ where: { email: decoded.data.email } });

    if (!user) {
      return response
        .status(401)
        .json({ message: 'Expired or invalid token' });
    }

    request.user = user;
    next();
  } catch (err) {
    return response.status(401).json({ message: 'Expired or invalid token' });
  }
};