const { getGroups } = require("../service/groupService");

const readFunc = async (req,res) => {
  try {
    let data = await getGroups();
    return res.status(200).json({
      EM: data.EM, //message,
      EC: data.EC, //code
      DT: data.DT, //data
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      EM: "Error from server", //message,
      EC: "2", //code
      DT: "", //data
    });
  }
};
module.exports = {
  readFunc,
};
