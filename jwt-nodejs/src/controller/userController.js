const {
  createNewUser,
  deleteUserApi,
  getAllUser,
  updateUser,
  getUsersWithPagination,
} = require("../service/userApiService");
const readFunc = async (req, res) => {
  try {
    if (req.query.page && req.query.limit) {
      let page = req.query.page;
      let limit = req.query.limit;
      let response = await getUsersWithPagination(+page, +limit);
      return res.status(200).json({
        EM: response.EM, //message,
        EC: response.EC, //code
        DT: response.DT, //data
      });
    } else {
      return res.status(500).json({
        EM: "Failed", //message,
        EC: "1", //code
        DT: "", //data
      });
    }
    // let data = await getAllUser();
    // return res.status(200).json({
    //   EM: data.EM, //message,
    //   EC: data.EC, //code
    //   DT: data.DT, //data
    // });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      EM: "Error from server", //message,
      EC: "2", //code
      DT: "", //data
    });
  }
};
const createFunc = async (req,res) => {
  let response = await createNewUser(req.body)
  return res.status(200).json({
    EM:response.EM,
    EC:response.EC,
    DT:response.DT
  })
};
const deleteFunc = async (req,res) => {
  let response = await deleteUserApi(req.body.id)
  console.log("Delete")
   return res.status(200).json({
    EM: response.EM, //message,
    EC: response.EC, //code
    DT: response.DT, //data
  });
};
const updateFunc = async(req,res) => {
  let response = await updateUser(req.body)
  console.log("Update")
   return res.status(200).json({
    EM: response.EM, //message,
    EC: response.EC, //code
    DT: response.DT, //data
  });
};
module.exports = { createFunc, readFunc, updateFunc, deleteFunc };
