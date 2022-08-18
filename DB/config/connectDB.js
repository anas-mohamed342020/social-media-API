const mongoose = require('mongoose')

const runDB = async()=>{
    return await mongoose.connect(process.env.CONNECTION_STRING).then((result)=>{
         console.log( `connected`);
    }).catch((err)=>{
        console.log("fail to connect DB",err);
    })
}
module.exports = runDB