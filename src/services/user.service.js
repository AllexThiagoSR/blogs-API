const { User } = require('../models');
const formatServiceReturn = require('../utils/formatServiceReturn');
const { createToken } = require('../utils/createToken');

const INTERNAL_ERROR = formatServiceReturn(500, 'Internal server error');

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
  try {
    const user = await User.findOne({ where: { email } });
    if (!user || user.password !== password) {
      return formatServiceReturn(400, 'Invalid fields');
    }
    const token = createToken({ id: user.id, username: user.displayName });
    return formatServiceReturn(200, { token });
  } catch (error) {
    return INTERNAL_ERROR;
  }
};

const create = async ({ email, password, displayName, image }) => {
  try {
    const user = await User.create({ email, password, displayName, image });
    const token = createToken(user);
    return formatServiceReturn(201, { token });
  } catch (error) {
    return INTERNAL_ERROR;
  }
};

module.exports = { login, getById, create };