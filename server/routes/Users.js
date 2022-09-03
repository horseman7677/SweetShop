const express = require("express");
const router = express.Router();
const { Users } = require("../models");

router.post("/login", async (req, res) => {
  const { username, password } = req.body;

  const user = await Users.findOne({ where: { username: username } });
  // console.log(user);

  if (user == null) {
    res.json("0");
  } else if (user.username == username && user.password == password) {
    //console.log("login 200");
    res.json("1");
  } else if (user.username == username && user.password != password) {
    res.json("0");
  }
});

module.exports = router;
