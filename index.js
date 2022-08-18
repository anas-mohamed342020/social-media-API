const express = require('express')
const runDB = require('./DB/config/connectDB')
const { userRouter, postRouter, reportRouter,  } = require('./router/router')
const app = express()
require('dotenv').config()
const port = process.env.port
app.use(express.json())

app.use(userRouter,postRouter,reportRouter)

runDB()

app.listen(port, () => console.log(`Example app listening on port ${port}!`))