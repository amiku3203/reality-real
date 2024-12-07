import React, { useEffect, useState } from 'react';
import {
  FcAbout,
  FcBriefcase,
  FcGallery,
} from 'react-icons/fc'; // New icons
import { FaBlog, FaCity } from 'react-icons/fa';
import { BiCollection } from "react-icons/bi";
import { MdDelete } from "react-icons/md";
import {
  FaHome,
  FaClipboardList,
  FaBuilding,
  FaPlus,
  FaEdit,
  FaCaretDown,
  FaSignOutAlt,
  FaUserCircle,
  FaUserCog,
} from 'react-icons/fa';
import { useSelector, useDispatch } from 'react-redux';
import { toast, Toaster } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { setUserDetails } from '../store/userSlice';
import UploadProjectForm from '../backendactivity/AddProject';
import ShowAllProducts from '../components/ShowAllProducts';
import WhatWeDo from '../backendactivity/WhatWeDo';
import TestimonialsForm from '../backendactivity/Testimonials';
import AddBlogForm from '../backendactivity/AddBlog';
import AddMedia from '../backendactivity/AddMediaForm';
import AddJob from '../backendactivity/AddJob';
import CareerEnquiries from '../backendactivity/CareerEnquiries';
import ContactForm from '../backendactivity/AddContactus';
import DeleteJob from '../backendactivity/DeleteJob';
import DeleteAwardMedia from '../backendactivity/DeleteAwardMedia';
import EditDeleteBlog from '../backendactivity/EditDeleteBlog';
import EditDeleteService from '../backendactivity/EditDeleteService';
import CityManager from '../backendactivity/CityAdd';
import DeleteProperty from '../backendactivity/DeleteProperty';
import ContactEnquiries from '../backendactivity/ContactEnquiries';

const Admin = () => {
  const [currentPage, setCurrentPage] = useState('dashboard');
  const [isAboutDropdownOpen, setIsAboutDropdownOpen] = useState(false);
  const [isMediaDropdownOpen, setIsMediaDropdownOpen] = useState(false);
 const [isEnquireiesDropdownOpen, setIsEnquireiesDropdownOpen] = useState(false);
 const [isCareerDropdown, setIsCareerDropdown] = useState( false)
 const [insideMediaDropdown, setInsideMediaDropdown] = useState(false);
 const [isBlogDropdownOpen, setIsBlogDropdownOpen] = useState(false);
 const [isWhatWeDoDropdownOpen, setIsWhatWeDoDropdownOpen] = useState(false);
const [propertyshowdropdow, setPropertyshowdropdow] = useState(false);
  const user = useSelector((state) => state?.user?.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
        // Make a request to the backend to log the user out
        const response = await fetch("http://localhost:8000/api/v1/user/logout", {
            method: "POST",
            credentials: "include", // Ensure the cookie is included in the request
        });

        const data = await response.json();
        toast.success("Logout Successfully")
        if (data.success) {
            // Redirect the user to the Sign-In page after successful logout
            // If using React Router v6:
          
            navigate("/signin"); 
            // Or if using React Router v5:
            // history.push("/signin");
        } else {
            // Handle the case where logout fails
            console.error("Logout failed:", data.message);
        }
    } catch (error) {
        console.error("An error occurred during logout:", error);
    }
};


  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const response = await fetch('/api/user-details', { credentials: 'include' });
        const data = await response.json();
        if (data.success) {
          dispatch(setUserDetails(data.data));
        }
      } catch {
        toast.error('Failed to fetch user details');
      }
    };
    fetchUserDetails();
  }, [dispatch]);

  if (!user) {
    navigate('/signin');
  }

  const toggleAboutDropdown = () => setIsAboutDropdownOpen(!isAboutDropdownOpen);
  const toggleMediaDropdown = () => setIsMediaDropdownOpen(!isMediaDropdownOpen);
  const toggleEnquiriesDropdown = () => setIsEnquireiesDropdownOpen(!isEnquireiesDropdownOpen);
  const toggleCareersDropdown = () => setIsCareerDropdown(!isCareerDropdown);
  
  const toggleInsideMedia = () => setInsideMediaDropdown(!insideMediaDropdown);
  const toggleWhatWeDoDropdown = () => setIsWhatWeDoDropdownOpen(!isWhatWeDoDropdownOpen);
  const togglepropertyshowdropdown= ()=>setPropertyshowdropdow(!propertyshowdropdow);
  return (
    <div className="flex h-screen bg-white font-play">
      <Toaster />
      {/* Sidebar */}
      <div style={{width:"20%"}} className="  bg-white text-black p-6 space-y-8 fixed inset-0 z-10 overflow-y-auto border-r border-gray-300 flex flex-col">
        <h2 className="text-2xl font-semibold text-orange-500 underline">Admin Panel</h2>
        <ul className="space-y-6">
          <li className="border-b border-gray-300">
            <button
              onClick={() => setCurrentPage('dashboard')}
              className="flex items-center py-2 px-4 hover:bg-orange-500 rounded-md transition-colors"
            >
              <FaHome className="mr-3 text-xl" /> Dashboard
            </button>
          </li>


          <li className="border-b border-gray-300">
            <button
              onClick={toggleEnquiriesDropdown}
              className="flex items-center py-2 px-4 hover:bg-orange-500 rounded-md transition-colors"
            >
              <BiCollection className="mr-3 text-xl" /> Enquiries <FaCaretDown className="ml-auto" />
            </button>
            {isEnquireiesDropdownOpen && (
              <ul className="pl-6 space-y-4">
                <li className='border-b border-gray-300'>
                  <button
                    onClick={() => setCurrentPage('carrerenquiries')}
                    className="flex items-center py-2 px-4 hover:bg-orange-500 rounded-md transition-colors"
                  >
                    <FaClipboardList className="mr-2" /> Carrer Enquiries
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => setCurrentPage('contactenquiries')}
                    className="flex items-center py-2 px-4 hover:bg-orange-500 rounded-md transition-colors"
                  >
                    <FaClipboardList className="mr-2" /> Contact Enquiry
                  </button>
                </li>
              </ul>
            )}
          </li>
          <li className="border-b border-gray-300">
            <button
              onClick={togglepropertyshowdropdown}
              className="flex items-center py-2 px-4 hover:bg-orange-500 rounded-md transition-colors"
            >
              <FaHome className="mr-3 text-xl" /> Property <FaCaretDown className="ml-auto" />
            </button>
            { propertyshowdropdow && (
              <ul className="pl-6 space-y-4">
                <li  className="border-b border-gray-300">
                  <button
                    onClick={() => setCurrentPage('Add')}
                    className="flex items-center py-2 px-4 hover:bg-orange-500 rounded-md transition-colors"
                  >
                    <FaPlus className="mr-2" /> Add Property
                  </button>
                </li>
                <li>
                <button
  onClick={() => setCurrentPage('deleteProp')}
  className="flex items-center text-pretty py-2 px-4 hover:bg-orange-500 rounded-md transition-colors"
>
<span className="flex items-center ml-2">
    <MdDelete className="text-red-600" size={24} />
    <FaEdit className="ml-2 text-blue-600" size={24} />
  </span>
  Delete/Edit Property
 
</button>

                </li>
              </ul>
            )}
          </li>
          <li className="border-b border-gray-300">
            <button
              onClick={toggleAboutDropdown}
              className="flex items-center py-2 px-4 hover:bg-orange-500 rounded-md transition-colors"
            >
              <FcAbout className="mr-3 text-xl" /> About Us <FaCaretDown className="ml-auto" />
            </button>
            {isAboutDropdownOpen && (
              <ul className="pl-6 space-y-4">
                <li className="border-b  ">
            <button
              onClick={toggleWhatWeDoDropdown}
              className="flex items-center py-2 px-4 hover:bg-orange-500 rounded-md transition-colors"
            >
              <FaClipboardList className="mr-3 text-xl" /> What We Do <FaCaretDown className="ml-auto" />
            </button>
            {isWhatWeDoDropdownOpen && (
              <ul className="pl-6 space-y-4">
                <li className="border-b border-gray-300">
                  <button
                    onClick={() => setCurrentPage('addService')}
                    className="flex items-center py-2 px-4 hover:bg-orange-500 rounded-md transition-colors"
                  >
                    <FaPlus className="mr-2" /> Add Service
                  </button>
                </li>
                <li  >
                  <button
                    onClick={() => setCurrentPage('editDeleteService')}
                    className="flex items-center py-2 px-4 hover:bg-orange-500 rounded-md transition-colors"
                  >
                    <FaEdit className="mr-2" /> Edit/Delete Service
                  </button>
                </li>
              </ul>
            )}
          </li>
                
                <li className="border-b border-gray-300">
                  <button
                    onClick={() => setCurrentPage('testimonials')}
                    className="flex items-center py-2 px-4 hover:bg-orange-500 rounded-md transition-colors"
                  >
                    <FaEdit className="mr-2" /> Testimonials
                  </button>
                </li>
                <li  >
                  <button
                    onClick={() => setCurrentPage('contact')}
                    className="flex items-center py-2 px-4 hover:bg-orange-500 rounded-md transition-colors"
                  >
                    <FaEdit className="mr-2" /> Contact-us
                  </button>
                </li>
              </ul>
            )}
          </li>
          
        
          <li className="border-b border-gray-300">
  <button
    onClick={() => setIsBlogDropdownOpen(!isBlogDropdownOpen)}
    className="flex items-center py-2 px-4 hover:bg-orange-500 rounded-md transition-colors"
  >
    <FaBlog className="mr-3 text-xl" /> Blog <FaCaretDown className="ml-auto" />
  </button>
  {isBlogDropdownOpen && (
    <ul className="pl-6 space-y-4">
      <li className="border-b border-gray-300">
        <button
          onClick={() => setCurrentPage('Blog')}
          className="flex items-center py-2 px-4 hover:bg-orange-500 rounded-md transition-colors"
        >
          <FaPlus className="mr-2" /> Add Blog
        </button>
      </li>
      <li>
        <button
          onClick={() => setCurrentPage('editDeleteBlog')}
          className="flex items-center py-2 px-4 hover:bg-orange-500 rounded-md transition-colors"
        >
          <span className="flex items-center">
            <MdDelete className="text-red-600 mr-2" />
            <FaEdit className="text-blue-600 mr-2" />
          </span>
          Edit/Delete Blog
        </button>
      </li>
    </ul>
  )}
</li>

          <li className="border-b border-gray-300">
  <button
    onClick={toggleMediaDropdown}
    className="flex items-center py-2 px-4 hover:bg-orange-500 rounded-md transition-colors"
  >
    <FcGallery className="mr-3 text-xl" /> Media <FaCaretDown className="ml-auto" />
  </button>
  {isMediaDropdownOpen && (
    <ul className="pl-6 space-y-4">
      <li className="border-b border-gray-300">
        <button
          onClick={toggleInsideMedia}
          className="flex items-center py-2 px-4 hover:bg-orange-500 rounded-md transition-colors"
        >
          <FaClipboardList className="mr-2" /> Awards <FaCaretDown className="ml-auto" />
        </button>

        {insideMediaDropdown && (
          <ul className="pl-6 space-y-4">
            <li className="border-b border-gray-300">
              <button
                onClick={() => setCurrentPage('media')}
                className="flex items-center py-2 px-4 hover:bg-orange-500 rounded-md transition-colors"
              >
                Add Award <FaPlus className="ml-2 text-xl" />
              </button>
            </li>
            <li>
                <button
  onClick={() => setCurrentPage('deleteAwardMedia')}
  className="flex items-center text-pretty py-2 px-4 hover:bg-orange-500 rounded-md transition-colors"
>
  Delete/Edit Award
  <span className="flex items-center ml-2">
    <MdDelete className="text-red-600" size={24} />
    <FaEdit className="ml-2 text-blue-600" size={24} />
  </span>
</button>

                </li>
          </ul>
        )}
      </li>
    </ul>
  )}
</li>

          <li className="border-b border-gray-300">
            <button
              onClick={toggleCareersDropdown}
              className="flex items-center py-2 px-4 hover:bg-orange-500 rounded-md transition-colors"
            >
              <FcBriefcase className="mr-3 text-xl" /> Carrer  <FaCaretDown className="ml-auto" />
            </button>
            { isCareerDropdown && (
              <ul className="pl-6 space-y-4">
                <li  className="border-b border-gray-300" >
                  <button
                    onClick={() => setCurrentPage('carrer')}
                    className="flex items-center py-2 px-4 hover:bg-orange-500 rounded-md transition-colors"
                  >
                    Add Job <FaPlus  className="ml-2" />
                  </button>
                </li>
                <li>
                <button
  onClick={() => setCurrentPage('deleteCareer')}
  className="flex items-center text-pretty py-2 px-4 hover:bg-orange-500 rounded-md transition-colors"
>
  Delete/Edit Job
  <span className="flex items-center ml-2">
    <MdDelete className="text-red-600" size={24} />
    <FaEdit className="ml-2 text-blue-600" size={24} />
  </span>
</button>

                </li>
              </ul>
            )}
          </li>

          <li className="border-b border-gray-300">
            <button
              onClick={() => setCurrentPage('citya')}
              className="flex items-center py-2 px-4 hover:bg-orange-500 rounded-md transition-colors"
            >
              <FaCity className="mr-3 text-xl" /> City
            </button>
          </li>
        </ul>

        <div className="mt-auto">
          <button className="w-full bg-orange-500 text-white flex items-center justify-center py-3 rounded-md" onClick={handleLogout}>
            <FaSignOutAlt className="mr-2" /> Logout
          </button>
        </div>
      </div>
      {/* Main Content */}
      <div className="flex-1   bg-white h-screen" style={{marginLeft:"20%"}}>
        {/* Fixed Header */}
        <div style={{left:"20%"}} className="fixed top-0   right-0 bg-white text-black font-semibold p-4 border-b border-gray-300 z-10">
          <div className="flex justify-between items-center">
            <div className="text-lg">Welcome, {user?.name || 'Admin'}</div>
            <div className="flex items-center space-x-4">
              <button className="text-gray-700 hover:text-orange-500">
                <FaUserCircle className="text-xl" title="Profile" />
              </button>
              <button className="text-gray-700 hover:text-orange-500">
                <FaUserCog className="text-xl" title="Settings" />
              </button>
            </div>
          </div>
        </div>
        {/* Scrollable Content */}
        <div className="pt-16 p-6 space-y-8 overflow-y-auto h-full">
          {currentPage === 'dashboard' && <Dashboard />}
          
          {currentPage === 'testimonials' && <TestimonialsForm />}
          {currentPage === 'Add' && <UploadProjectForm />}
          {currentPage === 'Opreations' && <ShowAllProducts />}
          {currentPage === 'Blog' && <AddBlogForm />}
          {currentPage === 'media' && <AddMedia />}
          {currentPage === 'carrer' && <AddJob />}
          {currentPage==='carrerenquiries' &&   <CareerEnquiries/>}
          {currentPage==='contact' && <ContactForm/>}
          {currentPage==='deleteCareer' && <DeleteJob/>}
          {currentPage==='deleteAwardMedia' && <DeleteAwardMedia/>}
          {currentPage === 'editDeleteBlog' && <EditDeleteBlog/>}
          {currentPage === 'addService' && <WhatWeDo />}
          {currentPage === 'editDeleteService' && <EditDeleteService/>}
          {currentPage==='citya' && <CityManager/>}
          {currentPage==='deleteProp' && <DeleteProperty/>}
          {currentPage==='contactenquiries' && <ContactEnquiries/>}
        </div>
      </div>
    </div>
  );
};

function Dashboard() {
  return (
    <div className="bg-white p-8 rounded-lg shadow-lg border border-gray-300">
      <h2 className="text-2xl font-semibold text-gray-800 mb-6">Dashboard</h2>
    </div>
  );
}

export default Admin;
