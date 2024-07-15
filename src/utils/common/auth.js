const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { ServerConfig } = require("../../config");

function checkPassword(plainPassword, encryptPassword) {
  try {
    return bcrypt.compareSync(plainPassword, encryptPassword);
  } catch (error) {
    console.log(error);
    throw error;
  }
}

function createToken(payload) {
  try {
    return jwt.sign(payload, ServerConfig.JWT_SECRET, {
      expiresIn: ServerConfig.JWT_EXPIRY,
    });
  } catch (error) {
    console.log(error);
    throw error;
  }
}

module.exports = { checkPassword, createToken };
