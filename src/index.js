const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
const blogRoutes = require("./router/index.js");
const { swaggerUi, swaggerSpecs } = require("./config/swagger");
const path = require("path")
const app = express();
connectDB();

app.use(cors());
app.use(express.json());
app.use(
  "/uploads",
  express.static(path.join("/var/www/hackathon_back/uploads"))
);


// SWAGGER UI
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpecs));

app.use("/api/blogs", blogRoutes);

const PORT = 5623;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
