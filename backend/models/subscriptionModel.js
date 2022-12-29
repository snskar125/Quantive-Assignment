const mongoose = require("mongoose")

const subscriptionSchema = mongoose.Schema({
    user : {
        type : String,
        required : true
    },
    refreshToken : {
        type : String,
        required : true
    },
    email : {
        type : String,
        required : true
    },
    picture : {
        type : String,
        required : true
    }
},{
    timestamps : true
})

const subscriptionModel = mongoose.model("Subscription",subscriptionSchema)

module.exports = subscriptionModel