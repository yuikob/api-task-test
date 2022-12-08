var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");

var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");
var apiRouter = require("./routes/api"); // 追加

var app = express();

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

// ejsテンプレートエンジンを設定
app.set("view engine", "ejs");

app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/api", apiRouter); // 追加

var listener = app.listen(8080, function () {
  console.log("Listening on port " + listener.address().port);
});
