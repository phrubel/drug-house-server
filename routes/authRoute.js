
const express = require("express")
const router = express.Router()
const { signup,signin,requireSignIn,checkAdmin,sendForgetPasswordCode,setNewPassword,validToken } = require("../controllers/authController")

router.post("/api/v1/signup", signup)
router.post("/api/v1/signin", signin)
router.get("/api/v1/valid", validToken)
router.post("/api/v1/forget-password", sendForgetPasswordCode)
router.post("/api/v1/set-password", setNewPassword)


router.get("/test", requireSignIn, (req, res) => {
    console.log(req.user);
    res.send("Require Sing In Is OK")
})
router.get("/test-admin", requireSignIn, checkAdmin,(req, res) => {
    console.log(req.user);
    res.send("Check Admin OK")
})
module.exports = router