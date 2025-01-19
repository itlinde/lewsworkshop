const express = require("express");
const router = express.Router();
const Order = require("../models/order");
const morgan = require("morgan");

// Add morgan middleware with tiny format
router.use(morgan("tiny"));

const getOrder = async (req, res, next) => {
  let order;
  try {
    order = await Order.findById(req.params.id);
    if (order == null) {
      return res.status(404).json({ message: "Order not found" });
    }
  } catch (err) {
    res.status(500).json({ message: err });
  }

  res.order = order;
  next();
};

router.get("/", async (req, res) => {
  try {
    const orders = await Order.find();
    res.json(orders);
  } catch (err) {
    res.status(500).json({ message: err });
  }
});

router.get("/:id", getOrder, (req, res) => {
  res.json(res.order);
});

router.post("/", async (req, res) => {
  const order = new Order({
    orderInfo: {
      dateOrdered: Date.now(),
      status: req.body.status,
    },
    customerInfo: {
      email: req.body.customerInfo.email,
      address: req.body.customerInfo.address,
    },
  });

  try {
    const newOrder = await order.save();
    res.status(201).json(newOrder);
  } catch (err) {
    res.status(400).json({ message: err });
  }
});

router.patch("/:id", getOrder, async (req, res) => {
  if (req.body.orderInfo != null) {
    res.order.orderInfo = req.body.orderInfo;
  }
  if (req.body.customerInfo != null) {
    res.order.customerInfo = req.body.customerInfo;
  }
  try {
    const updatedOrder = await res.order.save();
    res.json(updatedOrder);
  } catch (err) {
    res.status(400).json({ message: err });
  }
});

router.delete("/:id", getOrder, async (req, res) => {
  try {
    await Order.findByIdAndDelete(req.params.id);
    res.json({ message: "Order deleted" });
  } catch (err) {
    res.status(500).json({ message: err });
  }
});

module.exports = router;
