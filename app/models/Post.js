const mongoose = require("mongoose");

const { Schema } = mongoose;

const Post = new Schema(
  {
    description: String,
    file: String,
    user: {
      type: Schema.Types.ObjectId,
      ref: "users",
    },
    likes: { type: Array, default: [] },
    comments: { type: Array, default: [] },
  },
  { timestamps: true }
);

module.exports = mongoose.model("posts", Post);
