const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const todoSchema = new mongoose.Schema({
  id: Number,
  value: String,
  time : Number,
});

const userSchema = new Schema({
  username: String,
  googleId: String,
  email: String,
  todos: [todoSchema],
});

//user collection has userSchema.
const User = mongoose.model("user", userSchema);

module.exports = User;
