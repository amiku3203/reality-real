// controllers/whatWeDoController.js
const WhatDo = require('../../models/aboutus/whatwedo');

// Add new What We Do data
const addWhatWeDo = async (req, res) => {
    try {
      const { services, description } = req.body;
  
      // Check if a document already exists
      const existingWhatWeDo = await WhatDo.findOne();
  
      if (existingWhatWeDo) {
        // If it exists, update the existing document by adding new services
        // Also replace the description field
        existingWhatWeDo.services.push(...services); // Adds new services to the existing ones
        existingWhatWeDo.description = description; // Replace description
  
        // Save the updated document
        const updatedWhatWeDo = await existingWhatWeDo.save();
        res.status(200).json({ success: true, data: updatedWhatWeDo });
      } else {
        // If no document exists, create a new one
        const newWhatWeDo = await WhatDo.create({ services, description });
        res.status(201).json({ success: true, data: newWhatWeDo });
      }
    } catch (error) {
      res.status(500).json({ success: false, message: 'Failed to add What We Do', error: error.message });
    }
  };
  

// Get all What We Do data
const getAllWhatWeDo = async (req, res) => {
  try {
    const whatWeDo = await WhatDo.find();
    res.status(200).json({ success: true, data: whatWeDo });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to fetch What We Do data', error: error.message });
  }
};

// Get single What We Do data by ID
const getWhatWeDoById = async (req, res) => {
  try {
    const { id } = req.params;
    console.log("id",id);
    const whatWeDo = await WhatDo.findById(id);
    if (!whatWeDo) return res.status(404).json({ success: false, message: 'What We Do not found' });
    res.status(200).json({ success: true, data: whatWeDo });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to fetch What We Do', error: error.message });
  }
};

// Update What We Do data
 
// Delete What We Do data
const editService = async (req, res) => {
  try {
    const { serviceId } = req.params; // Get service ID from URL
    const { title, description } = req.body; // Get data from request body

    // Find the service and update
    const service = await WhatWeDo.findOneAndUpdate(
      { 'services._id': serviceId },
      {
        $set: {
          'services.$.title': title,
          'services.$.description': description,
        },
      },
      { new: true }
    );

    if (!service) {
      return res.status(404).json({ message: 'Service not found' });
    }

    res.json({ message: 'Service updated successfully', data: service });
  } catch (error) {
    res.status(500).json({ message: 'Error updating service', error });
  }
};

// Delete Service
const deleteService = async (req, res) => {
  try {
    const { serviceId } = req.params; // Get service ID from URL
     console.log("serviceId",serviceId);
    // Remove the service
    const service = await WhatWeDo.findOneAndUpdate(
      {},
      { $pull: { services: { _id: serviceId } } },
      { new: true }
    );

    if (!service) {
      return res.status(404).json({ message: 'Service not found' });
    }

    res.json({ message: 'Service deleted successfully', data: service });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting service', error });
  }
};
module.exports = {
  addWhatWeDo,
  getAllWhatWeDo,
  getWhatWeDoById,
  editService,
  deleteService
   
};
