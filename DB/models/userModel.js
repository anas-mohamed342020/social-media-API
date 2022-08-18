const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
var CryptoJS = require("crypto-js");

const userSchema = new mongoose.Schema(
  {

    userName: {
      type: String,
      required: true,
    },

    email: {
      type: String,
      required: true,
    },

    password: {
      type: String,
    },
    phone: String
    ,
    verified: {
      type: Boolean,
      default: false,
    },
    blocked: {
      type: Boolean,
      default: false
    },
    report: {
      type: [mongoose.Types.ObjectId],
      ref: 'User',
    },
    role: {
      type: String,
      default: "User"
    },
    active: {
      type: Boolean,
      default: true
    },
    activationCode: {
      type: String
    },
    location: {
      type: String,
      required: true
    },
  },
  {
    timestamps: true
  }
);

userSchema.pre(["insertMany"], async (next, docs) => {
  docs.password = await bcrypt.hash(docs.password, parseInt(process.env.SALT));
  docs.phone = CryptoJS.AES.encrypt(
    JSON.stringify(docs.phone),
    process.env.secretKey
  ).toString();
  next();
});


userSchema.post(["find"], (docs, next) => {
  if (docs.length > 0) {
    docs.forEach((doc) => {

      x = JSON.parse(CryptoJS.AES.decrypt(doc.phone, process.env.secretKey).toString(
        CryptoJS.enc.Utf8
      ))


      doc.phone = x
    });
  }
  next();
});
// userSchema.post("findOne", (docs, next) => {
//   if (docs) {
//     x = JSON.parse(
//       CryptoJS.AES.decrypt(docs.phone, process.env.secretKey).toString(CryptoJS.enc.Utf8)
//     );
//     docs.phone = x;
//     console.log(docs);
//   }
//   next();
// });




const userModel = mongoose.model("User", userSchema);
module.exports = { userModel };