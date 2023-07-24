const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');
const checkAuthentication = require("../middleware/auth");

router.post('/addProduct',productController.addProduct);
 router.get('/getAllProduct', checkAuthentication ,productController.getProducts);
 router.get('/getProduct/:id', productController.getProductsbyID);

module.exports = router;
