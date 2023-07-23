const ErrorHandle = require("../utils/errorHandle");

const User = require("../models/userModels");

const asyncErrorHandling = require ("../middleware/asyncErrorHandling");

exports.registerUser = async (req, res, next) => {
    const { name, email, password } = req.body;
  
      const user = await User.create({
        name,
        email,
        password,
        profilePicture: {
          public_id: "myCloud.public_id",
          url: "myCloud.secure_url",
        },
      });
  
      res.status(201).json({
        success: true,
        user,
      });
    
  };
  