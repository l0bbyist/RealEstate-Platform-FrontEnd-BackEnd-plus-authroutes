const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const Land = sequelize.define("Land", {
    id: { 
        type: DataTypes.INTEGER, 
        autoIncrement: true, 
        primaryKey: true 
    },
    owner: { 
        type: DataTypes.STRING, 
        allowNull: false 
    }, // Owner's email (or name if used before)
    coOwners: { 
        type: DataTypes.ARRAY(DataTypes.STRING), 
        allowNull: true, 
        defaultValue: [] 
    }, // Multiple owners for fractional ownership
    location: { 
        type: DataTypes.STRING,  // Restored original type (avoiding JSONB issue)
        allowNull: false 
    }, 
    areaOfLand: { 
        type: DataTypes.FLOAT, 
        allowNull: false 
    },
    price: { 
        type: DataTypes.FLOAT, 
        allowNull: false 
    },
    propertyID: { 
        type: DataTypes.INTEGER, 
        allowNull: false, 
        unique: true 
    },
    physicalSurveyNo: { 
        type: DataTypes.INTEGER, 
        allowNull: false 
    },
    titleCID: { 
        type: DataTypes.STRING, 
        allowNull: false 
    }, // IPFS hash for land title
    isVerified: { 
        type: DataTypes.BOOLEAN, 
        defaultValue: false 
    }, // Verified by Government Inspector
    isForSale: { 
        type: DataTypes.BOOLEAN, 
        defaultValue: false 
    }, // Can be listed for sale
    transactionHash: { 
        type: DataTypes.STRING, 
        allowNull: true 
    } // Blockchain transaction reference
});

module.exports = Land;
