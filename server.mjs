import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.mjs";
import videoRoutes from "./routes/videoRoutes.mjs";

dotenv.config();
const app = express();

app.use(express.json());
connectDB();

app.use("/videos", videoRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
