import mongoose from "mongoose";

const postModel = mongoose.Schema({
  name: String,
  img: String,
  time: String,
  postContent: String,
});
export default mongoose.model("posts", postModel);
