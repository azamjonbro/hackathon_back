const swaggerJsDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");
const path = require("path");

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Blog Admin API",
      version: "1.0.0",
      description: "Blog CRUD backend for Admin Panel",
    },
    servers: [
      {
        url: "http://localhost:5623",
      },
    ],
  },

  apis: [
    path.join(__dirname, "../router/*.js"),
    path.join(__dirname, "../router/**/*.js"),
  ],
};

const swaggerSpecs = swaggerJsDoc(options);

module.exports = { swaggerUi, swaggerSpecs };
