require("dotenv").config(); // Load environment variables

const { Sequelize } = require("sequelize");

// Debugging: Log environment variables (remove after testing)
console.log("DATABASE_URL:", process.env.DATABASE_URL);
console.log("DB_NAME:", process.env.DB_NAME);
console.log("DB_USER:", process.env.DB_USER);
console.log("DB_PASS:", process.env.DB_PASS);
console.log("DB_HOST:", process.env.DB_HOST);

const sequelize = process.env.DATABASE_URL
    ? new Sequelize(process.env.DATABASE_URL, {
          dialect: "postgres",
          logging: false,
      })
    : new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASS, {
          host: process.env.DB_HOST,
          dialect: "postgres",
          logging: false,
      });

sequelize.authenticate()
    .then(() => console.log("Database connected"))
    .catch(err => console.error("Error connecting to database:", err));

module.exports = sequelize;
