const Member = require("../models/Member");

class MemberController {
	async index (req, res) {
		const members = await Member.find();

		return res.json(members);
	}

	async show (req, res) {
		const member = await Member.findById(req.params.id);

		return res.json(member);
	}

	async store (req, res) {
		const member = await Member.create({ ...req.body, createdBy: req.userId });

		return res.json(member);
	}

	async update (req, res) {
		const member = await Member.findByIdAndUpdate(req.params.id, req.body, {
			new: true,
		});

		return res.json(member);
	}

	async destroy (req, res) {
		await Member.findOneAndDelete(req.params.id);

		return res.send("Deleted!");
	}
}

module.exports = new MemberController();
