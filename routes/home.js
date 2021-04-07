const express = require("express");
const knex = require("../db/client");
const router = express.Router();

const COOKIE_MAX_AGE = 24 * 7 * 60 * 60 * 1000;

router.get("/", (req, res) => {
  knex("clucks")
    .select("*")
    .from("clucks")
    .orderBy("createdAt", "desc")
    .then((clucks) => {
      res.render("clucks/index", { clucks: clucks });
    });
});

router.get("/sign_in", (req, res) => {
  res.render("sign_in");
});

router.post("/sign_in", (req, res) => {
  const params = req.body;
  res.cookie("username", params.username, { maxAge: COOKIE_MAX_AGE });
  res.redirect("/");
});

router.post("/sign_out", (req, res) => {
  res.clearCookie("username");
  res.redirect("/");
});

module.exports = router;
