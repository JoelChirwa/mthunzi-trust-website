import Blog from "../models/blogModel.js";

// @desc    Get all blogs
// @route   GET /api/blogs
export const getBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find({}).sort({ createdAt: -1 });
    res.status(200).json(blogs);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching blogs", error: error.message });
  }
};

// @desc    Get single blog by slug
// @route   GET /api/blogs/:slug
export const getBlogBySlug = async (req, res) => {
  try {
    const blog = await Blog.findOne({ slug: req.params.slug });
    if (blog) {
      res.status(200).json(blog);
    } else {
      res.status(404).json({ message: "Post not found" });
    }
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching post", error: error.message });
  }
};

// @desc    Create new blog
// @route   POST /api/blogs
export const createBlog = async (req, res) => {
  try {
    const { title, content, image, readTime, featured, category, author } =
      req.body;

    const blog = await Blog.create({
      title,
      content,
      image,
      readTime,
      featured,
      category,
      author,
    });

    res.status(201).json(blog);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error creating post", error: error.message });
  }
};

// @desc    Update blog
// @route   PUT /api/blogs/:id
export const updateBlog = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);

    if (blog) {
      blog.title = req.body.title || blog.title;
      blog.content = req.body.content || blog.content;
      blog.image = req.body.image || blog.image;
      blog.readTime = req.body.readTime || blog.readTime;
      blog.featured =
        req.body.featured !== undefined ? req.body.featured : blog.featured;
      blog.category = req.body.category || blog.category;
      blog.author = req.body.author || blog.author;

      if (req.body.slug) {
        blog.slug = req.body.slug;
      }

      const updatedBlog = await blog.save();
      res.status(200).json(updatedBlog);
    } else {
      res.status(404).json({ message: "Post not found" });
    }
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error updating post", error: error.message });
  }
};

// @desc    Delete blog
// @route   DELETE /api/blogs/:id
export const deleteBlog = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    if (blog) {
      await blog.deleteOne();
      res.status(200).json({ message: "Post removed" });
    } else {
      res.status(404).json({ message: "Post not found" });
    }
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error deleting post", error: error.message });
  }
};
