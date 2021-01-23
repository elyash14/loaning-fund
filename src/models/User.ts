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
    maxlength: [20, "Password cannot be more than 20 characters"],
    minlength: [6, "Password cannot be less than 6 characters",]
  },
  name: {
    type: String,
    required: [true, "Please enter your name"]
  }
});

export default mongoose.models.User || mongoose.model("User", UserSchema);