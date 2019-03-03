const express = require("express");
const routes = express.Router();
const UserController = require("./controllers/UserController");
const SessionController = require("./controllers/SessionController");
const authMiddleware = require("./middlewares/auth");

routes.post("/users", UserController.store);
routes.post("/sessions", SessionController.store);

routes.get("/teste", authMiddleware, (req, res) => res.json({ ok: true }));

module.exports = routes;
