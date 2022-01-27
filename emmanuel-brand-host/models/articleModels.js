"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _mongoose = _interopRequireDefault(require("mongoose"));

var articlesSchema = new _mongoose["default"].Schema({
  articleTitle: {
    type: String,
    required: true,
    // unique: true,
    index: {
      unique: true,
      dropDups: true
    }
  },
  summary: {
    type: String,
    trim: true
  },
  description: {
    type: String,
    trim: true
  },
  article_photos: [String],
  comments: [{
    type: _mongoose["default"].Schema.Types.ObjectId,
    ref: "Comment"
  }]
}, {
  timestamps: {
    createdAt: "created_at"
  }
});

var Article = _mongoose["default"].model("Article", articlesSchema);

Article.createIndexes();
var _default = Article;
exports["default"] = _default;