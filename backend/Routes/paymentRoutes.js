const asyncErrorHandling = require("../middleware/asyncErrorHandling");

const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

exports.paymentProcessing = asyncErrorHandling(async(req, res, next)=>
{

    const myPayment = await stripe.paymentIntents.create({
        amount : req.body.amount,
        currency : "inr" ,
        metadata :
        {
         company : "Laiba and Laiba co "   
        },

    });
    res.status(200).json
    ({
        success : true,
        client_secret  : myPayment.client_secret
    }); 
});