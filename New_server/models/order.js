
const { sequelize, DataTypes } = require("./sequelize");
const Order = sequelize.define(
  "order",
  {
    order_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    customer_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    status: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    totalPrice: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },  
    orderAddress: {
        type: DataTypes.JSON,
      },
    
  },  
);

module.exports=Order;

  