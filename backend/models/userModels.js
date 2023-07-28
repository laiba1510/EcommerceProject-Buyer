const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");

const userModel = new mongoose.Schema
  (
    {
      name:
      {
        type: String,
        required: [true, "enter name"],
        maxLength: [30, "maxLenght= 30"],
        minLength: [4, "minlenght = 4"],
      },
      email: {
        type: String,
        required: [true, "enter email"],
        unique: true,
        validate: [validator.isEmail, "enter email"],
      },
      password: {
        type: String,
        required: [true, "you missed password"],
        minLength: [5, "password should be greated then 5"],
        select: false,  //except password baaqi sab milne chaiye when ever get is called
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

      resetPasswordToken: String,
      resetPasswordExpire: Date,
    });

userModel.pre("save", async function (next) //this here we dont use arrow option because this object needs to used
{
  //we donot want to hash the already hashed password when updating user so for that if else
  if (!this.isModified("password")) {
    next();
//this will run during update profile case
  }

  this.password = await bcrypt.hash(this.password, 10)  // 10 shows the power 

});

//jwt token creation code
userModel.methods.setJWT = function () {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET_KEY, {
    expiresIn: '48h'
  })
  //user id ,secret key and private key is needed
} 


//pasword check by comparing password
userModel.methods.passwordComparison = async function (hashedPassword) {
  return await bcrypt.compare(hashedPassword, this.password);
};
 
  



//reseting password funtionality
userModel.methods.resetPassword = function () {
  // Generating Token
  const newToken = crypto.randomBytes(20).toString("hex");
  //buffer creation like A12 H7...  that is why we write digest hex

  // Hashing and adding resetPasswordToken to userSchema
  this.resetPasswordToken = crypto
    .createHash("sha256")
    .update(newToken)
    .digest("hex");

  this.resetPasswordExpire = Date.now() + 10 * 60 * 1000;

  return newToken;
};


const User = mongoose.model('User', userModel);
module.exports = User;