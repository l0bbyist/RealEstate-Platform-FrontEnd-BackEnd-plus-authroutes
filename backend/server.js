require("dotenv").config(); 
const express = require("express");
const cors = require("cors");
const sequelize = require("./config/db"); 
const User = require("./models/User"); 
const Land = require("./models/Land");
const Admin = require("./models/Admin");

const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");
const landRoutes = require("./routes/landRoutes");
const sellingLandRoutes = require("./routes/sellingLandRoutes");

const app = express();
app.use(cors({
origin: "http://localhost:3000", // Allow requests from React frontend
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true
}));
app.use(express.json());


// Routes
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/land", landRoutes);
app.use("/api/selling-land", sellingLandRoutes);


// Test Route
app.get("/", (req, res) => {
    res.send("Reals API is running...");
});

// Sync Database
sequelize.sync({ alter: true }) 
    .then(() => console.log("Database synchronized"))
    .catch(err => console.error("Database sync error:", err));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
