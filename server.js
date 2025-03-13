const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*", // Allow all origins (Change this for production)
  },
});

app.use(cors());

io.on("connection", (socket) => {
  console.log("A user connected:", socket.id);

  socket.on("offer", (data) => {
    console.log("Offer received");
    socket.broadcast.emit("offer", data);
  });

  socket.on("answer", (data) => {
    console.log("Answer received");
    socket.broadcast.emit("answer", data);
  });

  socket.on("candidate", (data) => {
    console.log("Candidate received");
    socket.broadcast.emit("candidate", data);
  });

  socket.on("disconnect", () => {
    console.log("User disconnected:", socket.id);
  });
});

server.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});

