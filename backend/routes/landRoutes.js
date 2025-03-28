const express = require("express");
const router = express.Router();
const Land = require("../models/Land");

// ✅ Get all land records
router.get("/", async (req, res) => {
    try {
        const lands = await Land.findAll();
        res.status(200).json(lands);
    } catch (error) {
        res.status(500).json({ message: "Error: " + error.message });
    }
});

// ✅ Register new land
router.post("/", async (req, res) => {
    try {
        const { owner, areaOfLand, price, propertyID, physicalSurveyNo, titleCID, isForSale, location } = req.body;

        if (!owner || !propertyID || !location) {
            return res.status(400).json({ message: "Owner, PropertyID, and Location are required." });
        }

        const newLand = await Land.create({
            owner, areaOfLand, price, propertyID, physicalSurveyNo, titleCID, isForSale, location
        });

        res.status(201).json({ message: "Land registered successfully", newLand });
    } catch (error) {
        res.status(500).json({ message: "Error: " + error.message });
    }
});

// ✅ Verify land (Only Inspector Can Do This)
router.put("/verify/:propertyID", async (req, res) => {
    try {
        const { role } = req.body;
        if (role !== "Inspector") {
            return res.status(403).json({ message: "Only inspectors can verify land." });
        }

        const land = await Land.findOne({ where: { propertyID: req.params.propertyID } });
        if (!land) return res.status(404).json({ message: "Land not found" });

        land.isVerified = true;
        await land.save();

        res.status(200).json({ message: "Land verified successfully", land });
    } catch (error) {
        res.status(500).json({ message: "Error: " + error.message });
    }
});

module.exports = router;
