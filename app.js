// app.js
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const routes = require("./routes");
const mongoConfig = require("./config/mongodb.config");

const app = express();
app.use(cors());
const PORT = 3000;

mongoose
	.connect(mongoConfig.url, mongoConfig.options)
	.then(() => {
		console.log("Connected to MongoDB");
	})
	.catch((error) => {
		console.error("Error connecting to MongoDB:", error);
	});

app.use(bodyParser.json());
app.use(routes);

app.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}`);
});
