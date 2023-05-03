const express = require("express");

const productsController = require("../controllers/products-controller");

const productsRouter= express.Router();

productsRouter.route("/sale") 
    .get(productsController.getSaleProducts)
    
productsRouter.route("/search")
    .get(productsController.getProductsBySearch)

productsRouter.route("/:subCategoryId")
    .get(productsController.getProducts)
       
productsRouter.route("/")
    .get(productsController.getProductsById)
    .put(productsController.updateProduct)


 
module.exports = productsRouter;

