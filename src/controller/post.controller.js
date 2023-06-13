const { postService } = require('../services');

const create = async (req, res) => {
  const { id } = req.user;
  const { status, data } = await postService.create(id, req.body);
  return res.status(status).json(data);
};

module.exports = { create };
