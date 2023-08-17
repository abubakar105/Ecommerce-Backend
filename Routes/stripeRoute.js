// import express, { Router } from "express"
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

// export default router