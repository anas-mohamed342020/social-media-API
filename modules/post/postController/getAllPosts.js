const { postModel } = require("../../../DB/models/postModel");
const {
    ReasonPhrases,
    StatusCodes,
    getReasonPhrase,
    getStatusCode,
} = require('http-status-codes');
const { pagination } = require("../../../servises/pagination");

const getAllPosts = async (req,res)=>{
    try {
        let { page, size } = req.query;

        const { skip, limit } = pagination(page, size);
        const posts = await postModel.find({blocked:false}).limit(limit).skip(skip).populate([{
            path:"createdBy",
            select:"userName email phone"
        }])
        res.status(StatusCodes.ACCEPTED).json({message:"Done",status:ReasonPhrases.ACCEPTED,posts})
    } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: "ERROR", error, status: ReasonPhrases.INTERNAL_SERVER_ERROR });
    }
}
module.exports = {getAllPosts}