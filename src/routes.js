const express = require("express");
const routes = express.Router();
const validate = require("express-validation");
const handler = require("express-async-handler");
const Sentry = require("@sentry/node");

const sentryConfig = require("./config/sentry");
const authMiddleware = require("./middlewares/auth");
const errorHandlerMiddleware = require("./middlewares/errorHandler");

const controllers = require("./controllers");
const validators = require("./validators");

Sentry.init(sentryConfig);
routes.use(Sentry.Handlers.requestHandler());

routes.post(
	"/users",
	validate(validators.User),
	handler(controllers.UserController.store),
);
routes.post(
	"/sessions",
	validate(validators.Session),
	handler(controllers.SessionController.store),
);

// Routes below this "routes.use" must be authenticated
routes.use(authMiddleware);

/**
 * Members Routes
 */
routes.get("/members", handler(controllers.MemberController.index));
routes.get("/members/:id", handler(controllers.MemberController.show));
routes.post(
	"/members",
	validate(validators.Member),
	handler(controllers.MemberController.store),
);
routes.put(
	"/members/:id",
	validate(validators.Member),
	handler(controllers.MemberController.update),
);
routes.delete("/members/:id", handler(controllers.MemberController.destroy));

if (process.env.NODE_ENV === "production") {
	return routes.use(Sentry.Handlers.errorHandler());
}

routes.use(errorHandlerMiddleware);

module.exports = routes;
