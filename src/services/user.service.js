const jwt = require('jsonwebtoken');
const { User } = require('../models');
const formatServiceReturn = require('../utils/formatServiceReturn');

const INTERNAL_ERROR = formatServiceReturn(500, 'Internal server error');
const { JWT_SECRET } = process.env;

const getById = async (id) => {
  try {
    const user = await User.findByPk(id);
    if (!user) return formatServiceReturn(404, 'User not found');
    return formatServiceReturn(200, user);
  } catch (error) {
    return INTERNAL_ERROR;
  }
};

const login = async (email, password) => {
  const jwtConfig = { expiresIn: '2d', algorithm: 'HS256' };
  try {
    const user = await User.findOne({ where: { email } });
    if (!user || user.password !== password) {
      return formatServiceReturn(400, 'Invalid fields');
    }
    const token = jwt.sign(
      { user: { id: user.id, username: user.displayName } },
      JWT_SECRET,
      jwtConfig,
    );
    return formatServiceReturn(200, { token });
  } catch (error) {
    return INTERNAL_ERROR;
  }
};

module.exports = { login, getById };
