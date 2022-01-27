"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.create_querie = create_querie;
exports.get_queries = get_queries;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _queriesModels = _interopRequireDefault(require("../models/queriesModels.js"));

var _validator = _interopRequireDefault(require("validator"));

function create_querie(_x, _x2, _x3) {
  return _create_querie.apply(this, arguments);
}

function _create_querie() {
  _create_querie = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(req, res, next) {
    var _req$body, name, email, message, errors;

    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _req$body = req.body, name = _req$body.name, email = _req$body.email, message = _req$body.message;
            _context.prev = 1;
            errors = {};

            if (name == undefined) {
              errors.name = "name is not provided";
            }

            if (email == undefined) {
              errors.email = "email is not provided";
            }

            if (message == undefined) {
              errors.message = "message is not provided";
            }

            if (!(Object.values(errors).length > 0)) {
              _context.next = 8;
              break;
            }

            throw errors;

          case 8:
            if (!(name.length === 0 || !_validator["default"].isEmail(email) || message.length === 0)) {
              _context.next = 12;
              break;
            }

            throw new Error("You must fill Name, Email and message correctly.");

          case 12:
            _context.next = 14;
            return _queriesModels["default"].create({
              name: name,
              email: email,
              message: message
            }).then(function (result) {
              res.status(200).json({
                Message: "Query was sent Successful!!!",
                Querie: result
              });
            })["catch"](function (err) {
              res.status(400).json({
                savingProcess: "Unexpected Error. Your query was not sent.",
                ErrorMessage: err.message
              });
            });

          case 14:
            _context.next = 19;
            break;

          case 16:
            _context.prev = 16;
            _context.t0 = _context["catch"](1);
            res.status(400).json({
              ErrorMessage: _context.t0.message,
              Errors: _context.t0
            });

          case 19:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[1, 16]]);
  }));
  return _create_querie.apply(this, arguments);
}

function get_queries(_x4, _x5, _x6) {
  return _get_queries.apply(this, arguments);
}

function _get_queries() {
  _get_queries = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(req, res, next) {
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.prev = 0;
            _context2.next = 3;
            return _queriesModels["default"].find({}).then(function (result) {
              res.status(200).json({
                Length_of_queries: result.length,
                Queries: result
              });
            })["catch"](function (err) {
              res.status(400).json({
                Errors: err
              });
            });

          case 3:
            _context2.next = 8;
            break;

          case 5:
            _context2.prev = 5;
            _context2.t0 = _context2["catch"](0);
            res.status(400).json({
              Errors: _context2.t0
            });

          case 8:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, null, [[0, 5]]);
  }));
  return _get_queries.apply(this, arguments);
}