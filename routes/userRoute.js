const express = require("express");
const { requireSignIn, checkAdmin } = require("../controllers/authController");
const { getAllUser, deletUser } = require("../controllers/userController");
const router = express.Router();

router.get("/v1/all-users", requireSignIn, checkAdmin, getAllUser);
router.delete("/v1/user", requireSignIn, checkAdmin, deletUser);

module.exports = router;
