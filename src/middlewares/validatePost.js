const { postSchema } = require('../schemas/schema');

const validatePost = async (req, res, next) => {
  const { error } = postSchema.validate(req.body);
  if (!error) return next();
  return res.status(400).json({ message: 'Some required fields are missing' });
};

module.exports = validatePost;
