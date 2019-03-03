const express = require("express");
const routes = express.Router();
const validate = require("express-validation");
const authMiddleware = require("./middlewares/auth");

const controllers = require("./controllers");
const validators = require("./validators");

routes.post(
	"/users",
	validate(validators.User),
	controllers.UserController.store,
);
routes.post(
	"/sessions",
	validate(validators.Session),
	controllers.SessionController.store,
);

// Routes below this "routes.use" must be authenticated
routes.use(authMiddleware);

/**
 * Members Routes
 */
routes.get("/members", controllers.MemberController.index);
routes.get("/members/:id", controllers.MemberController.show);
routes.post(
	"/members",
	validate(validators.Member),
	controllers.MemberController.store,
);
routes.put(
	"/members/:id",
	validate(validators.Member),
	controllers.MemberController.update,
);
routes.delete("/members/:id", controllers.MemberController.destroy);

module.exports = routes;
