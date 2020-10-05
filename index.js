var http = require("http"),
  path = require("path"),
  methods = require("methods"),
  express = require("express"),
  bodyParser = require("body-parser"),
  errorhandler = require("errorhandler"),
  mongoose = require("mongoose");

var app = express();
var server = http.createServer(app);
io = require("socket.io")(server);
io.origins("*:*");
io.on("connection", () => {
  console.log("Connection");
});

app.use(bodyParser.urlencoded({ extended: false }));
app.use(errorhandler());
app.use(bodyParser.json());
app.use(function (req, res, next) {
  req.io = io;
  next();
});

const routes = require("./routes");
app.use("/api/v1", routes);

if (process.env.ENVIRONMENT == "production") {
  mongoose.connect(process.env.MONGODB_URI);
} else {
  mongoose.connect("mongodb://localhost/news", {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  });
  mongoose.set("debug", true);
}

port = process.env.PORT ? process.env.PORT : 3000;

app.listen(port, () => {
  console.log("Listening on " + port);
});
