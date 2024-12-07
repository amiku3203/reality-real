import React, { useState } from "react";
import { FaFileUpload, FaPen, FaBook, FaUserAlt,FaRegFileAlt ,FaTags  } from "react-icons/fa";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import {toast, Toaster} from "react-hot-toast";
const AddBlogForm = () => {
    const [formData, setFormData] = useState({
        title: '',
        shortDescription: '',
        category: '',
        blogthumbnail: null,
        author: '',
        description: '',
        metattile: '',
        metadescription: '',
        metakeywords: ''
      });
    
      const [message, setMessage] = useState('');
    
      const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
      };
    
      const handleFileChange = (e) => {
        setFormData({ ...formData, blogthumbnail: e.target.files[0] });
      };
    
      const handleSubmit = async (e) => {
        e.preventDefault();
    
        const formDataToSubmit = new FormData();
        formDataToSubmit.append('title', formData.title);
        formDataToSubmit.append('shortDescription', formData.shortDescription);
        formDataToSubmit.append('category', formData.category);
        formDataToSubmit.append('author', formData.author);
        formDataToSubmit.append('blogthumbnail', formData.blogthumbnail);
        formDataToSubmit.append('description', formData.description);
        formDataToSubmit.append('metattile', formData.metattile);
        formDataToSubmit.append('metadescription', formData.metadescription);
        formDataToSubmit.append('metakeywords', formData.metakeywords);
    
        try {
          const response = await fetch('http://localhost:8000/api/v1/blog/create', {
            method: 'POST',
            body: formDataToSubmit,
          });
    
          const data = await response.json();
      
          if (response.ok) {
            toast.success(data.message);
            setFormData({
              title: '',
              shortDescription: '',
              category: '',
              blogthumbnail: null,
              author: '',
              description: '',
              metattile: '',
              metadescription: '',
              metakeywords: ''
            });
          } else {
             toast.error('Failed to create blog: ' + (data.message || 'Unknown error'))
          }
        } catch (error) {
        toast.error('Error while creating the blog.');
        }
      };
  return (
    <div className="max-w-4xl mx-auto bg-white p-8 rounded-lg shadow-lg">
      <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">Add Blog</h2>
      {message && <p className="text-center text-red-500 mb-4">{message}</p>}

      <form onSubmit={handleSubmit}>
        {/* Title Field */}
        <div className="mb-6">
          <label htmlFor="title" className="block text-lg font-medium text-gray-700 mb-2">
            <FaPen className="inline-block mr-2 text-orange-500" /> Title
          </label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
            placeholder="Enter blog title"
            required
          />
        </div>

        {/* Short Description Field */}
        <div className="mb-6">
          <label htmlFor="shortDescription" className="block text-lg font-medium text-gray-700 mb-2">
            <FaBook className="inline-block mr-2 text-orange-500" /> Short Description
          </label>
          <textarea
            id="shortDescription"
            name="shortDescription"
            value={formData.shortDescription}
            onChange={handleChange}
            className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
            rows="4"
            placeholder="Write a brief description for the blog"
            required
          ></textarea>
        </div>

        {/* Category Field (Multiple Input) */}
        <div className="mb-6">
          <label htmlFor="category" className="block text-lg font-medium text-gray-700 mb-2">
            <FaBook className="inline-block mr-2 text-orange-500" /> Category
          </label>
          <input
            type="text"
            id="category"
            name="category"
            value={formData.category}
            onChange={handleChange}
            className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
            placeholder="Enter categories (comma-separated)"
            required
          />
          <p className="text-sm text-gray-500 mt-1">Separate categories with commas (e.g. Technology, Business)</p>
        </div>

        {/* Description Field */}
        <div className="mb-6">
          <label htmlFor="description" className="block text-lg font-medium text-gray-700 mb-2">
            <FaPen className="inline-block mr-2 text-orange-500" /> Full Description
          </label>
          
          <ReactQuill
  value={formData.description}
  onChange={(content) =>
    setFormData((prev) => ({
      ...prev,
      description: content,
    }))
  }
  modules={quillModules}
  theme="snow"
/>
        </div>

        {/* Author Field */}
        <div className="mb-6">
          <label htmlFor="author" className="block text-lg font-medium text-gray-700 mb-2">
            <FaUserAlt className="inline-block mr-2 text-orange-500" /> Author
          </label>
          <input
            type="text"
            id="author"
            name="author"
            value={formData.author}
            onChange={handleChange}
            className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
            placeholder="Enter author's name"
            required
          />
        </div>

        {/* Blog Thumbnail Field */}
        <div className="mb-6">
          <label htmlFor="blogthumbnail" className="block text-lg font-medium text-gray-700 mb-2">
            <FaFileUpload className="inline-block mr-2 text-orange-500" /> Blog Thumbnail
          </label>
          <input
            type="file"
            id="blogthumbnail"
            name="blogthumbnail"
            onChange={handleFileChange}
            className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
            required
          />
        </div>

        <div className="mb-6">
          <label htmlFor="metattile" className="block text-lg font-medium text-gray-700 mb-2">
            <FaPen className="inline-block mr-2 text-orange-500" /> Meta Title
          </label>
          <input
            type="text"
            id="metattile"
            name="metattile"
            value={formData.metattile}
            onChange={handleChange}
            maxLength="55"
            className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
            placeholder="Enter meta title (max 55 characters)"
            required
          />
          <p className="text-gray-500 text-sm">{55 - formData.metattile.length} characters remaining</p>
        </div>

        <div className="mb-6">
          <label htmlFor="metadescription" className="block text-lg font-medium text-gray-700 mb-2">
            <FaRegFileAlt className="inline-block mr-2 text-orange-500" /> Meta Description
          </label>
          <textarea
            id="metadescription"
            name="metadescription"
            value={formData.metadescription}
            onChange={handleChange}
            maxLength="144"
            className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
            placeholder="Enter meta description (max 144 characters)"
            rows="4"
            required
          />
          <p className="text-gray-500 text-sm">{144 - formData.metadescription.length} characters remaining</p>
        </div>

        <div className="mb-6">
          <label htmlFor="metakeywords" className="block text-lg font-medium text-gray-700 mb-2">
            <FaTags className="inline-block mr-2 text-orange-500" /> Meta Keywords (comma separated)
          </label>
          <input
            type="text"
            id="metakeywords"
            name="metakeywords"
            value={formData.metakeywords}
            onChange={handleChange}
            className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
            placeholder="Enter keywords, separated by commas"
            required
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-orange-500 text-white py-3 rounded-lg hover:bg-orange-600 transition-all"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default AddBlogForm;
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