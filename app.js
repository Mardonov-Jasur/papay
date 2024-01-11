console.log("web serverni boshlash");
const express = require("express");
const app = express();
const router = require("./router");
const router_bssr = require("./router_bssr");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const http = require("http");



let session = require("express-session");
const MongoDBStore = require("connect-mongodb-session")(session);
const store = new MongoDBStore({
  uri: process.env.MONGO_URL,
  collection: "sessions"
});

// 1 Kirish code
app.use(express.static("public"));
app.use("/uploads", express.static(__dirname + "/uploads"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({ credentials: true, origin: true }));
app.use(cookieParser());

// 2: Session code
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    cookie: {
      maxAge: 1000 * 60 * 55 //for 55 minutes
    },
    store: store,
    resave: true,
    saveUninitialized: true
  })
);
app.use(function (req, res, next) {
  res.locals.member = req.session.member;
  next();
});

// 3 Views code
app.set("views", "views");
app.set("view engine", "ejs");

// 4 Routing code
app.use("/resto", router_bssr);
app.use("/", router);


/**SOCKET.IO BACKEND SERVER */
const server = http.createServer(app);
const io= require("socket.io")(server, {
  serverClient: false,
  origins: "*:*",
  transport: ["websocket", "xhr-polling"]
})

let online_users = 0;
io.on("connection", function (socket) {
  online_users++;
  console.log("New user, total:", online_users);
  socket.emit("greetMsg", { text: "welcome" });
  io.emit("infoMsg", { total: online_users });

  socket.on("disconnect", function () {
    online_users--;
    socket.broadcast.emit("infoMsg", { total: online_users });
    console.log("client disconnected, total:", online_users);
  });

  socket.on('createMsg', function(data) {
    console.log(data);
    io.emit('newMsg', data)
  })

  // socket.emit(); /**ulangan odamga boradigan xabar  */
  // socket.broadcast.emit(); /**ulangan odamdan boshqa userlarga boradigan xabar */
  // io.emit(); /**hamma userlarga boradigan xabar */
});

module.exports = server;
