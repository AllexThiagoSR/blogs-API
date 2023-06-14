const { postService } = require('../services');

const create = async (req, res) => {
  const { id } = req.user;
  const { status, data } = await postService.create(id, req.body);
  return res.status(status).json(data);
};

const getById = async (req, res) => {
  const { id } = req.params;
  const { status, data } = await postService.getById(id);
  return res.status(status).json(data);
};

const getAll = async (_req, res) => {
  const { status, data } = await postService.getAll();
  return res.status(status).json(data);
};

const update = async (req, res) => {
  const postId = req.params.id;
  const userId = req.user.id;
  const { status, data } = await postService.update(postId, userId, req.body);
  return res.status(status).json(data);
};

const destroy = async (req, res) => {
  const { id } = req.params;
  const { id: userId } = req.user;
  const { status, data } = await postService.deletePost(id, userId);
  return res.status(status).json(data);
};

module.exports = { create, getById, destroy, getAll, update };
