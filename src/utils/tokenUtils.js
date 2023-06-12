const jwt = require('jsonwebtoken');

const { JWT_SECRET } = process.env;

const createToken = (payload) => {
  const jwtConfig = { expiresIn: '2d', algorithm: 'HS256' };
  const token = jwt.sign(
    { user: payload },
    JWT_SECRET,
    jwtConfig,
  );
  return token;
};

const validateToken = (token) => {
  const payload = jwt.verify(
    token,
    JWT_SECRET,
  );
  return payload;
};

module.exports = { createToken, validateToken };
