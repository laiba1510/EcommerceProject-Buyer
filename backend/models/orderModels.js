const mongoose = require("mongoose");


const orderModel = new mongoose.Schema({

    shippingInformation : 
    {
        address:
        {
            type: String,
            required: true,
        },

        province:
        {
            type: String,
            required: true,
        },

        city:
        {
            type: String,
            required: true,
        },

        country:
        {
            type: String,
            required: true,
            default : "Paksitan",

        },

        pinCode:
        {
            type: Number,
            required: true,
           
        },

        phoneNumber:
        {
            type: String,
            required: true,
            
        },

       
    },

    orderItems: [
    {
        productName:
        {
            type: String,
            required: true,
            
        },
        price:
        {
            type: Number,
            required: true,
            
        },
        quantity:
        {
            type: Number,
            required: true,
            
        },
        img:
        {
            type: String,
            required: true,
            
        },

        product:
        {
            type : mongoose.Schema.ObjectId,
            ref:"Product",
            required: true,

        },
    },

], 

user :
{
    type : mongoose.Schema.ObjectId,
    ref:"User",
    required: true,

},

PaymentInformation:
{
    id:
    {
        type: String,
        required: true,
        
    },

    status:
    {
        type: String,
        required: true,
        
    },



},


paidAt:
{
    type: Date,
    required: true,
   
    
},
itemsCharges:
{
    type: Number,
    required: true,
    default:0,
    
},

DeliveryCharges:
{
    type: Number,
    required: true,
   default:0
    
},
totalCharges:
{
    type: Number,
    required: true, 
    default:0,
    
},
orderStatus: {
    type: String,
    required: true,
    default: "Processing",
  },
  deliveredAt: Date,
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Order", orderModel);


