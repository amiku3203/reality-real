 
const Blog = require("../../models/Blog/blog");
const upload = require("../../config/upload"); // Import the multer configuration
 
 
// Create a new blog post with thumbnail upload
const createBlog = async (req, res) => {

  upload.single("blogthumbnail")(req, res, async (err) => {
    if (err) {
      return res.status(400).json({ message: err.message });
    }
    console.log("req.body",req.body);
    const { title, shortDescription, category, author, description, metattile, metadescription, metakeywords } = req.body;
    const categories = category.split(",").map((cat) => cat.trim());
     
    const blogthumbnail = {
      url: `${req.file.filename}`, // URL to access the uploaded image
    };

    try {
      const newBlog = new Blog({
        title,
        shortDescription,
        cateogory:categories,
        blogthumbnail,
        description,
        author,
        metattile,
        metadescription,
        metakeywords
      });

      await newBlog.save();
      res.status(201).json({ message: "Blog created successfully", data: newBlog });
    } catch (err) {
      res.status(500).json({ message: "Error creating blog", error: err.message });
    }
  });
};

// Get all blogs
const getAllBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find();
    res.status(200).json({ data: blogs });
  } catch (err) {
    res.status(500).json({ message: "Error fetching blogs", error: err.message });
  }
};

// Get single blog by slug
const getBlogBySlug = async (req, res) => {
  const { slug } = req.params;

  try {
    const blog = await Blog.findOne({ slug });
    if (!blog) {
      return res.status(404).json({ message: "Blog not found" });
    }
    res.status(200).json({ data: blog });
  } catch (err) {
    res.status(500).json({ message: "Error fetching blog", error: err.message });
  }
};

const editBlog = async (req, res) => {
  const { slug } = req.params;

  upload.single("blogthumbnail")(req, res, async (err) => {
    if (err) {
      return res.status(400).json({ message: err.message });
    }
 console.log("req.body", req.body)
    const { title, shortDescription, category, author, description, metattile, metadescription, metakeywords } = req.body;
    
    // Ensure category is an array
    const categories = category ? category.split(",").map((cat) => cat.trim()) : [];
    console.log("CATTTT",categories);
    let blogthumbnail = undefined;
    if (req.file) {
      blogthumbnail = { url: `${req.file.filename}` }; // Update the thumbnail image if provided
    }

    try {
      const updatedBlog = await Blog.findOneAndUpdate(
        { slug },
        {
          title,
          shortDescription,
          cateogory: categories, // Ensure the categories are updated as an array
          blogthumbnail: blogthumbnail || undefined, // Only update if a new file is uploaded
          description,
          author,
          metattile,
          metadescription,
          metakeywords
        },
        { new: true }
      );
      
      if (!updatedBlog) {
        return res.status(404).json({ message: "Blog not found" });
      }

      res.status(200).json({ message: "Blog updated successfully", data: updatedBlog });
    } catch (err) {
      res.status(500).json({ message: "Error updating blog", error: err.message });
    }
  });
};

// Delete a blog
const deleteBlog = async (req, res) => {
  const { slug } = req.params;

  try {
    const deletedBlog = await Blog.findOneAndDelete({ slug });
    if (!deletedBlog) {
      return res.status(404).json({ message: "Blog not found" });
    }
    res.status(200).json({ message: "Blog deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Error deleting blog", error: err.message });
  }
};
module.exports = { createBlog, getAllBlogs, getBlogBySlug,editBlog, deleteBlog};
