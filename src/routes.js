const express = require("express");
const routes = express.Router();
//const authMiddleware = require("./middlewares/auth");

const controllers = require("./controllers");

routes.post("/users", controllers.UserController.store);
routes.post("/sessions", controllers.SessionController.store);

module.exports = routes;
