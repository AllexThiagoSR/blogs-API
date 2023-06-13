const { updatePostSchema } = require('../schemas/schema');

const validateUpdatePost = async (req, res, next) => {
  const { error } = updatePostSchema.validate(req.body);
  if (error) return res.status(400).json({ message: 'Some required fields are missing' });
  return next();
};

module.exports = validateUpdatePost;
