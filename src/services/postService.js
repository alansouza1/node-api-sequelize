const { BlogPost, PostCategory } = require('../database/models');
const UserService = require('./userService');
const CategoryService = require('./categoryService');

const findAllPostCategories = async () => {
  const result = await PostCategory.findAll();

  const postCategories = result.map(({ dataValues }) => dataValues);

  return postCategories;
};

const findAll = async () => {
  const allPosts = await BlogPost.findAll();
  const allUsers = await UserService.findAll();
  const allPostCategories = await findAllPostCategories();
  const allCategories = await CategoryService.findAll();

  const posts = allPosts.map(({ dataValues }) => {
    const { id, title, content, userId, published, updated } = dataValues;

    const user = allUsers.find((item) => item.id === userId);

    const postCategories = allPostCategories.filter(({ postId }) => postId === id);

    const categories = postCategories.map(({ categoryId }) => {
      const category = allCategories.find((item) => item.id === categoryId);
      return category;
    });

    return { id, title, content, userId, published, updated, user, categories };
  });

  return posts;
};

module.exports = {
  findAll,
};