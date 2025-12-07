const express = require("express");
const path = require("path");
const app = express();
const mongoose = require("mongoose");
require("dotenv").config();

// JSON parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// STATIC FILES – rasm va boshqa fayllar
app.use(
  "/uploads",
  express.static(path.join("/var/www/hackathon_back/uploads"))
);

// ROUTES
const blogRoutes = require("./routes/blogRoutes");
app.use("/api/blogs", blogRoutes);

// ERROR HANDLER
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: err.message });
});

// DATABASE
mongoose
  .connect("mongodb://IdentityNull:painintheassman@88.218.168.217:27017/hackathon?authSource=admin")
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error(err));

// SERVER
const PORT = process.env.PORT || 3322;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
