const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: {
    type: String, 
    required: [true, "enter Product name"],
    trim: true,
  },
  description: {
    type: String,
    required: [true, "product description needed "],
  },
  price: {
    type: Number,
    required: [true, "e nter product Price"],
    maxLength: [6],
  },
  ratings: {
    type: Number,
    default: 0,
  },
  images: [
    {
      public_id: {
        type: String,
        required: true,
      },
      url: {
        type: String,
        required: true,
      },
    },
  ],
  category: {
    type: String,
    required: [true, "Please Enter Product Category"],
  },
  Stock: {
    type: Number,
    required: [true, "Please Enter product Stock"],
    maxLength: [3, "Stock cannot exceed 3 characters"],
    default: 1,
  },
  reviewCount: {
    type: Number,
    default: 0,
  },
  reviews: [
    {
      user: {
        type: mongoose.Schema.ObjectId,
        ref: "User",
        required: true,
      },
      name: {
        type: String,
        required: true,
      },
      rating: {
        type: Number,
        required: true,
      },
      commentReviews: {
        type: String,
        required: false,
      },
    },
  ],

  user :{
    type : mongoose.Schema.ObjectId,
    ref: "User",
    required : true,

  },
  
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Product", productSchema);
