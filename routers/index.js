const authRouter = require("./authRouter");
const postRouter = require("./postRouter");
const uploadRouter = require("./uploadRouter");
const messengerRouter = require("./messengerRouter");
const userRouter = require("./userRouter");

const router = (app) => {
  app.use("/api/auth", authRouter);
  app.use("/api/posts", postRouter);
  app.use("/api/uploadfile", uploadRouter);
  app.use("/api/messenger", messengerRouter);
  app.use("/api/user", userRouter);
};

module.exports = router;
