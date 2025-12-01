import express from "express";
import "dotenv/config";
import cors from "cors";
import connectDB from "./config/db.js";
import partRoutes from "./routes/partRoutes.js";

const app = express();
const PORT = process.env.PORT || 8000;

app.use(cors());
app.use(express.json());
app.use("/api/parts", partRoutes);

const startServer = async () => {
  try {
    await connectDB();
    app.listen(PORT, () => {
      console.log(`Server started at http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error(`Failed to start server: ${error}`);
  }
};

startServer();
