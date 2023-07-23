const express = require("express");
const dotenv = require('dotenv');
const mongoose = require('mongoose');


const app = express(); 

const port = process.env.PORT  
dotenv.config();

mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  }).then(() => {
    console.log('DB connected');
  }).catch((err) => {
    console.error('Error connecting to the DB:', err);
  });
  
  
  

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});