const loginValidator = require('../schemas/loginValidator');

const validateLogin = async (req, res, next) => {
  const error = loginValidator(req.body);
  if (!error) return next();
  return res.status(error.status).json(error.data);
};

module.exports = validateLogin;
