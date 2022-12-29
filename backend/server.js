const express = require("express")
require("dotenv").config()
const mongoose = require("mongoose")
const ErrorHandler = require("./middleware/errorHandler")

const port = process.env.PORT || 5000

const server = express()

mongoose.set('strictQuery', false)

//Connecting Database
mongoose.connect(process.env.MONGO_URI)
.then(() => { console.log("Database Connected Succesfully") })
.catch((e) => { console.log(e) })

//Setting up Body Parser
server.use(express.json())
server.use(express.urlencoded({ extended: false }))

//Using UserRouter Router
server.use("/api/user", require("./routes/userRoutes"))
//Using Subscription Router
server.use("/api/subscription", require("./routes/subscriptionRoutes"))
//Using Sheets Router
server.use("/api/sheet",require("./routes/sheetRoutes"))
//Using Dashboard Router
server.use("/api/dashboard",require("./routes/dashboardRoutes"))

//Starting the Server
server.listen(port, () => { console.log(`Server is running on PORT : ${port}`) })

//Integrating Error Handler
server.use(ErrorHandler)