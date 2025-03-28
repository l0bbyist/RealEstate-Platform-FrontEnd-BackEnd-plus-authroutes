const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const SellingLand = sequelize.define("SellingLand", {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    owner: { type: DataTypes.STRING, allowNull: false }, // Seller's email
    propertyID: { type: DataTypes.INTEGER, allowNull: false, unique: true },
    buyerEmail: { type: DataTypes.STRING, allowNull: true }, // Buyer's email
    inspectorName: { type: DataTypes.STRING, allowNull: true, defaultValue: "Inspector" },
    documentCID: { type: DataTypes.STRING, allowNull: true }, // IPFS Hash of sale documents
    processStatus: { type: DataTypes.STRING, defaultValue: "Pending" }, // Pending, Verified, Sold
    price: { type: DataTypes.FLOAT, allowNull: false },
    paymentStatus: { type: DataTypes.BOOLEAN, defaultValue: false },
    transactionHash: { type: DataTypes.STRING, allowNull: true }
});

module.exports = SellingLand;
