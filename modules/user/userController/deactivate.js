const { userModel } = require("../../../DB/models/userModel");
const {
    ReasonPhrases,
    StatusCodes,
    getReasonPhrase,
    getStatusCode,
} = require('http-status-codes');



const deactivateAccount = async (req, res) => {
    try {
        const user = await userModel.findById(req.user.id)
        if (user.verified) {
            if (user.blocked) {
                res.status(StatusCodes.BAD_REQUEST).json({ message: "This account is blocked", status: ReasonPhrases.BAD_REQUEST })
            } else {
                if (user.active) {
                    await userModel.updateOne({ _id: req.user.id }, { active: false })
                    res.status(StatusCodes.ACCEPTED).json({ message: "Done", status: ReasonPhrases.ACCEPTED })
                } else {
                    res.status(StatusCodes.BAD_REQUEST).json({ message: "this email is not active", status: ReasonPhrases.BAD_REQUEST });
                }
            }
        } else {
            res.status(400).json({ message: "please verify your email" });
        }





    } catch (error) {
        res.status(500).json({ message: "ERROR", error, status: ReasonPhrases.INTERNAL_SERVER_ERROR });
    }
}

module.exports = { deactivateAccount }


