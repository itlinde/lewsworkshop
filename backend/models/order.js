const mongoose = require("mongoose");
const { beadSchema } = require("./bead");

const orderSchema = new mongoose.Schema({
  id: {
    type: String,
    required: true,
  },
  orderInfo: {
    dateOrdered: {
      type: Date,
      required: true,
      default: Date.now,
    },
    status: {
      type: String,
      required: true,
      default: "Pending",
    },
    beads: {
      type: [beadSchema],
      required: true,
    },
  },
  customerInfo: {
    email: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
  },
});

module.exports = {
  orderSchema,
  Order: mongoose.models.Order || mongoose.model("Order", orderSchema),
};
