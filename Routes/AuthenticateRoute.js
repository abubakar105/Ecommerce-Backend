import express from "express"
import User from "../Models/userModel.js"
import CryptoJS from "crypto-js"
import Jwt from "jsonwebtoken"

const router = express.Router()

router.post("/register", async (req, res) => {
    try {
      const userData={
        username:req.body.username,
        email:req.body.email,
        password:req.body.password,
      }
      const userEmail=await User.find({email:userData.email})
      const username=await User.find({email:userData.username})
      if(userEmail.length>0 || username.length >0 ){
      return res.status(201).json("User already registered");
      }
      const savedUser = await User.create(userData);
      const { password, ...others } = savedUser._doc;
     return res.status(201).json({...others});
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: err.message });
    }
  });
  
  
router.post("/login", async (req, res) => {
    try {
      const userName=req.body.username.toLowerCase()
        const user = await User.findOne({ email: userName });
        if (!user) {
            return res.status(401).json("Wrong User Name");
        }
        if (user.password !== req.body.password) {
            return res.status(401).json("Wrong Password");
        }
        const token = Jwt.sign({ id: user._id, isAdmin: user.isAdmin }, "my seceret key", { expiresIn: '3d' })
        const { password, ...others } = user._doc;
        return res.status(200).json({ ...others, token });
    } catch (err) {
        return res.status(500).json(err);
    }
});



export default router