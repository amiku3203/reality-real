import React, { useEffect, useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css'; // Import Quill styles
import { toast, Toaster } from 'react-hot-toast';
import { Accordion, AccordionItem, AccordionItemButton, AccordionItemPanel } from 'react-accessible-accordion';
import { FaBriefcase, FaTrash, FaEdit } from "react-icons/fa";

const EditJob = () => {
    const [jobs, setJobs] = useState([]);
    const [editingJob, setEditingJob] = useState(null); // Holds job being edited
    const [form, setForm] = useState({ jobtitle: "", jobdescription: "", totalposition: "" });

    useEffect(() => {
        fetchJobs();
    }, []);

    const fetchJobs = async () => {
        try {
            const response = await fetch("http://localhost:8000/api/v1/career/all-job");
            const data = await response.json();
            setJobs(data.jobs);
        } catch (error) {
            toast.error("Failed to fetch job openings");
        }
    };

    const handleDelete = async (id) => {
        try {
            const response = await fetch(`http://localhost:8000/api/v1/career/delete-job/${id}`, {
                method: "DELETE",
            });
            const result = await response.json();

            if (response.ok) {
                toast.success(result.message);
                fetchJobs();
            } else {
                toast.error(result.message || "Failed to delete job");
            }
        } catch (error) {
            toast.error("Server error while deleting the job");
        }
    };

    const handleEdit = (job) => {
        setEditingJob(job._id); // Set the job being edited
        setForm({
            jobtitle: job.jobtitle,
            jobdescription: job.jobdescription,
            totalposition: job.totalposition,
        });
    };

    const handleSaveEdit = async () => {
        try {
            const response = await fetch(`http://localhost:8000/api/v1/career/edit-job/${editingJob}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(form),
            });
            const result = await response.json();

            if (response.ok) {
                toast.success(result.message);
                setEditingJob(null);
                fetchJobs();
            } else {
                toast.error(result.message || "Failed to edit job");
            }
        } catch (error) {
            toast.error("Server error while editing the job");
        }
    };

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleQuillChange = (value) => {
        setForm({ ...form, jobdescription: value });
    };

    return (
        <div className="flex flex-col lg:flex-row gap-10 px-8 lg:px-16 py-12 bg-gray-100">
            <Toaster />
            <div className="w-full">
                <h2 className="text-4xl font-bold mb-6 text-orange-600">Career Opportunities</h2>
                <p className="text-xl text-gray-700 mb-8">
                    Manage career opportunities by editing or deleting job postings.
                </p>
                <div className="space-y-6">
                    <Accordion allowZeroExpanded>
                        {jobs?.map((job) => (
                            <AccordionItem key={job._id}>
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
                                        <div className="flex gap-4">
                                            <button
                                                className="text-blue-600 hover:text-blue-800"
                                                onClick={() => handleEdit(job)}
                                            >
                                                <FaEdit />
                                            </button>
                                            <button
                                                className="text-red-600 hover:text-red-800"
                                                onClick={() => handleDelete(job._id)}
                                            >
                                                <FaTrash />
                                            </button>
                                        </div>
                                    </div>
                                </AccordionItemButton>
                                {editingJob === job._id && (
                                    <AccordionItemPanel>
                                        <form className="p-6 bg-gray-200 rounded-md">
                                            <div className="mb-4">
                                                <label className="block text-sm font-medium text-gray-700">Job Title</label>
                                                <input
                                                    type="text"
                                                    name="jobtitle"
                                                    value={form.jobtitle}
                                                    onChange={handleChange}
                                                    className="w-full px-4 py-2 border rounded-md"
                                                />
                                            </div>
                                            <div className="mb-4">
                                                <label className="block text-sm font-medium text-gray-700">Job Description</label>
                                                <ReactQuill
                                                    value={form.jobdescription}
                                                    onChange={handleQuillChange}
                                                    modules={quillModules}
                                                    className="bg-white"
                                                />
                                            </div>
                                            <div className="mb-4">
                                                <label className="block text-sm font-medium text-gray-700">Total Positions</label>
                                                <input
                                                    type="number"
                                                    name="totalposition"
                                                    value={form.totalposition}
                                                    onChange={handleChange}
                                                    className="w-full px-4 py-2 border rounded-md"
                                                />
                                            </div>
                                            <button
                                                type="button"
                                                onClick={handleSaveEdit}
                                                className="bg-orange-600 text-white px-4 py-2 rounded-md hover:bg-orange-700"
                                            >
                                                Save Changes
                                            </button>
                                        </form>
                                    </AccordionItemPanel>
                                )}
                            </AccordionItem>
                        ))}
                    </Accordion>
                </div>
            </div>
        </div>
    );
};

export default EditJob;

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