const ErrorHandle = require("../utils/BackendErrorHandle");

const Product = require("../models/productModel");

const asyncErrorHandling = require("../middleware/asyncErrorHandling");
const ProductPageFeatures = require("../utils/productPageFeatures");


// exports.addProduct = asyncErrorHandling(async (req, res, next) => {
  
//   req.body.user = req.user.id;
//   const product = await Product.create(req.body)


//   res.status(201).json
//     ({
//       success: true,
//       product
//     });
// } );

//search Functionality
exports.getProducts = asyncErrorHandling(async (req, res) => {
  const productPerPage = 6
  const productCounter = await Product.countDocuments()

  const productPageFeature = new ProductPageFeatures(Product.find(), req.query)
    .search()
    .filter().pagination(productPerPage);
  const products = await productPageFeature.query;
  let remaingProducts = products.length;

  res.status(200).json({
    success: true,
    products,
    productCounter,
    productPerPage,
    remaingProducts,
  });
});

exports.getProductsbyID = asyncErrorHandling(async (req, res, next) => {
  const product = await Product.findById(req.params.id);

  if (!product) {
    return next(new ErrorHandle("Product not found", 404));
  }

  res.status(200).json({
    success: true,
    product,
  });
});


//adding reviews to the product
exports.productReview = asyncErrorHandling(async (req, res, next) => {
  const { rating, commentReviews, productId } = req.body;

  const reviewObject = {
    user: req.user._id,
    name: req.user.name,
    rating: Number(rating),
    commentReviews,
  };

  const product = await Product.findById(productId).populate('reviews.user');

const userReviewed = product.reviews.find((review) => review.user.toString() === req.user._id.toString());
  if (userReviewed) {
    // Update the existing review here if needed
    product.reviews.forEach((review) => {
      if (review.user.toString() === req.user._id.toString())
        (review.rating = rating), (review.commentReviews = commentReviews);
    });

  } else {
    product.reviews.push(reviewObject);
    product.numOfReviews = product.reviews.length
  }
//avergae caclutaion
let average=0;
  product.ratings = product.reviews.forEach(review=>{
    average = average + review.rating 
  });

  product.ratings = average / product.reviews.length;


  // Save the updated product with the new review
  await product.save({validateBeforeSave: false});

  res.status(200).json({
    success: true,
    message: "Review added/updated successfully",
  });
});


exports.getAllReviews = asyncErrorHandling(async (req, res, next) => {
  const product = await Product.findById(req.query.productId);

  if (!product) {
    return next(new ErrorHandle("Product not found", 404));
  }

  res.status(200).json({
    success: true,
    reviews: product.reviews,
  });
});





exports.reviewDeletion = asyncErrorHandling(async (req, res, next)=>
{

const product = await Product.findById(req.query.productId);

if(!product)
{
  return next (new ErrorHandle("Product not found" , 400));
}

const newReviewStore = product.reviews.filter((reviews) => reviews._id.toString() !== req.query.id.toString());
  
//avergae caclutaion
let average=0;
  product.ratings = product.reviews.forEach(review=>{
    average = average + review.rating 
  });

  product.ratings = average / product.reviews.length;

  const ratings = average/newReviewStore.length;
  const reviewCount = newReviewStore.length;

  await Product.findByIdAndUpdate(req.query.productId,
    {
      reviews : newReviewStore,
      ratings,
      reviewCount,
    },
    {
      new: true,
      runValidators : true,
      useFindAndModify : false,
    });
    res.status(200).json({
      success : true,
      message: "review deleted"
    })
});