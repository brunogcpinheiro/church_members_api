const express = require("express");
const app = express();
const mongoose = require("mongoose");
const routes = require("./routes");

mongoose.connect(
	"mongodb://admin:test123@ds159025.mlab.com:59025/church_members",
	{
		useCreateIndex: true,
		useNewUrlParser: true,
	},
);

app.use(express.json());
app.use(routes);

app.listen(3000, () => console.log("Server is running on port 3000"));
