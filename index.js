import express from "express"
import mongoose from "mongoose"
import dotenv from "dotenv"
import router from "./Routes/UserRoute.js";
import authRouter from "./Routes/AuthenticateRoute.js";
import productRoute from "./Routes/ProductRoute.js"
import cartRoute from "./Routes/CartRoute.js"
import orderRoute from "./Routes/OrderRoute.js"
// import paymentRoute from "./Routes/stripeRoute.js"
import cors from "cors"

const app = express();
app.use(cors())
dotenv.config();
app.use(express.json())
mongoose.connect("mongodb://127.0.0.1:27017/express-my")
    .then(() => console.log("DataBAse Connected"))
    .catch((error) => console.log(error));

app.use("/api/auth", authRouter)
app.use("/api/user", router)
app.use("/api/produt", productRoute)
app.use("/api/cart", cartRoute)
app.use("/api/order", orderRoute)
// app.use("/api/checkout", paymentRoute)

app.listen(process.env.PORT || 5000, () => {
    console.log("Port is 5000")
})