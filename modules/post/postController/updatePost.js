const { postModel } = require("../../../DB/models/postModel");

const {
    ReasonPhrases,
    StatusCodes,
    getReasonPhrase,
    getStatusCode,
} = require('http-status-codes');
const { userModel } = require("../../../DB/models/userModel");


const updatePost = async (req, res) => {
    try {
    const { title, desc, id } = req.body;
    const post = await postModel.findOne({ _id: id, blocked: false });

    if (post) {
        const user = await userModel.findById(post.createdBy);

        if (user.blocked||!user.active) {
            res.status(StatusCodes.BAD_REQUEST).json({ message: "This owner of this post can't edit this bost", status: ReasonPhrases.BAD_REQUEST })
        } else {
            if (post.createdBy == req.user.id) {
                await postModel.updateOne({ _id: id }, { title, desc })
                res.status(StatusCodes.ACCEPTED).json({ message: "Done", status: ReasonPhrases.ACCEPTED })
            } else {
                res.status(StatusCodes.BAD_REQUEST).json({ message: "you don't have a permission to update this post", status: StatusCodes.BAD_REQUEST })
            }
        }
    } else {
        res.status(StatusCodes.NOT_FOUND).json({ message: "post not existed", status: ReasonPhrases.NOT_FOUND });
    }


    } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: "ERROR", error, status: ReasonPhrases.INTERNAL_SERVER_ERROR });
    }
};
module.exports = { updatePost }