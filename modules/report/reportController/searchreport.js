const { pagination } = require("../../../servises/pagination");
const { search } = require("../../../servises/search");
const {
    ReasonPhrases,
    StatusCodes,
    getReasonPhrase,
    getStatusCode,
} = require('http-status-codes');
const { reportModel } = require("../../../DB/models/reportModel");

const searchreport = async (req, res) => {
    try {
        const { page, size } = req.query;
        const { searchKey } = req.params;
        const { skip, limit } = pagination(page, size);
        const data = await search(reportModel, skip, limit, searchKey, [
            "reportComment"
        ])
        res.status(StatusCodes.ACCEPTED).json({ message: "Done", data, status: ReasonPhrases.ACCEPTED })

    } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: "ERROR", error, status: ReasonPhrases.INTERNAL_SERVER_ERROR });
    }

}
module.exports = { searchreport }