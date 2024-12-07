import React, { useEffect, useState } from "react";
import { FaBriefcase, FaPlus } from "react-icons/fa";
import { toast ,Toaster} from "react-hot-toast";
import { Accordion, AccordionItem, AccordionItemButton, AccordionItemPanel } from 'react-accessible-accordion';

const Career = () => {
  const [jobs, setJobs] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    resume: null,
    jobTitle: "",
    experience: "",
  });

  // Fetch job openings
  useEffect(() => {
    fetch("http://localhost:8000/api/v1/career/all-job")
      .then((response) => response.json())
      .then((data) => setJobs(data))
      .catch((error) => toast.error("Failed to fetch job openings"));
  }, []);

  // Handle form data change
  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData({
      ...formData,
      [name]: files ? files[0] : value,
    });
  };

  // Handle form submission
 // Handle form submission
 const handleSubmit = (e) => {
  e.preventDefault();

  // Create FormData object to handle file and other form data
  const formDataToSubmit = new FormData();
  formDataToSubmit.append("name", formData.name);
  formDataToSubmit.append("email", formData.email);
  formDataToSubmit.append("phone", formData.phone);
  formDataToSubmit.append("jobTitle", formData.jobTitle);
  formDataToSubmit.append("experiencelevel", formData.experience);
  formDataToSubmit.append("resume", formData.resume); // The file input for resume

  // Make a POST request to submit the form data
  fetch("http://localhost:8000/api/v1/career/career-enquiry", {
    method: "POST",
    body: formDataToSubmit, // Send FormData
  })
    .then((response) => response.json()) // Convert the response to JSON
    .then((data) => {
      // Print the response data to the console for debugging
      console.log("Response Data:", data);

      if (data.success) {
        toast.success("Your application has been submitted!");
        // Clear the form
        setFormData({
          name: "",
          email: "",
          phone: "",
          resume: null,
          jobTitle: "",
          experience: "",
        });
      } else {
        toast.error(data.message);
      }
    })
    .catch((error) => {
      console.error("Error submitting application:", error);
      toast.error("An error occurred while submitting the application.");
    });
};


  return (
    <div className="flex flex-col lg:flex-row gap-10 px-8 lg:px-16 py-12 bg-gray-100">
      <Toaster/>
      {/* Left Section - Job Openings */}
      <div className="w-full lg:w-1/2">
        <h2 className="text-4xl font-bold mb-6 text-orange-600">Career Opportunities</h2>
        <p className="text-xl text-gray-700 mb-8">
          Join our dynamic team! Explore exciting career opportunities and take the next step in your professional journey.
        </p>
        <div className="space-y-6">
          <Accordion allowZeroExpanded>
            {jobs?.jobs?.map((job) => (
              <AccordionItem key={job.id}>
                <AccordionItemButton className="border gap-6 border-gray-300 shadow-xl rounded-md p-6 flex justify-between items-start bg-white hover:shadow-2xl transition">
                  <div className="flex justify-between w-full">
                    <div>
                      <h3 className="font-semibold text-xl text-gray-800">
                        <FaBriefcase className="inline mr-3 text-orange-500" />
                        {job.jobtitle}
                      </h3>
                      <p className="text-md text-gray-600">
                        Seats Available: <span className="font-medium">{job.totalposition}</span>
                      </p>
                    </div>
                    <FaPlus className="text-orange-500" />
                  </div>
                </AccordionItemButton>
                <AccordionItemPanel className="p-6 text-lg text-gray-700" dangerouslySetInnerHTML={{ __html: job.jobdescription }} />
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>

      {/* Right Section - Apply Form */}
      <div className="w-full lg:w-1/2 bg-white p-8 rounded-md shadow-xl">
        <h2 className="text-4xl font-bold mb-6 text-orange-600">Apply Now</h2>
        <p className="text-xl text-gray-700 mb-8">
          Ready to join our team? Fill in your details below and submit your application to start your career with us.
        </p>
        <form onSubmit={handleSubmit} className="space-y-8">
          <div>
            <label className="block text-md font-medium text-gray-700">Full Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 px-4 py-3 rounded-md focus:ring-2 focus:ring-orange-500"
            />
          </div>
          <div>
            <label className="block text-md font-medium text-gray-700">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 px-4 py-3 rounded-md focus:ring-2 focus:ring-orange-500"
            />
          </div>
          <div>
            <label className="block text-md font-medium text-gray-700">Phone</label>
            <input
              type="text"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 px-4 py-3 rounded-md focus:ring-2 focus:ring-orange-500"
            />
          </div>
          <div>
            <label className="block text-md font-medium text-gray-700">Resume (PDF only)</label>
            <input
              type="file"
              name="resume"
              onChange={handleChange}
              required
              accept=".pdf"
              className="w-full border border-gray-300 px-4 py-3 rounded-md focus:ring-2 focus:ring-orange-500"
            />
          </div>
          <div>
            <label className="block text-md font-medium text-gray-700">Job Title</label>
            <select
              name="jobTitle"
              value={formData.jobTitle}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 px-4 py-3 rounded-md text-black focus:ring-2 focus:ring-orange-500"
            >
              <option value="" disabled>Select a job title</option>
              {jobs?.jobs?.map((job) => (
                <option key={job.id} value={job.jobtitle} className="text-black">
                  {job.jobtitle}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-md font-medium text-gray-700">Experience Level</label>
            <select
              name="experience"
              value={formData.experience}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 px-4 py-3 rounded-md text-black focus:ring-2 focus:ring-orange-500"
            >
              <option value="" disabled>Select your experience level</option>
              <option value="Fresher">Fresher</option>
              <option value="Less than 1 year">Less than 1 year</option>
              <option value="1-2 years">1-2 years</option>
              <option value="2+ years">2+ years</option>
            </select>
          </div>
          <button
            type="submit"
            className="w-full bg-orange-600 text-white px-6 py-3 rounded-md hover:bg-orange-700"
          >
            Submit Application
          </button>
        </form>
      </div>
    </div>
  );
};

export default Career;
