const ordersDal=require("../dal/orders-dal");
const mail= require("../utils/email");   
                                                                                       

class OrdersContoller{

    getPreviousOrders=async(req,res)=>{
        const {customer_id:customer_id} = req.user;
        var previousOrders=await ordersDal.getPreviousOrders(customer_id);
        if(previousOrders.length > 0 )
            res.send(previousOrders);
        else
            return res.status(400).json({ message: `No pevious Orders for customer ${customer_id}`})
    }

    getPreviousOrdersProducts=async(req,res)=>{
        const orderId=req.params.orderId;
        const previousOrdersProducts = await ordersDal.getPreviousOrdersProducts(orderId);
        if (previousOrdersProducts.length>0)
            res.send(previousOrdersProducts)
        else
            return res.status(400).json({ message: `No products to order ${orderId}`})

    }


    getPreviousSumOfOrders=async(req,res)=>{
        const {customer_id:customer_id} = req.user;
        const {startDate,endDate}=req.body;
        var sumOfPrevOrders=await ordersDal.getPreviousSumOfOrders(customer_id,startDate,endDate);
        if(sumOfPrevOrders.length > 0 )
            res.send(sumOfPrevOrders);
        else
            return res.status(400).json({ message: `No pevious Orders for customer ${customer_id}`})
    }
    
    AddOrder=async(req,res)=>{
        const {customer_id:customer_id} = req.user;
        const{status,totalPrice,orderAddress}=req.body;
        const{orderdProducts}=req.body;
        if (!customer_id || !status || !totalPrice || orderdProducts.length ==0) 
            return res.status(400).json({ message: 'All fields are required' })
        var addedOrder=await ordersDal.AddOrder(customer_id,order_id,date,status,totalPrice,orderAddress,orderdProducts);
        if (addedOrder) 
        { 
            mail.sentMail(`this is your order! \n ${JSON.stringify(addedOrder)}`,'Sending Email using Node.js server - Your Order','36325593952@mby.co.il');
            return res.status(201).json({ message: 'New order created',data:addedOrder});
        } 
        else 
        {
            return res.status(400).json({ message: 'Invalid order data received' });
        }
    }
    
}


const ordersContoller = new OrdersContoller();
module.exports = ordersContoller;