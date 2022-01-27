import Querie from "../models/queriesModels.js";
import validator from "validator";

export async function create_querie(req, res, next) {
  const { name, email, message } = req.body;
  try {
    let errors = {};
    if (name == undefined) {
      errors.name = "name is not provided";
    }
    if (email == undefined) {
      errors.email = "email is not provided";
    }
    if (message == undefined) {
      errors.message = "message is not provided";
    }
    if (Object.values(errors).length > 0) {
      throw errors;
    }
    if (
      name.length === 0 ||
      !validator.isEmail(email) ||
      message.length === 0
    ) {
      throw new Error("You must fill Name, Email and message correctly.");
    } else {
      await Querie.create({
        name,
        email,
        message,
      })
        .then((result) => {
          res.status(200).json({
            Message: "Query was sent Successful!!!",
            Querie: result,
          });
        })
        .catch((err) => {
          res.status(400).json({
            savingProcess: "Unexpected Error. Your query was not sent.",
            ErrorMessage: err.message,
          });
        });
    }
  } catch (error) {
    res.status(400).json({ ErrorMessage: error.message, Errors: error });
  }
}

export async function get_queries(req, res, next) {
  try {
    await Querie.find({})
      .then((result) => {
        res.status(200).json({
          Length_of_queries: result.length,
          Queries: result,
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
