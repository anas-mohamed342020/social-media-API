const { role } = require("../../middlewear/auth");

const endPoints = {
    deleteProfile: [role.User, role.Admin],
    getUsers: [role.Admin],
    all: [role.User, role.Admin, role.SuperAdmin],
    block: [role.Admin, role.SuperAdmin],
    updateAdmin: [role.Admin, role.SuperAdmin],
    addAdmin:[role.SuperAdmin],
    deactivate:[role.Admin,role.User]
}
Object.freeze(endPoints);
module.exports = { endPoints }