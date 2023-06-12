const validateNewUser = require('../schemas/validateNewUser');

const validateUser = async (req, res, next) => {
  const error = validateNewUser(req.body);
  if (!error) return next();
  return res.status(error.status).json(error.data);
};

module.exports = validateUser;
