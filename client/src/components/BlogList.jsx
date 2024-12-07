import React, { useEffect, useState } from 'react';
import { FiSearch } from 'react-icons/fi';
import { FaCalendarAlt, FaTags, FaUser } from 'react-icons/fa';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

 
const BlogList = () => {
  const [search, setSearch] = useState('');
  // const [filteredBlogs, setFilteredBlogs] = useState(blogs);
const [data, setData] = useState([]);
  const handleSearch = (event) => {
    setSearch(event.target.value);
    filterBlogs(event.target.value);
  };

  const filterBlogs = (searchTerm) => {
    const updatedBlogs = blogs.filter(blog =>
      blog.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredBlogs(updatedBlogs);
  };

 useEffect(() => {
   async function getAllBlogs(){
    const BlogsData= await fetch("http://localhost:8000/api/v1/blog/all");
    const actualData= await BlogsData.json();
    console.log("actualData",actualData);
    setData(actualData.data);
   
   }

   getAllBlogs();
 }, [ ])
 






  return (
    <div className="min-h-screen bg-gradient-to-br font-serif from-gray-50 to-gray-200 p-8">
      <div className="max-w-6xl mx-auto">
        {/* Search Bar */}
        <div className="flex items-center space-x-4 mb-12">
          <input
            type="text"
            placeholder="Search for insights, tips, and guides..."
            value={search}
            onChange={handleSearch}
            className="p-3 rounded-full w-full border border-orange-400 shadow-lg focus:outline-none focus:ring-2 focus:ring-orange-500 placeholder-gray-500 text-gray-800"
          />
          <FiSearch className="text-orange-500" size={24} />
        </div>

        {/* Blog Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
          {data?.map((blog) => (

            <Link  to={`/blog/${blog.slug}`}>

            
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
                <h3 className="text-2xl font-bold text-orange-600 leading-tight">{blog.title}</h3>
                <p className="text-gray-700 text-sm leading-relaxed">{blog.shortDescription}</p>
                {/* Meta Info */}
                <div className="flex items-center justify-between text-gray-500 text-sm mt-4">
                  <div className="flex items-center space-x-1">
                    <FaCalendarAlt className="text-orange-500" />
      
                  
                    <span>
  {new Date(blog.createdAt).toLocaleDateString()}
</span>
                      
                      
                      
                      
                  </div>
                  <div className="flex items-center space-x-1">
                    <FaTags className="text-orange-500" />
                    <span>{blog.cateogory[0]}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <FaUser className="text-orange-500" />
                    <span>{blog.author}</span>
                  </div>
                </div>
                {/* Separator */}
                <div className="border-t border-gray-300 mt-4"></div>
                {/* Read More Button */}
                <button
                  className="w-full bg-orange-500 text-white py-3 mt-4 rounded-full font-semibold hover:bg-orange-600 transition duration-300 shadow-lg transform hover:scale-105"
                >
                  Read More
                </button>
              </div>
            </motion.div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BlogList;
