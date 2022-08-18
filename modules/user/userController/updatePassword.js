const { userModel } = require("../../../DB/models/userModel");
const bcrypt = require("bcrypt");
const {
    ReasonPhrases,
    StatusCodes,
    getReasonPhrase,
    getStatusCode,
} = require('http-status-codes');
const updatePassword = async (req, res) => {
    try {
        const { oPassword, nPassword } = req.body;
        
        const userpass = await userModel.findById(req.user.id).select('password')
        const isCorrectPass = await bcrypt.compare(oPassword, userpass.password)
        if (isCorrectPass) {
            let passwordHashed = await bcrypt.hash(nPassword, parseInt(process.env.SALT));
            await userModel.updateMany({ _id: req.user.id }, { password: passwordHashed })
            res.status(StatusCodes.ACCEPTED).json({ message: "Done", status: ReasonPhrases.ACCEPTED })
        } else {
            res.status(StatusCodes.BAD_REQUEST).json({ message: "Wrong password", status: ReasonPhrases.BAD_REQUEST })
        }

    } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: "ERROR", error,status:ReasonPhrases.INTERNAL_SERVER_ERROR }); //catch error
    }
}
module.exports = { updatePassword }