const app = require('express')();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);
const socketView = (req, res) => {
    io.on('connection', (socket) => {
        console.log('a user connected');
      });
};
  
module.exports = {
    socketView,
};
/*
server.listen(4000, () => {
    console.log(`Socket.IO server running at http://localhost:4000/`);
});
*/