const express = require("express");
const router = express.Router();
const blogController = require("../controllers/blogController");
const upload = require("../multer");

// CREATE
router.post("/", upload.single("coverImage"), blogController.createBlog);

// GET ALL
router.get("/", blogController.getBlogs);

// GET SINGLE
router.get("/:id", blogController.getBlog);

// UPDATE
router.put("/:id", upload.single("coverImage"), blogController.updateBlog);

// DELETE
router.delete("/:id", blogController.deleteBlog);

module.exports = router;
