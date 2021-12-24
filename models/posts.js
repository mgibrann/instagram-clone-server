import mongoose from "mongoose";

const postSchema = mongoose.Schema({
  description: String,
  name: String,
  creator: String,
  tags: [String],
  image: String,
  likes: {
    type: [String],
    default: [],
  },
  comment: {
    type: [Object],
    default: [],
  },
  createdAt: {
    type: Date,
    default: new Date(),
  },
});

export default mongoose.Model("Post", postSchema);
