const jwt = require('jsonwebtoken');
const {
    ReasonPhrases,
    StatusCodes,
    getReasonPhrase,
    getStatusCode,
} = require('http-status-codes');
const { userModel } = require('../../../DB/models/userModel');
const sendEmail = require('../../../servises/sendEmail');

const addAdmin = async (req,res)=>{
    try {
        const { userName, email, phone, password, location } = req.body; //get data from body

        const userEmail = await userModel.findOne({ email }); // check if email is existed
        if (userEmail) {
            // in case of finding email
            res.status(StatusCodes.BAD_REQUEST).json({ message: "This Email is already existed",status:ReasonPhrases.BAD_REQUEST });
        } else {
            // if this email is unique

            const addeduser = await userModel.insertMany({
                userName,
                email,
                password,
                phone,
                location,
                role:"Admin"
            });
            // create reusable transporter object using the default SMTP transport
            let userData = {
                id: addeduser[0]._id
            }
            const token = jwt.sign(userData, process.env.tokenKey)
            const message = `<p style="display:inline-block; font-family: 'cursive', Courier, monospace;">to confirm <a href="${req.protocol}://${req.headers.host}/confirm/${token}"> click here</a></p>`
            await sendEmail(addeduser[0].email,message)
            res.status(StatusCodes.CREATED).json({ message: "Done", status:ReasonPhrases.CREATED }); //created
        }
    }
    catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: "ERROR", error, status: ReasonPhrases.INTERNAL_SERVER_ERROR });
    }

}
module.exports = {addAdmin}