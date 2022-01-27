"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

var _userControllers = require("../controllers/userControllers.js");

var router = _express["default"].Router(); // router.post("/register", userController.signup_post);


router.post("/login", _userControllers.login_post);
router.get("/logout", _userControllers.logout_get);
var _default = router;
exports["default"] = _default;