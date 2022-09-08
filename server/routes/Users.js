//horseman server
const express = require("express");
const router = express.Router();
const { Users } = require("../models");
const bcrypt = require("bcrypt");

router.post("/", async (req, res) => {
  const { username, password } = req.body;
  const user = await Users.findOne({ where: { username: username } });

  if (user == null) {
    bcrypt.hash(password, 10).then((hash) => {
      Users.create({
        username: username,
        password: hash,
      });
      res.json("User created....");
    });
  }else{
    res.json("already exist")
  }
});

router.post("/login", async (req, res) => {
  const { username, password } = req.body;

  const user = await Users.findOne({ where: { username: username } });
  // console.log(user);

  if (user == null) {
    res.json("0");
  } else {
    bcrypt.compare(password, user.password).then((match) => {
      if (user.username == username && !match) {
        res.json("0");
      } else {
        res.json(user.username);
      }
    });
  }

  // else if (user.username == username && user.password == password) {
  //   //console.log("login 200");
  //   res.json("1");
  // } else if (user.username == username && user.password != password) {
  //   res.json("0");
  // }
});

module.exports = router;
