var express = require("express");
var accettare = require("accettare");
var router = express.Router();
accettare.languages(['ja','en-US']);
var lang = require("../../locales")

router.use((req, res, next) => {
    console.log(req.headers)
    req.lang = accettare.get(req.headers["accept-language"] || "ja");
    console.log(req.lang)
    res.locals.strings = lang[req.lang];
    next();
})
router.get("/", (req, res) => {
    res.render("index");
});
router.get("/register", (req, res) => {
    res.render("register");
});

module.exports = router;