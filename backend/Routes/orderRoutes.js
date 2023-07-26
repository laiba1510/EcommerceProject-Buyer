const express = require('express');
const router = express.Router();
const orderController = require("../controllers/orderController");
const checkAuthentication = require("../middleware/auth");


router.post('/createOrder', checkAuthentication,orderController.createOrder);
router.get('/myOrder' , checkAuthentication, orderController.userOwnOrder)
router.get('/singleOrder/:id' , checkAuthentication, orderController.singleOrder)
 
module.exports= router;