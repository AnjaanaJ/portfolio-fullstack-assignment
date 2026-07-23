import Project from "../models/Project.js";
import mongoose from "mongoose";

const fallbackProjects = [
  {
    title: "Sales System",
    description:
      "Desktop application developed using Java and Object-Oriented Programming principles for managing sales operations and business workflows.",
    technologies: ["Java", "OOP"],
    projectLink: "https://github.com/AnjaanaJ/SalesSystem",
    status: "Completed",
  },
  {
    title: "Student Record Manager",
    description:
      "Java-based application created to manage and organize student records efficiently using structured programming concepts.",
    technologies: ["Java", "File Handling"],
    projectLink: "https://github.com/AnjaanaJ/Student-Record-Manager",
    status: "Completed",
  },
  {
    title: "DriveEASE",
    description:
      "Modern web platform for an online driving school featuring responsive UI and full-stack architecture using the MERN stack.",
    technologies: ["MongoDB", "Express", "React", "Node.js"],
    projectLink: "https://github.com/AnjaanaJ/driveEASE",
    status: "In Progress",
  },
];

const databaseUnavailable = (res) =>
  res.status(503).json({
    message: "Database is unavailable. Try again after MongoDB reconnects.",
  });

export const getProjects = async (req, res) => {
  if (mongoose.connection.readyState !== 1) {
    return res.status(200).json(fallbackProjects);
  }

  try {
    const projects = await Project.find().sort({ createdAt: -1 });
    res.status(200).json(projects);
 } catch (error) {
  res.status(500).json({
    message: "Unable to retrieve projects",
    error: error.message,
  });
}
};


export const getProjectById = async (req, res) => {
  if (mongoose.connection.readyState !== 1) {
    return databaseUnavailable(res);
  }

  try {
    const project = await Project.findById(req.params.id);

    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }

    res.status(200).json(project);
  } catch (error) {
    res.status(400).json({ message: "Invalid project ID" });
  }
};


export const createProject = async (req, res) => {
  if (mongoose.connection.readyState !== 1) {
    return databaseUnavailable(res);
  }

  try {
    const project = await Project.create(req.body);
    res.status(201).json(project);
  } catch (error) {
    res.status(400).json({
      message: "Unable to create project",
      error: error.message,
    });
  }
};


export const updateProject = async (req, res) => {
  if (mongoose.connection.readyState !== 1) {
    return databaseUnavailable(res);
  }

  try {
    const project = await Project.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }

    res.status(200).json(project);
  } catch (error) {
    res.status(400).json({
      message: "Unable to update project",
      error: error.message,
    });
  }
};


export const deleteProject = async (req, res) => {
  if (mongoose.connection.readyState !== 1) {
    return databaseUnavailable(res);
  }

  try {
    const project = await Project.findByIdAndDelete(req.params.id);

    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }

    res.status(200).json({ message: "Project deleted successfully" });
  } catch (error) {
    res.status(400).json({ message: "Invalid project ID" });
  }
};
