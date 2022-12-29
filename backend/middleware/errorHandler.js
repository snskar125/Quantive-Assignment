const ErrorHandler = (err,req,res,next) => {
    //Checking if Status Code exists
    const statusCode = res.statusCode || 500
    res.status(statusCode)

    //Error Messege sent with Response
    res.json({
        message : err.message
    })
}

module.exports = ErrorHandler