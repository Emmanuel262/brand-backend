"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

var _fs = _interopRequireDefault(require("fs"));

var _articleControllers = require("../controllers/articleControllers.js");

var _multer = _interopRequireDefault(require("../multer.js"));

var _commentControllers = require("../controllers/commentControllers.js");

var _queriesControllers = require("../controllers/queriesControllers.js");

var _checkUser = require("../middleware/check-user.js");

var router = _express["default"].Router();

router.get("/articles", _articleControllers.get_articles);
router.get("/articles/:id", _articleControllers.get_article);
router.get("/queries", _checkUser.checkAuthentication, _queriesControllers.get_queries);
router.post("/articles", _checkUser.checkAuthentication, _multer["default"].array("article_photos", 2), _articleControllers.create_articles);
router.post("/comments/:id", _commentControllers.create_comment);
router.post("/queries", _queriesControllers.create_querie);
router.patch("/articles/:id", _checkUser.checkAuthentication, _multer["default"].array("article_photos", 2), _articleControllers.update_article);
router["delete"]("/articles/:id", _checkUser.checkAuthentication, _articleControllers.delete_article); // router.post(
//   "/upload-image",
//   imageUpload.array("article_photos", 2),
//   async (req, res, next) => {
//     const uploader = async (path) => await uploads(path, "WETHEBEST");
//     const urls = [];
//     const files = req.files;
//     for (const file of files) {
//       const { path } = file;
//       const newPath = await uploader(path);
//       urls.push(newPath);
//       fs.unlinkSync(path);
//     }
//     // res.status(200).json({
//     //   message: "successful",
//     //   urls: urls,
//     // });
//   },
//   create_articles
// );

var _default = router;
exports["default"] = _default;