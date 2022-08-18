const { userModel } = require("../../../DB/models/userModel");
const {
    ReasonPhrases,
    StatusCodes,
    getReasonPhrase,
    getStatusCode,
} = require('http-status-codes');


const deletedAdmin = async (req,res)=>{
    try {
        const {id} = req.body;
        const deletedAdmin = await userModel.findByIdAndUpdate(id,{role:"User"});
        if(deletedAdmin){
            res.status(StatusCodes.ACCEPTED).json({message:"Done",status:ReasonPhrases.ACCEPTED})
        }else{
            res.status(StatusCodes.NOT_FOUND).json({message:"user not found",status:ReasonPhrases.NOT_FOUND})
        }    
    } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: "ERROR", error, status: ReasonPhrases.INTERNAL_SERVER_ERROR });
    }
}


module.exports ={deletedAdmin}