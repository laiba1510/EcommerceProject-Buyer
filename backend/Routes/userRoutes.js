const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const checkAuthentication= require("../middleware/auth"); // Import the checkAuthenticationmiddleware

router.post('/register', userController.registerUser);
router.post('/login', userController.login);
router.post('/password/forgot', userController.forgotPassword);
router.put('/password/reset/:token', userController.resetPassword);
router.get('/logout', userController.logout);
router.get('/me', checkAuthentication, userController.getUserDetails);
router.put('/password/update', checkAuthentication, userController.updatePassword);
router.put('/me/update', checkAuthentication, userController.updateProfile); 
module.exports = router;
