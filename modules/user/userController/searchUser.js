const { userModel } = require("../../../DB/models/userModel");
const { pagination } = require("../../../servises/pagination");
const { search } = require("../../../servises/search");
const {
    ReasonPhrases,
    StatusCodes,
    getReasonPhrase,
    getStatusCode,
} = require('http-status-codes');

const searchUser = async (req, res) => {
    try {
        const { page, size } = req.query;
        const { searchKey } = req.params;
        const { skip, limit } = pagination(page, size);
        const data = await search(userModel, skip, limit, searchKey, [
            "userName",
            "email"
        ])
        res.status(StatusCodes.ACCEPTED).json({ message: "Done", data, status: ReasonPhrases.ACCEPTED })

    } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: "ERROR", error, status: ReasonPhrases.INTERNAL_SERVER_ERROR });
    }

}
module.exports = { searchUser }