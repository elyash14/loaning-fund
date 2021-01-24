import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, "Please provide a username."],
    maxlength: [20, "password cannot be more than 20 characters"],
  },
  password: {
    type: String,
    required: [true, "Please provide the password"],
  },
  name: {
    type: String,
    required: [true, "Please enter your name"]
  }
});

export default mongoose.models.User || mongoose.model("User", UserSchema);