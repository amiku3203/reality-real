import React, { useState } from "react";
import { FiBriefcase } from "react-icons/fi";
import { toast ,Toaster} from "react-hot-toast";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
const AddJob = () => {
  const [jobDetails, setJobDetails] = useState({
    jobtitle: "",
    jobdescription: "",
    totalposition: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setJobDetails({ ...jobDetails, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:8000/api/v1/career/add-job", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(jobDetails),
      });

      const data = await response.json();

      if (response.ok) {
        toast.success("Job added successfully!");
        setJobDetails({ jobtitle: "", jobdescription: "", totalposition: "" });
      } else {
        toast.error(data.message || "Failed to add job");
      }
    } catch (error) {
      toast.error("Something went wrong!");
    }
  };

  return (
    <div className="max-w-2xl mx-auto mt-10 p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-bold text-teal-500 flex items-center gap-2 mb-6">
        <FiBriefcase /> Add Job
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="jobtitle" className="block text-gray-700 font-medium">
            Job Title
          </label>
          <input
            type="text"
            id="jobtitle"
            name="jobtitle"
            value={jobDetails.jobtitle}
            onChange={handleChange}
            placeholder="Enter job title"
            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-teal-500"
            required
          />
        </div>
        <div>
  <label
    htmlFor="jobdescription"
    className="block text-gray-700 font-medium"
  >
    Job Description
  </label>
  <ReactQuill
    id="jobdescription"
    value={jobDetails.jobdescription}
    onChange={(content) =>
      setJobDetails((prev) => ({
        ...prev,
        jobdescription: content,
      }))
    }
    modules={quillModules}
    theme="snow"
    className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-teal-500"
  />
</div>
        <div>
          <label
            htmlFor="totalposition"
            className="block text-gray-700 font-medium"
          >
            Total Positions
          </label>
          <input
            type="number"
            id="totalposition"
            name="totalposition"
            value={jobDetails.totalposition}
            onChange={handleChange}
            placeholder="Enter total positions"
            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-teal-500"
            required
          />
        </div>
        <button
          type="submit"
          className="w-full bg-teal-500 text-white py-2 px-4 rounded hover:bg-teal-600 transition duration-300"
        >
          Add Job
        </button>
      </form>
      <Toaster />
    </div>
  );
};

export default AddJob;


const quillModules = {
    toolbar: [
      [{ header: [1, 2, 3, false] }],
      [{ font: [] }],
      [{ size: ["small", "medium", "large", "huge"] }],
      ["bold", "italic", "underline", "strike", "blockquote"],
      [{ list: "ordered" }, { list: "bullet" }],
      [{ script: "sub" }, { script: "super" }],
      [{ indent: "-1" }, { indent: "+1" }],
      [{ direction: "rtl" }],
      [{ color: [] }, { background: [] }],
      [{ align: [] }],
      ["link", "image", "video"], // Added image and video options
      ["clean"], // Remove formatting
      [{ table: 'insert-table' }],
    ],
  };