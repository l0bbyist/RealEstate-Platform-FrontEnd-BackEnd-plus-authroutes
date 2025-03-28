const express = require("express");
const router = express.Router();
const { userRegister, userLogin, adminLogin, adminRegister } = require("../controllers/authController"); 

// User routes
router.post("/user/register", userRegister);   // User registration
router.post("/user/login", userLogin);         // User login

// Admin routes (similar structure)
router.post("/admin/register", adminRegister); // Admin registration
router.post("/admin/login", adminLogin);       // Admin login

module.exports = router;
