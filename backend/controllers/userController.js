const asyncHandler = require("express-async-handler")
const User = require("../models/userModel")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")

const login = asyncHandler(async (req, res) => {
    const { username, password } = req.body

    //Checking if something is missing
    if (!username || !password) {
        res.status(400)
        throw new Error("Send All Details")
    }

    //Verifying User
    const user = await User.findOne({ name: username })

    if (!user || ! await bcrypt.compare(password, user.password)) {
        res.status(400)
        throw new Error("Invalid Credentials")
    }

    //Generating a New Token
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET)

    res.status(200).json({ token })

})

const signup = asyncHandler(async (req, res) => {
    const { username, password, cpassword } = req.body

    //Checking if something is missing
    if (!username || !password || !cpassword) {
        res.status(400)
        throw new Error("Send All Details")
    }

    //Checking if Passwords do not match
    if (password !== cpassword) {
        res.status(400)
        throw new Error("Passwords do not Match")
    }

    //Checking if user alreay exists in Database
    const exists = await User.findOne({ name: username })
    if (exists) {
            res.status(400)
            throw new Error("User already Exists")
    }

    //Generating salt to Hash Password
    const salt = await bcrypt.genSalt(5)
    //Hashing Password
    const hashedPass = await bcrypt.hash(password, salt)
    //Creating New User
    const newUser = await User.create({ name: username, password: hashedPass })
    //Checking if User Created
    if (newUser) {
        res.status(201)
        res.json({ id: newUser._id, name: username })
    }
    else {
        res.status(500)
        throw new Error("Something went Wrong")
    }

})

module.exports = { login, signup }