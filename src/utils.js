const jwt = require("jsonwebtoken");

APP_SECRET = "GRAPH";

function getTokenPayload(token) {
  return jwt.verify(token, APP_SECRET);
}

function getUserId(req, authToken) {
  if (req) {
    const authHeader = req.headers.authorization;
    if (authHeader) {
      const token = authHeader.replace("Bearer", "");
      if (!token) {
        throw new Error("Token is not found.");
      }
      const { userId } = getTokenPayload(token);
      return userId;
    }
  } else if (authToken) {
    const { userId } = getTokenPayload(token);
    return userId;
  }

  throw new Error("認証権限がありません");
}

module.exports = {
  APP_SECRET,
  getUserId,
};
