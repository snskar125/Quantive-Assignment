const {Router} = require("express")
const { addToDashboard, getDashboardItems, getDashboardStats } = require("../controllers/dashboardController")
const protect = require("../middleware/authMiddleware")

const router = Router()

router.get("/",protect,getDashboardItems)
router.post("/",protect,addToDashboard)
router.post("/stats",protect,getDashboardStats)

module.exports = router