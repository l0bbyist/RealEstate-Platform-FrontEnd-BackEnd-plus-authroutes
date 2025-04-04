const bcrypt = require("bcryptjs");  // for hashing the password
const jwt = require("jsonwebtoken");  // for generating JWT tokens
const User = require("../models/User");  // User model
const Admin = require("../models/Admin"); // Admin model

// User Registration
const userRegister = async (req, res) => {
  const { name, email, phone, password, nationalIdCID } = req.body;
  
  try {
    const hashedPassword = await bcrypt.hash(password, 10);  // Hash password

    const newUser = await User.create({
      name,
      email,
      phone,
      password: hashedPassword,
      nationalIdCID,
      isVerified: false  // Default to false, assuming this will be changed later by an inspector
    });

    res.status(201).json({ message: "User registered successfully", user: newUser });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "An error occurred during registration" });
  }
};

// User Login
const userLogin = async (req, res) => {
  const { email, password } = req.body;
  console.log("User login attempt with email:", email, password); //Debugging line
  try {
    const user = await User.findOne({ where: { email } });

    if (!user) {
      return res.status(400).json({ error: "User not found" });
    }

    const isMatch = await bcrypt.compare(password, user.password);  // Compare hashed passwords
    console.log("Password match result:", isMatch); //Debugging line

    if (!isMatch) {
      return res.status(400).json({ error: "Invalid credentials" });
      console.log("Invalid credentials for user:", email); //Debugging line
    }

    // Generate JWT token
    const token = jwt.sign({ id: user.id, role: "user" }, process.env.JWT_SECRET, { expiresIn: "1h" });

    res.json({ message: "Login successful", token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "An error occurred during login" });
    console.log("Error during user login:", error); //Debugging line
  }
};

// Admin Registration
const adminRegister = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    const newAdmin = await Admin.create({
      name,
      email,
      password: hashedPassword
    });

    res.status(201).json({ message: "Admin registered successfully", admin: newAdmin });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "An error occurred during registration" });
  }
};

// Admin Login
const adminLogin = async (req, res) => {
  const { email, password } = req.body;

  try {
    const admin = await Admin.findOne({ where: { email } });

    if (!admin) {
      return res.status(400).json({ error: "Admin not found" });
    }

    const isMatch = await bcrypt.compare(password, admin.password);

    if (!isMatch) {
      return res.status(400).json({ error: "Invalid credentials" });
    }

    // Generate JWT token
    const token = jwt.sign({ id: admin.id, role: "admin" }, process.env.JWT_SECRET, { expiresIn: "1h" });

    res.json({ message: "Admin login successful", token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "An error occurred during login" });
  }
};

module.exports = { userRegister, userLogin, adminLogin, adminRegister };
