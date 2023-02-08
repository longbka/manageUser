const db = require("../models");

const getGroups = async ()=> {
    try {
        let groups = await db.Group.findAll({
            order:[['name','ASC']]
        });
        if (groups) {
          return {
            EM: "Get groups successfully", //message,
            EC: "0", //code
            DT: groups, //data
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
}
module.exports = {
    getGroups
}
