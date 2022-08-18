const { postModel } = require("../../../DB/models/postModel");
const { pagination } = require("../../../servises/pagination");
const {
    ReasonPhrases,
    StatusCodes,
    getReasonPhrase,
    getStatusCode,
} = require('http-status-codes');

const getblockedPosts = async (req,res)=>{
    try {
        let { page, size } = req.query;

        const { skip, limit } = pagination(page, size);

        const posts = await postModel.find({blocked:true}).limit(limit).skip(skip).populate([{
            path:"createdBy",
            select:"userName email phone"
        }])
        if(posts.length>0){
            res.status(StatusCodes.ACCEPTED).json({message:"Done",status:ReasonPhrases.ACCEPTED,posts})
        }else{
            res.status(StatusCodes.ACCEPTED).json({message:"No data",status:ReasonPhrases.ACCEPTED})
        }    
    } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: "ERROR", error, status: ReasonPhrases.INTERNAL_SERVER_ERROR });
    }
}

module.exports = {getblockedPosts}