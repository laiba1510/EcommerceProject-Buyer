const ErrorHandle = require("../utils/errorHandle");

const Product = require("../models/productModel");

const asyncErrorHandling = require ("../middleware/asyncErrorHandling");
const ProductPageFeatures = require("../utils/productPageFeatures");


exports.addProduct = asyncErrorHandling (async (req, res, next)=>
{
  const product = await Product.create(req.body)

  res.status(201).json
  ({
    success:true,
    product
  })
}
);

//search Functionality
exports.getProducts = asyncErrorHandling(async (req, res) => {
   const productPerPage = 6
   const productCounter  = await Product.countDocuments()
  
  const productPageFeature = new ProductPageFeatures(Product.find(), req.query)
  .search()
  .filter().pagination(productPerPage);  
  const products = await productPageFeature.query;
  let remaingProducts = products.length;

  res.status(200).json({
   success: true,
   products ,
   productCounter,
   productPerPage,
   remaingProducts,
  });
});

  exports.getProductsbyID = asyncErrorHandling (async (req, res, next) => {
    const product = await Product.findById(req.params.id);
  
    if (!product) {
      return next(new ErrorHandle("Product not found", 404));
    }
  
    res.status(200).json({
      success: true,
      product,
    });
  });