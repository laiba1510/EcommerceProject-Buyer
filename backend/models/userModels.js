const mongoose = require('mongoose');
const validator = require ('validator');
const userModel = new mongoose.Schema
(
    {
        name:
        {
            type: String,
            required: [true, "Please Enter Your Name"],
            maxLength: [30, "Name cannot exceed 30 characters"],
            minLength: [4, "Name should have more than 4 characters"],
          },
          email: {
            type: String,
            required: [true, "Please Enter Your Email"],
            unique: true,
            validate: [validator.isEmail, "Please Enter a valid Email"],
          },
          password: {
            type: String,
            required: [true, "Please Enter Your Password"],
            minLength: [8, "Password should be greater than 8 characters"],
            select: false,  //except password baaqi sab milne chaiye
          },
          profilePicture: {
            public_id: {
              type: String,
              required: true,
            },
            url: {
              type: String,
              required: true,
            },
          },
          role: {
            type: String,
            default: "aam insaan",
          },
          
          resetPasswordToken : String,
          resetPasswordexpire : Date,
          });
        
    

          module.exports = mongoose.model("User", userModel)