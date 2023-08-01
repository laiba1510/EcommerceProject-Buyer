const express = require("express");
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const productRoutes = require("./Routes/productRoutes");
const userRoutes = require("./Routes/userRoutes");
const cookieParser = require("cookie-parser");
const backendErrorHandling = require("./middleware/errorHandle");
const orderRoutes = require("./Routes/orderRoutes");
const payementRoutes = require("./Routes/paymentRoutes");
const cloudinary = require("cloudinary");
const bodyParser= require("body-parser");
const fileUploading = require("express-fileupload");
dotenv.config();

const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.urlencoded({extended : true}));
app.use(fileUploading());


const port = process.env.PORT;

mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log('DB connected');
}).catch((err) => {
  console.error('Error connecting to the DB:', err);
});

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});


app.use("/product", productRoutes);
app.use("/user", userRoutes);
app.use("/order", orderRoutes);
app.use("/payment", payementRoutes);

// Error handling middleware should be placed after defining routes
app.use(backendErrorHandling);

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
