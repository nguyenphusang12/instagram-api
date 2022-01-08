require("dotenv").config();

const express = require("express");

const path = require("path");

const app = express();

const router = require("./routers");

const db = require("./app/config/db");

const PORT = process.env.PORT || 8888;

const cors = require("cors");

app.use(express.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, "./public")));

app.use(express.json());

app.use(cors());

db.connect();

router(app);

app.listen(PORT, () => {
  console.log(`server backend start on port ${PORT}`);
});
