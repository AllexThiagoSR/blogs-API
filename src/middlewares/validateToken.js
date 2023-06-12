const tokenUtils = require('../utils/tokenUtils');

const validateToken = async (req, res, next) => {
  try {
    const { authorization } = req.headers;
    const loggedUser = tokenUtils.validateToken(authorization);
    req.user = loggedUser;
    return next();
  } catch (error) {
    return res.status(401).json({ message: error.message });
  }
};

module.exports = validateToken;
