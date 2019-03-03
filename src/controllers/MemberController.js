const Member = require("../models/Member");

class MemberController {
	async index (req, res) {
		const filters = {};

		if (req.query.name) {
			filters.name = new RegExp(req.query.name, "i");
		}

		const members = await Member.paginate(filters, {
			page: req.query.page || 1,
			limit: 20,
			populate: [ "createdBy" ],
			sort: "-createdAt",
		});

		return res.json(members);
	}

	async show (req, res) {
		const member = await Member.findById(req.params.id);

		return res.json(member);
	}

	async store (req, res) {
		const { name } = req.body;

		if (await Member.findOne({ name })) {
			return res.status(400).json({ error: "Member already exists!" });
		}

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
