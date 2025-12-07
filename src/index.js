const express = require("express");
const path = require("path");
const app = express();
const mongoose = require("mongoose");
require("dotenv").config();
const swaggerJsdoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

// JSON parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// STATIC FILES – rasm va boshqa fayllar
app.use(
  "/uploads",
  express.static(path.join("/var/www/hackathon_back/uploads"))
);

// SWAGGER SETUP
const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Hackathon Blog API",
      version: "1.0.0",
      description: "CRUD API for Blog with images",
    },
    servers: [
      {
        url: "http://localhost:5000",
      },
    ],
  },
  apis: ["./routes/*.js"], // Swagger docs route fayllardan olinadi
};

const swaggerSpec = swaggerJsdoc(options);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// ERROR HANDLER
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: err.message });
});

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
const PORT = process.env.PORT || 5623;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
