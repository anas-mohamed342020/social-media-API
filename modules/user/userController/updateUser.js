var CryptoJS = require("crypto-js");
const { userModel } = require("../../../DB/models/userModel");

const updateUser = async (req, res) => {
    try {
        let { userName, phone, location } = req.body;
        phone = CryptoJS.AES.encrypt(
            JSON.stringify(phone),
            process.env.secretKey
        ).toString();
        const updatedUser = await userModel.findByIdAndUpdate(req.user.id, { userName, phone, location }, { new: true }).select('-password -verified')
        res.status(200).json({ message: "Done", updatedUser })

    } catch (error) {
        res.status(500).json({ message: "ERROR", error }); //catch error
    }
}
module.exports = { updateUser }


