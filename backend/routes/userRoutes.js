const express = require("express");
const router = express.Router();
const User = require("../models/User");

// ✅ Get all users
router.get("/", async (req, res) => {
    try {
        const users = await User.findAll();
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ message: "Error: " + error.message });
    }
});

// ✅ Verify a User (Only Inspector Can Do This)
router.put("/verify/:id", async (req, res) => {
    try {
        const { role } = req.body;
        if (role !== "Inspector") {
            return res.status(403).json({ message: "Only inspectors can verify users." });
        }

        const user = await User.findByPk(req.params.id);
        if (!user) return res.status(404).json({ message: "User not found" });

        user.isVerified = true;
        await user.save();

        res.status(200).json({ message: "User verified successfully", user });
    } catch (error) {
        res.status(500).json({ message: "Error: " + error.message });
    }
});

module.exports = router;
