const Blog = require("../models/blog");

// CREATE
exports.createBlog = async (req, res) => {
  try {
    const { title, shortDescription, content, metaTitle, metaDescription } =
      req.body;

    const coverImage = req.file ? req.file.filename : null;
    const coverImageUrl = coverImage
      ? `${req.protocol}://${req.get("host")}/uploads/${coverImage}`
      : null;

    const newBlog = await Blog.create({
      title,
      shortDescription,
      content,
      metaTitle,
      metaDescription,
      coverImage: coverImageUrl,
    });

    res.status(201).json({ message: "Blog created", blog: newBlog });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// GET ALL
exports.getBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find().sort({ createdAt: -1 });

    const blogsWithFullUrl = blogs.map((blog) => ({
      ...blog.toObject(),
      coverImage: blog.coverImage
        ? `${req.protocol}://${req.get("host")}/uploads/${blog.coverImage}`
        : null,
    }));

    res.json(blogsWithFullUrl);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// GET SINGLE
exports.getBlog = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);

    if (!blog) return res.status(404).json({ message: "Blog not found" });

    const blogWithFullUrl = {
  ...blog.toObject(),
  coverImage: blog.coverImage
    ? `${req.protocol}://${req.get("host")}/uploads/${blog.coverImage}`
    : null,
};

    res.json(blogWithFullUrl);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// UPDATE
exports.updateBlog = async (req, res) => {
  try {
    const { title, shortDescription, content, metaTitle, metaDescription } =
      req.body;

    const coverImage = req.file ? req.file.filename : undefined;
    const coverImageUrl = coverImage
      ? `${req.protocol}://${req.get("host")}/uploads/${coverImage}`
      : undefined;

    const updatedBlog = await Blog.findByIdAndUpdate(
      req.params.id,
      {
        title,
        shortDescription,
        content,
        metaTitle,
        metaDescription,
        ...(coverImageUrl && { coverImage: coverImageUrl }),
      },
      { new: true }
    );

    res.json({ message: "Blog updated", updatedBlog });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// DELETE
exports.deleteBlog = async (req, res) => {
  try {
    await Blog.findByIdAndDelete(req.params.id);
    res.json({ message: "Blog deleted" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
