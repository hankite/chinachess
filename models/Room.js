const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: false,
  },
  creator: {
    type: String,
    required: true,
  },  
  createdAt: {
    type: Date,
    default: Date.now,
  },
  player: {
    type: Number,
    require: true,
    default: 0
  }
});

const Room = mongoose.model("Room", UserSchema);
module.exports = Room;
