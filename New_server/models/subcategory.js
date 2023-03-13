const { sequelize, DataTypes } = require("./sequelize");

const SubCategory = sequelize.define(
  "subcategory",
  {
      subcategory_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
    },
    category_id: {
      type: DataTypes.INTEGER,
      allowNull:false,
    },
    isActive: {
        type: DataTypes.TINYINT,
      },
  },  
  {
    timestamps: false,
  }
);
module.exports = SubCategory;

  