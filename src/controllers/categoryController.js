const CategoryService = require('../services/categoryService');

const create = async (request, response) => {
  const { name } = request.body;

  const { code, message, id } = await CategoryService.create(name);

  if (!id) return response.status(code).json({ message });

  const category = { id, name };

  response.status(code).json(category);
};

const findAll = async (_request, response) => {
  const categories = await CategoryService.findAll();

  response.status(200).json(categories);
};

module.exports = {
  create,
  findAll,
};