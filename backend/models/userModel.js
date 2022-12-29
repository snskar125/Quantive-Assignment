const mongoose = require("mongoose")

const UserSchema = mongoose.Schema({
    name : {
        type : String,
        required : [true,"Enter User Name"]
    },
    password : {
        type : String,
        required : [true,"Enter Password"]
    }
},{
    timestamps : true
})

const User = mongoose.model("User",UserSchema)

module.exports = User