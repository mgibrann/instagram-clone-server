import mongoose from "mongoose";

const UserSchema = mongoose.Schema({
  username: { type: String, required: true },
  password: { type: String, required: true },
  email: { type: String, required: true },
  follower: { type: [String], default: [] },
  following: { type: [String], default: [] },
});

export default mongoose.model("User", UserSchema);
