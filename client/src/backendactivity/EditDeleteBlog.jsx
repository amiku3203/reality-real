import React, { useEffect, useState } from 'react';
import { FaCalendarAlt, FaTags, FaUser, FaEdit, FaTrash } from 'react-icons/fa';
import { motion } from 'framer-motion';
import {toast, Toaster} from "react-hot-toast";
const BlogList = () => {
  const [data, setData] = useState([]);
  const [editingSlug, setEditingSlug] = useState(null);
  const [editedData, setEditedData] = useState({
    title: '',
    shortDescription: '',
    category: '',
    author: '',
    description: '',
  });
  const [image, setImage] = useState(null);

  useEffect(() => {
    async function getAllBlogs() {
      const BlogsData = await fetch("http://localhost:8000/api/v1/blog/all");
      const actualData = await BlogsData.json();
      setData(actualData.data);
    }
    getAllBlogs();
  }, []);

  const handleDelete = async (slug) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this blog?");
    if (confirmDelete) {
      const response = await fetch(`http://localhost:8000/api/v1/blog/delete/${slug}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        setData(data.filter(blog => blog.slug !== slug));
        toast.success("Blog deleted successfully");
      }
    }
  };

  const handleEdit = (slug) => {
    const blogToEdit = data.find(blog => blog.slug === slug);
  
    // Ensure category is an array, fallback to an empty array if it's not
    const category = Array.isArray(blogToEdit.category) ? blogToEdit.category.join(', ') : '';
  
    setEditedData({
      title: blogToEdit.title,
      shortDescription: blogToEdit.shortDescription,
      category,  // Use the processed category
      author: blogToEdit.author,
      description: blogToEdit.description,
    });
  
    setEditingSlug(slug);
  };
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedData(prev => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = async (slug) => {
    const formData = new FormData();
  
    // Ensure categories are split correctly before sending
    const categories = editedData.category.split(',').map(cat => cat.trim());
    formData.append('category', categories.join(', ')); // Ensure categories are joined as comma separated
  
    // Append other form data
    for (const key in editedData) {
      if (key !== 'category') {
        formData.append(key, editedData[key]);
      }
    }
  
    if (image) {
      formData.append('blogthumbnail', image); // Ensure image is appended if selected
    }
  
    const response = await fetch(`http://localhost:8000/api/v1/blog/edit/${slug}`, {
      method: 'PUT',
      body: formData,
    });
  
    const responseData = await response.json();
    
  
    if (response.ok) {
      setData(data.map(blog => blog.slug === slug ? { ...blog, ...editedData } : blog));
      toast.success("Hey You Have Just Updated A Blog !");
      setEditingSlug(null); // Close the editing form
    } else {
      alert('Error updating blog');
    }
  };
  
  if(data.length === 0){
    <div className="flex justify-center items-center h-full bg-gray-100 p-8 rounded-lg">
    <p className="text-3xl text-gray-500 font-semibold">
      🌟 No blogs found yet! Be the first to share something awesome. 🌟
    </p>
  </div>
  }

  return (
    <div className="min-h-screen bg-gradient-to-br font-serif from-gray-50 to-gray-200 p-8">
      <div className="max-w-6xl mx-auto">
        {/* Blog Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
          {data?.map((blog) => (
            <motion.div
              key={blog.id}
              className="bg-white shadow-xl rounded-lg overflow-hidden border border-gray-300 transform transition-all hover:scale-105"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              {/* Thumbnail */}
              <img
                src={`http://localhost:8000/projectsAssests/${blog.blogthumbnail.url}`}
                alt={blog.title}
                className="w-full h-48 object-cover"
              />
              {/* Content */}
              <div className="p-6 space-y-4">
                {editingSlug === blog.slug ? (
                  <div>
                    <h3 className="text-2xl font-bold text-orange-600 leading-tight">Edit Blog</h3>
                    <div>
                      <label className="block text-gray-700">Title</label>
                      <input
                        type="text"
                        name="title"
                        value={editedData.title}
                        onChange={handleChange}
                        className="w-full p-3 border border-gray-300 rounded-md"
                      />
                    </div>

                    <div>
                      <label className="block text-gray-700">Short Description</label>
                      <input
                        type="text"
                        name="shortDescription"
                        value={editedData.shortDescription}
                        onChange={handleChange}
                        className="w-full p-3 border border-gray-300 rounded-md"
                      />
                    </div>

                    <div>
                      <label className="block text-gray-700">Category</label>
                      <input
                        type="text"
                        name="category"
                        value={editedData.category}
                        onChange={handleChange}
                        className="w-full p-3 border border-gray-300 rounded-md"
                      />
                    </div>

                    <div>
                      <label className="block text-gray-700">Author</label>
                      <input
                        type="text"
                        name="author"
                        value={editedData.author}
                        onChange={handleChange}
                        className="w-full p-3 border border-gray-300 rounded-md"
                      />
                    </div>

                    <div>
                      <label className="block text-gray-700">Description</label>
                      <textarea
                        name="description"
                        value={editedData.description}
                        onChange={handleChange}
                        className="w-full p-3 border border-gray-300 rounded-md"
                      />
                    </div>

                    <div>
                      <label className="block text-gray-700">Thumbnail Image</label>
                      <input
                        type="file"
                        name="blogthumbnail"
                        onChange={handleImageChange}
                        className="w-full p-3 border border-gray-300 rounded-md"
                      />
                    </div>

                    <button
                      onClick={() => handleSubmit(blog.slug)}
                      className="bg-blue-500 text-white py-2 px-4 rounded-full mt-4"
                    >
                      Update Blog
                    </button>
                    <button
                      onClick={() => setEditingSlug(null)}
                      className="bg-gray-500 text-white py-2 px-4 rounded-full mt-4 ml-2"
                    >
                      Cancel
                    </button>
                  </div>
                ) : (
                  <div>
                    <h3 className="text-2xl font-bold text-orange-600 leading-tight">{blog.title}</h3>

                    {/* Meta Info */}
                    <div className="flex items-center justify-between text-gray-500 text-sm mt-4">
                      <div className="flex items-center space-x-1">
                        <FaTags className="text-orange-500" />
                        <span>{blog.cateogory[0]}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <FaUser className="text-orange-500" />
                        <span>{blog.author}</span>
                      </div>
                    </div>

                    <div className="flex space-x-4 mt-4">
                      <button
                        onClick={() => handleEdit(blog.slug)}
                        className="bg-yellow-500 text-white py-2 px-4 rounded-full flex items-center space-x-1"
                      >
                        <FaEdit />
                        <span>Edit</span>
                      </button>
                      <button
                        onClick={() => handleDelete(blog.slug)}
                        className="bg-red-500 text-white py-2 px-4 rounded-full flex items-center space-x-1"
                      >
                        <FaTrash />
                        <span>Delete</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BlogList;
