const tokenUtils = require('../utils/tokenUtils');

const validateToken = async (req, res, next) => {
  try {
    const { authorization } = req.headers;
    if (!authorization) return res.status(401).json({ message: 'Token not found' });
    const loggedUser = tokenUtils.validateToken(authorization);
    req.user = loggedUser.user;
    return next();
  } catch (error) {
    return res.status(401).json({ message: 'Expired or invalid token' });
  }
};

module.exports = validateToken;
