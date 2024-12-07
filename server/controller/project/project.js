const Project = require("../../models/properties/project")

const createProject = async (req, res) => {
  // console.log("req", req.body);
  try {
    // Destructuring the body fields from req.body
    var {
      RERA,
      PropertySize,
      ProjectStatus,
      ProjectNameOnRera,
      ProjectTypology,
      price,
      projectLocation,
      ContactNumber,
      Possesion,
      projectDescription,
      amenities,
      Brochure,
      city,
      locality,
      home,
      YouTubeVideo,
      faqs,
      ProjectName,
      PropertyCategory,
      PropertyType,
      AboutTheBuilder,
      AboutTheBuilderDescription,
      WhereToShow,
      metatitle,
      metadescription,
      metakeyword,
      QRCodeLink,
      BuilderName,
    } = req.body;

    // Ensure faqs is an array
    const parsedFaqs = faqs ? JSON.parse(faqs) : [];
 
    projectLocation=projectLocation? JSON.parse(projectLocation) : {};
    // Extract file paths from req.files
    const files = req.files;
    console.log("jkj",files);
    const thumbnail = files.projectthumbnail ? files.projectthumbnail[0].path : null;
    const floorPlanthumb = files.floorPlan ? files.floorPlan[0].path : null;
    const AboutTheBuilderImage = files.AboutTheBuilderThumbnail ? files.AboutTheBuilderThumbnail[0].path : null;

    const Gallery = files.Gallery ? files.Gallery.map(file => file.path) : [];
    const brochure = files.Brochure ? files.Brochure[0].path : null;

    // Construct floorPlan and AboutTheBuilder objects
    const floorPlan = {
      thumbnail: floorPlanthumb,
      floorPlan: "hELLO" || "", // Ensure `floorPlan` is provided in the request body
    };

    const aboutTheBuilder = {
      thumbnail: AboutTheBuilderImage,
      description:  AboutTheBuilderDescription || "", // Ensure this is provided
    };
  
    // Process Gallery files
    const GalleryModel = Gallery.map(g => {
      return { path: g };
    });

    // Process price object
    const parsedPrice = price ? JSON.parse(price) : {};
    const projectPrice = {
      startingFrom: parsedPrice.startingFrom || { value: 0, text: "" },
      discount: parsedPrice.discount || { value: 0, text: "" },
      basePrice: parsedPrice.basePrice || { value: 0, text: "" },
      locationPremium: parsedPrice.locationPremium || { value: 0, text: "" },
      amenitiesCharge: parsedPrice.amenitiesCharge || { value: 0, text: "" },
      tax: parsedPrice.tax || { value: 0, text: "" },
      totalPrice: parsedPrice.totalPrice || { value: 0, text: "" },
    };

    // Construct the Summary object
  
    // Ensure required fields are present
    const missingFields = [];

    if (!projectDescription) missingFields.push("projectDescription");
    if (!amenities) missingFields.push("amenities");
    if (!aboutTheBuilder || !aboutTheBuilder.description) missingFields.push("aboutTheBuilder.description");
    if (!floorPlan || !floorPlan.floorPlan) missingFields.push("floorPlan.floorPlan");
      
    if (!projectLocation || !projectLocation.name) missingFields.push("projectLocation.name");
    
    if (missingFields.length > 0) {
      return res.status(400).json({ message: `Missing required fields: ${missingFields.join(', ')}` });
    }
    
    // Validate home field
    if (home !== 'buy' && home !== 'rent') {
      return res.status(400).json({ message: "Invalid value for 'home' field. Must be 'buy' or 'rent'." });
    }

    // Create a new project document
    const newProject = new Project({
      RERA,
      PropertySize,
      ProjectStatus,
      ProjectNameOnRera,
      ProjectTypology,
      ProjectName,
      price: projectPrice,
      projectLocation: {
        embedCode: projectLocation.embedCode || "",
        name: projectLocation.name || "",
      },
      city,
      locality,
      ContactNumber,
      thumbnail,
      BuilderName,
      Possesion,
      QRCodeLink,
      projectDescription,
      amenities,
      floorPlan,
      AboutTheBuilder: aboutTheBuilder,
      Gallery: GalleryModel,
      Brochure: brochure,
      home,
      YouTubeVideo,
      PropertyCategory,
      PropertyType,
      faqs: parsedFaqs,
      WhereToShow,
      metatitle,
      metadescription,
      metakeyword,
    });

    // Save the new project to the database
    await newProject.save();

    // Send success response
    res.status(201).json({
      message: "Project created successfully",
      project: newProject,
    });
  } catch (error) {
    console.error("Error creating project:", error);

    // Send error response
    res.status(500).json({
      message: "Error creating project",
      error: error.message,
    });
  }
};

const deleteProject = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedProject = await Project.findByIdAndDelete(id);

    if (!deletedProject) {
      return res.status(404).json({ message: "Project not found" });
    }

    res.status(200).json({
      message: "Project deleted successfully",
      project: deletedProject,
    });
  } catch (error) {
    console.error("Error deleting project:", error);

    res.status(500).json({
      message: "Error deleting project",
      error: error.message,
    });
  }
};



 
const getAllProject = async (req, res) => {
try {
  const allProjects = await Project.find();
  
  if (!allProjects.length) {
    return res.status(404).json({
      message: "No projects found",
    });
  }

  // Send the projects data
  res.status(200).json(allProjects);
} catch (error) {
  console.error("Error getting all projects", error);

  res.status(500).json({
    message: "Error fetching projects",
    error: error.message,
  });
}
};

const editProject = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      RERA,
      PropertySize,
      ProjectStatus,
      ProjectNameOnRera,
      ProjectTypology,
      price,
      projectLocation,
      ContactNumber,
      Possesion,
      projectDescription,
      amenities,
      Brochure,
      city,
      locality,
      home,
      YouTubeVideo,
      faqs,
      ProjectName,
      PropertyCategory,
      PropertyType,
      AboutTheBuilder,
      AboutTheBuilderDescription,
      WhereToShow,
      metatitle,
      metadescription,
      metakeyword,
      QRCodeLink,
      BuilderName,
    } = req.body;

    const parsedFaqs = faqs ? JSON.parse(faqs) : [];
    projectLocation = projectLocation ? JSON.parse(projectLocation) : {};

    // Extract updated files
    const files = req.files;
    const thumbnail = files.projectthumbnail ? files.projectthumbnail[0].path : null;
    const floorPlanthumb = files.floorPlan ? files.floorPlan[0].path : null;
    const AboutTheBuilderImage = files.AboutTheBuilderThumbnail ? files.AboutTheBuilderThumbnail[0].path : null;
    const Gallery = files.Gallery ? files.Gallery.map(file => file.path) : [];
    const brochure = files.Brochure ? files.Brochure[0].path : null;

    const floorPlan = {
      thumbnail: floorPlanthumb,
      floorPlan: "hELLO" || "",
    };

    const aboutTheBuilder = {
      thumbnail: AboutTheBuilderImage,
      description: AboutTheBuilderDescription || "",
    };

    const GalleryModel = Gallery.map(g => {
      return { path: g };
    });

    const parsedPrice = price ? JSON.parse(price) : {};
    const projectPrice = {
      startingFrom: parsedPrice.startingFrom || { value: 0, text: "" },
      discount: parsedPrice.discount || { value: 0, text: "" },
      basePrice: parsedPrice.basePrice || { value: 0, text: "" },
      locationPremium: parsedPrice.locationPremium || { value: 0, text: "" },
      amenitiesCharge: parsedPrice.amenitiesCharge || { value: 0, text: "" },
      tax: parsedPrice.tax || { value: 0, text: "" },
      totalPrice: parsedPrice.totalPrice || { value: 0, text: "" },
    };

    const missingFields = [];
    if (!projectDescription) missingFields.push("projectDescription");
    if (!amenities) missingFields.push("amenities");
    if (!aboutTheBuilder || !aboutTheBuilder.description) missingFields.push("aboutTheBuilder.description");
    if (!floorPlan || !floorPlan.floorPlan) missingFields.push("floorPlan.floorPlan");
    if (!projectLocation || !projectLocation.name) missingFields.push("projectLocation.name");

    if (missingFields.length > 0) {
      return res.status(400).json({ message: `Missing required fields: ${missingFields.join(', ')}` });
    }

    if (home !== 'buy' && home !== 'rent') {
      return res.status(400).json({ message: "Invalid value for 'home' field. Must be 'buy' or 'rent'." });
    }

    const updatedProject = await Project.findByIdAndUpdate(id, {
      RERA,
      PropertySize,
      ProjectStatus,
      ProjectNameOnRera,
      ProjectTypology,
      ProjectName,
      price: projectPrice,
      projectLocation: {
        embedCode: projectLocation.embedCode || "",
        name: projectLocation.name || "",
      },
      city,
      locality,
      ContactNumber,
      thumbnail,
      BuilderName,
      Possesion,
      QRCodeLink,
      projectDescription,
      amenities,
      floorPlan,
      AboutTheBuilder: aboutTheBuilder,
      Gallery: GalleryModel,
      Brochure: brochure,
      home,
      YouTubeVideo,
      PropertyCategory,
      PropertyType,
      faqs: parsedFaqs,
      WhereToShow,
      metatitle,
      metadescription,
      metakeyword,
    }, { new: true });

    if (!updatedProject) {
      return res.status(404).json({ message: "Project not found" });
    }

    res.status(200).json({
      message: "Project updated successfully",
      project: updatedProject,
    });
  } catch (error) {
    console.error("Error updating project:", error);
    res.status(500).json({
      message: "Error updating project",
      error: error.message,
    });
  }
};

 


module.exports = { createProject, getAllProject,deleteProject ,editProject}; 
