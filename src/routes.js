const express = require("express");
const routes = express.Router();
const authMiddleware = require("./middlewares/auth");

const controllers = require("./controllers");

routes.post("/users", controllers.UserController.store);
routes.post("/sessions", controllers.SessionController.store);

// Routes below this "routes.use" must be authenticated
routes.use(authMiddleware);

/**
 * Members Routes
 */
routes.get("/members", controllers.MemberController.index);
routes.get("/members/:id", controllers.MemberController.show);
routes.post("/members", controllers.MemberController.store);
routes.put("/members/:id", controllers.MemberController.update);
routes.delete("/members/:id", controllers.MemberController.destroy);

module.exports = routes;
