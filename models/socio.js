const mongoose = require("mongoose");

var homeSchema = new mongoose.Schema({
    title: String,
    image: String,
    description: String
});

module.exports = mongoose.model("Post",homeSchema);