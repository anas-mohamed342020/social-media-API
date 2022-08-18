const { postModel } = require("../../../DB/models/postModel");
const {
    ReasonPhrases,
    StatusCodes,
    getReasonPhrase,
    getStatusCode,
} = require('http-status-codes');

const block = async (req, res) => {
    try {
        const { id } = req.body;
        const post = await postModel.findById(id);
        if (post) {
            if (post.block) {
                res.status(StatusCodes.BAD_REQUEST).json({ message: "this post is blocked", status: ReasonPhrases.BAD_REQUEST });
            }
            else {
                await postModel.updateOne({ _id: id },{blocked:true});
                res.status(StatusCodes.ACCEPTED).json({ message: "Done", status: ReasonPhrases.ACCEPTED })

            }
        } else {
            res.status(StatusCodes.NOT_FOUND).json({ message: "post not existed", status: ReasonPhrases.NOT_FOUND });
        }

    } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: "ERROR", error, status: ReasonPhrases.INTERNAL_SERVER_ERROR });
    }
}

module.exports = { block }