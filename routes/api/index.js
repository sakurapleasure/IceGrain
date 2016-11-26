var express = require("express");
var router = express.Router();
var models = require("../../models")

router.use((req, res, next) => {
    next();
})
router.get("/", (req, res) => {
    res.send("Here's used for our API.");
});
router.get("/users/list", (req, res) => {
    models.user.find({}).limit(20).then((users) => {
        res.send({users});
    })
});
router.post("/users/create", (req, res) => {
    var user = new models.user();
    user.id = req.body.id;
    user.screen_name = req.body.screen_name;
    user.bio = "a new account";

    models.user.count({"id": user.id}).then((user_) => {
        console.log(user_);
        if(user_) {
            return Promise.reject("duplicated-id");
        }
        if(!user.id) {
            return Promise.reject("id-required");
        }
        if(!user.screen_name) {
            user.screen_name = user.id;
        }

        return user.save()
    }).then((user) => {
        console.log("registered: "+user);
        res.statusCode = 201;
        res.send({"status": "ok"});
    }).catch((err) => {
        if(typeof err === "string"){
            res.status(400).send({"status":"error","error":err})
        }
        console.log("failed registering:\n"+err.message);
        res.status(500).send({"status": "server-error"});
    });
})

module.exports = router;