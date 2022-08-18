const mongoose = require("mongoose");


const reportSchema = new mongoose.Schema(
    {
        reportComment: {
            type: String,
            required: true
        },
        userID: {
            type: mongoose.Types.ObjectId,
            ref: 'User',
        },
        postID: {
            type: mongoose.Types.ObjectId,
            ref: 'Post',
        }
    }, {
    timestamps: true
}
);

const reportModel = mongoose.model("Report", reportSchema);
module.exports = { reportModel };