const Joi = require("joi");

module.exports = {
	body: {
		name: Joi.string().required(),
		age: Joi.number().required(),
		address: Joi.string().required(),
		telephone: Joi.string().required(),
		email: Joi.string().required(),
	},
};
