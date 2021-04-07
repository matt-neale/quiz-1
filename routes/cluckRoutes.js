const express = require("express");
const knex = require("../db/client");

const router = express.Router();

router.get("/", (req, res) => {
  knex("clucks")
    .select("*")
    .from("clucks")
    .orderBy("createdAt", "desc")
    .then((clucks) => {
      res.render("clucks/index", { clucks: clucks });
    });
});

router.get("/new", (req, res) => {
  res.render("clucks/new");
});

router.post("/", (req, res) => {
  const username = req.cookies.username;
  knex("clucks")
    .insert({
      username: username,
      content: req.body.content,
      imageUrl: req.body.imageUrl,
    })
    .then(() => {
      knex("clucks")
        .select("*")
        .from("clucks")
        .orderBy("createdAt", "desc")
        .then((clucks) => {
          res.render("clucks/index", { clucks: clucks });
        });
    });
});

module.exports = router;
