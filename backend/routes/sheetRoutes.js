const {Router} = require("express")
const { getSheets, getTabs } = require("../controllers/sheetController")
const protect = require("../middleware/authMiddleware")

const router = Router()

router.post("/",protect,getSheets)
router.post("/tabs",protect,getTabs)

module.exports = router