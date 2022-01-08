const mongoose = require("mongoose");

async function connect() {
  try {
    await mongoose.connect(
      `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@mern-app.0ciqr.mongodb.net/mern-app?retryWrites=true&w=majority`
    );
    console.log("DB connected!");
  } catch (error) {
    console.log("Internal server error!", error.message);
  }
}
module.exports = { connect };
