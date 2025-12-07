const Blog = require("../models/blog");

// CREATE
exports.createBlog = async (req, res) => {
  try {
    const { title, shortDescription, content, metaTitle, metaDescription } = req.body;
    const coverImage = req.file ? req.file.filename : null;

    const newBlog = await Blog.create({
      title,
      shortDescription,
      content,
      metaTitle,
      metaDescription,
      coverImage,
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
    const blogsWithFullUrl = blogs.map((blog) => {
      let coverImage = blog.coverImage;
      if (coverImage && !coverImage.startsWith("http")) {
        coverImage = `${req.protocol}://${req.get("host")}/uploads/${coverImage}`;
      }
      return { ...blog.toObject(), coverImage };
    });
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

    let coverImage = blog.coverImage;
    if (coverImage && !coverImage.startsWith("http")) {
      coverImage = `${req.protocol}://${req.get("host")}/uploads/${coverImage}`;
    }

    res.json({ ...blog.toObject(), coverImage });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// UPDATE
exports.updateBlog = async (req, res) => {
  try {
    const { title, shortDescription, content, metaTitle, metaDescription } = req.body;
    const coverImage = req.file ? req.file.filename : undefined;

    const updatedBlog = await Blog.findByIdAndUpdate(
      req.params.id,
      { title, shortDescription, content, metaTitle, metaDescription, ...(coverImage && { coverImage }) },
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
