import React, { useEffect, useState } from "react";
import {toast, Toaster} from "react-hot-toast";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
const CreateProject = () => {

  const [cities, setCities] = useState([]);
  const [filteredSubcities, setFilteredSubcities] = useState([]);
  const [formData, setFormData] = useState({
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
  });

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
        const response = await fetch("http://localhost:8000/api/v1/city/cities");
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
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    if (name === "city") {
      const selectedCity = cities.find((city) => city.name === value);
      setFilteredSubcities(selectedCity ? selectedCity.subcities : []);
      setFormData((prev) => ({ ...prev, locality: "" })); // Reset locality when city changes
    }
 
  };

  const handleNestedChange = (e, parent, field) => {
    const { value } = e.target;
    setFormData((prev) => ({
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
      setFormData((prev) => ({
        ...prev,
        [name]: Array.from(files),
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: files[0],
      }));
    }
  };

  const handleAddFAQ = () => {
    setFormData((prev) => ({
      ...prev,
      faqs: [...prev.faqs, { question: "", answer: "" }],
    }));
  };

  const handleFAQChange = (e, index, field) => {
    const { value } = e.target;
    setFormData((prev) => {
      const faqs = [...prev.faqs];
      faqs[index][field] = value;
      return { ...prev, faqs };
    });
  };
 
  const handleAddAmenity = () => {
    setFormData((prev) => ({
      ...prev,
      amenities: [...prev.amenities, ""],
    }));
  };
  
  const handleAmenityChange = (e, index) => {
    const { value } = e.target;
    setFormData((prev) => {
      const updatedAmenities = [...prev.amenities];
      updatedAmenities[index] = value;
      return { ...prev, amenities: updatedAmenities };
    });
  };
  
  const handleRemoveAmenity = (index) => {
    setFormData((prev) => {
      const updatedAmenities = prev.amenities.filter((_, i) => i !== index);
      return { ...prev, amenities: updatedAmenities };
    });
  };
  

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const form = new FormData();
    for (const key in formData) {
      if (["price", "projectLocation", "faqs"].includes(key)) {
        form.append(key, JSON.stringify(formData[key]));
      } else if (key === "Gallery") {
        formData[key].forEach((file) => form.append("Gallery", file));
      } else {
        form.append(key, formData[key]);
      }
    }

    try {
      const response = await fetch(
        "http://localhost:8000/api/v1/project/createProject",
        {
          method: "POST",
          body: form,
        }
      );

      const result = await response.json();
      if (response.ok) {
        toast.success("Hey You Have Just Added A Property !");
        // setMessage("Project created successfully!");
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


  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded shadow-md">
      <Toaster/>
      <h1 className="text-2xl font-bold mb-4">Create Project</h1>
      <form onSubmit={handleSubmit} className="space-y-6" enctype="multipart/form-data">
        {/* Basic Fields */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-white p-6 rounded-lg shadow-lg border">
  <div>
    <label className="block text-sm font-medium text-gray-700 mb-1">RERA</label>
    <input
      type="text"
      name="RERA"
      value={formData.RERA}
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
      value={formData.PropertySize}
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
      value={formData.ProjectStatus}
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
      value={formData.ProjectName}
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
      value={formData.ProjectNameOnRera}
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
      value={formData.ProjectTypology}
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
      value={formData.ContactNumber}
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
            value={formData.city}
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
            value={formData.locality}
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
          value={formData.metatitle}
          onChange={handleInputChange}
          placeholder="Enter Meta Title.."
          className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          maxLength={metaTitleMaxLength}
          required
        />
        <p className="text-sm text-red-600 mt-1">
          {metaTitleMaxLength - formData?.metatitle?.length} characters remaining
        </p>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Meta Description</label>
        <input
          type="text"
          name="metadescription"
          value={formData.metadescription}
          onChange={handleInputChange}
          placeholder="Enter Meta Description.."
          className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          maxLength={metaDescriptionMaxLength}
          required
        />
        <p className="text-sm text-red-500 mt-1">
          {metaDescriptionMaxLength - formData?.metadescription?.length} characters remaining
        </p>
      </div>
  <div>
    <label className="block text-sm font-medium text-gray-700 mb-1">Meta Keywords</label>
    <input
      type="text"
      name="metakeyword"
      value={formData.metakeyword}
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
      value={formData.YouTubeVideo}
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
      value={formData.WhereToShow} // Bind this to the correct state key
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
      value={formData.Possesion} // Bind this to the correct state key
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
  value={formData.projectDescription}
  onChange={(content) =>
    setFormData((prev) => ({
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
          value={formData.PropertyCategory}
          onChange={handleInputChange}
          className="w-full border rounded px-3 py-2"
          required
        >
          <option value="">Property Category</option>
          <option value="Residential">Residential Property</option>
          <option value="Commercial">Commercial Property</option>
        </select>

        {/* Property Type Dropdown */}
        {formData.PropertyCategory && (
          <select
            name="PropertyType"
            value={formData.PropertyType}
            onChange={handleInputChange}
            className="w-full border rounded px-3 py-2 mt-4"
            required
          >
            <option value="">Property Type</option>
            {propertyTypes[formData.PropertyCategory].map((type) => (
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
              value={formData.price[field].value}
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
{formData.faqs.map((faq, index) => (
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
  {formData.amenities.map((amenity, index) => (
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
      value={formData.projectLocation.embedCode}
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
      value={formData.projectLocation.name}
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
      value={formData.AboutTheBuilderDescription}
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
      value={formData.QRCodeLink}
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
      value={formData.BuilderName}
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
      value={formData.floorplaneName}
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
      value={formData.floorplanDescription}
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
      value={formData.home}
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
          {loading ? "Creating..." : "Create Project"}
        </button>
      </form>
      {message && <p className="mt-4 text-center text-red-600">{message}</p>}
    </div>
  );
};

export default CreateProject;
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