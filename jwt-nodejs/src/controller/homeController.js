const {
  createNewUser,
  getUserList,
  deleteUser,
  getUserById,
  updateUserInfo,
} = require("../service/userService");

const bcrypt = require("bcrypt");
const salt = bcrypt.genSaltSync(10);

const handleHelloWorld = (req, res) => {
  return res.render("home.ejs");
};
const handleUserPage = async (req, res) => {
  let userList = await getUserList();
  return res.render("user.ejs", { userList });
};
const handleCreateNewUser = async (req, res) => {
  const { email, password, username } = req.body;
  await createNewUser(email, password, username);
  res.redirect("/user");
};
const handleDeleteUser = async (req, res) => {
  await deleteUser(req.params.id);
  res.redirect("/user");
};
const getUpdateUserPage = async (req, res) => {
  let id = req.params.id;
  let userData = await getUserById(id);
  res.render("user-update.ejs", { userData });
};
const handleUpdateUser = async (req, res) => {
  let email = req.body.email;
  let username = req.body.username;
  let id = req.body.id;
  await updateUserInfo(email, username, id);
  res.redirect("/user");
};
module.exports = {
  handleHelloWorld,
  handleUserPage,
  handleCreateNewUser,
  handleDeleteUser,
  getUpdateUserPage,
  handleUpdateUser,
};
