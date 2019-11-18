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
    ],
    author:{
        id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },
        username: String
    }
});

module.exports = mongoose.model("Socio",homeSchema);