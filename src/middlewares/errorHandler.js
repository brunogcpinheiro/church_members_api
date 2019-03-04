const Youch = require("youch");
const validate = require("express-validation");

module.exports = async (err, req, res, next) => {
	if (err instanceof validate.ValidationError) {
		return res.status(err.status).json(err);
	}

	if (process.env.NODE_ENV !== "production") {
		const youch = new Youch(err, req);

		return res.send(await youch.toHTML());
	}

	return res.status(err.status || 500).json({ error: "Internal Server Error" });
};
