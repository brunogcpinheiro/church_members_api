require("dotenv").config();

const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");

const routes = require("./routes");
const databaseConfig = require("./config/database");

mongoose.connect(databaseConfig.uri, {
	useCreateIndex: true,
	useNewUrlParser: true,
});

app.use(cors());
app.use(express.json());
app.use(routes);

app.listen(3001 || process.env.PORT, () =>
	console.log("Server is running on port 3001"),
);
