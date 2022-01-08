const mongoose = require("mongoose");

const { Schema } = mongoose;

const ConversationSchema = new Schema(
  {
    members: { type: Array },
    new: { type: String },
  },
  { timestamps: true }
);

module.exports = mongoose.model("conversations", ConversationSchema);
