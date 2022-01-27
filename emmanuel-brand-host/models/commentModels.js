"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _mongoose = _interopRequireDefault(require("mongoose"));

var _validator = _interopRequireDefault(require("validator"));

var commentsSchema = new _mongoose["default"].Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: [true, "Please enter an email"],
    lowercase: true // validate: [validator.isEmail(), "Please enter a valid email."],

  },
  comment: {
    type: String,
    trim: true
  }
}, {
  timestamps: {
    createdAt: "created_at"
  }
});

var Comment = _mongoose["default"].model("Comment", commentsSchema);

var _default = Comment;
exports["default"] = _default;