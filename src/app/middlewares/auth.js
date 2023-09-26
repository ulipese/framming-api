const jwt = require("jsonwebtoken");

const config = process.env;

const verifyToken = (request, response, next) => {
  const token = request.headers["x-access-token"];

  if (!token) {
    return response
      .status(403)
      .json({ Error: "A token is required for authentication" });
  }

  try {
    const decodedPayload = jwt.verify(token, config.TOKEN_KEY);
    request.user = decodedPayload;
  } catch (err) {
    return response.status(401).json({ Error: "Invalid Token" });
  }

  return next();
};

module.exports = verifyToken;
