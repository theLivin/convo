const app = require("express")();
const cors = require("cors");
app.use(cors());
const server = require("http").createServer(app);

const io = require("socket.io")(server, {
  cors: {
    origin: ["http://192.168.8.170:8080", "http://localhost:8080"],
    methods: ["GET", "POST"],
    credentials: true,
  },
});

const port = process.env.PORT || 3000;

io.on("connection", (socket) => {
  console.log(socket.id + " connected");

  socket.on("disconnect", () => {
    console.log("a user disconnected");
  });

  socket.on("message", (message) => {
    console.log(message);
    // io.emit("message", { ...message, userid: socket.id });
    socket.broadcast.emit("message", { ...message, userid: socket.id });
  });
});

server.listen(port, () => console.log("server running on port " + port));
