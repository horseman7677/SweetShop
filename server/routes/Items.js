const express = require("express");
const router = express.Router();

const { Items } = require("../models");

router.post("/", async (req, res) => {
  //res.json("items 200");
  const { item, price } = req.body;
  Items.create({
    item: item,
    price: price,
  });
  res.json("1");
});

router.get("/", async (req, res) => {
  const data = await Items.findAll();
  res.json(data);
});

module.exports = router;
