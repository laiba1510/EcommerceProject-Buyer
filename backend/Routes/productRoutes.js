const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');

router.post('/addProduct', productController.addProduct);
 router.get('/getAllProduct', productController.getProducts);
 router.get('/getProduct/:id', productController.getProductsbyID);

module.exports = router;
