const express = require("express");
const router = express.Router();
const blogController = require("../controllers/blogController");
const upload = require("../multer");

/**
 * @swagger
 * components:
 *   schemas:
 *     Blog:
 *       type: object
 *       properties:
 *         title:
 *           type: string
 *         shortDescription:
 *           type: string
 *         content:
 *           type: string
 *         coverImage:
 *           type: string
 *         metaTitle:
 *           type: string
 *         metaDescription:
 *           type: string
 */

/**
 * @swagger
 * /api/blogs:
 *   post:
 *     summary: Create a new blog
 *     tags: [Blogs]
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               shortDescription:
 *                 type: string
 *               content:
 *                 type: string
 *               metaTitle:
 *                 type: string
 *               metaDescription:
 *                 type: string
 *               coverImage:
 *                 type: string
 *                 format: binary
 *     responses:
 *       201:
 *         description: Blog created
 */
router.post("/", upload.single("coverImage"), blogController.createBlog);

/**
 * @swagger
 * /api/blogs:
 *   get:
 *     summary: Get all blogs
 *     tags: [Blogs]
 *     responses:
 *       200:
 *         description: List of all blogs
 */
router.get("/", blogController.getBlogs);

/**
 * @swagger
 * /api/blogs/{id}:
 *   get:
 *     summary: Get blog by ID
 *     tags: [Blogs]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *     responses:
 *       200:
 *         description: Blog data
 */
router.get("/:id", blogController.getBlog);

/**
 * @swagger
 * /api/blogs/{id}:
 *   put:
 *     summary: Update a blog
 *     tags: [Blogs]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *     requestBody:
 *       required: false
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               shortDescription:
 *                 type: string
 *               content:
 *                 type: string
 *               metaTitle:
 *                 type: string
 *               metaDescription:
 *                 type: string
 *               coverImage:
 *                 type: string
 *                 format: binary
 *     responses:
 *       200:
 *         description: Blog updated
 */
router.put("/:id", upload.single("coverImage"), blogController.updateBlog);

/**
 * @swagger
 * /api/blogs/{id}:
 *   delete:
 *     summary: Delete a blog
 *     tags: [Blogs]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *     responses:
 *       200:
 *         description: Blog deleted
 */
router.delete("/:id", blogController.deleteBlog);

module.exports = router;
