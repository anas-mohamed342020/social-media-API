const { userModel } = require("../../../DB/models/userModel");
const {
    ReasonPhrases,
    StatusCodes,
    getReasonPhrase,
    getStatusCode,
} = require('http-status-codes');
const { postModel } = require("../../../DB/models/postModel");
const { reportModel } = require("../../../DB/models/reportModel");
const report = async (req, res) => {


    try {
    const { reportComment, postID } = req.body;
    const post = await postModel.findById(postID);
        if (post) {

            if (post.blocked) {
                res.status(StatusCodes.BAD_REQUEST).json({ message: "this post is blocked", status: ReasonPhrases.BAD_REQUEST });
            }
            else {
                const userID = req.user.id;
                if (post.createdBy == userID) {
                    res.status(StatusCodes.BAD_REQUEST).json({ message: "you can't report your post", status: ReasonPhrases.BAD_REQUEST });
                } else {
                    const report = await reportModel.findOne({ userID, postID })
                    if (report) {
                        res.status(StatusCodes.BAD_REQUEST).json({ message: "you can't report this post again", status: ReasonPhrases.BAD_REQUEST })
                    } else {
                        await reportModel.insertMany({ reportComment, postID, userID })
                        res.status(StatusCodes.CREATED).json({ message: "Done", status: ReasonPhrases.CREATED })
                    }
                }

            }
        }
        else {
            res.status(StatusCodes.NOT_FOUND).json({ message: "post not existed", status: ReasonPhrases.NOT_FOUND });
        }

    } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: "ERROR", error, status: ReasonPhrases.INTERNAL_SERVER_ERROR });
    }


}

module.exports = { report }