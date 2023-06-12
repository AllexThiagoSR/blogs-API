const formatServiceReturn = require('../utils/formatServiceReturn');
const { newUserSchema } = require('./schema');

const validateNewUser = (newUser) => {
  const { error } = newUserSchema.validate(newUser);
  if (!error) return undefined;
  return formatServiceReturn(400, error.message);
};

module.exports = validateNewUser;
