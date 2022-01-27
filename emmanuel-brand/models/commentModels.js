import mongoose from "mongoose";
import validator from "validator";

const commentsSchema = new mongoose.Schema(
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
    comment: {
      type: String,
      trim: true,
    },
  },
  { timestamps: { createdAt: "created_at" } }
);

const Comment = mongoose.model("Comment", commentsSchema);
export default Comment;
