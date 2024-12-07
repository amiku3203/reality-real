
const express= require("express");
const {
    addWhatWeDo,
    getAllWhatWeDo,
    getWhatWeDoById,
    editService,
    deleteService,
    
  } = require('../controller/aboutus/whatwedo');
  
  const router = express.Router();
  
  // Add What We Do data
  router.post('/', addWhatWeDo);
  
  // Get all What We Do data
  router.get('/', getAllWhatWeDo);
  
  // Get single What We Do data by ID
  router.get('/:id', getWhatWeDoById);
  
  // Update What We Do data
  
  router.put('/service/edit/:serviceId', editService);

  // Delete a service
  router.delete('/service/delete/:serviceId',  deleteService);
  
  module.exports = router;