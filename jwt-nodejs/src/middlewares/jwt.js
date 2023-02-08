require("dotenv").config();
const jwt = require("jsonwebtoken");
const nonSecurePaths = ['/', '/login', '/register'];
const createToken = (payload) => {
  let key = process.env.JWT_PRV;
  let token = null;
  try {
    token = jwt.sign(payload, key);
    console.log(token);
  } catch (err) {
    console.log(err);
  }
  return token;
};
const verifyToken = (token) => {
  let key = process.env.JWT_PRV;
  let decoded = null;
  try {
    decoded = jwt.verify(token, key);
  } catch (err) {
    console.log(err);
  }
  return decoded;
};
const checkUserJWT = (req, res, next) => {
  if (nonSecurePaths.includes(req.path)) return next();
  let cookies = req.cookies;
  if (cookies && cookies.jwt) {
    let token = cookies.jwt;
    let decoded = verifyToken(token);
    if (decoded) {
      req.user = decoded;
      next();
    } else {
      return res.status(401).json({
        EC: -1,
        DT: "",
        EM: "Not authenticated a user",
      });
    }
  } else {
    return res.status(401).json({
      EC: -1,
      DT: "",
      EM: "Not authenticated a user",
    });
  }
};
const checkPermission = (req, res, next) => {
  if (nonSecurePaths.includes(req.path)) return next();
  let email = req.user.email;
  let roles = req.user.roleUser.Roles;
  let currentUrl = req.path;
  if (!roles || roles.length === 0) {
    return res.status(403).json({
      EC: "1",
      DT: "",
      EM: "You don't permission to access this resource ...",
    });
  }
  let canAccess = roles.some((item) => item.url === currentUrl);
  if (canAccess === true) {
    next();
  } else {
    return res.status(403).json({
      EC: "1",
      DT: "",
      EM: "You don't permission to access this resource ...",
    });
  }
};

module.exports = {
  createToken,
  verifyToken,
  checkUserJWT,
  checkPermission,
};
