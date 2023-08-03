const BackendErrorHandle = require("../utils/BackendErrorHandle");
const asyncErrorHandling = require("../middleware/asyncErrorHandling");
const User = require("../models/userModels");
const cookieTokenization = require("../utils/Token");
const cloudinary = require("cloudinary");
const nodeMailer = require("nodemailer");
const crypto = require("crypto");

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

// Register a User
exports.registerUser = asyncErrorHandling(async (req, res, next) => {
  const myCloud = await cloudinary.v2.uploader.upload(req.body.avatar, {
    folder: "avatars",
    width: 150,
    crop: "scale",
  });

  const { name, email, password } = req.body;

  const newUser = await User.create({
    name,
    email,
    password,
    avatar: {
      public_id: "myCloud.public_id",
      url: "myCloud.secure_url"
    },
  });

  cookieTokenization(newUser, 201, res);
});

// Login User
exports.login = asyncErrorHandling(async (req, res, next) => {
  const { email, password } = req.body;

  // checking if user has given password and email both

  console
  if (!email || !password) {
    return next(new BackendErrorHandle("Please Enter Email & Password", 400));
  }

  const existingUser = await User.findOne({ email }).select("+password");

  if (!existingUser) {
    return next(new BackendErrorHandle("Invalid email or password", 401));
  }

  const isPasswordMatched = await existingUser.comparePassword(password);

  if (!isPasswordMatched) {
    return next(new BackendErrorHandle("Invalid email or password", 401));
  }

  cookieTokenization(existingUser, 200, res);
});

// Logout User
exports.logout = asyncErrorHandling(async (req, res, next) => {
  res.cookie("token", null, {
    expires: new Date(Date.now()),
    httpOnly: true,
  });

  res.status(200).json({
    success: true,
    message: "Logged Out",
  });
});

// Forgot Password
exports.forgotPassword = asyncErrorHandling(async (req, res, next) => {
  const user = await User.findOne({ email: req.body.email });

  if (!user) {
    return next(new BackendErrorHandle("User not found", 404));
  }

  // Get ResetPassword Token
  const resetToken = user.getResetPasswordToken();

  await user.save({ validateBeforeSave: false });

  const resetPasswordUrl = `${req.protocol}://${req.get("host")}/password/reset/${resetToken}`;

  const message = `Your password reset token is :- \n\n ${resetPasswordUrl} \n\nIf you have not requested this email then, please ignore it.`;

  try {
    await sendEmail({
      email: user.email,
      subject: `Ecommerce Password Recovery`,
      message,
    });

    res.status(200).json({
      success: true,
      message: `Email sent to ${user.email} successfully`,
    });
  } catch (error) {
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;

    await user.save({ validateBeforeSave: false });

    return next(new BackendErrorHandle(error.message, 500));
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
      new BackendErrorHandle(
        "Reset Password Token is invalid or has been expired",
        400
      )
    );
  }
  const { password, confirmPassword } = req.body;
  if (req.body.password !== req.body.confirmPassword) {
    return next(new BackendErrorHandle("Password does not match", 400));
  }

  user.password = req.body.password;
  user.resetPasswordToken = undefined;
  user.resetPasswordExpire = undefined;

  await user.save();

  cookieTokenization(user, 200, res);
});

// Get User Detail
exports.getUserDetails = asyncErrorHandling(async (req, res, next) => {
  const user = await User.findById(req.user.id);

  res.status(200).json({
    success: true,
    user,
  });


  
});

// update User password
exports.updatePassword = asyncErrorHandling(async (req, res, next) => {
  const user = await User.findById(req.user.id).select("+password");

  const isPasswordMatched = await user.comparePassword(req.body.oldPassword);

  if (!isPasswordMatched) {
    return next(new BackendErrorHandle("Old password is incorrect", 400));
  }

  if (req.body.newPassword !== req.body.confirmPassword) {
    return next(new BackendErrorHandle("Passwords do not match", 400));
  }

  user.password = req.body.newPassword;

  await user.save();

  cookieTokenization(user, 200, res);
});

// update User Profile
exports.updateProfile = asyncErrorHandling(async (req, res, next) => {
  const newUserData = {
    name: req.body.name,
    email: req.body.email,
  };

  if (req.body.avatar !== "") {
    const userToUpdate = await User.findById(req.user.id);

    const imageId = userToUpdate.avatar.public_id;

    await cloudinary.v2.uploader.destroy(imageId);

    const myCloud = await cloudinary.v2.uploader.upload(req.body.avatar, {
      folder: "avatars",
      width: 150,
      crop: "scale",
    });

    newUserData.avatar = {
      public_id: myCloud.public_id,
      url: myCloud.secure_url,
    };
  }

  const updatedUser = await User.findByIdAndUpdate(req.user.id, newUserData, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });

  res.status(200).json({
    success: true,
  });
});

module.exports = exports;
