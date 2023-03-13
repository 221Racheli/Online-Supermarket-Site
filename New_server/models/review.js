const { sequelize, DataTypes } = require("./sequelize");
const Review = sequelize.define(
  "review",
  {
    review_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    customer_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    content: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
    status: {
        type: DataTypes.STRING,
        defaultValue:'Handling',
        //allowNull: false,
      },  
    dateOfCare: {
        type: DataTypes.DATE,
        //allowNull: false,
      },
  },
);
module.exports=Review;  
  