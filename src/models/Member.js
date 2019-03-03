const mongoose = require("mongoose");

const MemberSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true,
		unique: true,
	},
	age: {
		type: Number,
		required: true,
	},
	address: {
		type: String,
		required: true,
	},
	telephone: {
		type: String,
		required: true,
	},
	email: {
		type: String,
		required: true,
	},
	createdBy: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "User",
	},
	createdAt: {
		type: Date,
		default: Date.now,
	},
});

module.exports = mongoose.model("Member", MemberSchema);
