const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
  },

  email: {
    type: String,
    required: true,
    unique: true,
  },

  password: {
    type: String,
  },
});

const RegisterModel = mongoose.model("userdetail", userSchema);
module.exports = RegisterModel;
