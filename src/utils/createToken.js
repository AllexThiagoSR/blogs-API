const jwt = require('jsonwebtoken');

const { JWT_SECRET } = process.env;

const createToken = async (payload) => {
  const jwtConfig = { expiresIn: '2d', algorithm: 'HS256' };
  const token = jwt.sign(
    { user: payload },
    JWT_SECRET,
    jwtConfig,
  );
  return token;
};

module.exports = { createToken };
