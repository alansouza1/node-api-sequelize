const PostService = require('../services/postService');

const findAll = async (_request, response) => {
  const posts = await PostService.findAll();

  response.status(200).json(posts);
};

module.exports = {
  findAll,
};