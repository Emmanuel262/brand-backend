"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _mongoose = _interopRequireDefault(require("mongoose"));

var _validator = _interopRequireDefault(require("validator"));

var queriesSchema = new _mongoose["default"].Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: [true, "Please enter an email"],
    lowercase: true // validate: [validator.isEmail(), "Please enter a valid email."],

  },
  message: {
    type: String,
    trim: true
  }
}, {
  timestamps: {
    createdAt: "created_at"
  }
});

var Querie = _mongoose["default"].model("Querie", queriesSchema);

var _default = Querie;
exports["default"] = _default;