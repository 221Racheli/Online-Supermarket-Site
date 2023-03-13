const { sequelize, DataTypes } = require("./sequelize");

const Category = sequelize.define(
  "category",
  {
    category_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
    },
    isActive: {
      type: DataTypes.TINYINT,
    },
  },  
  {
    timestamps: false,
  }
);

module.exports = Category;