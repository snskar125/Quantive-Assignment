const asyncHandler = require("express-async-handler")
const {google} = require("googleapis")
const Subscription = require("../models/subscriptionModel")

const getSheets = asyncHandler(async(req,res)=>{
    const { email } = req.body
    
    //Checking if token is Recieved
    if (!email) {
        res.status(400)
        throw new Error("Token not Recieved")
    }

    //Creating Google OAuth Client
    const client = new google.auth.OAuth2(
        process.env.CLIENT_ID,
        process.env.CLIENT_SECRET,
        'postmessage'
    )

    //Getting Refresh Token
    const {refreshToken} = await Subscription.findOne({email,user:req.user.id})

    //Checking if Token is found
    if(!refreshToken){
        res.status(400)
        throw new Error("Token not Found")
    }

    //Setting User's Refesh Token as Credential
    client.setCredentials({ refresh_token: refreshToken })

    const drive = google.drive({
        version: "v3",
        auth: client
    })

    //Fetching Only SpreadSheet Files
    const sheets = await drive.files.list({ q: "mimeType='application/vnd.google-apps.spreadsheet'" })

    //Sending Sheets
    res.json(sheets.data.files)
})

const getTabs = asyncHandler(async(req,res)=>{
    const { email, sheetId } = req.body
    //Checking if data is Recieved
    if (!email || !sheetId) {
        res.status(400)
        throw new Error("Token not Recieved")
    }

    //Creating Google OAuth Client
    const client = new google.auth.OAuth2(
        process.env.CLIENT_ID,
        process.env.CLIENT_SECRET,
        'postmessage'
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
        version:"v4",
        auth:client
    })

    //Sending Tabs
    const sheetData = await sheets.spreadsheets.get({spreadsheetId:sheetId})
    res.json(sheetData.data.sheets)


})

module.exports = {getSheets,getTabs}