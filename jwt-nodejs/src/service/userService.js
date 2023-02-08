const bcrypt = require("bcrypt");
const db = require("../models");
const salt = bcrypt.genSaltSync(10);
const hashUserPassword = (password) => {
  return bcrypt.hashSync(password, salt);
};
const createNewUser = async (email, password, username) => {
  let hashPw = hashUserPassword(password);
  try {
    await db.User.create({
      username: username,
      email: email,
      password: hashPw,
    });
  } catch (error) {}
};
const getUserList = async () => {
  try {
    let newUser = {};
    newUser = await db.User.findOne({
      where: { id: 1 },
      include: { model: db.Group },
      raw: true,
      nest: true,
    });
    let users = [];
    users = await db.User.findAll();
    return users;
  } catch (error) {
    console.log(error);
  }
};
const getUserById = async (id) => {
  try {
    const user = await db.User.findOne({ where: { id: id } });
    return user.get({ plain: true });
  } catch (error) {
    console.log(error);
  }
};
const deleteUser = async (userId) => {
  try {
    await db.User.destroy({
      where: { id: userId },
    });
  } catch (error) {
    console.log(error);
  }
};
const updateUserInfo = async (email, username, id) => {
  try {
    await db.User.update(
      { email: email, username: username },
      {
        where: { id: id },
      }
    );
  } catch (error) {
    console.log(error);
  }
};
module.exports = {
  createNewUser,
  getUserList,
  deleteUser,
  getUserById,
  updateUserInfo,
  hashUserPassword
};
