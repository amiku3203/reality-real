import React, { useEffect, useState } from 'react';
import { FaCalendarAlt, FaTags, FaUser, FaArrowRight } from 'react-icons/fa';
import { motion } from 'framer-motion';
import { Link, useParams } from 'react-router-dom';

const BlogDetails = () => {
  const { slug } = useParams();
  const [blogdata, setBlogdata] = useState({});
  const [data, setData] = useState([]);
  const [filter, setFilter] = useState([]);

  useEffect(() => {
    const fetchProjectBySlug = async () => {
      try {
        const response = await fetch(`http://localhost:8000/api/v1/blog/${slug}`);
        const data = await response.json();
        setBlogdata(data.data); // Adjust based on the API response structure
      } catch (error) {
        console.error("Error fetching blog details:", error);
      }
    };

    async function getAllBlogs() {
      try {
        const BlogsData = await fetch("http://localhost:8000/api/v1/blog/all");
        const actualData = await BlogsData.json();
        setData(actualData.data);
      } catch (error) {
        console.error("Error fetching all blogs:", error);
      }
    }

    // Fetch blog details and all blogs
    fetchProjectBySlug();
    getAllBlogs();
  }, [slug]);

  // Update filter when data is fetched and blog data is available
  useEffect(() => {
    if (data.length > 0 && blogdata._id) {
      const filteredBlogs = data.filter((blog) => blog._id !== blogdata._id);
      setFilter(filteredBlogs);
    }
  }, [data, blogdata]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-200 p-6 md:p-12">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-8">
        {/* Main Content */}
        <div className="w-full md:w-2/3 space-y-6">
          <motion.div
            className="bg-white shadow-lg rounded-lg overflow-hidden border border-gray-300 p-6 space-y-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            {/* Thumbnail */}
            <img
              src={`http://localhost:8000/projectsAssests/${blogdata?.blogthumbnail?.url}`}
              alt={blogdata.title}
              className="w-full h-72 object-contain sm:object-cover rounded-lg shadow-md"
            />

            {/* Title and Meta Info */}
            <div className="space-y-2">
              <h1 className="text-3xl md:text-4xl font-bold text-orange-600 leading-tight">
                {blogdata.title}
              </h1>
              <div className="flex flex-wrap items-center text-gray-500 text-sm space-x-4">
                <div className="flex items-center space-x-1">
                  <FaCalendarAlt className="text-orange-500" />
                  {new Date(blogdata.createdAt).toLocaleDateString()}
                </div>
                <div className="flex items-center space-x-1">
                  <FaUser className="text-orange-500" />
                  <span>{blogdata.author}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <FaTags className="text-orange-500" />
                  {blogdata?.cateogory?.map((category, index) => (
                    <span key={index}>
                      {category}
                      {index < blogdata.cateogory.length - 1 && ','}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Separator */}
            <hr className="border-gray-200 my-4" />

            {/* Content */}
            <div className="text-gray-700 leading-relaxed space-y-4">
              <div
                className="text-gray-700 text-center w-full max-w-3xl"
                dangerouslySetInnerHTML={{ __html: blogdata.description }}
              ></div>
            </div>

            {/* Go Back Button */}
            
          </motion.div>
        </div>

        {/* Sidebar - Recent Blogs */}
        <div className="w-full md:w-1/3 sticky top-12 max-h-screen overflow-y-auto">
          <div className="bg-white shadow-lg rounded-lg p-6 border border-gray-300 space-y-4">
            <h2 className="text-2xl font-bold text-orange-600 mb-4">Recent Blogs</h2>
            <ul className="space-y-4">
              {filter.map((recentBlog) => (

<Link  to={`/blog/${recentBlog.slug}`}>

                <li key={recentBlog._id} className="flex items-start space-x-3">
                  <FaArrowRight className="text-orange-500 mt-1" />
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800 hover:text-orange-500 transition duration-300 cursor-pointer">
                      {recentBlog.title}
                    </h3>
                    <span className="text-gray-500 text-sm">
                      {new Date(recentBlog.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                </li>
                </Link>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogDetails;
