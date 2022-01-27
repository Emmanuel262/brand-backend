import mongoose from "mongoose";

const articlesSchema = new mongoose.Schema(
  {
    articleTitle: {
      type: String,
      required: true,
      // unique: true,
      index: { unique: true, dropDups: true },
    },
    summary: {
      type: String,
      trim: true,
    },
    description: {
      type: String,
      trim: true,
    },
    article_photos: [String],
    comments: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Comment",
      },
    ],
  },
  { timestamps: { createdAt: "created_at" } }
);

const Article = mongoose.model("Article", articlesSchema);
Article.createIndexes();

export default Article;
