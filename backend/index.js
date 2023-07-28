const express = require("express");
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const productRoutes = require("./Routes/productRoutes");
const userRoutes = require("./Routes/userRoutes");
const cookieParser = require("cookie-parser");
const backendErrorHandling = require("./middleware/errorHandle");
const orderRoutes = require("./Routes/orderRoutes");
const payementRoutes = require("./Routes/paymentRoutes");
dotenv.config();

const app = express();
app.use(express.json());
app.use(cookieParser());

const port = process.env.PORT;

mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log('DB connected');
}).catch((err) => {
  console.error('Error connecting to the DB:', err);
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
