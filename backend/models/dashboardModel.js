const mongoose = require("mongoose")

const DashboardSchema = mongoose.Schema({
    user : {
        type:String,
        required : true
    },
    sheetId : {
        type : String,
        required : true
    },
    tabId : {
        type : String,
        required : true
    },
    email : {
        type : String,
        required : true
    }
},{
    timestamps : true
})

const Dashboard = mongoose.model("DashboardItem",DashboardSchema)

module.exports = Dashboard