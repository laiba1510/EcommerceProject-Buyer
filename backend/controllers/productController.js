const ErrorHandle = require("../utils/errorHandle");

const Product = require("../models/productModel");


exports.addProduct = async (req, res, next)=>
{
  const product = await Product.create(req.body)

  res.status(201).json
  ({
    success:true,
    product
  })
}


exports.getProducts = async (req, res, next) =>
{
  const products = await Product.find();

  res.status(209).json ({
   success: true,
   products 
  })
}


  exports.getProductsbyID = async (req, res, next) => {
    const product = await Product.findById(req.params.id);
  
    if (!product) {
      return next(new ErrorHandle("Product not found", 404));
    }
  
    res.status(200).json({
      success: true,
      product,
    });
  };