import Comment from "../models/commentModels.js";
import Article from "../models/articleModels.js";
import validator from "validator";

export async function create_comment(req, res, next) {
  const { name, email, comment } = req.body;
  // try {
  let errors = {};
  if (name == undefined) {
    errors.name = "name is not provided";
  }
  if (email == undefined) {
    errors.email = "email is not provided";
  }
  if (comment == undefined) {
    errors.comment = "comment is not provided";
  }
  if (Object.values(errors).length > 0) {
    throw errors;
  }
  if (name.length === 0 || !validator.isEmail(email) || comment.length === 0) {
    throw new Error("You must fill Name, Email and Comment correctly.");
  }
  await Comment.create({
    name,
    email,
    comment,
  })
    .then(async (result) => {
      const id = req.params.id;
      const article = await Article.updateOne(
        { _id: id },
        { $push: { comments: result._id } }
      );
      if (!article) {
        throw new Error("No document found with that ID");
      }
      res.status(200).json({
        Message: "Comment was sent Successful!!!",
        Comment: result,
      });
    })
    .catch((err) => {
      res.status(400).json({
        savingProcess: "Unexpected Error. Your query was not sent.",
        ErrorMessage: err.message,
      });
    });
  // } catch (error) {
  //   res.status(400).json({ ErrorMessage: error.message, Errors: error });
  // }
}

//   .then(async (result) => {
//     const id = String(result.surveyType);
//     await Survey.updateOne({ _id: id }, { $push: { attendies: result._id } })
//       .then((results) => {
//         res.send({ SuccessResult: results });
//       })
//       .catch((err) => {
//         res.send(err);
//       });
//   })
