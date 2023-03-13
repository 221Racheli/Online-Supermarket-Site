const { sequelize, DataTypes } = require("./sequelize");
  const Customer = sequelize.define(
    "customer",
    {
      customer_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      first_name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      last_name: {
          type: DataTypes.STRING,
          allowNull: false,
        },
      user_name: {
          type: DataTypes.STRING,
          allowNull: false,
          // unique:true,
        },
      password: {
          type: DataTypes.STRING,
          allowNull: false,
        },  
      email: {
          type: DataTypes.STRING,
          allowNull: false,
        },
      phone_number1: {
          type: DataTypes.STRING,
          allowNull: false,
        },
      phone_number2: {
          type: DataTypes.STRING,
        },
      address: {
          type: DataTypes.JSON,
          allowNull: false,
        },
      
    },  
    {
      timestamps: false,
    }
  );
module.exports = Customer;
  