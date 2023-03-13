const express = require("express");
const usersController = require("../controllers/users-controller");
const usersRouter= express.Router();
const verifyJWT = require("../middleware/verifyJWT")


usersRouter.route("/login") 
    .post(usersController.logIn)
usersRouter.route("/register") 
    .post(usersController.register)

usersRouter.route("/")
    .get(verifyJWT,usersController.getPersonalDetails)
    .put(verifyJWT,usersController.updatePersonalDetails)
// .get(usersController.getPasssword)

module.exports = usersRouter;


