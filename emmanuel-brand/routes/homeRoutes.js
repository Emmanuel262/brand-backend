import express from "express";
import fs from "fs";
import {
  get_articles,
  get_article,
  create_articles,
  update_article,
  delete_article,
} from "../controllers/articleControllers.js";
import upload from "../multer.js";
import { create_comment } from "../controllers/commentControllers.js";
import {
  get_queries,
  create_querie,
} from "../controllers/queriesControllers.js";
import { checkAuthentication } from "../middleware/check-user.js";
const router = express.Router();

router.get("/articles", get_articles);
router.get("/articles/:id", get_article);
router.get("/queries", checkAuthentication, get_queries);
router.post(
  "/articles",
  checkAuthentication,
  upload.array("article_photos", 2),
  create_articles
);
router.post("/comments/:id", create_comment);
router.post("/queries", create_querie);
router.patch(
  "/articles/:id",
  checkAuthentication,
  upload.array("article_photos", 2),
  update_article
);
router.delete("/articles/:id", checkAuthentication, delete_article);

// router.post(
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

export default router;
