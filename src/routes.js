const express = require("express");
const routes = express.Router();
const UserController = require("./controllers/UserController");
const SessionController = require("./controllers/SessionController");
const authMiddleware = require("./middlewares/auth");

const controllers = require("./controllers");

routes.post("/users", controllers.UserController.store);
routes.post("/sessions", controllers.SessionController.store);

routes.get("/teste", authMiddleware, (req, res) => res.json({ ok: true }));

module.exports = routes;
