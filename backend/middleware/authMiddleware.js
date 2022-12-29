const jwt = require("jsonwebtoken")

const protect = (req,res,next) => {
    //Checking if Request has JWT Token
    if(req.headers.authorization && req.headers.authorization.startsWith("Bearer")){
        try{
        
        //Extracting Token from String
        const token = req.headers.authorization.split(" ")[1]
        
        if(!token){
            res.status(400)
            throw new Error("Not Authorized")
        }

        //Decrypting Token for User Id
        const user = jwt.verify(token,process.env.JWT_SECRET)
        //Setting User in Request object to be accessed by Controllers
        req.user = user
        next()

        }
        catch(e){
        res.status(400)
        throw new Error("Not Authorized")
        }
    }
    else{
        res.status(400)
        throw new Error("Not Authorized")
    }
}

module.exports = protect