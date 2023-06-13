const { nameSchema } = require('../schemas/schema');

const validateName = async (req, res, next) => {
  const { error } = nameSchema.validate(req.body);
  if (error) return res.status(400).json({ message: error.message });
  return next();
};

module.exports = validateName;
