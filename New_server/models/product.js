const { sequelize, DataTypes } = require("./sequelize");
  const Product = sequelize.define(
    "product",
    {
      product_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      company: {
          type: DataTypes.STRING,
          allowNull: false,
        },
      price: {
          type: DataTypes.FLOAT,
          allowNull: false,
        },
      subcategory_id: {
          type: DataTypes.INTEGER,
          allowNull: false,
        },  
      picture: {
          type: DataTypes.STRING,
          allowNull: false,
        },
      amount: {
          type: DataTypes.INTEGER,
          
        },
      sale: {
          type: DataTypes.INTEGER,
          allowNull: false,
          defaultValue:0,
        },
      isActive: {
          type: DataTypes.TINYINT,
          allowNull: false,
        },
      
    },  
    {
      timestamps: false,
    }
  );
module.exports = Product;
