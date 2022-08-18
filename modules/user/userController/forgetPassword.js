const { nanoid } = require('nanoid');
const bcrypt = require("bcrypt");
const { userModel } = require('../../../DB/models/userModel');
const sendEmail = require('../../../servises/sendEmail');
const {
    ReasonPhrases,
    StatusCodes,
    getReasonPhrase,
    getStatusCode,
} = require('http-status-codes');

const forgetPasswordSend = async (req, res) => {
    try {
        const { email } = req.body;
        const user = await userModel.findOne({ email });
        if (user) {
            if (user.verified) {
                if (user.blocked || !user.active) {
                    res.status(StatusCodes.BAD_REQUEST).json({ message: "This account not allowed", status: ReasonPhrases.BAD_REQUEST })
                } else {
                    const activationCode = nanoid(6)
                    await userModel.updateOne({ _id: user.id }, { activationCode: activationCode })
                    const message = `<p>your activation Code is <span style="padding:10px; background-color:blue; color:white;border-radius: 7px;">${activationCode}</span></p>`
                    await sendEmail(user.email, message)
                    res.status(StatusCodes.ACCEPTED).json({ message: "Done check your email",status:ReasonPhrases.ACCEPTED });
                }
            } else {
                res.status(StatusCodes.BAD_REQUEST).json({ message: "please verify your email",status:ReasonPhrases.ACCEPTED });
            }

        } else {
            res.status(StatusCodes.NOT_FOUND).json({ message: "email not exist", status: ReasonPhrases.NOT_FOUND })
        }
    } catch (error) {
        res.status(500).json({ message: "ERROR", error, status: ReasonPhrases.INTERNAL_SERVER_ERROR }); //catch error
    }
}

const changeForgetPass = async (req, res) => {
    try {
        const { email, aCode, nPassword } = req.body;
        const user = await userModel.findOne({ email });
        if (user) {
            if (user.verified) {
                if (user.blocked || !user.active) {
                    res.status(StatusCodes.BAD_REQUEST).json({ message: "This account not allowed", status: ReasonPhrases.BAD_REQUEST })
                } else {
                    const actCode = user.activationCode
                    if (aCode == actCode) {
                        const activationCode = nanoid(6)
                        let passwordHashed = await bcrypt.hash(nPassword, parseInt(process.env.SALT));
                        await userModel.updateMany({ _id: user._id }, { password: passwordHashed, activationCode: activationCode });
                        res.status(StatusCodes.ACCEPTED).json({ message: "Done", status: ReasonPhrases.ACCEPTED });
                    } else {
                        res.status(StatusCodes.BAD_REQUEST).json({ message: "in-valid activation code" })
                    }
                }
            } else {
                res.status(400).json({ message: "please verify your email" });
            }
        } else {
            res.status(StatusCodes.NOT_FOUND).json({ message: "email not exist", status: ReasonPhrases.NOT_FOUND })
        }
    } catch (error) {
        res.status(500).json({ message: "ERROR", error, status: ReasonPhrases.INTERNAL_SERVER_ERROR });
    }
}


module.exports = { forgetPasswordSend, changeForgetPass }






