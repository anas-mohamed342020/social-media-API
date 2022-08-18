const { postModel } = require("../../../DB/models/postModel");
const { userModel } = require("../../../DB/models/userModel");



const {
    ReasonPhrases,
    StatusCodes,
    getReasonPhrase,
    getStatusCode,
} = require('http-status-codes');

const deletePost = async (req, res) => {
    try {
        const { id } = req.body;
        const post = await postModel.findOne({ _id: id, blocked: false });
        if (post) {
            const user = await userModel.findById(post.createdBy);
            if (user.blocked || !user.active) {
                res.status(StatusCodes.BAD_REQUEST).json({ message: "This owner of this post can't edit this bost", status: ReasonPhrases.BAD_REQUEST })
            } else {
                if (post.createdBy == req.user.id || req.user.role == "Admin"||req.user.role == "SuperAdmin") {
                    await postModel.deleteOne({ _id: id })
                    res.status(StatusCodes.ACCEPTED).json({ message: "Done", status: ReasonPhrases.ACCEPTED })
                } else {
                    res.status(StatusCodes.BAD_REQUEST).json({ message: "you don't have a permission to update this post", status: ReasonPhrases.BAD_REQUEST })
                }
            }
        } else {
            res.status(StatusCodes.NOT_FOUND).json({ message: "post not existed", status: ReasonPhrases.NOT_FOUND });
        }
    } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: "ERROR", error, status: ReasonPhrases.INTERNAL_SERVER_ERROR });
    }

};
module.exports = { deletePost }


