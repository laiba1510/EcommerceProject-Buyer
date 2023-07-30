const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');
const checkAuthentication = require("../middleware/auth");

router.post('/addProduct',productController.addProduct);
 router.get('/getAllProduct',productController.getProducts);
 router.get('/getProduct/:id', productController.getProductsbyID);
 router.put('/review', checkAuthentication, productController.productReview);
 router.get('/getAllReviews',  productController.getAllReviews);
 
 router.delete('/deleteReview', checkAuthentication,productController.reviewDeletion);
 
 

module.exports = router;
