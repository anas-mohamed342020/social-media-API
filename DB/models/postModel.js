const mongoose = require("mongoose");


const postSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    desc: {
      type: String,
      required: true,
    },
    createdBy: {
      type: mongoose.Types.ObjectId,
      ref: 'User',
    },
    blocked: {
      type: Boolean,
      default: false
    }
  }, {
  timestamps: true
}
);

const postModel = mongoose.model("Post", postSchema);
module.exports = { postModel };