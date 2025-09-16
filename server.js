require("dotenv").config();
const express = require("express");
const cors = require("cors");

const connectDB = require("./config/db");
const videoRoutes = require("./routes/videoRoutes");

const app = express();
app.use(cors());
app.use(express.json());

connectDB();

app.use("/api/videos", videoRoutes);

app.get("/", (req, res) => res.send("Backend running"));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
