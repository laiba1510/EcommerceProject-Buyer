const express = require("express");
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const productRoutes = require("./Routes/productRoutes");

dotenv.config();

const app = express();
app.use(express.json());

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

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
