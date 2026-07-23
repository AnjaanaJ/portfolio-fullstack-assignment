import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import projectRoutes from "./routes/projectRoutes.js";

dotenv.config();
const databaseConnected = await connectDB();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use("/api/projects", projectRoutes);

// Test route used to confirm that the backend is running.
app.get("/api/health", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Portfolio API is running",
    database: databaseConnected ? "connected" : "disconnected",
  });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
