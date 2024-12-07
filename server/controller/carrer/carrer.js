const JobModel = require("../../models/carreer/career");

// Add a new job
const addJob = async (req, res) => {
    try {
        const { jobtitle, jobdescription, totalposition } = req.body;

        if (!jobtitle || !jobdescription || !totalposition) {
            return res.status(400).json({ message: "All fields are required" });
        }

        const newJob = new JobModel({
            jobtitle,
            jobdescription,
            totalposition,
        });

        await newJob.save();

        res.status(201).json({ message: "Job added successfully", job: newJob });
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};


const getAllJobs = async (req, res) => {
    try {
        const jobs = await JobModel.find();  // Fetches all jobs from the database

        if (jobs.length === 0) {
            return res.status(404).json({ message: "No jobs found" });
        }

        res.status(200).json({ message: "Jobs fetched successfully", jobs });
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};



const deleteJob = async (req, res) => {
    try {
        const { id } = req.params;

        // Check if the ID is provided
        if (!id) {
            return res.status(400).json({ message: "Job ID is required" });
        }

        // Find and delete the job
        const job = await JobModel.findByIdAndDelete(id);

        if (!job) {
            return res.status(404).json({ message: "Job not found" });
        }

        res.status(200).json({ message: "Job deleted successfully", job });
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};


const editJob = async (req, res) => {
    try {
        const { id } = req.params;
        const { jobtitle, jobdescription, totalposition } = req.body;

        // Check if the ID and all fields are provided
        if (!id || !jobtitle || !jobdescription || !totalposition) {
            return res.status(400).json({ message: "All fields are required, including Job ID" });
        }

        // Find and update the job
        const updatedJob = await JobModel.findByIdAndUpdate(
            id,
            { jobtitle, jobdescription, totalposition },
            { new: true, runValidators: true }
        );

        if (!updatedJob) {
            return res.status(404).json({ message: "Job not found" });
        }

        res.status(200).json({ message: "Job updated successfully", job: updatedJob });
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};
module.exports = { addJob ,getAllJobs,deleteJob,editJob };
