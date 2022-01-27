import path from "path";
import { dirname } from "path";
import express from "express";
import cookieParser from "cookie-parser";
import mongoose from "mongoose";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import xss from "xss-clean";
import cors from "cors";
import hpp from "hpp";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import mongoSanitize from "express-mongo-sanitize";
import engines from "consolidate";

import dashboardRoutes from "./routes/dashboardRoutes.js";
import homeRoutes from "./routes/homeRoutes.js";

dotenv.config();
const app = express();
const __dirname = path.resolve();
app.enable("trust proxy");
app.use(cors());
app.options("*", cors());
app.use(helmet());

// Connect to database
const DB_URI = process.env.MONGODB_URI;
mongoose
  .connect(DB_URI)
  .then(() => {
    console.log("DB Connected");
  })
  .catch((err) => console.log(err));

// Set up public folder access
app.use(express.static(path.join(__dirname, "public")));
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
app.use(cookieParser());
app.use(bodyParser.json({ limit: "50mb" }));
app.use(
  bodyParser.urlencoded({
    limit: "50mb",
    extended: true,
    parameterLimit: 1000000,
  })
);

// app.engine('html', engines.mustache);
app.set("view engine", "html");
app.use(express.json());

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-type, Accept, Authorization"
  );

  if (req.method === "OPTIONS") {
    res.header("Access-Control-Allow-Methods", "PUT, POST, PATCH, GET, DELETE");
    return res.status(200).json({});
  }

  next();
});

// Limit requests from same API
const limiter = rateLimit({
  max: 100,
  windowMs: 60 * 60 * 1000,
  message: "Too many requetss from this IP, please try again in an hour!",
});

app.use("/api/v1", limiter);
app.use(mongoSanitize());
app.use(xss());

// Set up routes
app.use("/api/v1/", homeRoutes);
app.use("/api/v1/dashboard", dashboardRoutes);
app.get("/", (req, res, next) => {
  res.send("index.html");
});

app.use((req, res, next) => {
  const error = new Error(`Can't find ${req.originalUrl} on this server!`);
  error.status = 404;
  next(error);
});

app.use((error, req, res, next) => {
  res.status(error.status || 500).json({
    error: {
      message: error.message,
      error: error,
    },
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
});

export default app;
