import 'dotenv/config'; // This loads immediately at import time

import express from "express";
import connectDB from "./config/db.mjs";
import videoRoutes from "./routes/videoRoutes.mjs";

const app = express();
app.use(express.json());

connectDB();

app.use("/videos", videoRoutes);

// Add error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something broke!' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));