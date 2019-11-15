const mongoose = require("mongoose");

var homeSchema = new mongoose.Schema({
    title: String,
    image: String,
    description: String,
    comment:[
        {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Comment"
        }
    ]
});

module.exports = mongoose.model("Socio",homeSchema);