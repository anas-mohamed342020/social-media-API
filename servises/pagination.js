const { ideahub } = require("googleapis/build/src/apis/ideahub");
const {
    ReasonPhrases,
    StatusCodes,
} = require('http-status-codes');

const pagination = (page, size) => {

    try {
        if (!page || page <= 0) {
            page = 1;
        }
        if (!size || size <= 0) {
            size = 3;
        }
        let skip = (page - 1) * size
        return { skip, limit:size }

    } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: "ERROR", error, status: ReasonPhrases.INTERNAL_SERVER_ERROR });
    }
}


module.exports = { pagination }