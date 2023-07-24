const ErrorHandle = require("../utils/errorHandle");

const asyncErrorHandling = require ("../middleware/asyncErrorHandling");
const User = require("../models/userModels");
const cookieTokenization = require("../utils/Token");


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

      cookieTokenization(user, 201  , res);
    
  };
  

  //making Login Function 
  
    exports.login = asyncErrorHandling(async (req, res , next)=>
    {
      const {email , password} = req.body;

      //checking email and password verification
      if(!email|| !password)
      {
        return next (new ErrorHandle("pls enter email and password", 400));
      }

      const user =  await User.findOne({email}).select("+password");

      if(!user)
      {
        return next(new ErrorHandle ("Invalid email-password", 401));
      }

      const passwordMatchCheck = user.passwordCompare(password);

      if(!passwordMatchCheck)
      {
        return next(new ErrorHandle ("Invalid email-password", 401));
      }
      const JWTToken = user.setJWT();
  
      cookieTokenization(user, 200 , res);
    

    });


    exports.logout = asyncErrorHandling(async (req , res , next)=>
    {
      res.cookie("tokenValue" , null , 
      {
        expires: new Date (Date.now()),
        httpOnly : true,
      }); 

      res.status(200).json({
        success: true,
        message: "logged out",
      });
    });