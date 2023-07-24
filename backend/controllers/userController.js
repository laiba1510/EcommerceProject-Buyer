const ErrorHandle = require("../utils/errorHandle");

const asyncErrorHandling = require("../middleware/asyncErrorHandling");
const User = require("../models/userModels");
const cookieTokenization = require("../utils/Token");

const nodeMailer = require("nodemailer");

const sendEmail = async (options) => {
  const transporter = nodeMailer.createTransport({

    host: process.env.SMPT_HOST,
    port: process.env.SMPT_PORT,
    service: process.env.SMPT_SERVICE,
    auth: {
      user: process.env.SMPT_MAIL,
      pass: process.env.SMPT_PASSWORD,
    },
  });

  const mailOptions = {
    from: process.env.SMPT_MAIL,
    to: options.email,
    subject: options.subject,
    text: options.message,
  };

  await transporter.sendMail(mailOptions);
};



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

  cookieTokenization(user, 201, res);

};


//making Login Function 

exports.login = asyncErrorHandling(async (req, res, next) => {
  const { email, password } = req.body;

  //checking email and password verification
  if (!email || !password) {
    return next(new ErrorHandle("pls enter email and password", 400));
  }

  const user = await User.findOne({ email }).select("+password");

  if (!user) {
    return next(new ErrorHandle("Invalid email-password", 401));
  }

  const passwordMatchCheck = user.passwordCompare(password);

  if (!passwordMatchCheck) {
    return next(new ErrorHandle("Invalid email-password", 401));
  }
  const JWTToken = user.setJWT();

  cookieTokenization(user, 200, res);


});


exports.logout = asyncErrorHandling(async (req, res, next) => {
  res.cookie("tokenValue", null,
    {
      expires: new Date(Date.now()),
      httpOnly: true,
    });

  res.status(200).json({
    success: true,
    message: "logged out",
  });
});


exports.forgotPassword = asyncErrorHandling(async (req, res, next) => {
  const user = await User.findOne({ email: req.body.email });

  if (!user) {
    return next(new ErrorHandle("User not found", 404));

  }

  const newToken = user.resetPassword();
  await user.save({ validateBeforeSave: false });
  const resetPasswordUrl = `${req.protocol}://${req.get(
    "host"
  )}/password/reset/${newToken}`;
  const message = `Your password reset token is :- \n\n ${resetPasswordUrl} \n\nIf you have not requested this email then, please ignore it.`;


  try {
    await sendEmail({
      email: user.email,
      subject: `Password Recovery Service By E-Commerce`,
      message,
    });

    res.status(200).json({
      success: true,
      message: `Email sent to ${user.email} successfully`,
    });
  } catch (error) {
    user.resetPasswordToken = undefined;
    user.resetPasswordToExpire = undefined;

    await user.save({ validateBeforeSave: false });

    return next(new ErrorHandle(error.message, 500));
  }
});


// Reset Password
exports.resetPassword = asyncErrorHandling(async (req, res, next) => {
  // creating token hash
  const resetPasswordToken = crypto
    .createHash("sha256")
    .update(req.params.token)
    .digest("hex");

  const user = await User.findOne({
    resetPasswordToken,
    resetPasswordExpire: { $gt: Date.now() },
  });

  if (!user) {
    return next(
      new ErrorHandle(
        "Reset Password Token is invalid or has been expired",
        400
      )
    );
  }

  if (req.body.password !== req.body.confirmPassword) {
    return next(new ErrorHandle("Password does not password", 400));
  }

  user.password = req.body.password;
  user.resetPasswordToken = undefined;
  user.resetPasswordExpire = undefined;

  await user.save();

  sendToken(user, 200, res);
});



// Get User Detail
exports.getUser = asyncErrorHandling(async (req, res, next) => {
  const user = await User.findById(req.user.id);

  res.status(200).json({
    success: true,
    user,
  });
});

// // update User password
// exports.updatePassword = catchAsyncErrors(async (req, res, next) => {
//   const user = await User.findById(req.user.id).select("+password");

//   const isPasswordMatched = await user.comparePassword(req.body.oldPassword);

//   if (!isPasswordMatched) {
//     return next(new ErrorHander("Old password is incorrect", 400));
//   }

//   if (req.body.newPassword !== req.body.confirmPassword) {
//     return next(new ErrorHander("password does not match", 400));
//   }

//   user.password = req.body.newPassword;

//   await user.save();

//   sendToken(user, 200, res);
// });

// // update User Profile
// exports.updateProfile = catchAsyncErrors(async (req, res, next) => {
//   const newUserData = {
//     name: req.body.name,
//     email: req.body.email,
//   };

//   if (req.body.avatar !== "") {
//     const user = await User.findById(req.user.id);

//     const imageId = user.avatar.public_id;

//     await cloudinary.v2.uploader.destroy(imageId);

//     const myCloud = await cloudinary.v2.uploader.upload(req.body.avatar, {
//       folder: "avatars",
//       width: 150,
//       crop: "scale",
//     });

//     newUserData.avatar = {
//       public_id: myCloud.public_id,
//       url: myCloud.secure_url,
//     };
//   }

//   const user = await User.findByIdAndUpdate(req.user.id, newUserData, {
//     new: true,
//     runValidators: true,
//     useFindAndModify: false,
//   });

//   res.status(200).json({
//     success: true,
//   });
// });




