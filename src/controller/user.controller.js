const { userService } = require('../services');

const login = async (req, res) => {
  const { email, password } = req.body;
  const { status, data } = await userService.login(email, password);
  return res.status(status).json(data);
};

module.exports = { login };
