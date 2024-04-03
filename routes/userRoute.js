const express = require("express");
const { register, login, logout, getAllUser } = require("../controllers/userController");
const { isAuthorised } = require("../middleweres/auth");

const router = express.Router();

router.post("/register" , register)
router.post("/login" , login)
router.get("/logout" ,isAuthorised, logout)
router.get("/getuser" ,isAuthorised, getAllUser)


module.exports = router;