const express = require("express")
const router= express.Router();
const userController = require("../controllers/userController");
const checkAuthentication = require("../middleware/auth");
 


router.post('/register', userController.registerUser);
router.post('/login' , userController.login );
router.get('/logout' , userController.logout);  
router.post('/forgotPassword' , userController.forgotPassword);  
router.put('/resetPassword/:token' , userController.resetPassword); 
router.get('/userAccount' , checkAuthentication, userController.getUser);  
module.exports= router  ;