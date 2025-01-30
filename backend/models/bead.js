const mongoose = require("mongoose");

const beadSchema = new mongoose.Schema({
  id: {
    type: String,
    required: true,
  },
  stock: {
    type: Number,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  diameter: {
    type: Number,
    required: true,
  },
  colour: {
    type: String,
    enum: [
      "red",
      "orange",
      "yellow",
      "green",
      "blue",
      "purple",
      "pink",
      "white",
      "black",
      "other"
    ],
    required: true,
  },
  shape: {
    type: String,
    enum: ["butterfly", "heart", "star", "circle", "flower", "cube", "other"],
    required: true,
  },
});

module.exports = {
  beadSchema,
  Bead: mongoose.models.Bead || mongoose.model("Bead", beadSchema),
};