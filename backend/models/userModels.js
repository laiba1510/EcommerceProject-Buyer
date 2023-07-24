const mongoose = require('mongoose');
const validator = require ('validator');
const bycrypt = require ("bcryptjs");
const jwt = require("jsonwebtoken");

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

          userModel.pre("save" , async function(next) //this here we dont use arrow option because this object needs to used
          {
            //we donot want to hash the already hashed password when updating user so for that if else
            if(!this.isModified("password"))
            { 
              next();
              
            }

            this.password= await bycrypt.hash(this.password, 10)  // 10 shows the power 
             
          });

          //jwt token creation code
          userModel.methods.setJWT = function()
          {
            return jwt.sign({id:this._id}, process.env.JWT_SECRET_KEY, {
              expiresIn: '24h'
            })
          } 

        
          //pasword check 
          {
            userModel.methods.passwordCompare = async function(userPassword)
            {
              return await bycrypt.compare(userPassword, this.password);
            }
          }
    

          module.exports = mongoose.model("User", userModel)