import mongoose from "mongoose";
import validator from "validator";

const queriesSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: [true, "Please enter an email"],
      lowercase: true,
      // validate: [validator.isEmail(), "Please enter a valid email."],
    },
    message: {
      type: String,
      trim: true,
    },
  },
  { timestamps: { createdAt: "created_at" } }
);

const Querie = mongoose.model("Querie", queriesSchema);

export default Querie;
