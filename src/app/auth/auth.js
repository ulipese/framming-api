const jwt = require("jsonwebtoken");
require("dotenv").config({ path: __dirname + "/./../../.env" });

const verifyToken = (token) => {
  try {
    const user = jwt.verify(token, process.env.TOKEN_KEY); //decoded Payload
    return user;
  } catch (err) {
    return false;
  }
};

module.exports = verifyToken;
