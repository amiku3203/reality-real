const Project = require("../../models/properties/project")


const getProjectBySlug = async (req, res) => {
    try {
      const { slug } = req.params;
  
      // Find project by slug
      const project = await Project.findOne({ slug });
  
      if (!project) {
        return res.status(404).json({
          message: "Project not found with the given slug",
        });
      }
  
      // Send the project data
      res.status(200).json(project);
    } catch (error) {
      console.error("Error getting project by slug", error);
  
      res.status(500).json({
        message: "Error fetching project",
        error: error.message,
      });
    }
  };
  
  module.exports=getProjectBySlug;