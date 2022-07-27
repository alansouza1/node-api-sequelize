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

const findAll = async (_request, response) => {
  const users = await UserService.findAll();

  response.status(200).json(users);
};

const findById = async (request, response) => {
  const { id } = request.params;

  const { code, message, user } = await UserService.findById(id);

  if (!user) return response.status(code).json({ message });

  response.status(code).json(user);
};

module.exports = {
  create,
  findAll,
  findById,
};