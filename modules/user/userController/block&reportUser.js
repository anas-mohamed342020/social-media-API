const { userModel } = require("../../../DB/models/userModel");
const {
    ReasonPhrases,
    StatusCodes,
    getReasonPhrase,
    getStatusCode,
} = require('http-status-codes');

const report = async (req, res) => {
    try {
        let reporter = req.user.id;
        const { id } = req.body;
        if (id == reporter) {
            res.status(StatusCodes.BAD_REQUEST).json({ message: "you can't report your self", status: ReasonPhrases.BAD_REQUEST })
        } else {
            const user = await userModel.findById(id)
            if (user) {
                if (user.verified) {
                    if (user.blocked || !user.active) {
                        res.status(StatusCodes.BAD_REQUEST).json({ message: "This account not allowed", status: ReasonPhrases.BAD_REQUEST })
                    } else {
                        let reports = user.report
                        if (reports.includes(reporter)) {
                            res.status(StatusCodes.BAD_REQUEST).json({ message: "you have already reported this account", status: ReasonPhrases.BAD_REQUEST })
                        } else {
                            reports.push(reporter);
                            await userModel.updateOne({ _id: user._id }, { report: reports })
                            res.status(StatusCodes.ACCEPTED).json({ message: "Done", status: ReasonPhrases.ACCEPTED })
                        }
                    }
                } else {
                    res.status(400).json({ message: "this email is not work" });
                }
            } else {
                res.status(StatusCodes.BAD_REQUEST).json({ message: "User not found", status: ReasonPhrases.BAD_REQUEST })
            }
        }
    } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: "ERROR", error, status: ReasonPhrases.INTERNAL_SERVER_ERROR }); //catch error
    }
}
const block = async (req, res) => {
    try {
        const { id } = req.body;
        const user = await userModel.findById(id);
        if (user) {
            if (user.verified) {
                if (!user.active) {
                    res.status(StatusCodes.BAD_REQUEST).json({ message: "This account not active", status: ReasonPhrases.BAD_REQUEST })
                } else {
                    if (user.blocked) {
                        res.status(StatusCodes.BAD_REQUEST).json({ message: "user already blocked", status: ReasonPhrases.BAD_REQUEST });
                    } else {
                        if (user.report.length >= 10) {
                            await userModel.updateOne({ _id: id }, { blocked: true })
                            res.status(StatusCodes.ACCEPTED).json({ message: "Done", status: ReasonPhrases.ACCEPTED })
                        } else {
                            res.status(StatusCodes.BAD_REQUEST).json({ message: "user reports is less than the minimum number of reports ot be blocked", status: ReasonPhrases.BAD_REQUEST });
                        }
                    }
                }
            } else {
                res.status(400).json({ message: "this email not verified" });
            }
        } else {
            res.status(StatusCodes.BAD_REQUEST).json({ message: "user not found", status: ReasonPhrases.BAD_REQUEST });
        }
    } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: "ERROR", error, status: ReasonPhrases.INTERNAL_SERVER_ERROR });
    }
}
module.exports = { report, block }