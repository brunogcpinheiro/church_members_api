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
			sort: "name",
		});

		return res.json(members);
	}

	async show (req, res) {
		const member = await Member.findById(req.params.id);

		return res.json(member);
	}

	async store (req, res) {
		const { name, email } = req.body;

		if (await Member.findOne({ name })) {
			return res
				.status(400)
				.json({ error: "Member with this name already exists!" });
		} else if (await Member.findOne({ email })) {
			return res
				.status(400)
				.json({ error: "Member with this email already exists!" });
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
		await Member.findByIdAndDelete(req.params.id);

		return res.send();
	}
}

module.exports = new MemberController();
