const express = require("express");
const router = express.Router();
const { Bead } = require("../models/bead");
const morgan = require("morgan");

// Add morgan middleware with tiny format
router.use(morgan("tiny"));

const getBead = async (req, res, next) => {
    let bead;
    try {
        bead = await Bead.findById(req.params.id);
        if (bead == null) {
            return res.status(404).json({ message: "Bead not found" });
        }
    } catch (err) {
        res.status(500).json({ message: err });
    }

    res.bead = bead;
    next();
};

router.get("/", async (req, res) => {
    console.log('res', res)
    try {
        const beads = await Bead.find();
        res.json(beads);
    } catch (err) {
        res.status(500).json({ message: err });
    }
});

router.get("/:id", getBead, (req, res) => {
    res.json(res.bead);
  });

router.post("/", async (req, res) => {
    const bead = new Bead({
        stock: req.body.stock,
        image: req.body.image,
        diameter: req.body.diameter,
        colour: req.body.colour,
        shape: req.body.shape,
    });
    
try {
    const newBead = await bead.save();
    res.status(201).json(newBead);
  } catch (err) {
    res.status(400).json({ message: err });
  }
});

router.patch("/:id", getBead, async (req, res) => {
    if (req.body.stock != null) {
      res.bead.stock = req.body.stock;
    }
    if (req.body.image != null) {
        res.bead.image = req.body.image;
      }
    if (req.body.diameter != null) {
        res.bead.diameter = req.body.diameter;
    }
    if (req.body.colour != null) {
        res.bead.colour = req.body.colour;
    }
    if (req.body.shape != null) {
        res.bead.shape = req.body.shape;
    }
    try {
        const updatedBead = await res.bead.save();
        res.json(updatedBead);
    } catch (err) {
        res.status(400).json({ message: err });
    }
});

router.delete("/:id", getBead, async (req, res) => {
    try {
      await Bead.findByIdAndDelete(req.params.id);
      res.json({ message: "Bead deleted" });
    } catch (err) {
      res.status(500).json({ message: err });
    }
  });
  
  module.exports = router;
  