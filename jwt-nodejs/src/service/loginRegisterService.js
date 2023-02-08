require("dotenv").config();
const { createToken } = require("../middlewares/jwt");
const db = require("../models/index");
const bcrypt = require("bcrypt");
const { hashUserPassword } = require("./userService");
const salt = bcrypt.genSaltSync(10);
const { Op } = require("sequelize");
const { getGroupWithRoles } = require("./JWTServices");
const checkEmailExist = async (userEmail) => {
  let user = await db.User.findOne({
    where: { email: userEmail },
  });
  if (user) {
    return true;
  }
  return false;
};
const checkPhoneExist = async (phoneNumber) => {
  let user = await db.User.findOne({
    where: { phone: phoneNumber },
  });
  if (user) {
    return true;
  }
  return false;
};
const registerNewUser = async (rawUserData) => {
  try {
    //check email/phone number are exist
    let isEmailExist = await checkEmailExist(rawUserData.email);
    let isPhoneExist = await checkPhoneExist(rawUserData.phoneNumber);

    if (isEmailExist) {
      return {
        EM: "The email is already exist",
        EC: "1",
      };
    }
    if (isPhoneExist) {
      return {
        EM: "The phone number is already exist",
        EC: "1",
      };
    }
    //hash user password
    const hashPassword = hashUserPassword(rawUserData.password);

    //create new user
    await db.User.create({
      email: rawUserData.email,
      username: rawUserData.username,
      password: hashPassword,
      phone: rawUserData.phoneNumber,
      groupId: 4,
    });
    return {
      EM: "Create user successfully",
      EC: "0",
    };
  } catch (error) {
    console.log(error);
    return {
      EM: "Something wrongs in service ...",
      EC: "2",
    };
  }
};
const checkPassword = (inputPassword, hasPassword) => {
  return bcrypt.compareSync(inputPassword, hasPassword);
};
const handleUserLogin = async (rawData) => {
  try {
    let userSq = await db.User.findOne({
      where: {
        [Op.or]: [{ email: rawData.valueLogin }, { phone: rawData.valueLogin }],
      },
    });
    let userJs;
    if (userSq) {
      userJs = userSq.get({ plain: true });
    }
    if (userJs) {
      let isCorrectPassword = checkPassword(rawData.password, userJs.password);
      if (!isCorrectPassword) {
        return {
          EM: "Your email/password is incorrect",
          EC: "1",
          DT: "",
        };
      } else {
        let roleUser = await getGroupWithRoles(userJs);
        let payload = {
          email: userJs.email,
          roleUser,
          expiresIn: process.env.JWT_EXPIRE_IN,
        };
        let token = createToken(payload);

        return {
          EM: "Login successfully",
          EC: "0",
          DT: {
            accessToken: token,
            roleUser,
            email: userJs.email,
            username: userJs.username,
          },
        };
      }
    } else {
      return {
        EM: "Your email/password is incorrect",
        EC: "1",
        DT: "",
      };
    }
  } catch (error) {
    console.log(error);
    return {
      EM: "Something wrongs in service ...",
      EC: "2",
      DT: "",
    };
  }
};

module.exports = {
  registerNewUser,
  checkEmailExist,
  checkPhoneExist,
  handleUserLogin,
  checkEmailExist,
  checkPhoneExist,
};
