import express from "express";
import {
    verifyToken,
    verifyTokenAndAdmin,
    verifyTokenAndAuthorization,
} from "./tokenAuthenticate.js";
import User from "../Models/userModel.js";
import authenticate from "../middleWare/authenticate.js";

const router = express.Router();

// Update user route
router.patch("/:id", verifyTokenAndAuthorization, async (req, res) => {
    try {
        const updatedUser = await User.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );
        res.status(200).json(updatedUser);
    } catch (err) {
        res.status(500).json(err);
    }
});


// Delete user route
router.delete("/:id", verifyTokenAndAuthorization, async (req, res) => {
    try {
        const deletedUser = await User.findByIdAndDelete(
            req.params.id
        );
        res.status(200).json("User  Deleted");
    } catch (err) {
        res.status(500).json(err);
    }
});


//GET USER
router.get("/find/:id", verifyTokenAndAdmin, async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        const { password, ...others } = user._doc;
        res.status(200).json(others);
    } catch (err) {
        res.status(500).json(err);
    }
});

router.get("/", verifyTokenAndAdmin, async (req, res) => {
    const query = req.query.new;
    try {
        const users = query
            ? await User.find().sort({ _id: -1 }).limit(1)
            : await User.find();
        res.status(200).json(users);
    } catch (err) {
        res.status(500).json(err);
    }
});



router.get("/stats", verifyTokenAndAdmin, async (req, res) => {
    const date = new Date();
    const lastYear = new Date(date.setFullYear(date.getFullYear() - 1));

    try {
        const data = await User.aggregate([
            { $match: { createdAt: { $gte: lastYear } } },
            {
                $project: {
                    month: { $month: "$createdAt" },
                },
            },
            {
                $group: {
                    _id: "$month",
                    total: { $sum: 1 },
                },
            },
        ]);
        res.status(200).json(data)
    } catch (err) {
        res.status(500).json(err);
    }
});

export default router;
