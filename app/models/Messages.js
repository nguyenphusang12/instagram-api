const mongoose = require("mongoose");

const { Schema } = mongoose;

const MessageChema = new Schema(
  {
    conversationId: String,
    senderId: String,
    text: String,
  },
  { timestamps: true }
);

module.exports = mongoose.model("messages", MessageChema);
