import express from "express";
import cors from "cors";

import connectDB from "./config/connectDB.js";

import jwtAuth from "./middleware/jwt.middleware.js";
import loggerMiddleware from "./middleware/logger.middleware.js";
import errorHandler from "./middleware/error.handler.middleware.js";

import postRouter from "./routes/post.routes.js";
import commentRouter from "./routes/comment.routes.js";
import likeRouter from "./routes/like.routes.js";
import userRouter from "./routes/user.routes.js";

const server = express();
const port = 8000;

// DB connection
await connectDB();

server.use(express.json());
server.use(cors());
server.use(loggerMiddleware);

server.use("/api/users", userRouter);
server.use("/api/posts", jwtAuth, postRouter);
server.use("/api/comments", jwtAuth, commentRouter);
server.use("/api/likes", jwtAuth, likeRouter);

server.get("/", (req, res) => {
  res.send("Welcome to Ecommerce APIs");
});

server.use((req, res) => {
  return res.status(404).send("API not found");
});

server.use(errorHandler);

server.listen(port, function (err) {
  if (err) console.log(`Error in running the server: ${err}`);
  else console.log("Server is up and listening on port " + port);
});
