const express = require("express");
const helmet = require("helmet");
const cors = require("cors");
const session = require("express-session");
const authRouter = require("../auth/auth-router.js");
const usersRouter = require("../users/users-router.js");

const server = express();

server.use(helmet());
server.use(express.json());
server.use(cors());

server.use("/api/auth", authRouter);
server.use("/api/users", usersRouter);

const sessionConfig = {
  name: "trackme", //for session id (can be anything)
  secret: "monsoon demons, messing around", //encryption key for sessions...should technically never be hard-coded
  cookie: {
    maxAge: 1000 * 60 * 60, //how long should the cookie last?
    secure: false, //http = false, https = true,
    httpOnly: true // browser can't access cookie by viewing as a document file
  },
  resave: false, //so expired sessions can't be resaved
  saveUninitialized: false //lets people know we put cookies on their machine (must be false)
};

//use the middleware we made by calling session and passingin our own session config
server.use(session(sessionConfig));

server.get("/", (req, res) => {
  res.json({ api: "up" });
});

module.exports = server;
