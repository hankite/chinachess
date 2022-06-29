const express = require("express");
var path = require('path');
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const session = require('express-session');
dotenv.config();
const passport = require("passport");
const { loginCheck } = require("./auth/passport");
loginCheck(passport);
//socket.io
const http = require('http').Server(app);
const io = require('socket.io')(http);
const SocketServices = require('./services/chat.service')
global.__basedir = __dirname;
global._io = io;

// Mongo DB conncetion
const database = process.env.MONGOLAB_URI;
mongoose
  .connect(database, { useUnifiedTopology: true, useNewUrlParser: true })
  .then(() => console.log("e don connect"))
  .catch((err) => console.log(err));

app.set("view engine", "ejs");

//BodyParsing
app.use(express.urlencoded({ extended: false }));
app.use(session({
    secret:'oneboy',
    saveUninitialized: true,
    resave: true
  }));
app.use(express.static(path.join(__dirname, 'assets')));

app.use(passport.initialize());
app.use(passport.session());
//Routes
app.use("/", require("./routes/login"));
app.use("/room", require("./routes/room"));
app.use("/play", require("./routes/play"));

const PORT = process.env.PORT || 4111;

//socket.io
//app.use(require('./src/routes/chat.route'))
app.use("/socket", require("./routes/socket"));
global._io.on('connection', SocketServices.connection)
http.listen(PORT, () => {
  console.log(`Socket.IO server running at http://localhost:${PORT}/`);
});

//app.listen(PORT, console.log("Server has started at port " + PORT));
