const { Category } = require('../database/models');

const create = async (name) => {
  if (!name) return { code: 400, message: '"name" is required' };

  const category = await Category.create({ name });

  return { code: 201, id: category.null };
};

const findAll = async () => {
  const result = await Category.findAll();

  const categories = result.map(({ dataValues }) => dataValues);

  return categories;
};

module.exports = {
  create,
  findAll,
};