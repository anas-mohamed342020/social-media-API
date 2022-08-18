// const { google } = require("googleapis");
const nodemailer = require("nodemailer");


// const CLIENT_ID = process.env.CLIENT_ID;
// const CLIENT_SECRET = process.env.CLIENT_SECRET;
// const REFRESH_TOKEN = process.env.REFRESH_TOKEN;
// const REDIRECT_URI = process.env.REDIRECT_URI;

// const oauth2Client = new google.auth.OAuth2(
//     CLIENT_ID,
//     CLIENT_SECRET,
//     REDIRECT_URI
// );
// oauth2Client.setCredentials({
//     refresh_token: REFRESH_TOKEN
// });


async function sendEmail(email, message) {
    // const accessToken = await oauth2Client.getAccessToken()
    // let transporter = nodemailer.createTransport({
    //     service: "gmail",
    //     auth: {
    //         type:"oauth2",
    //         clientId:CLIENT_ID,
    //         clientSecret:CLIENT_SECRET,
    //         accessToken:accessToken,
    //         refreshToken:REFRESH_TOKEN,
    //         user: process.env.senderEmail, // generated ethereal user
    //     },
    // });
    let transporter = nodemailer.createTransport({
        port: 587,
        service:"gmail",
        secure: false, // true for 465, false for other ports
        auth: {
            user: process.env.senderEmail, // generated ethereal user
            pass: process.env.senderPassword, // generated ethereal password
        },
    });

    // send mail with defined transport object
    let info = await transporter.sendMail({
        from: `"Exam"<${process.env.senderEmail}>`, // sender address
        to: `${email}`, // list of receivers
        subject: "Confirmation email", // Subject line
        text: "please confirm your email", // plain text body
        html: message, // html body
    });
}


module.exports =  sendEmail 