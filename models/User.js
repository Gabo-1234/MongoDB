import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: String,
  age: Number,
  city: String,
  role: String
});

export default mongoose.model("User", userSchema);