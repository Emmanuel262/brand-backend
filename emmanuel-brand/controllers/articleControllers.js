import multer from "multer";
import dotenv from "dotenv";
import Article from "../models/articleModels.js";
import path from "path";
import cloudinary from "cloudinary";
import { uploads } from "../cloudinary.js";
import fs from "fs";
const __dirname = path.resolve();
dotenv.config();

// const storage = multer.diskStorage({
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

export async function get_articles(req, res) {
  try {
    await Article.find({})
      .then((result) => {
        res.status(200).json({
          Length_of_articles: result.length,
          articles: result,
        });
      })
      .catch((err) => {
        res.status(400).json({ Errors: err });
      });
  } catch (error) {
    res.status(400).json({
      Errors: error,
    });
  }
}

export async function get_article(req, res) {
  try {
    const doc = await Article.findById(req.params.id).populate("comments");
    if (!doc) {
      throw new Error("No document found with that ID");
    }
    res.status(200).json({
      status: "Article with ID",
      data: {
        data: doc,
      },
    });
  } catch (error) {
    res.status(404).json({
      Message: error.message,
    });
  }
}

export async function create_articles(req, res) {
  const { articleTitle, summary, description } = req.body;
  try {
    let errors = {};
    if (articleTitle == undefined) {
      errors.article = "Article is not provided";
    }
    if (summary == undefined) {
      errors.smmary = "Summary is not provided";
    }
    if (description == undefined) {
      errors.description = "Description is not provided";
    }
    if (Object.values(errors).length > 0) {
      throw errors;
    }
    if (
      req.files.length <= 0 ||
      req.files === [] ||
      req.files === "undefined" ||
      req.files === undefined ||
      req.files === null
    ) {
      throw new Error("At least one image is required for an article");
    }

    const uploader = async (path) => await uploads(path, "E-BRAND");

    const urls = [];
    let ids = [];
    const realUrls = [];
    const files = req.files;
    for (const file of files) {
      const { path } = file;
      const newPath = await uploader(path);
      urls.push(newPath);

      fs.unlinkSync(path);
    }

    for (let i = 0; i < urls.length; i++) {
      ids.push(urls[i].id);
    }
    for (let i = 0; i < urls.length; i++) {
      realUrls.push(urls[i].url);
    }

    await Article.create({
      articleTitle,
      summary,
      description,
      article_photos: realUrls,
    })
      .then((result) => {
        res.status(200).json({
          Message: "Article Successful created!!!",
          article: result,
        });
      })
      .catch((err) => {
        console.log(err);
        res.status(400).json({
          savingProcess: "Error",
          ErrorMessage: err.message,
          Errors: err,
        });
      });
  } catch (error) {
    res.status(400).json({ ErrorMessage: error.message, Errors: error });
  }
}

export async function update_article(req, res) {
  // try {
  if (req.file || req.files) {
    console.log("updating image process");
  }
  if (Object.keys(req.body).length == 0) {
    throw new Error(
      "Nothing to update, you must provide a field you want to update"
    );
  }
  if (Object.keys(req.body).length > 0) {
    let bodyKeys = Object.keys(req.body);
    var requiredObject = ["articleTitle", "summary", "description"];
    bodyKeys.forEach((key) => {
      if (!requiredObject.includes(key)) {
        throw new Error(`"${key}" is not part of required body field.`);
      }
    });
  }
  // const doc = await Article.findByIdAndUpdate(req.params.id, req.body, {
  //   new: true,
  //   runValidators: true,
  // });

  await Article.findById(req.params.id)
    .then(async (doc) => {
      if (req.files.length > 0) {
        let idss = doc.article_photos;
        for (let i = 0; i < idss.length; i++) {
          await cloudinary.v2.uploader.destroy(idss[i]);
        }
        let files = req.files;
        let urls = [];
        for (const file of files) {
          const { path } = file;
          // const newPath = await uploader(path);
          var results = await cloudinary.v2.uploader.upload(path);
          urls.push(results.secure_url);
          fs.unlinkSync(path);
        }
        doc.article_photos = urls;
        doc.articleTitle = req.body.articleTitle;
        doc.smmary = req.body.summary;
        doc.description = req.description;
      }
      let data = await doc.save();
      res.status(200).json({
        status: "successful updated",
        data: {
          data: data,
        },
      });
    })
    .catch((err) => {
      res.status(400).json({
        Message: "Error Occured",
        errorMessage: err.message,
      });
    });

  // await Article.findById(req.params.id, async function (err, doc) {
  //   if (err) {
  //     throw new Error("No document found with that ID");
  //   }
  //   if (req.files.length > 0) {
  //     let idss = doc.article_photos;
  //     for (let i = 0; i < idss.length; i++) {
  //       await cloudinary.v2.uploader.destroy(idss[i]);
  //     }
  //     let files = req.files;
  //     let urls = [];
  //     for (const file of files) {
  //       const { path } = file;
  //       // const newPath = await uploader(path);
  //       var results = await cloudinary.v2.uploader.upload(path);
  //       urls.push(results.secure_url);
  //       fs.unlinkSync(path);
  //     }
  //     doc.article_photos = urls;
  //   }

  //   (doc.articleTitle = req.body.articleTitle),
  //     (doc.smmary = req.body.summary),
  //     (doc.description = req.description);
  //   let data = await doc.save();
  //   res.status(200).json({
  //     status: "successful updated",
  //     data: {
  //       data: data,
  //     },
  //   });
  // });
  // } catch (error) {
  //   res.status(404).json({
  //     Message: error.message,
  //     Error: error,
  //   });
  // }
}

export async function delete_article(req, res) {
  try {
    const doc = await Article.findByIdAndDelete(req.params.id);

    if (!doc) {
      throw new Error("No document found with that ID");
    }

    let idss = doc.article_photos;
    for (let i = 0; i < idss.length; i++) {
      await cloudinary.v2.uploader.destroy(idss[i]);
    }

    res.status(202).json({
      status: "success",
      data: null,
    });
  } catch (error) {
    res.status(404).json({
      Message: error.message,
    });
  }
}
