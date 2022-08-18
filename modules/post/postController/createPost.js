const { postModel } = require("../../../DB/models/postModel");
const {
    ReasonPhrases,
    StatusCodes,
    getReasonPhrase,
    getStatusCode,
} = require('http-status-codes');
const { userModel } = require("../../../DB/models/userModel");

const creatPost = async (req, res) => {
    try {
        const user = await userModel.findById(req.user.id);
        if (user.blocked||!user.active) {
            res.status(StatusCodes.BAD_REQUEST).json({ message: "This user can't add post", status: ReasonPhrases.BAD_REQUEST })
        } else {
            const { title, desc } = req.body;
            await postModel.insertMany({ title, desc, createdBy: req.user.id });
            res.status(StatusCodes.CREATED).json({ message: "done", status: ReasonPhrases.CREATED });
        }
    } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: "ERROR", error, status: ReasonPhrases.INTERNAL_SERVER_ERROR }); //catch error
    }
};
module.exports = { creatPost }