var mongoose = require("mongoose");
module.exports = (models) => {
    var schema = new mongoose.Schema({
        id:     String,
        screen_name:   String,
        bio:    String
    }, {
        timestamps: true
    })

    return mongoose.model("user", schema);
};