"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.checkAuthentication = checkAuthentication;

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

function checkAuthentication(req, res, next) {
  try {
    var token;

    if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
      token = req.headers.authorization.split(" ")[1];
    } else if (req.cookies.jwt) {
      token = req.cookies.jwt;
    }

    if (!token) {
      throw new Error("You are not logged in! Please log in to get access.");
    }

    var decoded = _jsonwebtoken["default"].verify(token, process.env.JWT_SECRET);

    req.userData = decoded;
    next();
  } catch (error) {
    return res.status(401).json({
      message: "You are not allowed to access this endpoint. Please login to your credential or contact webpage owner",
      Error: error
    });
  }
}