"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.create_articles = create_articles;
exports.delete_article = delete_article;
exports.get_article = get_article;
exports.get_articles = get_articles;
exports.update_article = update_article;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _multer = _interopRequireDefault(require("multer"));

var _dotenv = _interopRequireDefault(require("dotenv"));

var _articleModels = _interopRequireDefault(require("../models/articleModels.js"));

var _path3 = _interopRequireDefault(require("path"));

var _cloudinary = _interopRequireDefault(require("cloudinary"));

var _cloudinary2 = require("../cloudinary.js");

var _fs = _interopRequireDefault(require("fs"));

function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

var _dirname = _path3["default"].resolve();

_dotenv["default"].config(); // const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, path.join(__dirname, "/uploads"));
//   },
//   filename: function (req, file, cb) {
//     cb(null, Date.now() + "_" + file.originalname);
//   },
// });
// const fileFilter = (req, file, cb) => {
//   if (
//     (file.mimetype === "image/jpeg" || file.mimetype === "image/jpg",
//     file.mimetype === "image/png")
//   ) {
//     cb(null, true);
//   } else {
//     cb(null, false);
//   }
// };
// cloudinary.config({
//   cloud_name: process.env.CLOUDINARY_USER_NAME,
//   api_key: process.env.CLOUDINARY_API_KEY,
//   api_secret: process.env.CLOUDINARY_API_SECRET,
// });
// export const uploads = (file, folder) => {
//   return new Promise((resolve) => {
//     cloudinary.uploader.upload(
//       file,
//       (result) => {
//         resolve({
//           url: result.url,
//           id: result.public_id,
//         });
//       },
//       {
//         resource_type: "auto",
//         folder: folder,
//       }
//     );
//   });
// };
// export const upload = multer({ storage, fileFilter });
// const imageStorage = multer.diskStorage({
//   // Destination to store image
//   destination: path.join(__dirname, "uploads"),
//   filename: (req, file, cb) => {
//     cb(
//       null,
//       file.fieldname + "_" + Date.now() + path.extname(file.originalname)
//     );
//     // file.fieldname is name of the field (image)
//     // path.extname get the uploaded file extension
//   },
// });
// export const imageUpload = multer({
//   storage: imageStorage,
//   limits: {
//     fileSize: 1024 * 1024 * 10, // 1000000 Bytes = 1 MB
//   },
//   fileFilter(req, file, cb) {
//     if (!file.originalname.match(/\.(png|jpg)$/)) {
//       // upload only png and jpg format
//       return cb(new Error("Please upload a Image"));
//     }
//     cb(undefined, true);
//   },
// });


function get_articles(_x, _x2) {
  return _get_articles.apply(this, arguments);
}

function _get_articles() {
  _get_articles = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(req, res) {
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return _articleModels["default"].find({}).then(function (result) {
              res.status(200).json({
                Length_of_articles: result.length,
                articles: result
              });
            })["catch"](function (err) {
              res.status(400).json({
                Errors: err
              });
            });

          case 2:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));
  return _get_articles.apply(this, arguments);
}

function get_article(_x3, _x4) {
  return _get_article.apply(this, arguments);
}

function _get_article() {
  _get_article = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(req, res) {
    var doc;
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.prev = 0;
            _context2.next = 3;
            return _articleModels["default"].findById(req.params.id).populate("comments");

          case 3:
            doc = _context2.sent;

            if (doc) {
              _context2.next = 6;
              break;
            }

            throw new Error("No document found with that ID");

          case 6:
            res.status(200).json({
              status: "Article with ID",
              data: {
                data: doc
              }
            });
            _context2.next = 12;
            break;

          case 9:
            _context2.prev = 9;
            _context2.t0 = _context2["catch"](0);
            res.status(404).json({
              Message: _context2.t0.message
            });

          case 12:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, null, [[0, 9]]);
  }));
  return _get_article.apply(this, arguments);
}

function create_articles(_x5, _x6) {
  return _create_articles.apply(this, arguments);
}

function _create_articles() {
  _create_articles = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4(req, res) {
    var _req$body, articleTitle, summary, description, errors, uploader, urls, ids, realUrls, files, _iterator, _step, file, _path, newPath, i, _i;

    return _regenerator["default"].wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            _req$body = req.body, articleTitle = _req$body.articleTitle, summary = _req$body.summary, description = _req$body.description;
            _context4.prev = 1;
            errors = {};

            if (articleTitle == undefined) {
              errors.article = "Article is not provided";
            }

            if (summary == undefined) {
              errors.smmary = "Summary is not provided";
            }

            if (description == undefined) {
              errors.description = "Description is not provided";
            }

            if (!(Object.values(errors).length > 0)) {
              _context4.next = 8;
              break;
            }

            throw errors;

          case 8:
            // if (
            //   req.files.length <= 0 ||
            //   req.files === [] ||
            //   req.files === "undefined" ||
            //   req.files === undefined ||
            //   req.files === null
            // ) {
            //   throw new Error("At least one image is required for an article");
            // }
            uploader = /*#__PURE__*/function () {
              var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(path) {
                return _regenerator["default"].wrap(function _callee3$(_context3) {
                  while (1) {
                    switch (_context3.prev = _context3.next) {
                      case 0:
                        _context3.next = 2;
                        return (0, _cloudinary2.uploads)(path, "E-BRAND");

                      case 2:
                        return _context3.abrupt("return", _context3.sent);

                      case 3:
                      case "end":
                        return _context3.stop();
                    }
                  }
                }, _callee3);
              }));

              return function uploader(_x11) {
                return _ref.apply(this, arguments);
              };
            }();

            urls = [];
            ids = [];
            realUrls = [];
            files = req.files;
            _iterator = _createForOfIteratorHelper(files);
            _context4.prev = 14;

            _iterator.s();

          case 16:
            if ((_step = _iterator.n()).done) {
              _context4.next = 26;
              break;
            }

            file = _step.value;
            _path = file.path;
            _context4.next = 21;
            return uploader(_path);

          case 21:
            newPath = _context4.sent;
            urls.push(newPath);

            _fs["default"].unlinkSync(_path);

          case 24:
            _context4.next = 16;
            break;

          case 26:
            _context4.next = 31;
            break;

          case 28:
            _context4.prev = 28;
            _context4.t0 = _context4["catch"](14);

            _iterator.e(_context4.t0);

          case 31:
            _context4.prev = 31;

            _iterator.f();

            return _context4.finish(31);

          case 34:
            for (i = 0; i < urls.length; i++) {
              ids.push(urls[i].id);
            }

            for (_i = 0; _i < urls.length; _i++) {
              realUrls.push(urls[_i].url);
            }

            _context4.next = 38;
            return _articleModels["default"].create({
              articleTitle: articleTitle,
              summary: summary,
              description: description,
              article_photos: realUrls
            }).then(function (result) {
              res.status(200).json({
                Message: "Article Successful created!!!",
                article: result
              });
            })["catch"](function (err) {
              console.log(err);
              res.status(400).json({
                savingProcess: "Error",
                ErrorMessage: err.message,
                Errors: err
              });
            });

          case 38:
            _context4.next = 43;
            break;

          case 40:
            _context4.prev = 40;
            _context4.t1 = _context4["catch"](1);
            res.status(400).json({
              ErrorMessage: _context4.t1.message,
              Errors: _context4.t1
            });

          case 43:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4, null, [[1, 40], [14, 28, 31, 34]]);
  }));
  return _create_articles.apply(this, arguments);
}

function update_article(_x7, _x8) {
  return _update_article.apply(this, arguments);
}

function _update_article() {
  _update_article = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee6(req, res) {
    var bodyKeys, requiredObject;
    return _regenerator["default"].wrap(function _callee6$(_context6) {
      while (1) {
        switch (_context6.prev = _context6.next) {
          case 0:
            _context6.prev = 0;

            if (req.file || req.files.length > 0) {
              console.log("updating image process");
            }

            if (!(Object.keys(req.body).length == 0 && req.files.length <= 0)) {
              _context6.next = 4;
              break;
            }

            throw new Error("Nothing to update, you must provide a field you want to update");

          case 4:
            if (Object.keys(req.body).length > 0) {
              bodyKeys = Object.keys(req.body);
              requiredObject = ["articleTitle", "summary", "description"];
              bodyKeys.forEach(function (key) {
                if (!requiredObject.includes(key)) {
                  throw new Error("\"".concat(key, "\" is not part of required body field."));
                }
              });
            } // const doc = await Article.findByIdAndUpdate(req.params.id, req.body, {
            //   new: true,
            //   runValidators: true,
            // });


            _context6.next = 7;
            return _articleModels["default"].findById(req.params.id).then( /*#__PURE__*/function () {
              var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee5(doc) {
                var urls, idss, i, files, _iterator2, _step2, file, _path2, results, data;

                return _regenerator["default"].wrap(function _callee5$(_context5) {
                  while (1) {
                    switch (_context5.prev = _context5.next) {
                      case 0:
                        urls = [];

                        if (!(req.files.length > 0)) {
                          _context5.next = 35;
                          break;
                        }

                        idss = doc.article_photos;
                        i = 0;

                      case 4:
                        if (!(i < idss.length)) {
                          _context5.next = 10;
                          break;
                        }

                        _context5.next = 7;
                        return _cloudinary["default"].v2.uploader.destroy(idss[i]);

                      case 7:
                        i++;
                        _context5.next = 4;
                        break;

                      case 10:
                        files = req.files;
                        _iterator2 = _createForOfIteratorHelper(files);
                        _context5.prev = 12;

                        _iterator2.s();

                      case 14:
                        if ((_step2 = _iterator2.n()).done) {
                          _context5.next = 24;
                          break;
                        }

                        file = _step2.value;
                        _path2 = file.path; // const newPath = await uploader(path);

                        _context5.next = 19;
                        return _cloudinary["default"].v2.uploader.upload(_path2);

                      case 19:
                        results = _context5.sent;
                        urls.push(results.secure_url);

                        _fs["default"].unlinkSync(_path2);

                      case 22:
                        _context5.next = 14;
                        break;

                      case 24:
                        _context5.next = 29;
                        break;

                      case 26:
                        _context5.prev = 26;
                        _context5.t0 = _context5["catch"](12);

                        _iterator2.e(_context5.t0);

                      case 29:
                        _context5.prev = 29;

                        _iterator2.f();

                        return _context5.finish(29);

                      case 32:
                        doc.article_photos = urls;
                        _context5.next = 36;
                        break;

                      case 35:
                        doc.article_photos = doc.article_photos;

                      case 36:
                        if (req.body.description) {
                          doc.description = req.body.description;
                        } else {
                          doc.description = doc.description;
                        }

                        if (req.body.articleTitle) {
                          doc.articleTitle = req.body.articleTitle;
                        } else {
                          doc.articleTitle = doc.articleTitle;
                        }

                        if (req.body.summary) {
                          doc.summary = req.body.summary;
                        } else {
                          doc.summary = doc.summary;
                        }

                        _context5.next = 41;
                        return doc.save();

                      case 41:
                        data = _context5.sent;
                        res.status(200).json({
                          status: "successful updated",
                          data: {
                            data: data
                          }
                        });

                      case 43:
                      case "end":
                        return _context5.stop();
                    }
                  }
                }, _callee5, null, [[12, 26, 29, 32]]);
              }));

              return function (_x12) {
                return _ref2.apply(this, arguments);
              };
            }())["catch"](function (err) {
              res.status(400).json({
                Message: "Error Occured",
                errorMessage: err.message
              });
            });

          case 7:
            _context6.next = 12;
            break;

          case 9:
            _context6.prev = 9;
            _context6.t0 = _context6["catch"](0);
            res.status(404).json({
              Message: _context6.t0.message,
              Error: _context6.t0
            });

          case 12:
          case "end":
            return _context6.stop();
        }
      }
    }, _callee6, null, [[0, 9]]);
  }));
  return _update_article.apply(this, arguments);
}

function delete_article(_x9, _x10) {
  return _delete_article.apply(this, arguments);
}

function _delete_article() {
  _delete_article = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee7(req, res) {
    var doc, idss, i;
    return _regenerator["default"].wrap(function _callee7$(_context7) {
      while (1) {
        switch (_context7.prev = _context7.next) {
          case 0:
            _context7.prev = 0;
            _context7.next = 3;
            return _articleModels["default"].findByIdAndDelete(req.params.id);

          case 3:
            doc = _context7.sent;

            if (doc) {
              _context7.next = 6;
              break;
            }

            throw new Error("No document found with that ID");

          case 6:
            idss = doc.article_photos;
            i = 0;

          case 8:
            if (!(i < idss.length)) {
              _context7.next = 14;
              break;
            }

            _context7.next = 11;
            return _cloudinary["default"].v2.uploader.destroy(idss[i]);

          case 11:
            i++;
            _context7.next = 8;
            break;

          case 14:
            res.status(202).json({
              status: "success",
              data: null
            });
            _context7.next = 20;
            break;

          case 17:
            _context7.prev = 17;
            _context7.t0 = _context7["catch"](0);
            res.status(404).json({
              Message: _context7.t0.message
            });

          case 20:
          case "end":
            return _context7.stop();
        }
      }
    }, _callee7, null, [[0, 17]]);
  }));
  return _delete_article.apply(this, arguments);
}