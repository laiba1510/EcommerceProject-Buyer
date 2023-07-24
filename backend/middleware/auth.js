const ErrorHandle = require("../utils/errorHandle");
const asyncErrorHandling = require("./asyncErrorHandling");
const token = require("jsonwebtoken");
const User = require("../models/userModels");


const checkAuthentication = asyncErrorHandling(async (req, res, next) =>
{
    //we only need token
    const { jwtToken } = req.cookies; //token stored in cookie at time of login

    if(!jwtToken)
    {
        return next (new ErrorHandle("please login to access" , 401));
    }

    const decodedLoginData = token.verify(jwtToken, process.env.JWT_SECRET_KEY);
    await User.findById(decodedLoginData.id);
    next();
});




module.exports= checkAuthentication;