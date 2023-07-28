const express = require('express');
const router = express.Router();
const paymentController = require("../controllers/paymantController");
const checkAuthentication = require('../middleware/auth');

router.post('/pay', checkAuthentication,paymentController.paymentProcessing);
router.get('/stripeKey', checkAuthentication,paymentController.sending_STRIPE_API_KEY);
 
 

module.exports = router;