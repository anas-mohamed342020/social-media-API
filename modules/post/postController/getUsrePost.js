const { postModel } = require("../../../DB/models/postModel");
const {
    ReasonPhrases,
    StatusCodes,
    getReasonPhrase,
    getStatusCode,
} = require('http-status-codes');
const { userModel } = require("../../../DB/models/userModel");
const { pagination } = require("../../../servises/pagination");

const getUserPosts = async (req, res) => {
    try {
    let { page, size } = req.query;

    const { id } = req.body;
    const user = await userModel.findById(id);
    if (user) {
        if (user.blocked || !user.active) {
            res.status(StatusCodes.BAD_REQUEST).json({ message: "This account not allowed", status: ReasonPhrases.BAD_REQUEST })
        } else {
            if (id == req.user.id || req.user.role == "Admin" || req.user.role == "SuperAdmin") {
                const { skip, limit } = pagination(page, size);
                const posts = await postModel.find({blocked:false,createdBy:id}).limit(limit).skip(skip).populate([{
                    path:"createdBy",
                    select:"userName email phone"
                }])

                res.status(StatusCodes.ACCEPTED).json({ message: "done", posts: posts, status: ReasonPhrases.ACCEPTED });
            } else {
                res.status(StatusCodes.BAD_REQUEST).json({ message: "you don't have a permission to see this profile", status: ReasonPhrases.BAD_REQUEST })
            }

        }
    } else {
        res.status(StatusCodes.NOT_FOUND).json({ message: "user not found", status: ReasonPhrases.NOT_FOUND });
    }



    } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: "ERROR", error, status: ReasonPhrases.INTERNAL_SERVER_ERROR }); //catch error
    }
};

module.exports = { getUserPosts }