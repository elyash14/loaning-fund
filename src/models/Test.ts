import mongoose from "mongoose";

const TestSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please provide a name."],
    maxlength: [20, "Name cannot be more than 60 characters"],
  },
  document: {
    type: String,
    required: [true, "Please provide the document"],
    maxlength: [20, "document cannot be more than 60 characters"],
  },
});

export default mongoose.models.Test || mongoose.model("Test", TestSchema);