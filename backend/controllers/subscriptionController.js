const asyncHandler = require("express-async-handler")
const { OAuth2Client } = require("google-auth-library")
const jwtDecode = require("jwt-decode")
const Subscription = require("../models/subscriptionModel")

const addSubscription = asyncHandler(async (req, res) => {
    const { authCode } = req.body

    //Checking if Auth Code is Recieved
    if (!authCode) {
        res.status(400)
        throw new Error("Auth Code not Received")
    }

    //Initiating a new Client
    const oAuth2Client = new OAuth2Client(
        process.env.CLIENT_ID,
        process.env.CLIENT_SECRET,
        'postmessage'
    )
    
    //Destructuring Tokens
    const { tokens } = await oAuth2Client.getToken(authCode)

    //Decoding JWT Token for Email and picture
    const decoded = jwtDecode(tokens.id_token)

    //Checking if Subscription is already added to this Account
    const exists = await Subscription.findOne({ email: decoded.email, user: req.user.id })
    if (exists) {
        res.status(400)
        throw new Error("This Subscription is already added to this Account")
    }

    //Creating a new Subscription
    const newSubscription = await Subscription.create({
        email: decoded.email,
        picture: decoded.picture,
        user: req.user.id,
        refreshToken: tokens.refresh_token
    })

    if (newSubscription)
        res.status(201).json({ tokens })

    else {
        res.status(400)
        throw new Error("Something went Wrong")
    }
})


const getSubscriptions = asyncHandler(async(req,res)=>{
    const user = req.user.id

    //Fetching all Subscriptions of Authorized User from Database
    const subscriptions = await Subscription.find({user})

    res.status(200).json(subscriptions)
})


module.exports = { addSubscription,getSubscriptions }