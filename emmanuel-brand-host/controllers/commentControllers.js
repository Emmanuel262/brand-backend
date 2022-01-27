"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.create_comment = create_comment;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _commentModels = _interopRequireDefault(require("../models/commentModels.js"));

var _articleModels = _interopRequireDefault(require("../models/articleModels.js"));

var _validator = _interopRequireDefault(require("validator"));

function create_comment(_x, _x2, _x3) {
  return _create_comment.apply(this, arguments);
} //   .then(async (result) => {
//     const id = String(result.surveyType);
//     await Survey.updateOne({ _id: id }, { $push: { attendies: result._id } })
//       .then((results) => {
//         res.send({ SuccessResult: results });
//       })
//       .catch((err) => {
//         res.send(err);
//       });
//   })


function _create_comment() {
  _create_comment = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(req, res, next) {
    var _req$body, name, email, comment, errors;

    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _req$body = req.body, name = _req$body.name, email = _req$body.email, comment = _req$body.comment;
            _context2.prev = 1;
            errors = {};

            if (name == undefined) {
              errors.name = "name is not provided";
            }

            if (email == undefined) {
              errors.email = "email is not provided";
            }

            if (comment == undefined) {
              errors.comment = "comment is not provided";
            }

            if (!(Object.values(errors).length > 0)) {
              _context2.next = 8;
              break;
            }

            throw errors;

          case 8:
            if (!(name.length === 0 || !_validator["default"].isEmail(email) || comment.length === 0)) {
              _context2.next = 10;
              break;
            }

            throw new Error("You must fill Name, Email and Comment correctly.");

          case 10:
            _context2.next = 12;
            return _commentModels["default"].create({
              name: name,
              email: email,
              comment: comment
            }).then( /*#__PURE__*/function () {
              var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(result) {
                var id, article;
                return _regenerator["default"].wrap(function _callee$(_context) {
                  while (1) {
                    switch (_context.prev = _context.next) {
                      case 0:
                        id = req.params.id;
                        _context.next = 3;
                        return _articleModels["default"].updateOne({
                          _id: id
                        }, {
                          $push: {
                            comments: result._id
                          }
                        });

                      case 3:
                        article = _context.sent;

                        if (article) {
                          _context.next = 6;
                          break;
                        }

                        throw new Error("No document found with that ID");

                      case 6:
                        res.status(200).json({
                          Message: "Comment was sent Successful!!!",
                          Comment: result
                        });

                      case 7:
                      case "end":
                        return _context.stop();
                    }
                  }
                }, _callee);
              }));

              return function (_x4) {
                return _ref.apply(this, arguments);
              };
            }())["catch"](function (err) {
              res.status(400).json({
                savingProcess: "Unexpected Error. Your query was not sent.",
                ErrorMessage: err.message
              });
            });

          case 12:
            _context2.next = 17;
            break;

          case 14:
            _context2.prev = 14;
            _context2.t0 = _context2["catch"](1);
            res.status(400).json({
              ErrorMessage: _context2.t0.message,
              Errors: _context2.t0
            });

          case 17:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, null, [[1, 14]]);
  }));
  return _create_comment.apply(this, arguments);
}