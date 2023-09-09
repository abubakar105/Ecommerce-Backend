import stripePackage from "stripe";
const stripe =new  stripePackage("sk_test_51NAI24ABqUKBPQB7dBBZ5EffyEOOkp6QuGBoGfEohTVBEQyeVrlTKMlExfMl5H6NF1mnBeTcBM8QOb423uVHUdYM00JQlijMga");
import express from "express"
const router = express.Router();
router.use(express.json());
router.post("/",async(req,res)=>{
    try {
        const {products} = req.body;
    // console.log("first",products)

    const totalItems = products.reduce((total, item) => total + item.quantity, 0);
    const totalPrice = products.reduce((total, item) => total + item.price * item.quantity, 0);
    
    const lineItems = products.map((product)=>({
        price_data: { 
            currency: "usd", 
            product_data: { 
              name: product.title, 
            }, 
            unit_amount: product.price * 100, 
          }, 
          quantity: product.quantity, 
    }));

    const session = await stripe.checkout.sessions.create({
        payment_method_types:["card"],
        line_items: lineItems, 
        mode:"payment",
        success_url:"http://localhost:3000/success",
        cancel_url:"http://localhost:3000/fail",
    });

    res.json({id:session.id})
    } catch (error) {
        console.log("error",error)
    }
 
})

export default router


// import Stripe from "stripe";
// const stripe = new Stripe('sk_test_51NAI24ABqUKBPQB7dBBZ5EffyEOOkp6QuGBoGfEohTVBEQyeVrlTKMlExfMl5H6NF1mnBeTcBM8QOb423uVHUdYM00JQlijMga');

// const router = express.Router();

// router.post("/payment", (req, res) => {
//     console.log("enter")
//     stripe.charges.create(
//         console.log("Check"),
//         {

//             source: req.body.tokenId,
//             amount: req.body.amount,
//             currency: "usd",
//         },
//         (stripeErr, stripeRes) => {
//             if (stripeErr) {
//                 res.status(500).json(stripeErr);
//             } else {
//                 res.status(200).json(stripeRes);
//             }
//         }
//     );
// });
