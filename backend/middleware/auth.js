const ErrorHandle = require("../utils/BackendErrorHandle");
const asyncErrorHandling = require("./asyncErrorHandling");
const token = require("jsonwebtoken");
const User = require("../models/userModels");


const checkAuthentication = asyncErrorHandling(async (req, res, next) => {
    // Access the token using req.cookies.tokenValue instead of req.cookies.jwtToken
    const jwtToken = req.cookies.token; // Token stored in cookie at the time of login
    
    if (!jwtToken) {
      return next(new ErrorHandle("Please login to access", 401));
    }
  
    try {
      const decodedLoginData = token.verify(jwtToken, process.env.JWT_SECRET_KEY);
      const user = await User.findById(decodedLoginData.id);
      if (!user) {
        return next(new ErrorHandle("User not found", 404));
      }
      req.user = user; // Set the user object to req.user  to accees user data 
      next();
    } catch (err) {
      return next(new ErrorHandle("Invalid token", 401));
    }
  });
  



module.exports= checkAuthentication;