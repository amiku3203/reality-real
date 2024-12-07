const express = require("express");
const router = express.Router();
const { addJob, getAllJobs, deleteJob, editJob } = require("../controller/carrer/carrer");
const { saveCareerEnquiry, handleFileUploadError, getAllCareerEnquiries } = require("../controller/carrer/carrerenquiry");
const upload = require("../config/upload");
// const { saveContactForm } = require("../controller/contactus/contactcontroller");
// Route to add a job
router.post("/add-job", addJob);

router.get("/all-job", getAllJobs);


router.post('/career-enquiry', upload.single('resume'), handleFileUploadError,  saveCareerEnquiry);

router.get('/all-enquiries',getAllCareerEnquiries)

router.delete('/delete-job/:id',  deleteJob);

router.put('/edit-job/:id',  editJob);

// router.post("/add-en",saveContactForm)

module.exports = router;
