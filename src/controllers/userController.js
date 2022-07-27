require('dotenv').config();
const jwt = require('jsonwebtoken');

const UserService = require('../services/userService');

const create = async (request, response) => {
  const { displayName, email, password, image } = request.body;

  const { code, message } = await UserService.create(displayName, email, password, image);

  if (message) return response.status(code).json({ message });

  const data = { displayName, email, image };
  const secret = process.env.JWT_SECRET;
  const jwtConfig = {
    expiresIn: '7d',
    algorithm: 'HS256',
  };

  const token = jwt.sign({ data }, secret, jwtConfig);

  response.status(code).json({ token });
};

module.exports = {
  create,
};