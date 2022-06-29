const express = require("express")
const { checkAdmin, requireSignIn } = require("../controllers/authController")
const { createCompany, getCompany } = require("../controllers/companyController")
const router= express.Router()

router.post("/v1/company",requireSignIn, checkAdmin, createCompany)
router.get("/v1/company",requireSignIn, checkAdmin, getCompany)


module.exports=router