const { userModel } = require("../../../DB/models/userModel");
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');
const signIn = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await userModel.findOne({ email });
        if (user) {
            if (user.verified) {
                if (user.blocked || !user.active) {
                    res.status(StatusCodes.BAD_REQUEST).json({ message: "This account not allowed", status: ReasonPhrases.BAD_REQUEST })
                } else {
                    const isCorrect = await bcrypt.compare(password, user.password);
                    if (isCorrect) {
                        let userData = {
                            id: user._id,
                            name: user.name,
                            email: user.email,
                            role: user.role
                        }
                        const token = jwt.sign(userData, process.env.tokenKey)
                        res.status(200).json({ message: "Done", token });
                    } else {
                        res.status(404).json({ message: "In-valid email or password" });
                    }
                }
            } else {
                res.status(400).json({ message: "please verify your email" });
            }
        } else {
            res.status(404).json({ message: "In-valid email or password" });
        }
    } catch (error) {
        res.status(500).json({ message: "ERROR", error }); //catch error
    }
};

module.exports = { signIn }