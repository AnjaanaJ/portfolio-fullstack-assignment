import mongoose from "mongoose";

const projectSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Project title is required"],
      trim: true,
      maxlength: [100, "Project title cannot exceed 100 characters"],
    },
    description: {
      type: String,
      required: [true, "Project description is required"],
      trim: true,
      maxlength: [1000, "Description cannot exceed 1000 characters"],
    },
    technologies: {
      type: [String],
      required: true,
      default: [],
    },
    projectLink: {
      type: String,
      trim: true,
      default: "",
    },
    status: {
      type: String,
      enum: ["Completed", "In Progress"],
      default: "In Progress",
    },
  },
  {
    timestamps: true,
  }
);

const Project = mongoose.model("Project", projectSchema);

export default Project;