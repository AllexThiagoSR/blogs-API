const { userService } = require('../services');

const login = async (req, res) => {
  const { email, password } = req.body;
  const { status, data } = await userService.login(email, password);
  return res.status(status).json(data);
};

const create = async (req, res) => {
  const { status, data } = await userService.create(req.body);
  return res.status(status).json(data);
};

const getAll = async (_req, res) => {
  const { status, data } = await userService.getAll();
  return res.status(status).json(data);
};

const getById = async (req, res) => {
  const { id } = req.params;
  const { status, data } = await userService.getById(id);
  return res.status(status).json(data);
};

module.exports = { login, create, getAll, getById };
