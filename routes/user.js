const express = require("express");
const router = express.Router();
const passport = require("passport")
const User = require("../models/user.js");
const wrapAsync = require("../utils/wrapAsync");
const { saveRedirectUrl } = require("../middalware.js");
const userController = require("../controllers/users.js");


router
.route("/singup")
.get( userController.singupFormrender)
//singup 
.post( wrapAsync(userController.singup));
//Login render  router
router
.route("/login")
.get(userController.loginrender)
//login route
.post( 
    saveRedirectUrl,
    passport.authenticate("local",{failureRedirect:"/login",
     failureFlash: true}),userController.login);

//logout 
router.get("/logout",userController.logout);

module.exports = router ;