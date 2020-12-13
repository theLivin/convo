const app = require("express")();
const cors = require("cors");
app.use(cors());
const server = require("http").createServer(app);
const APP_NAME = "convo";

const io = require("socket.io")(server, {
  cors: {
    origin: [
      "http://192.168.8.170:8080",
      "http://localhost:8080",
      "https://con-vo.netlify.app",
    ],
    methods: ["GET", "POST"],
    credentials: true,
  },
});

const port = process.env.PORT || 3000;

//socketing
let online = [];

io.on("connection", (socket) => {
  // console.log(socket.id + " connected");
  io.to(socket.id).emit("established", { id: socket.id });

  socket.on("joined", (payload) => {
    const sprites = ["bottts", "avataaars", "gridy"];
    const seed = Math.floor(Math.random() * 5000);
    const rand = Math.floor(Math.random() * sprites.length);

    const newUser = {
      id: socket.id,
      username: payload.username,
      about: payload.about,
      meta: null,
      image: `https://avatars.dicebear.com/api/${sprites[rand]}/${seed}.svg`,
    };
    online.push(newUser);

    io.emit("usersOnline", online);

    socket.to("online").emit("message", {
      message: `${newUser.username} joined ${APP_NAME}`,
      username: APP_NAME,
      sender: socket.id,
      broadcast: true,
    });

    socket.join("online");
  });

  socket.on("typing", (payload) => {
    const data = { ...payload, sender: socket.id };
    socket.to(data.recipient).emit("typing", data);
  });

  socket.on("disconnect", () => {
    // console.log("a user disconnected");
    online = online.filter((user) => user.id !== socket.id);
    io.emit("usersOnline", online);
  });

  socket.on("message", (payload) => {
    io.to(payload.recipient).emit("message", {
      ...payload,
      sender: socket.id,
    });
  });
});
// endsocketing

server.listen(port, () => console.log("server running on port " + port));
