const { role } = require("../../middlewear/auth");

const endPoints = {
    all:[role.Admin,role.SuperAdmin,role.User],
    getPosts: [role.Admin,role.SuperAdmin],

}
module.exports = { endPoints }