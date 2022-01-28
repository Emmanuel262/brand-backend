"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.login_post = login_post;
exports.logout_get = logout_get;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _userModels = _interopRequireDefault(require("../models/userModels.js"));

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

var _dotenv = _interopRequireDefault(require("dotenv"));

_dotenv["default"].config(); // Error handler


var handleErrors = function handleErrors(err) {
  var errors = {
    fullNames: "",
    company: "",
    email: "",
    password: "",
    passwordConfirm: "",
    generalError: ""
  }; // password do not match

  if (err.message === "Password does not match") {
    errors.passwordConfirm = "Passwords do not match";
  } // Incorrect email


  if (err.message === "incorrect email") {
    errors.email = "Email is not registered";
  } // Incorrect password


  if (err.message === "incorrect password") {
    errors.password = "Incorrect password";
  } // duplicate error code


  if (err.code === 11000) {
    errors.email = "Email is already registered.";
    return errors;
  }

  if (err.message === "One or more input field is missing value.") {
    errors.generalError = "One or more input field is missing value.";
  } // Validation error


  if (err.message.includes("User validation failed")) {
    Object.values(err.errors).forEach(function (_ref) {
      var properties = _ref.properties;
      errors[properties.path] = properties.message;
    });
  }

  return errors;
}; // Create token function


var maxAge = 3 * 24 * 60 * 60;

var createToken = function createToken(id, userEmail) {
  return _jsonwebtoken["default"].sign({
    id: id,
    userEmail: userEmail
  }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_COOKIE_EXPIRES_IN
  });
};

function login_post(_x, _x2) {
  return _login_post.apply(this, arguments);
}

function _login_post() {
  _login_post = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(req, res) {
    var _req$body, email, password, bodyKeys, requiredObject, user, token;

    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _req$body = req.body, email = _req$body.email, password = _req$body.password;

            if (Object.keys(req.body).length > 0) {
              bodyKeys = Object.keys(req.body);
              requiredObject = ["email", "password"];
              bodyKeys.forEach(function (key) {
                if (!requiredObject.includes(key)) {
                  throw new Error("\"".concat(key, "\" is not part of required body field."));
                }
              });
            }

            if (!(Object.keys(req.body).length == 0)) {
              _context.next = 4;
              break;
            }

            throw new Error("You are required to provide an Email and password");

          case 4:
            _context.prev = 4;
            _context.next = 7;
            return _userModels["default"].login(email, password);

          case 7:
            user = _context.sent;

            if (user) {
              _context.next = 10;
              break;
            }

            throw new Error("Incorrect email or password.");

          case 10:
            token = createToken(user._id, user.email);
            res.cookie("jwt", token, {
              expires: new Date(Date.now() + process.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000),
              secure: req.secure || req.headers["x-forwarded-photo"] === "https"
            }); // Remove password from output

            user.password = undefined;
            res.status(200).json({
              status: "User login Successful",
              data: {
                user: user
              }
            });
            _context.next = 19;
            break;

          case 16:
            _context.prev = 16;
            _context.t0 = _context["catch"](4);
            res.status(400).json({
              Error: _context.t0.message
            });

          case 19:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[4, 16]]);
  }));
  return _login_post.apply(this, arguments);
}

function logout_get(_x3, _x4) {
  return _logout_get.apply(this, arguments);
} // module.exports.signup_post = async (req, res) => {
//   const { fullName, email, password, passwordConfirm } = req.body;
//   try {
//     if (password !== passwordConfirm) {
//       throw new Error("Password does not match");
//     }
//     if (!fullName || !email || !password || !passwordConfirm) {
//       throw new Error("One or more input field is missing value.");
//     }
//     const user = await User.create({
//       fullName,
//       email,
//       password,
//       passwordConfirm,
//     });
//     const token = createToken(user._id);
//     res.cookie("jwt", token, { httpOny: true, maxAge: maxAge * 1000 });
//     res.status(200).json({
//       status: "Successful created",
//       user,
//     });
//   } catch (error) {
//     const errors = handleErrors(error);
//     res.status(401).json({ ErrorMessage: error });
//   }
// };


function _logout_get() {
  _logout_get = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(req, res) {
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            res.cookie("jwt", "", {
              maxAge: 1
            });
            res.status(200).json({
              status: "User logout successful"
            });

          case 2:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));
  return _logout_get.apply(this, arguments);
}