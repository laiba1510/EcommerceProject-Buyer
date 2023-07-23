const Product = require("../models/productModel");


//add Product , test 
async function addProduct(req, res) {
    const {
      name,
      description,
      price,
      ratings,
      images,
      category,
      Stock,
      numOfReviews,
      reviews,
      user,
    } = req.body;
  
    try {
      const newProduct = new Product({
        name,
        description,
        price,
        ratings,
        images,
        category,
        Stock,
        numOfReviews,
        reviews,
        user,
      });
  
      await newProduct.save();
      res.status(201).json({ success: true, message: 'Product created successfully' });
    } catch (err) {
      console.error(err);
      res.status(500).json({ success: false, error: 'Internal server error' });
    }
  }


//get all the products function
  async function getAllProducts(req, res) {
    try {
      const products = await Product.find();
      res.status(200).json({ success: true, products });
    } catch (err) {
      console.error(err);
      res.status(500).json({ success: false, error: 'Internal server error' });
    }
  }


//View Product By ID
  async function getProductById(req, res) {
    const productId = req.params.id;
  
    try {
      const product = await Product.findById(productId);
      if (!product) {
        return res.status(404).json({ success: false, error: 'Product not found' });
      }
      res.status(200).json({ success: true, product });
    } catch (err) {
      console.error(err);
      res.status(500).json({ success: false, error: 'Internal server error' });
    }
  }


  module.exports = {
    getAllProducts,
    addProduct,
    getProductById
  };