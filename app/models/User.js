const mongoose = require("mongoose");

const { Schema } = mongoose;

const UserSchema = new Schema(
  {
    username: {
      type: String,
      unique: true,
      required: true,
    },
    avt: String,
    dts: String,
    password: {
      type: String,
      required: true,
    },
    fullName: String,
    friends: { type: Array, default: [] },
    followers: { type: Array, default: [] },
  },
  { timestamps: true }
);

module.exports = mongoose.model("users", UserSchema);
