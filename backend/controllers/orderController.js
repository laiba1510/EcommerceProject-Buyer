const Order = require("../models/orderModels");
const asyncErrorHandling = require("../middleware/asyncErrorHandling");
const Product = require("../models/productModel");
const user = require("../models/userModels");
const ErrorHandle = require("../utils/BackendErrorHandle");


exports.createOrder = async (req, res, next) => {
    const {
      shippingInformation,
      orderItems,
      PaymentInformation,
      itemsCharges,
      DeliveryCharges,
      totalCharges,
    } = req.body;
  
    const order = await Order.create({
      shippingInformation,
      orderItems,
      PaymentInformation,
      itemsCharges,
      DeliveryCharges,
      totalCharges,
      paidAt: Date.now(),
      user : req.user._id,
    });
  
    res.status(201).json({
      success: true,
      message: "Order created",
      order,
    });
  };



  //one order at a time 
  exports.singleOrder= asyncErrorHandling(async(req, res, next)=>{

    const order = await Order.findById(req.params.id).populate("user" , "name email");


    if (!order)
    {
      return next (new ErrorHandle("Order not found", 404 ));

    }


    res.status(200).json({ 
      success: true,
      order,
    });

  });
  


  //userOrderDetails
  
  //one order at a time 
  exports.userOwnOrder= asyncErrorHandling(async(req, res, next)=>{

    const order = await Order.findOne({user: req.user._id });



    res.status(200).json({ 
      success: true,
      order,
    });

  });
  








