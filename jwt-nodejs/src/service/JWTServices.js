const db = require("../models");
const getGroupWithRoles = async (user) => {
  const role = await db.Group.findOne({
    where: { id: user.groupId },
    include: [
      {
        model: db.Role,
        attributes: ["id", "url", "description"],
        through: { attributes: [] },
      },
    ],
  });
  console.log(role)
  return role;
};
module.exports = { getGroupWithRoles };
