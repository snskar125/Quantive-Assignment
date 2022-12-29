const {Router} = require("express")
const { addSubscription, getSubscriptions } = require("../controllers/subscriptionController")
const router = Router()

//Importing Auth Middleware as Protect
const protect = require("../middleware/authMiddleware")

router.get("/",protect,getSubscriptions)
router.post("/",protect,addSubscription)

module.exports = router