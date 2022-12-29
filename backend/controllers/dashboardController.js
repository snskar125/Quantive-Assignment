const asyncHandler = require("express-async-handler")
const Dashboard = require("../models/dashboardModel")
const {google} = require("googleapis")
const Subscription = require("../models/subscriptionModel")

const addToDashboard = asyncHandler(async(req,res)=>{
    const {sheetId,tabId,email} = req.body

    //Checking if data is Recieved
    if (!tabId || !sheetId || !email) {
        res.status(400)
        throw new Error("Send all Details")
    }

    //Checking if Tab is already added to Dashboard
    const exists = await Dashboard.findOne({sheetId,tabId,user:req.user.id})
    
    if(exists){
        res.status(400)
        throw new Error("Item already Added to Dashboard")
    }

    //Creating Dashboard Item
    const created = await Dashboard.create({
        user : req.user.id,
        sheetId,
        tabId,
        email
    })

    if(created){
        res.status(201).json({msg:"Item added to Dashboard"})
    }
    else{
        res.status(400)
        throw new Error("Something Went Wrong")
    }
})

const getDashboardItems = asyncHandler(async(req,res)=>{
    const {id} = req.user
    //Fetching Dashboard Items from Database
    const items = await Dashboard.find({user:id})
    res.json(items)
})


const getDashboardStats = asyncHandler(async(req,res)=>{
    const {sheetId,tabId,email} = req.body

    //Checking if data is Recieved
    if (!tabId || !sheetId || !email) {
        res.status(400)
        throw new Error("Send all Details")
    }


    //Creating Google OAuth Client
    const client = new google.auth.OAuth2(
        process.env.CLIENT_ID,
        process.env.CLIENT_SECRET,
        process.env.REDIRECT_URI
    )

    //Getting Refresh Token
    const { refreshToken } = await Subscription.findOne({ email, user: req.user.id })

    //Checking if Token is found
    if (!refreshToken) {
        res.status(400)
        throw new Error("Token not Found")
    }

    //Setting User's Refesh Token as Credential
    client.setCredentials({ refresh_token: refreshToken })

    const sheets = google.sheets({
        version: "v4",
        auth: client
    })

    //Getting Sheet Data
    const sheetData = await sheets.spreadsheets.get({ spreadsheetId: sheetId })

    //Extracting current Tab from Data 
    const filtered = sheetData.data.sheets.filter(item=>item.properties.sheetId===parseInt(tabId))
    const currObj = filtered[0]

    res.json({sheetTitle:sheetData.data.properties.title,tabTitle:currObj.properties.title,
    columns : currObj.properties.gridProperties.columnCount,
email})
})

module.exports = {addToDashboard,getDashboardItems,getDashboardStats}