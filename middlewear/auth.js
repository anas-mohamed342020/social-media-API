const jwt = require('jsonwebtoken');
const { userModel } = require('../DB/models/userModel');


const role = {
    User: "User",
    Admin: "Admin",
    SuperAdmin: "SuperAdmin"
}
Object.freeze(role)


const auth = (roles) => {
    return async (req, res, next) => {
        try {
            const headerToken = req.headers["authorization"];
            if (headerToken) {
                if (headerToken.startsWith(process.env.tokenStart)) {
                    const token = headerToken.split(" ")[1];
                    const userData = jwt.verify(token, process.env.tokenKey)
                    const user = await userModel.findById(userData.id);
                    if (user) {
                        if (user.verified) {
                            if (roles.includes(user.role)) {
                                req.user = userData;
                                next()
                            } else {
                                res.status(400).json({ message: "you are not authorized" })
                            }
                        } else {
                            res.status(400).json({ message: "please verify your email from auth" })
                        }
                    } else {
                        res.status(404).json({ message: "User not found from auth", status: 404 })
                    }
                } else {
                    res.status(403).json({ message: "In-valid keyWord from auth" })
                }
            } else {
                res.status(403).json({ message: "In-valid token from auth" })
            }
        } catch (error) {
            res.status(501).json({
                message: "Server Error auth",
                error
            })
        }
    }
}


module.exports = { auth, role }