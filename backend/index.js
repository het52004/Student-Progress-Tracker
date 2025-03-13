import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import authenticationRoutes from "./routes/authentication.routes.js";
import dotenv from "dotenv";
import connectDb from "./Database/connectDb.js";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.static(path.join(__dirname, "../frontend/dist")));

app.use("/api/auth", authenticationRoutes);

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../frontend/dist", "index.html"));
});

app.listen(PORT, () => {
  connectDb();
  console.log(`Server is running on http://localhost:${PORT}`);
});
