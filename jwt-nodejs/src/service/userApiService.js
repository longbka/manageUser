const db = require("../models");
const { checkPhoneExist, checkEmailExist } = require("./loginRegisterService");
const { hashUserPassword } = require("./userService");
const getAllUser = async () => {
  try {
    let users = await db.User.findAll({
      attributes: ["id", "username", "email", "phone", "sex","address"],
      include: { model: db.Group, attributes: ["name", "description"] },
    });
    if (users) {
      return {
        EM: "Get users successfully", //message,
        EC: "0", //code
        DT: users, //data
      };
    } else {
      return {
        EM: "Failed", //message,
        EC: "1", //code
        DT: [], //data
      };
    }
  } catch (error) {
    console.log(error);
    return {
      EM: "There is something wrong from sever", //message,
      EC: "2", //code
      DT: [], //data
    };
  }
};
const getUsersWithPagination = async (page, limit) => {
  try {
    let offset = (page - 1) * limit;
    const { count, rows } = await db.User.findAndCountAll({
      offset: offset,
      limit: limit,
      attributes: ["id", "username", "email", "phone", "sex"],
      include: { model: db.Group, attributes: ["name", "description","id"] },
      order: [["id","DESC"]]
    });
    let totalPages = Math.ceil(count / limit);
    let data = {
      totalRows: count,
      totalPages: totalPages,
      users: rows,
    };
    return {
      EM: "Successfully",
      EC: "0",
      DT: data,
    };
  } catch (error) {
    console.log(error);
    return {
      EM: "There is something wrong from sever", //message,
      EC: "2", //code
      DT: [], //data
    };
  }
};
const updateUser = async(data) => {
  try {
    if(!data.groupId){
      return {
        EM:"Error with empty GroupId ",
        EC:"1",
        DT:"group"
      }
    }
    let user = await db.User.findOne({
      where:{id:data.id}
    });
    if (user) {
      await user.update({
        username:data.username,
        address: data.address,
        sex:data.sex,
        groupId:data.groupId
      })
      return {
        EM: "Delete user successfully", //message,
        EC: "0", //code
        DT: "", //data
      };
    } else {
      return {
        EM: "Failed", //message,
        EC: "1", //code
        DT: [], //data
      };
    }
  } catch (error) {
    console.log(error);
    return {
      EM: "There is something wrong from sever", //message,
      EC: "2", //code
      DT: [], //data
    };
  }
};
const deleteUserApi = async(id) => {
  try {
    let users = await db.User.destroy({
      where:{id:id}
    });
    if (users) {
      return {
        EM: "Delete user successfully", //message,
        EC: "0", //code
        DT: "", //data
      };
    } else {
      return {
        EM: "Failed", //message,
        EC: "1", //code
        DT: [], //data
      };
    }
  } catch (error) {
    console.log(error);
    return {
      EM: "There is something wrong from sever", //message,
      EC: "2", //code
      DT: [], //data
    };
  }
};
const createNewUser = async(user) => {
  try { 
    //  check email/phone number are exist
     let isEmailExist = await checkEmailExist(user.email);
     let isPhoneExist = await checkPhoneExist(user.phone);
     if (isEmailExist) {
       return {
         EM: "The email is already exist",
         EC: "1",
         DT:"email"
       };
     }
     if (isPhoneExist) {
       return {
         EM: "The phone number is already exist",
         EC: "1",
         DT:"phone"
       };
     }
     //hash user password
     const hashPassword = hashUserPassword(user.password);
    
    let users = await db.User.create({...user,password:hashPassword});
    if (users) {
      return {
        EM: "Create DT successfully", //message,
        EC: "0", //code
        DT: user, //data
      };
    } else {
      return {
        EM: "Failed", //message,
        EC: "1", //code
        DT: [], //data
      };
    }
  } catch (error) {
    console.log(error);
    return {
      EM: "There is something wrong from sever", //message,
      EC: "2", //code
      DT: [], //data
    };
  }
};
module.exports = {
  getAllUser,
  createNewUser,
  updateUser,
  deleteUserApi,
  getUsersWithPagination,
};
