const { role } = require("../../middlewear/auth");

const endpoint = {
    create:[role.User],
    block:[role.SuperAdmin,role.Admin],
    all:[role.Admin,role.SuperAdmin,role.User]
}

module.exports = {endpoint}