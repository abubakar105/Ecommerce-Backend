import express from "express";
import {
    verifyToken,
    verifyTokenAndAdmin,
    verifyTokenAndAuthorization,
} from "./tokenAuthenticate.js";
import Product from "../Models/productModel.js";

const router = express.Router()
//CREATE
router.post("/",  async (req, res) => {
    // const newProduct = new Product(req.body);
    try {
      // console.log(req.body,"sdasd");
      const data={
        inStock:req.body.inStock,
        title:req.body.title,
        desc:req.body.desc,
        img:req.body.image,
        categories:[req.body.categories],
        size:[req.body.size],
        color:[req.body.color],
        price:req.body.price,
        adminId:req.body.adminId
      }
        const savedProduct = await Product.create(data);
        res.status(200).json(savedProduct);
    } catch (err) {
        res.status(500).json(err);
    }
});

//UPDATE
router.put("/:id", verifyTokenAndAdmin, async (req, res) => {
    try {
        const updatedProduct = await Product.findByIdAndUpdate(
            req.params.id,
            {
                $set: req.body,
            },
            { new: true }
        );
        res.status(200).json(updatedProduct);
    } catch (err) {
        res.status(500).json(err);
    }
});

//DELETE
router.delete("/:adminId/:productId",  async (req, res) => {
  try {
      const product=await Product.findById(req.params.productId);
      if(product.adminId==req.params.adminId){
        await Product.findByIdAndDelete(req.params.productId);
        res.status(200).json("Product has been deleted...");
      }
      else{
        res.status(200).json("You are Not Admin");
      }
    } catch (err) {
        res.status(500).json(err);
    }
});

//GET PRODUCT
router.get("/find/:id", async (req, res) => {
    try {
        // console.log("first")
        const product = await Product.findById(req.params.id);
        res.status(200).json(product);
    } catch (err) {
        res.status(500).json(err);
    }
});

// //GET ALL PRODUCTS
// router.get("/", async (req, res) => {
// const qNew = req.query.new;
// const qCategory = req.query.category;
// const qColor=req.query.color;
// const qSize=req.query.size;
// try {
//     let products;

//     if (qNew) {
//         products = await Product.find().sort({ createdAt: -1 }).limit(1);
//     } else if (qCategory) {
//         products = await Product.find({
//             categories: {
//                 $in: [qCategory],
//             },
//         });
//     }
//     else if(qColor){
//         products=await Product.find({
//             color:{
//                 $in:[qColor]
//             }
//         })
//     }
//     else if(qSize){
//         products=await Product.find({
//             size:{
//                 $in:[qSize]
//             }
//         })
//     }
//     else {
//         products = await Product.find();
//     }

//     res.status(200).json(products);
// } catch (err) {
//     res.status(500).json(err);
// }
// });
router.get("/", async (req, res) => {
    const qNew = req.query.new;
    const qOld = req.query.old;
    const qCategory = req.query.category;
    const qColor = req.query.color;
    const qSize = req.query.size;
  
    try {
      let products;
  
      if (qNew==="new") {
        products = await Product.find({inStock:true}).sort({ createdAt: -1 }).limit(1);
      } 
      else if (qOld==="old") {
        products = await Product.find({inStock:true}).sort({ createdAt: 1 }).limit(1);
      } 
      else if (qCategory) {
        products = await Product.find({
          categories: {
            $in: [qCategory],
          },
          inStock:true

        });
      } else if (qColor && qSize) {
        products = await Product.find({
          color: qColor,
          size: qSize,
          inStock:true

        });
      } else if (qColor) {
        products = await Product.find({
          color: {
            $in: [qColor],
          },
          inStock:true

        });
      } else if (qSize) {
        products = await Product.find({
          size: {
            $in: [qSize],
          },
          inStock:true

        });
      } else {
        products = await Product.find({          inStock:true
        });
      }
  
      res.status(200).json(products);
    } catch (err) {
      res.status(500).json(err);
    }
  });

  router.get("/admin/:id", async (req, res) => {
    // console.log("first")
    try {
      // console.log(req.params.id)
      const admin=req.query.id;
      const products = await Product.find({ adminId: req.params.id });
      // const products = await Product.aggregate([
      //   {
      //     $match: {
      //         _id: mongoose.Types.ObjectId(admin),
      //     },
      // },
      // {
      //     $lookup: {
      //         from: "User",
      //         localField: "_id",
      //         foreignField: "adminId",
      //         as: "products",
      //    },
      // },
      // ]);
      // console.log("first")
      // console.log(products)
      res.status(200).json(products);
    } catch (err) {
      res.status(500).json(err);
    }
  });
  
export default router;