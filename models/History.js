const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    roomId: {
        type: String,
        required: true
    },
    keys:{
        type: String,
        require: false
    },
    pace: {
        type: String,
        required: true
    },
    creator: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const History = mongoose.model("History", UserSchema);
module.exports = History;
