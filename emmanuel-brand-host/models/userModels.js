"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _mongoose = _interopRequireDefault(require("mongoose"));

var _validator = _interopRequireDefault(require("validator"));

var _bcrypt = _interopRequireDefault(require("bcrypt"));

var userSchema = new _mongoose["default"].Schema({
  fullName: {
    type: String,
    required: [true, "Please enter full names"]
  },
  email: {
    type: String,
    required: [true, "Please enter an email"],
    unique: true,
    lowercase: true // validate: [validator.isEmail(), "Please enter a valid email."],

  },
  password: {
    type: String,
    required: [true, "Please enter a password"],
    minlength: [6, "Minimum password length is 6 character"]
  },
  passwordConfirm: {
    type: String,
    required: [true, "Please enter a password"],
    minlength: [6, "Minimum password length is 6 character"]
  }
}); // fire a function before doc saved to d

userSchema.pre("save", /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(next) {
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return _bcrypt["default"].hash(this.password, 12);

          case 2:
            this.password = _context.sent;
            this.passwordConfirm = undefined;
            next();

          case 5:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, this);
  }));

  return function (_x) {
    return _ref.apply(this, arguments);
  };
}()); // static method to login user

userSchema.statics.login = /*#__PURE__*/function () {
  var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(email, password) {
    var user, auth;
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.next = 2;
            return this.findOne({
              email: email
            });

          case 2:
            user = _context2.sent;

            if (!user) {
              _context2.next = 10;
              break;
            }

            _context2.next = 6;
            return _bcrypt["default"].compare(password, user.password);

          case 6:
            auth = _context2.sent;

            if (!auth) {
              _context2.next = 9;
              break;
            }

            return _context2.abrupt("return", user);

          case 9:
            throw Error("incorrect Email or password");

          case 10:
            throw Error("incorrect email or password");

          case 11:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, this);
  }));

  return function (_x2, _x3) {
    return _ref2.apply(this, arguments);
  };
}();

var User = _mongoose["default"].model("User", userSchema);

var _default = User;
exports["default"] = _default;