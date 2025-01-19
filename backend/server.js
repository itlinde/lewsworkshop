const express = require("express");
const app = express();
const mongoose = require("mongoose");
const result = require("dotenv").config();

mongoose.connect(process.env.MONGODB_URI);
const db = mongoose.connection;
db.on("error", (error) => console.error(error));
db.once("open", () => console.log("connected to db"));

app.use(express.json());

const orderRouter = require("./routes/orders");
app.use("/orders", orderRouter);

const beadRouter = require("./routes/beads");
app.use("/beads", beadRouter);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`server started on port ${PORT}`));
