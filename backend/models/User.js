const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const User = sequelize.define("User", {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    name: { type: DataTypes.STRING, allowNull: false },
    email: { type: DataTypes.STRING, allowNull: false, unique: true },
    phone: { type: DataTypes.STRING, allowNull: false, unique: true },
    password: { type: DataTypes.STRING, allowNull: false }, // Hashed password
    nationalIdCID: { type: DataTypes.STRING, allowNull: true }, // IPFS Hash for KYC
    isVerified: { type: DataTypes.BOOLEAN, defaultValue: false } // Inspector verifies user
});

module.exports = User;
