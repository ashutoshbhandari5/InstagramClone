const jwt = require("jsonwebtoken");

const generateJwtToken = (info, secret, expiresIn) => {
  return jwt.sign({ ...info }, secret, {
    expiresIn,
  });
};

module.exports = generateJwtToken;
