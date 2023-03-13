const { Op } = require('sequelize');
const db = require('../models/index');
const Order = db.order;
const OrdProds = db.orderProducts;

class OrdersDataAccessor{


 //checked 👍
getPreviousOrders=async(id)=>{
    return await Order.findAll({
        where: {
            customer_id: id
        }
    });
}

//checked 👍
getPreviousOrdersProducts=async(orderId)=>{
    return await OrdProds.findAll({
        where:{
            order_id: orderId
        }
    })
}

//checked 👍
getPreviousSumOfOrders=async(id,startDate,endDate)=>{
    return await Order.findAll({ 
        attributes: ['totalPrice'],
        where: {
            [Op.and]:[{customer_id: id},{createdAt:{[Op.between]: [startDate, endDate]}}]
        }
    });
}


//checked 👍
AddOrder=async(customer_id,order_id,date,status,totalPrice,orderAddress,orderedProducts)=>{
    const newOrder = await Order.create({customer_id,order_id,date,status,totalPrice,orderAddress});
    const newOrdProds = await OrdProds.bulkCreate(orderedProducts.map(x=>({ ...x, order_id:newOrder.order_id})));
    return {newOrder,newOrdProds};
    }
}

const ordersDataAccessor = new OrdersDataAccessor();
module.exports = ordersDataAccessor;