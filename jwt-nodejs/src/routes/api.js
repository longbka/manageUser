const express = require("express");
const router = express.Router();
const {
  testAPI,
  handleRegister,
  handleLogin,
} = require("../controller/apiController");
const userController = require("../controller/userController");
const groupController = require("../controller/groupController");
const {checkUserJWT,checkPermission} = require("../middlewares/jwt")
const initApiRoutes = (app) => {
  router.all("*",checkUserJWT,checkPermission)
  router.get("/api/test-api", testAPI);
  router.post("/register", handleRegister);
  router.post("/login", handleLogin);
  router.get("/user/read", userController.readFunc);
  router.delete("/user/delete", userController.deleteFunc);
  router.put("/user/update", userController.updateFunc);
  router.post("/user/create", userController.createFunc);
  router.get("/group/read", groupController.readFunc);
  app.use("/api/v1", router);
};
module.exports = {
  initApiRoutes,
};
