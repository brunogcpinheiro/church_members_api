const express = require("express");
const routes = express.Router();
const UserController = require("./controllers/UserController");
const SessionController = require("./controllers/SessionController");

routes.post("/users", UserController.store);
routes.post("/sessions", SessionController.store);

module.exports = routes;
