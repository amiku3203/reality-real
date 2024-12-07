const express= require("express");
const userSignUpController = require("../controller/user/signup");
const userSignInController = require("../controller/user/signin");
const userLogout = require("../controller/user/signout");
const allUsers = require("../controller/user/allusers");
const updateUser = require("../controller/user/updateuser");
const authToken = require("../middleware/authtoken");
const userDetails = require("../controller/user/userdetails");
 
const router= express.Router();


router.post("/signup", userSignUpController);
router.post("/signin", userSignInController);
router.post("/logout",userLogout);
router.get("/allusers", allUsers);
router.put("/updateuser", authToken, updateUser);
router.get("/user-details",authToken,userDetails); 



module.exports =router;