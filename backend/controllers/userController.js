const ErrorHandle = require("../utils/errorHandle");

const asyncErrorHandling = require ("../middleware/asyncErrorHandling");
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

      const JWTToken = user.setJWT();
  
      res.status(201).json({
        success: true,
        user,
        JWTToken
      });
    
  };
  

  //making Login Function 
  
    exports.login = asyncErrorHandling(async (req, res , next)=>
    {
      const {email , password} = req.body;

      //checking email and password verification
      if(!email|| !password)
      {
        return next ( new ErrorHandle("pls enter email and password", 400))
      }

      const user = User.findOne({email}).select("+password");

      if(!user)
      {
        return next(new ErrorHandle ("Invalid email-password"));
      }

      const passwordMatchCheck = user.passwordCompare(password)

      if(!passwordMatchCheck)
      {
        return next(new ErrorHandle ("Invalid email-password"));
      }
      const JWTToken = user.setJWT();
  
      res.status(200).json({
        success: true,
        user,
        JWTToken
      });
    

    });