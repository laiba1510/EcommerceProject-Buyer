const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');

router.post('/addProduct', productController.addProduct);
router.get('/getAllProduct', productController.getAllProducts);
router.get('/getProdut/id', productController.getProductById);

module.exports = router;
