const express = require("express");
const {
  handleHelloWorld,
  handleUserPage,
  handleCreateNewUser,
  handleDeleteUser,
  getUpdateUserPage,
  handleUpdateUser,
} = require("../controller/homeController");
const router = express.Router();
const initWebRoutes = (app) => {
  router.get("/", handleHelloWorld);
  router.get("/user", handleUserPage);
  router.post("/users/create-user", handleCreateNewUser);
  router.post("/users/delete-user/:id", handleDeleteUser);
  router.get("/users/update-user-page/:id", getUpdateUserPage);
  router.post("/users/update-user", handleUpdateUser);
  app.use("/", router);
};
module.exports = {
  initWebRoutes,
};
