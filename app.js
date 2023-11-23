let createError = require("http-errors");
let express = require("express");
let path = require("path");
let cookieParser = require("cookie-parser");
let logger = require("morgan");
require("dotenv").config();

let indexRouter = require("./routes/index");
let auth_googleRouter = require("./routes/auth_google");
let usersRouter = require("./routes/users");
let productsRouter = require("./routes/products");
let dashboardRouter = require("./routes/dashboard");

let app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/auth/google", auth_googleRouter);
app.use("/users", usersRouter);
app.use("/product", productsRouter);
app.use("/dashboard", dashboardRouter);

module.exports = app;
