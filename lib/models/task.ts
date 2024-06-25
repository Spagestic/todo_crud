import mongoose from "mongoose";

const TaskSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  completed: {
    type: Boolean,
    required: true,
  },
  time: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.models.Task || mongoose.model("Task", TaskSchema);
