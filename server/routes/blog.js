const express = require("express");
const { createBlog, getAllBlogs, getBlogBySlug, editBlog, deleteBlog } = require("../controller/blog/blogcontroller");
const router = express.Router();

// Route for creating a new blog post
router.post("/create", createBlog);

// Route for fetching all blogs
router.get("/all", getAllBlogs);

// Route for fetching a single blog by slug
router.get("/:slug", getBlogBySlug);


router.put("/edit/:slug",  editBlog);

// Route for deleting a blog post
router.delete("/delete/:slug", deleteBlog);

module.exports = router;
