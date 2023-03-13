const { sequelize } = require("./sequelize");


const applyExtraSetup = () => {
    const { category, customer, order, orderProducts, product, review, subcategory } = sequelize.models;
    subcategory.belongsTo(category, { foreignKey: "category_id", as: "category" });
    review.belongsTo(customer, { foreignKey: "customer_id", as: "customer" });
    order.belongsTo(customer, { foreignKey: "customer_id", as: "customer" });
    product.belongsTo(subcategory, { foreignKey: "subcategory_id", as: "subcategory" });
    orderProducts.belongsTo(order, { foreignKey: "order_id", as: "order" });
    customer.hasMany(order, { foreignKey: "customer_id", as: "order" });
    customer.hasMany(review, { foreignKey: "customer_id", as: "review" });
    category.hasMany(subcategory, { foreignKey: "cateogry_id", as: "subcategory" });
    order.hasMany(orderProducts, { foreignKey: "order_id", as: "orderProducts" });
};

module.exports = { applyExtraSetup };
