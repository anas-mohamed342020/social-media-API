const { reportModel } = require("../../../DB/models/reportModel");
const { pagination } = require("../../../servises/pagination");

const {
    ReasonPhrases,
    StatusCodes,
    getReasonPhrase,
    getStatusCode,
} = require('http-status-codes');




const allreports = async (req, res) => {
    try {
        let { page, size } = req.query;
        const { skip, limit } = pagination(page, size);
        const reports = await reportModel.find().limit(limit).skip(skip).populate([{
            path:"userID",
            select:"userName email phone"
        },{
            path:"postID",
            select:"title desc"
        }])
        res.status(StatusCodes.ACCEPTED).json({message:"Done",status:ReasonPhrases.ACCEPTED,reports})

    } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: "ERROR", error, status: ReasonPhrases.INTERNAL_SERVER_ERROR });
    }

}


module.exports = { allreports }