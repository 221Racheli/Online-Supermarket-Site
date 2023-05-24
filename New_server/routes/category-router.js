const express = require("express");

const categoryController = require("../controllers/category-controller");

const categoryRouter= express.Router();

categoryRouter.route("/")
    .get(categoryController.getAllCategories)
    
categoryRouter.route("/:categoryId")
    .get(categoryController.getAllSubCategories)
    

module.exports = categoryRouter;
