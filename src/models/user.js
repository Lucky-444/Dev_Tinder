const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
  },
  lastName: {
    type: String,
  },
  email: {
    type: String,
    unique: true,
  },
  password: {
    type: String,
  },
  age: {
    type: Number,
    min: 18,
    max: 100,
  },
  gender: {
    type: String,
  },
});

const userModel  = mongoose.model("User", userSchema);
module.exports = userModel;
