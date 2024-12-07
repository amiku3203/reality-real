const express= require("express");

const router= express.Router();

const projectController= require("../controller/project/project");
const upload = require("../config/upload");

const {searchProjects} =require("../controller/project/projectsearchservice");
const getProjectBySlug = require("../controller/project/getproductusingslug");


// router.post("/createProject", upload.single('projectthumbnail'),  upload.single('floorPlan'), upload.single('Aboutthebuilder'), upload.array('Gallery',10), projectController.createProject);
router.get("/getAllProjects", projectController.getAllProject);
router.post(
    "/createProject",
    upload.fields([
      { name: 'Brochure', maxCount: 1 },
  { name: 'floorPlan', maxCount: 1 },
  { name: 'AboutTheBuilderThumbnail', maxCount: 1 },
  { name: 'projectthumbnail', maxCount: 1 },
  { name: 'Gallery', maxCount: 10 }, // Allow up to 10 files in the gallery
    ]),
    projectController.createProject
  );
  router.get("/search", async (req, res) => {
    const query = req.query;
  
    // Ensure query parameters are provided
    if (!query.city && !query.keyword) {
      return res.status(400).json({ message: "Please provide a city or keyword for search." });
    }
  
    try {
      const results = await searchProjects(query);
      res.status(200).json(results);
    } catch (error) {
      res.status(500).json({ message: "Error searching projects", error: error.message });
    }
  });
  
  router.delete("/deleteProject/:id", projectController.deleteProject);
  router.put("/editProject/:id", upload.fields([
    { name: 'Brochure', maxCount: 1 },
    { name: 'floorPlan', maxCount: 1 },
    { name: 'AboutTheBuilderThumbnail', maxCount: 1 },
    { name: 'projectthumbnail', maxCount: 1 },
    { name: 'Gallery', maxCount: 10 },
  ]), projectController.editProject);

  router.get("/:slug", getProjectBySlug);










  

module.exports= router;