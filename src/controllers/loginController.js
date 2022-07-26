require('dotenv').config();
const jwt = require('jsonwebtoken');

const LoginService = require('../services/loginService');

module.exports = async (request, response) => {
  const { email, password } = request.body;

  const { code, message, user } = await LoginService.login(email, password);

  if (!user) return response.status(code).json({ message });

  delete user.password;
  const secret = process.env.JWT_SECRET;
  const jwtConfig = {
    expiresIn: '7d',
    algorithm: 'HS256',
  };

  const token = jwt.sign({ data: user }, secret, jwtConfig);

  response.status(code).json({ token });
};