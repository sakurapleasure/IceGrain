var express = require("express");
var jade = require("jade");
var models = require("./models");
var bodyParser = require("body-parser");
var app = express();

app.set("view engine", "jade");
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname+"/resources"))

var webRouter = require("./routes/web/");
var apiRouter = require("./routes/api/");
app.use("/", webRouter);
app.use("/api", apiRouter);
app.use((req, res, next) => {
    res.render("error/notfound", {"URL": req.originalUrl});
    console.log(req.originalUrl);
})

var server = app.listen(3000, () => {
    var host = server.address().address;
    var port = server.address().port;
    console.log("Listening at http://%s:%s", host, port);
});