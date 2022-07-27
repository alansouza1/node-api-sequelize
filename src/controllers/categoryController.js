const CategoryService = require('../services/categoryService');

const create = async (request, response) => {
  const { name } = request.body;

  const { code, message, id } = await CategoryService.create(name);

  if (!id) return response.status(code).json({ message });

  const category = { id, name };

  response.status(code).json(category);
};

module.exports = {
  create,
};