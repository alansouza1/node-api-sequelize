const { Category } = require('../database/models');

const create = async (name) => {
  if (!name) return { code: 400, message: '"name" is required' };

  const category = await Category.create({ name });

  return { code: 201, id: category.null };
};

module.exports = {
  create,
};