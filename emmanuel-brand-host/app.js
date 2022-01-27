"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _typeof = require("@babel/runtime/helpers/typeof");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _path = _interopRequireWildcard(require("path"));

var _express = _interopRequireDefault(require("express"));

var _cookieParser = _interopRequireDefault(require("cookie-parser"));

var _mongoose = _interopRequireDefault(require("mongoose"));

var _dotenv = _interopRequireDefault(require("dotenv"));

var _bodyParser = _interopRequireDefault(require("body-parser"));

var _xssClean = _interopRequireDefault(require("xss-clean"));

var _cors = _interopRequireDefault(require("cors"));

var _hpp = _interopRequireDefault(require("hpp"));

var _helmet = _interopRequireDefault(require("helmet"));

var _expressRateLimit = _interopRequireDefault(require("express-rate-limit"));

var _expressMongoSanitize = _interopRequireDefault(require("express-mongo-sanitize"));

var _dashboardRoutes = _interopRequireDefault(require("./routes/dashboardRoutes.js"));

var _homeRoutes = _interopRequireDefault(require("./routes/homeRoutes.js"));

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

_dotenv["default"].config();

var app = (0, _express["default"])(); // const __filename = fileURLToPath(import.meta.url);
// const __dirname = dirname(__filename);

var _dirname = _path["default"].resolve();

app.enable("trust proxy");
app.use((0, _cors["default"])());
app.options("*", (0, _cors["default"])());
app.use((0, _helmet["default"])()); // Connect to database

var DB_URI = process.env.MONGODB_URI;

_mongoose["default"].connect(DB_URI).then(function () {
  console.log("DB Connected");
})["catch"](function (err) {
  return console.log(err);
}); // Set up public folder access


app.use(_express["default"]["static"](_path["default"].join(_dirname, "public")));
app.use("/uploads", _express["default"]["static"](_path["default"].join(_dirname, "uploads"))); // // Allow BodyParser
// // Allow CookiParser

app.use((0, _cookieParser["default"])()); // app.use(bodyParser.json({ limit: "50mb" }));
// app.use(express.urlencoded({ extended: false }));
// app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));
// app.use(express.json({ limit: "50mb" }));
// app.use(express.urlencoded({ limit: "50mb" }));

app.use(_bodyParser["default"].json({
  limit: "50mb"
})); // app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));

app.use(_bodyParser["default"].urlencoded({
  limit: "50mb",
  extended: true,
  parameterLimit: 1000000
}));
app.use(_express["default"].json());
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-type, Accept, Authorization");

  if (req.method === "OPTIONS") {
    res.header("Access-Control-Allow-Methods", "PUT, POST, PATCH, GET, DELETE");
    return res.status(200).json({});
  }

  next();
}); // Limit requests from same API

var limiter = (0, _expressRateLimit["default"])({
  max: 100,
  windowMs: 60 * 60 * 1000,
  message: "Too many requetss from this IP, please try again in an hour!"
});
app.use("/api/v1", limiter);
app.use((0, _expressMongoSanitize["default"])());
app.use((0, _xssClean["default"])()); // Set up routes

app.use("/api/v1/", _homeRoutes["default"]);
app.use("/api/v1/dashboard", _dashboardRoutes["default"]);
app.use(function (req, res, next) {
  var error = new Error("Can't find ".concat(req.originalUrl, " on this server!"));
  error.status = 404;
  next(error);
});
app.use(function (error, req, res, next) {
  res.status(error.status || 500).json({
    error: {
      message: error.message,
      error: error
    }
  });
});
var PORT = process.env.PORT || 3000;
app.listen(PORT, function () {
  console.log("Server running on ".concat(PORT));
});
var _default = app;
exports["default"] = _default;