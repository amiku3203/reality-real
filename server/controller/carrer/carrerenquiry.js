const careerEnquiryModel = require('../../models/enquires/careerenq'); // Path to your model

// Controller to handle saving a career enquiry

exports.handleFileUploadError = (err, req, res, next) => {
    if (err) {
      // Check if the error is related to file size limits
      if (err.code === 'LIMIT_FILE_SIZE') {
        return res.status(400).json({
          success: false,
          message: 'File size is too large. The maximum allowed file size is 10MB.',
        });
      }
      // Handle other multer errors
      return res.status(500).json({
        success: false,
        message: 'Failed to upload the file. Please try again.',
        error: err.message,
      });
    }
    next();
  };
  
exports.saveCareerEnquiry = async (req, res) => {
 
  try {
    // Make sure the file exists before proceeding
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: 'Resume is required.'
      });
    }

    // Extract data from the body
    const { name, email, phone, jobTitle, experiencelevel } = req.body;

    // Get the resume file path
    const resume = req.file.path; // This will be the path to the uploaded resume

    // Create a new enquiry document
    const newEnquiry = new careerEnquiryModel({
      name,
      email,
      phone,
      resume, // Store the resume path
      jobTitle,
      experiencelevel
    });

    // Save the enquiry to the database
    const savedEnquiry = await newEnquiry.save();

    return res.status(201).json({
      success: true,
      message: 'Career enquiry saved successfully!',
      data: savedEnquiry
    });
  } catch (error) {
    console.error('Error saving career enquiry:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to save career enquiry.',
      error: error.message
    });
  }
};

exports.getAllCareerEnquiries = async (req, res) => {
    try {
      // Fetch all career enquiries from the database
      const enquiries = await  careerEnquiryModel.find();
  
      return res.status(200).json({
        success: true,
        message: 'Career enquiries retrieved successfully!',
        data: enquiries
      });
    } catch (error) {
      console.error('Error retrieving career enquiries:', error);
      return res.status(500).json({
        success: false,
        message: 'Failed to retrieve career enquiries.',
        error: error.message
      });
    }
  };

  const path = require('path');

 