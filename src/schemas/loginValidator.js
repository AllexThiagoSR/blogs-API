const formatServiceReturn = require('../utils/formatServiceReturn');
const { loginSchema } = require('./schema');

const loginValidator = (object) => {
  const { error } = loginSchema.validate(object);
  if (!error) return undefined;
  if (error.message.includes('required') || error.message.includes('empty')) {
    return formatServiceReturn(400, 'Some required fields are missing');
  }
  return formatServiceReturn(400, 'Invalid fields');
};

module.exports = loginValidator;
