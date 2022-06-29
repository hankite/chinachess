const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    roomId: {
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

const Joiner = mongoose.model("Joiner", UserSchema);

module.exports = Joiner;
