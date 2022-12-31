const ErrorHandler = (err,req,res,next) => {
    //Checking if Status Code exists
    res.status(400)

    //Error Messege sent with Response
    res.json({
        message : err.message,
        stack : err.stack
    })
}

module.exports = ErrorHandler