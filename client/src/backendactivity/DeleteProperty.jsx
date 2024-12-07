import React, { useEffect, useState } from "react";
import {toast, Toaster} from "react-hot-toast";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";


// Optional: You can use date-fns or day.js for better date formatting
import { format } from "date-fns"; // Use 'npm install date-fns' to install

const ManageProjects = () => {
  const [data, setData] = useState([]);
  const [editProject, setEditProject] = useState({
    RERA: "",
    PropertySize: "",
    ProjectStatus: "",
    ProjectNameOnRera: "",
    ProjectTypology: "",
    ProjectName: "",
    city:"",
    floorplaneName:"",
    floorplanDescription:"",
    Possesion:"",
    PropertyCategory: "",
    PropertyType: "",
    WhereToShow:"",
    locality:"",
    BuilderName:"",
    QRCodeLink:"",
    price: {
      startingFrom: { value: "", text: "" },
      discount: { value: "", text: "" },
      basePrice: { value: "", text: "" },
      locationPremium: { value: "", text: "" },
      amenitiesCharge: { value: "", text: "" },
      tax: { value: "", text: "" },
      totalPrice: { value: "", text: "" },
    },
    projectLocation: {
      embedCode: "",
      name: "",
    },
    ContactNumber: "",
    amenities: [""],
    projectDescription: "",
     
    Brochure: null,
    home: "",
    YoutubeVideo: "",
    faqs: [{ question: "", answer: "" }],
    floorPlan: null,
    AboutTheBuilderThumbnail: null,
    AboutTheBuilderDescription: "",
    Gallery: [],
    projectthumbnail: null,
    metatitle:"",
    metadescription:"",
    metakeyword:"",
  }); // Track the project to edit
  const [cities, setCities] = useState([]);
  const [filteredSubcities, setFilteredSubcities] = useState([]);
 

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const initialFormData = {
    RERA: "",
    PropertySize: "",
    ProjectStatus: "",
    ProjectNameOnRera: "",
    ProjectTypology: "",
    ProjectName: "",
    city: "",
    Possesion: "",
    PropertyCategory: "",
    PropertyType: "",
    WhereToShow: "",
    locality: "",
    price: {
      startingFrom: { value: "", text: "" },
      discount: { value: "", text: "" },
      basePrice: { value: "", text: "" },
      locationPremium: { value: "", text: "" },
      amenitiesCharge: { value: "", text: "" },
      tax: { value: "", text: "" },
      totalPrice: { value: "", text: "" },
    },
    projectLocation: {
      embedCode: "",
      name: "",
    },
    ContactNumber: "",
    amenities: [""],
    projectDescription: "",
    Brochure: null,
    home: "",
    YoutubeVideo: "",
    faqs: [{ question: "", answer: "" }],
    floorPlan: null,
    AboutTheBuilderThumbnail: null,
    AboutTheBuilderDescription: "",
    Gallery: [],
    projectthumbnail: null,
  };
  
  // Add this function to reset the form
  const resetForm = () => {
    setFormData(initialFormData);
    setMessage(""); // Reset any messages if needed
  };
  const metaTitleMaxLength = 55;
  const metaDescriptionMaxLength = 155;

  const propertyTypes = {
    Residential: [
      { value: "Apartment", label: "Apartments" },
      { value: "Villas", label: "Villas" },
      { value: "Residential-Plots", label: "Residential Plots" },
      { value: "Independnt-Floor", label: "Independent Floor" },
      { value: "Residential-Studio", label: "Residential Studio" },
      { value: "Residential-Prereleased", label: "Residential Prereleased" },
      { value: "Other Residential", label: "Other Residential" },
    ],
    Commercial: [
      { value: "Commercial-Plots", label: "Commercial Plots" },
      { value: "Commercial-Studio", label: "Commercial Studio" },
      { value: "Office-Space", label: "Office Space" },
      { value: "Food-Court", label: "Food Court" },
      { value: "High-Street-Retails", label: "High Street Retails" },
      { value: "Shops", label: "Shops" },
      { value: "Shops-Showrooms", label: "Shops Showrooms" },
      { value: "Commercial-Prerelease", label: "Commercial Prereleased" },
      { value: "Other", label: "Other" },
    ],
  };



  useEffect(() => {
    
    const fetchCities = async () => {
      try {
        const response = await fetch("https://reality-demo.onrender.com/api/v1/city/cities");
        if (!response.ok) throw new Error("Failed to fetch cities");
        const data = await response.json();
        setCities(data.cities);
      } catch (error) {
        console.error("Error fetching cities:", error.message);
      }
    };

    fetchCities();
    
  }, [])
  

  console.log("cities", cities);


  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditProject((prev) => ({
      ...prev,
      [name]: value,
    }));
  
    if (name === "city") {
      const selectedCity = cities.find((city) => city.name === value);
      console.log("Selected City:", selectedCity); // Check the selected city
      setFilteredSubcities(selectedCity ? selectedCity.subcities : []);
    }
  };


  useEffect(() => {
    if (filteredSubcities.length > 0) {
      setEditProject((prev) => ({ ...prev, locality: "" })); // Reset locality when subcities update
    }
  }, [filteredSubcities]);
  
  
  console.log("jelll", filteredSubcities)

  const handleNestedChange = (e, parent, field) => {
    const { value } = e.target;
    setEditProject((prev) => ({
      ...prev,
      [parent]: {
        ...prev[parent],
        [field]: value,
      },
    }));
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    if (name === "Gallery") {
      setEditProject((prev) => ({
        ...prev,
        [name]: Array.from(files),
      }));
    } else {
      setEditProject((prev) => ({
        ...prev,
        [name]: files[0],
      }));
    }
  };

  const handleAddFAQ = () => {
    setEditProject((prev) => ({
      ...prev,
      faqs: [...prev.faqs, { question: "", answer: "" }],
    }));
  };

  const handleFAQChange = (e, index, field) => {
    const { value } = e.target;
    setEditProject((prev) => {
      const faqs = [...prev.faqs];
      faqs[index][field] = value;
      return { ...prev, faqs };
    });
  };
 
  const handleAddAmenity = () => {
    setEditProject((prev) => ({
      ...prev,
      amenities: [...prev.amenities, ""],
    }));
  };
  
  const handleAmenityChange = (e, index) => {
    const { value } = e.target;
    setEditProject((prev) => {
      const updatedAmenities = [...prev.amenities];
      updatedAmenities[index] = value;
      return { ...prev, amenities: updatedAmenities };
    });
  };
  
  const handleRemoveAmenity = (index) => {
    setEditProject((prev) => {
      const updatedAmenities = prev.amenities.filter((_, i) => i !== index);
      return { ...prev, amenities: updatedAmenities };
    });
  };
  

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
  
    const form = new FormData();
    for (const key in editProject) {
      if (["price", "projectLocation", "faqs"].includes(key)) {
        form.append(key, JSON.stringify(editProject[key]));
      } else if (key === "Gallery") {
        editProject[key].forEach((file) => form.append("Gallery", file));
      } else {
        form.append(key, editProject[key]);
      }
    }
  
    try {
      const response = await fetch(
        `https://reality-demo.onrender.com/api/v1/project/editProduct/${editProject?._id}`, // Update the URL to include the project slug or ID
        {
          method: "PUT", // Use PUT method for updating the project
          body: form,
        }
      );
  
      const result = await response.json();
      if (response.ok) {
        toast.success("Project updated successfully!");
        // Optionally, reset the form after successful update
        resetForm();
      } else {
        setMessage(`Error: ${result.message}`);
      }
    } catch (error) {
      setMessage(`Error: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };
  


  useEffect(() => {
    async function fetchAllProjects() {
      try {
        const response = await fetch("https://reality-demo.onrender.com/api/v1/project/getAllProjects");
        if (Array.isArray(projects) && projects.length > 0) {
          setData(projects);
        } else {
          setData([]); // Fallback to an empty array
        }
      } catch (error) {
        console.error("Error fetching projects:", error);
      }
    }
    fetchAllProjects();
  }, []);

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`https://reality-demo.onrender.com/api/v1/project/deleteProject/${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        toast.success("Project deleted successfully");
        setData(data.filter((project) => project._id !== id));
      } else {
        toast.error("Failed to delete project");
      }
    } catch (error) {
      console.error("Error deleting project:", error);
      toast.error("An error occurred");
    }
  };

  const handleEdit = (slug) => {


    
  
    const fetchProjectBySlug = async () => {
      try {
        const response = await fetch(`https://reality-demo.onrender.com/api/v1/project/${slug}`);
        const data = await response.json();
        setEditProject((prevState) => ({
          ...prevState,
          ...data, // Spread the project data to update the state
          price: {
            startingFrom: { value: data.price.startingFrom, text: data.price.startingFromText || '' },
            discount: { value: data.price.discount, text: data.price.discountText || '' },
            basePrice: { value: data.price.basePrice, text: data.price.basePriceText || '' },
            locationPremium: { value: data.price.locationPremium, text: data.price.locationPremiumText || '' },
            amenitiesCharge: { value: data.price.amenitiesCharge, text: data.price.amenitiesChargeText || '' },
            tax: { value: data.price.tax, text: data.price.taxText || '' },
            totalPrice: { value: data.price.totalPrice, text: data.price.totalPriceText || '' },
          }
        }));
      } catch (error) {
        console.error("Error fetching projects:", error);
      }
    };

    fetchProjectBySlug();
   
  
     
  };

  console.log("PROJECT_DETAILS_Edit", editProject)

  return (
    <div className="container mx-auto p-6">
      <Toaster />
      <h1 className="text-3xl font-semibold text-gray-800 mb-6">Manage Projects</h1>

      {data.length === 0 ? (
        <p className="text-center text-xl text-gray-500">No projects found.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {data?.map((project) => (
            <div key={project._id} className="bg-white border shadow-lg rounded-lg overflow-hidden">
              <div className="p-6">
                <h2 className="text-xl font-semibold text-gray-800">{project.ProjectName}</h2>
                
                {/* Displaying project creation date */}
                <p className="text-sm text-gray-500 mt-2">
                  Created on: {format(new Date(project.createdAt), "MMMM dd, yyyy h:mm a")}
                </p>
              </div>
              <div className="p-4 bg-gray-50 flex justify-between items-center">
                <button
                  onClick={() => handleEdit(project?.slug)}
                  className="bg-blue-500 text-white px-6 py-2 rounded-md hover:bg-blue-600 transition duration-300"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(project._id)}
                  className="bg-red-500 text-white px-6 py-2 rounded-md hover:bg-red-600 transition duration-300"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {editProject && (
        <form onSubmit={handleSubmit} className="space-y-6" enctype="multipart/form-data">
        {/* Basic Fields */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-white p-6 rounded-lg shadow-lg border">
  <div>
    <label className="block text-sm font-medium text-gray-700 mb-1">RERA</label>
    <input
      type="text"
      name="RERA"
      value={ editProject.RERA}
      onChange={handleInputChange}
      className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
      placeholder="Enter RERA"
      required
    />
  </div>
  <div>
    <label className="block text-sm font-medium text-gray-700 mb-1">Property Size</label>
    <input
      type="number"
      name="PropertySize"
      value={ editProject.PropertySize}
      onChange={handleInputChange}
      className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
      placeholder="Enter Property Size (sq. ft.)"
      required
    />
  </div>
  <div>
    <label className="block text-sm font-medium text-gray-700 mb-1">Project Status</label>
    <input
      type="text"
      name="ProjectStatus"
      value={ editProject.ProjectStatus}
      onChange={handleInputChange}
      className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
      placeholder="e.g., Ongoing, Completed"
      required
    />
  </div>
  <div>
    <label className="block text-sm font-medium text-gray-700 mb-1">Project Name</label>
    <input
      type="text"
      name="ProjectName"
      value={ editProject.ProjectName}
      onChange={handleInputChange}
      className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
      placeholder="Enter Project Name"
      required
    />
  </div>
  <div>
    <label className="block text-sm font-medium text-gray-700 mb-1">Project Name On RERA</label>
    <input
      type="text"
      name="ProjectNameOnRera"
      value={ editProject.ProjectNameOnRera}
      onChange={handleInputChange}
      className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
      placeholder="Enter RERA Name"
      required
    />
  </div>
  <div>
  <label className="block text-sm font-medium text-gray-700 mb-1">Typology</label>
    <input
      type="text"
      name="ProjectTypology"
      value={ editProject.ProjectTypology}
      onChange={handleInputChange}
      placeholder="e.g., 2BHK, 3BHK"
      className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
      required
    />
  </div>
 
 
  <div>
    <label className="block text-sm font-medium text-gray-700 mb-1">Contact Number</label>
    <input
      type="text"
      name="ContactNumber"
      value={ editProject.ContactNumber}
      onChange={handleInputChange}
      className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
      placeholder="Enter Contact Number"
      required
    />
  </div>
  
 
  <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">City</label>
          <select
            name="city"
            value={ editProject.city}
            onChange={handleInputChange}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            required
          >
            <option value="" disabled>
              Select a city
            </option>
            {cities.map((city) => (
              <option key={city._id} value={city.name}>
                {city.name}
              </option>
            ))}
          </select>
        </div>

        {/* Locality Dropdown */}
        <div className="mb-4">
  <label className="block text-sm font-medium text-gray-700 mb-1">Locality</label>
  <select
    name="locality"
    value={editProject.locality}
    onChange={handleInputChange}
    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
    required
  >
    <option value="" disabled>
      Select a locality
    </option>
    {filteredSubcities.map((subcity) => (
      <option key={subcity._id} value={subcity.name}>
        {subcity.name}
      </option>
    ))}
  </select>
</div>

   
        <div className="mb-4">
  <label className="block text-sm font-medium text-gray-700 mb-1">Meta Title</label>
  <input
    type="text"
    name="metatitle"
    value={editProject.metatitle ?? ""}  // Ensure it's never undefined or null
    onChange={handleInputChange}
    placeholder="Enter Meta Title.."
    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
    maxLength={metaTitleMaxLength}
    required
  />
  <p className="text-sm text-red-600 mt-1">
    {metaTitleMaxLength - (editProject.metatitle?.length ?? 0)} characters remaining
  </p>
</div>


      <div>
  <label className="block text-sm font-medium text-gray-700 mb-1">Meta Description</label>
  <input
    type="text"
    name="metadescription"
    value={editProject.metadescription ?? ""}  // Ensure it's never undefined or null
    onChange={handleInputChange}
    placeholder="Enter Meta Description.."
    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
    maxLength={metaDescriptionMaxLength}
    required
  />
  <p className="text-sm text-red-500 mt-1">
    {metaDescriptionMaxLength - (editProject.metadescription?.length ?? 0)} characters remaining
  </p>
</div>

  <div>
    <label className="block text-sm font-medium text-gray-700 mb-1">Meta Keywords</label>
    <input
      type="text"
      name="metakeyword"
      value={ editProject.metakeyword}
      onChange={handleInputChange}
      placeholder="eg. Product Name, Product Category ..."
      className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
      required
    />
  </div>
  <div>
    <label className="block text-sm font-medium text-gray-700 mb-1">YouTube Video</label>
    <textarea
      name="YouTubeVideo"
      value={ editProject.YouTubeVideo}
      onChange={handleInputChange}
      className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
      placeholder="Paste YouTube video link"
      rows="2"
      required
    ></textarea>
  </div>
</div>
<div className="bg-white rounded-lg shadow-lg border p-6">
  <h2 className="text-lg font-medium">Where To Show</h2>
  <div>
    <select
      name="WhereToShow" // Match this name with the state key
      value={ editProject.WhereToShow} // Bind this to the correct state key
      onChange={handleInputChange} // Handle the state update
      className="w-full border rounded px-3 py-2"
      required
    >
      <option value="">Select an Option</option> {/* Add a placeholder option */}
      <option value="Featured-Collection">Featured Collections</option>
      <option value="Trending-Project">Trending Project</option>
      <option value="Top-Project">Top Project</option>
      <option value="All">All</option>
    </select>
  </div>
</div>

<div className="bg-white rounded-lg shadow-lg border p-6">
  <h2 className="text-lg font-medium">Possesion Within</h2>
  <div>
    <select
      name="Possesion" // Match this name with the state key
      value={ editProject.Possesion} // Bind this to the correct state key
      onChange={handleInputChange} // Handle the state update
      className="w-full border rounded px-3 py-2"
      required
    >
      <option value="">Select an Option</option> {/* Add a placeholder option */}
      <option value="3 Months">3 Months</option>
      <option value="6 MOnths">6 Months</option>
      <option value="1 Year">1 Year</option>
      <option value="2 Years +">2 Years +</option>
      <option value="Ready To Move">Ready To Move</option>
    </select>
  </div>
</div>

<div className="bg-white rounded-lg shadow-lg border p-6">
    <label className="text-lg font-medium">Project Description</label>
    {/* <input
      type="text"
      name="projectDescription"
      value={formData.projectDescription}
      onChange={handleInputChange}
      placeholder="Enter  project description"
      className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
      required
    /> */}
   <ReactQuill
  value={ editProject.projectDescription}
  onChange={(content) =>
     setEditProject((prev) => ({
      ...prev,
      projectDescription: content,
    }))
  }
  modules={quillModules}
  theme="snow"
/>

  </div>

<div className="bg-white rounded-lg shadow-lg border p-6">
      <h2 className="text-lg font-medium">Property Category</h2>
      <div>
        {/* Property Category Dropdown */}
        <select
          name="PropertyCategory"
          value={editProject.PropertyCategory}
          onChange={handleInputChange}
          className="w-full border rounded px-3 py-2"
          required
        >
          <option value="">Property Category</option>
          <option value="Residential">Residential Property</option>
          <option value="Commercial">Commercial Property</option>
        </select>

        {/* Property Type Dropdown */}
        { editProject.PropertyCategory && (
          <select
            name="PropertyType"
            value={ editProject.PropertyType}
            onChange={handleInputChange}
            className="w-full border rounded px-3 py-2 mt-4"
            required
          >
            <option value="">Property Type</option>
            {propertyTypes[editProject.PropertyCategory].map((type) => (
              <option key={type.value} value={type.value}>
                {type.label}
              </option>
            ))}
          </select>
        )}
      </div>
      
    </div>


        {/* Price Section */}
        <div className="col-span-2">
      <label className="block text-sm font-medium text-gray-700 mb-1">Price Details</label>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {['startingFrom', 'discount', 'basePrice', 'locationPremium', 'amenitiesCharge', 'tax', 'totalPrice'].map((field) => (
          <div key={field}>
            <label className="block text-sm font-medium text-gray-700 mb-1">{field.replace(/([A-Z])/g, ' $1')}</label>
            <input
              type="number"
              name={`price.${field}`}
              value={ editProject.price[field].value}
              onChange={(e) => handleNestedChange(e, 'price', field)}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder={`Enter ${field.replace(/([A-Z])/g, ' $1')}`}
              required
            />
          </div>
        ))}
      </div>
    </div>

 



       
<div p-6 bg-white rounded-lg shadow-lg border >
{ editProject.faqs.map((faq, index) => (
    <div key={index} className="grid grid-cols-2 gap-4 mb-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Question {index + 1}
        </label>
        <input
          type="text"
          placeholder="Enter question"
          value={faq.question}
          onChange={(e) => handleFAQChange(e, index, "question")}
          className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Answer {index + 1}
        </label>
        <textarea
          placeholder="Enter answer"
          value={faq.answer}
          onChange={(e) => handleFAQChange(e, index, "answer")}
          className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        ></textarea>
      </div>
      <div className="col-span-2 flex justify-end">
        <button
          type="button"
          onClick={() =>
            setFormData((prev) => {
              const updatedFAQs = [...prev.faqs];
              updatedFAQs.splice(index, 1); // Remove FAQ
              return { ...prev, faqs: updatedFAQs };
            })
          }
          className="text-red-500 hover:underline"
        >
          Remove
        </button>
      </div>
    </div>
  ))}
  <button
    type="button"
    onClick={handleAddFAQ}
    className="text-blue-500 hover:underline"
  >
    + Add FAQ
  </button>
</div>
        {/* FAQs */}
        
        <div className="p-6 bg-white rounded-lg shadow-lg border">
  <h2 className="text-lg font-medium text-gray-800 mb-4">Amenities</h2>
  { editProject.amenities.map((amenity, index) => (
    <div key={index} className="flex items-center gap-4 mb-4">
      <input
        type="text"
        placeholder={`Amenity ${index + 1}`}
        value={amenity}
        onChange={(e) => handleAmenityChange(e, index)}
        className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
      />
      <button
        type="button"
        onClick={() => handleRemoveAmenity(index)}
        className="text-red-500 hover:text-red-700"
      >
        Remove
      </button>
    </div>
  ))}
  <button
    type="button"
    onClick={handleAddAmenity}
    className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
  >
    Add Amenity
  </button>
</div>




        {/* File Uploads */}
        <div className=" bg-white rounded-lg shadow-lg border p-6">
          <label className="block text-sm font-medium">Thumbnail</label>
          <input
            type="file"
            name="projectthumbnail"
            onChange={handleFileChange}
            className="w-full"
            required
          />
        </div>
        <div className=" bg-white rounded-lg shadow-lg border p-6">
          <label className="block text-sm font-medium">Gallery</label>
          <input
            type="file"
            name="Gallery"
            onChange={handleFileChange}
            className="w-full"
            multiple
          />
        </div>
        <div className=" bg-white rounded-lg shadow-lg border p-6">
  <h2 className="text-lg font-medium">Project Location</h2>
  <div>
    <label className="block text-sm font-medium">Embed Code</label>
    <textarea
      placeholder="Enter embed code for map"
      value={ editProject.projectLocation.embedCode}
      onChange={(e) => handleNestedChange(e, "projectLocation", "embedCode")}
      className="w-full border rounded px-3 py-2"
      required
    />
  </div>
  <div className=" bg-white rounded-lg shadow-lg border p-6"> 
    <label className="block text-sm font-medium">Location Name</label>
    <input
      type="text"
      placeholder="Enter location name"
      value={ editProject.projectLocation.name}
      onChange={(e) => handleNestedChange(e, "projectLocation", "name")}
      className="w-full border rounded px-3 py-2"
      required
    />
  </div>
</div>
{/* About the Builder */}
 {/* About the Builder */}
<div className=" bg-white rounded-lg shadow-lg border p-6">
  <h2 className="text-lg font-medium">About the Builder</h2>
  <div>
    <label className="block text-sm font-medium p-4">Thumbnail</label>
    <input
      type="file"
      name="AboutTheBuilderThumbnail"
      onChange={handleFileChange}
      className="w-full"
      required
    />
  </div>
 
  <div>
    <label className="block text-sm p-4 font-medium"> Description</label>
    <textarea
      placeholder="Enter about the builder description"
      name="AboutTheBuilderDescription"
      value={ editProject.AboutTheBuilderDescription}
      onChange={handleInputChange}
      className="w-full border rounded px-3 py-2"
      required
    />
  </div>
  <div>
    <label className="block text-sm p-4 font-medium"> QR Code Link</label>
    <input
      placeholder="Enter qr code link"
      name="QRCodeLink"
      value={ editProject.QRCodeLink}
      onChange={handleInputChange}
      className="w-full border rounded px-3 py-2"
      required
    />
  </div>
  <div>
    <label className="block text-sm p-4 font-medium"> Builder Name</label>
    <input
      placeholder="Enter qr code link"
      name="BuilderName"
      value={ editProject.BuilderName}
      onChange={handleInputChange}
      className="w-full border rounded px-3 py-2"
      required
    />
  </div>
</div>
<div className="bg-white rounded-lg shadow-lg border p-6">
          <h2 className="text-lg font-medium">Upload Files</h2>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Brochure</label>
            <input
              type="file"
              name="Brochure"
              onChange={handleFileChange}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div className="mt-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">Floor Plan</label>
            <input
              type="file"
              name="floorPlan"
              onChange={handleFileChange}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div>
    <label className="block text-sm font-medium text-gray-700 mb-1">Floor Plan Name</label>
    <input
      type="text"
      name="floorplaneName"
      value={ editProject.floorplaneName}
      onChange={handleInputChange}
      placeholder="eg.  Floor plan name"
      className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
      required
    />
  </div>
  <div>
    <label className="block text-sm font-medium text-gray-700 mb-1">Floor Plan Description</label>
    <textarea
      type="text"
      name="floorplanDescription"
      value={ editProject.floorplanDescription}
      onChange={handleInputChange}
      placeholder="eg.  Floor plan name"
      className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
      required
    />
  </div>
</div>
{/* Home */}
 
{/* Home */}
<div className="bg-white rounded-lg shadow-lg border p-6">
  <h2 className="text-lg font-medium">Type of Property</h2>
  <div>
 
    <select
      name="home"
      value={ editProject.home}
      onChange={handleInputChange} // No need to trim or validate here as options are limited
      className="w-full border rounded px-3 py-2"
      required
    >
      <option value="">Select</option>
      <option value="buy">Buy</option>
      <option value="rent">Rent</option>
    </select>
  </div>
</div>



        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded"
          disabled={loading}
        >
          {loading ? "Updating..." : "Update Project"}
        </button>
      </form>
      )}
    </div>
  );
};

export default ManageProjects;


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