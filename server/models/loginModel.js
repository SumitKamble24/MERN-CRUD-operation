const mongoose = require("mongoose");

const userLogin = mongoose.Schema(
  {
    username: { type: String },
    email: { type: String },
    password: { require: true, type: String },
  },
  { timestamps: true }
);

const LoginModel = mongoose.model("userLogin", userLogin);

module.exports = { LoginModel };
