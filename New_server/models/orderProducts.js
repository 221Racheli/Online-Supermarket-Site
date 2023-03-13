const { sequelize, DataTypes } = require("./sequelize");
  const OrderProducts = sequelize.define(
    "orderProducts",
    {
      orderedProduct_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      order_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      price: {
          type: DataTypes.FLOAT,
        },
      amount: {
          type: DataTypes.INTEGER,
        },
        name: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        company: {
            type: DataTypes.STRING,
            allowNull: false,
          },
        subcategory_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
          },  
        picture: {
            type: DataTypes.STRING,
            //allowNull: false,
          },
        isActive: {
            type: DataTypes.TINYINT,
           // allowNull: false,
          },
    },  
    {
      timestamps: false,
    }
  );
module.exports = OrderProducts;

  