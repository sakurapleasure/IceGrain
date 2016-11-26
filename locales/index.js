var fs = require("fs");
var files = fs.readdirSync(__dirname);
var lang={};
files.forEach(file => {
    var name = file.replace(".js", "");
    if(name === "index") return;
    lang[name] = require(__dirname + "/" + name);
});
module.exports = lang;