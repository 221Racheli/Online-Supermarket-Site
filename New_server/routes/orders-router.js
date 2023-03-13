const express = require("express");
const ordersController = require("../controllers/orders-controller");
const verifyJWT = require("../middleware/verifyJWT")
const ordersRouter= express.Router();


ordersRouter.route("/")
    .get(verifyJWT,ordersController.getPreviousOrders)
    .post(verifyJWT,ordersController.AddOrder)

ordersRouter.route("/products/:orderId")
    .get(verifyJWT,ordersController.getPreviousOrdersProducts)
   
ordersRouter.route("/account")
    .get(verifyJWT,ordersController.getPreviousSumOfOrders)

    

module.exports = ordersRouter;
