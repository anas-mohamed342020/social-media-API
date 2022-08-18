const { userModel } = require("../../../DB/models/userModel");
const { pagination } = require("../../../servises/pagination");
const {
    ReasonPhrases,
    StatusCodes,
    getReasonPhrase,
    getStatusCode,
} = require('http-status-codes');

const getAdmins = async (req, res) => {
    // try {
        let { page, size } = req.query;
        const { skip, limit } = pagination(page, size);
        const admins = await userModel.find({ role: "Admin" }).limit(limit).skip(skip)
        res.status(StatusCodes.ACCEPTED).json({ message: "Done", Admins: admins })
    // } catch (error) {
    //     res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: "ERROR", error, status: ReasonPhrases.INTERNAL_SERVER_ERROR });
    // }
}
module.exports = { getAdmins }