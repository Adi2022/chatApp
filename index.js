const express = require("express");
const app = express();
const http = require("http");
const cors = require("cors");
const PORT=process.env.PORT || 5173
const { Server } = require("socket.io");
app.use(cors());

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  console.log("User Connected", socket.id);

socket.on("join_room",(data)=>{
    socket.join(data)
    console.log(`User with socket id ${socket.id} joined the room with room id ${data}`)
})

socket.on("send_message",(data)=>{
    console.log(data)
socket.to(data.room).emit("receive_message",data)
})


  socket.on("disconnect", () => {
    console.log("User Disconnected", socket.id);
  });
});

server.listen(`Port is ${PORT}`, () => {
  console.log("Server listening");
});
