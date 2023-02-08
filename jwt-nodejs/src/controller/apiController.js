const {
  registerNewUser,
  handleUserLogin,
} = require("../service/loginRegisterService");

const testAPI = (req, res) => {
  return res.status(200).json({
    message: "Successful",
    data: "data",
  });
};
const handleRegister = async (req, res) => {
  try {
    if (!req.body.email || !req.body.phoneNumber || !req.body.password) {
      return res.status(200).json({
        EM: "Missing parameters", //message,
        EC: "1", //code
        DT: "", //date
      });
    }
    if (req.body.password && req.body.length < 4) {
      return res.status(200).json({
        EM: "Password must have more than 4s letters", //message,
        EC: "1", //code
        DT: "", //date
      });
    }
    //service: create user
    let data = await registerNewUser(req.body);
    return res.status(200).json({
      EM: data.EM, //message,
      EC: data.EC, //code
      DT: "", //date
    });
  } catch (error) {
    return res.status(500).json({
      EM: "Error",
      EC: "1",
      DT: "",
    });
  }
};
const handleLogin = async (req, res) => {
  try {
    let data = await handleUserLogin(req.body);
    //set cookie
    if (data && data.DT && data.DT.accessToken) {
      res.cookie("jwt", data.DT.accessToken, {
        httpOnly: true,
        maxAge: 60 * 60 * 1000,
      });
    }
    console.log(data.DT.accessToken);
    return res.status(200).json({
      EM: data.EM,
      EC: data.EC,
      DT: data.DT,
    });
  } catch (error) {
    console.log(error);
    return {
      EM: "Something wrongs in service ...",
      EC: "2",
    };
  }
};
module.exports = {
  testAPI,
  handleRegister,
  handleLogin,
};
