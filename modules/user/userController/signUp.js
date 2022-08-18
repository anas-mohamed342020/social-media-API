const { userModel } = require("../../../DB/models/userModel");
const jwt = require('jsonwebtoken');

const sendEmail = require("../../../servises/sendEmail")



const signUp = async (req, res) => {
    try {
        const { userName, email, phone, password, location } = req.body; //get data from body

        const userEmail = await userModel.findOne({ email }); // check if email is existed
        if (userEmail) {
            // in case of finding email
            res.status(401).json({ message: "This Email is already existed" });
        } else {
            // if this email is unique

            const addeduser = await userModel.insertMany({
                userName,
                email,
                password,
                phone,
                location
            });
            // create reusable transporter object using the default SMTP transport
            let userData = {
                id: addeduser[0]._id
            }
            const token = jwt.sign(userData, process.env.tokenKey)
            const message = `<p style="display:inline-block; font-family: 'cursive', Courier, monospace;">to confirm <a href="${req.protocol}://${req.headers.host}/confirm/${token}"> click here</a></p>`
            await sendEmail(addeduser[0].email,message)
            res.status(201).json({ message: "Done", addeduser }); //created
        }
    }
    catch (error) {
        res.status(500).json({ message: "ERROR", error, status: ReasonPhrases.INTERNAL_SERVER_ERROR });
    }
};


const confirm = async (req, res) => {
    try {
        const { token } = req.params;
        let userData = jwt.verify(token, process.env.tokenKey)
        let id = userData.id;
        const user = await userModel.findById(id)
        if (user) {
            if (user.verified) {
                res.status(401).json({ message: "user already verified" })
            } else {
                const verifiedUser = await userModel.updateOne({ _id: id }, { verified: true })
                res.status(200).json({ message: "Done", verifiedUser })
            }
        } else {
            res.status(404).json({ message: "user not found" })
        }
    } catch (error) {
        res.status(500).json({ message: "ERROR", error }); //catch error
    }
}




module.exports = { signUp, confirm }