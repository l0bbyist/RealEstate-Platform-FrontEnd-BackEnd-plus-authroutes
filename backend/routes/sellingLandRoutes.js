const express = require("express");
const router = express.Router();
const SellingLand = require("../models/SellingLand");

// ✅ Get all lands for sale
router.get("/", async (req, res) => {
    try {
        const lands = await SellingLand.findAll();
        res.status(200).json(lands);
    } catch (error) {
        res.status(500).json({ message: "Error: " + error.message });
    }
});

// ✅ List land for sale
router.post("/", async (req, res) => {
    try {
        const { owner, propertyID, price, location, documentCID } = req.body;

        if (!owner || !propertyID || !price) {
            return res.status(400).json({ message: "Owner, PropertyID, and Price are required." });
        }

        const newSellingLand = await SellingLand.create({
            owner, propertyID, price, location, documentCID, isForSale: true
        });

        res.status(201).json({ message: "Land listed for sale", newSellingLand });
    } catch (error) {
        res.status(500).json({ message: "Error: " + error.message });
    }
});

// ✅ Buy a land (Transfer ownership)
router.post("/buy/:propertyID", async (req, res) => {
    try {
        const { buyerEmail, transactionHash } = req.body;

        const landForSale = await SellingLand.findOne({ where: { propertyID: req.params.propertyID } });
        if (!landForSale || !landForSale.isForSale) {
            return res.status(404).json({ message: "Land not available for sale." });
        }

        landForSale.buyerEmail = buyerEmail;
        landForSale.transactionHash = transactionHash;
        landForSale.isForSale = false;
        await landForSale.save();

        res.status(200).json({ message: "Land purchased successfully!", landForSale });
    } catch (error) {
        res.status(500).json({ message: "Error: " + error.message });
    }
});

module.exports = router;
