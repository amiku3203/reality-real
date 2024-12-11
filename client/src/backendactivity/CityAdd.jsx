import React, { useState, useEffect } from "react";
import { FaEdit, FaTrash, FaPlus } from "react-icons/fa";
import {toast,Toaster} from "react-hot-toast"
const CityManager = () => {
  const [cities, setCities] = useState([]);
  const [cityName, setCityName] = useState("");
  const [subcityName, setSubcityName] = useState("");
  const [selectedCityId, setSelectedCityId] = useState(null);

  const fetchCities = async () => {
    try {
      const response = await fetch("http://localhost:8000/api/v1/city/cities");
      if (!response.ok) throw new Error("Failed to fetch cities");
      const data = await response.json();
      setCities(data.cities);
    } catch (error) {
      // console.error("Error fetching cities:", error.message);
    }
  };

  const addCity = async () => {
    if (!cityName) return alert("City name is required.");
    try {
      const response = await fetch("http://localhost:8000/api/v1/city/add-city", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: cityName }),
      });
      // if (!response.ok) throw new Error("Failed to add city");
      setCityName("");
      fetchCities();
    } catch (error) {
      // console.error("Error adding city:", error.message);
    }
  };

  const addSubcity = async () => {
    if (!subcityName || !selectedCityId) return alert("Subcity name and City ID are required.");
    try {
      const response = await fetch("http://localhost:8000/api/v1/city/add-subcity", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ cityId: selectedCityId, name: subcityName }),
      });
      if (!response.ok) throw new Error("Failed to add subcity");
      setSubcityName("");
      
      fetchCities();
    } catch (error) {
      // console.error("Error adding subcity:", error.message);
    }
  };

  const deleteCity = async (cityId) => {
    try {
      const response = await fetch(`http://localhost:8000/api/v1/city/delete-city/${cityId}`, {
        method: "DELETE",
      });
      if (!response.ok) throw new Error("Failed to delete city");
      toast.success("Deleted Succefully");
      fetchCities();
    } catch (error) {
      // console.error("Error deleting city:", error.message);
    }
  };

  const deleteSubcity = async (cityId, subcityId) => {
    try {
      const response = await fetch(
        `http://localhost:8000/api/v1/city/delete-subcity/${cityId}/${subcityId}`,
        {
          method: "DELETE",
        }
      );
      if (!response.ok) throw new Error("Failed to delete subcity");
      fetchCities();
      toast.success("Deleted Successfully");
    } catch (error) {
      console.error("Error deleting subcity:", error.message);
    }
  };

  useEffect(() => {
    fetchCities();
  }, []);

  return (
    <div className="container mx-auto p-6 max-w-4xl bg-gray-100 rounded-lg shadow-lg">
      <Toaster/>
      <header className="text-center mb-8">
        <h1 className="text-5xl font-bold text-blue-800">City & Subcity Manager</h1>
        <p className="text-lg text-gray-700 mt-4">
          A robust and intuitive platform to manage your categories (Cities) and subcategories
          (Subcities). Perfect for organizing your project hierarchy, enhancing navigation, and
          keeping data well-structured.
        </p>
      </header>

      {/* Add City Section */}
      <div className="mb-12">
        <h2 className="text-3xl font-semibold text-blue-700">Add a New Category (City)</h2>
        <p className="text-sm text-gray-600 mb-4">
          Create a top-level category to group relevant subcategories and organize your project.
        </p>
        <div className="flex flex-wrap items-center gap-4 mt-4">
          <input
            type="text"
            className="flex-grow border rounded-lg px-4 py-2 shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
            placeholder="Enter city name"
            value={cityName}
            onChange={(e) => setCityName(e.target.value)}
          />
          <button
            className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg shadow-md hover:bg-blue-700 focus:ring-2 focus:ring-blue-400"
            onClick={addCity}
          >
            <FaPlus /> Add City
          </button>
        </div>
      </div>

      {/* Add Subcity Section */}
      <div className="mb-12">
        <h2 className="text-3xl font-semibold text-green-700">Add a New Subcategory (Subcity)</h2>
        <p className="text-sm text-gray-600 mb-4">
          Add a detailed subcategory under a specific category to fine-tune your hierarchy.
        </p>
        <div className="flex flex-wrap items-center gap-4 mt-4">
          <select
            className="flex-grow border rounded-lg px-4 py-2 shadow-sm focus:ring-2 focus:ring-green-500 focus:outline-none"
            onChange={(e) => setSelectedCityId(e.target.value)}
            value={selectedCityId || ""}
          >
            <option value="" disabled>
              Select a city
            </option>
            {cities.map((city) => (
              <option key={city._id} value={city._id}>
                {city.name}
              </option>
            ))}
          </select>
          <input
            type="text"
            className="flex-grow border rounded-lg px-4 py-2 shadow-sm focus:ring-2 focus:ring-green-500 focus:outline-none"
            placeholder="Enter subcity name"
            value={subcityName}
            onChange={(e) => setSubcityName(e.target.value)}
          />
          <button
            className="flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-lg shadow-md hover:bg-green-700 focus:ring-2 focus:ring-green-400"
            onClick={addSubcity}
          >
            <FaPlus /> Add Subcity
          </button>
        </div>
      </div>

      {/* Display Cities and Subcities */}
      <div>
        <h2 className="text-3xl font-semibold text-gray-800 mb-6">
          Manage Categories & Subcategories
        </h2>
        {cities.length === 0 ? (
          <p className="text-gray-500">
            No categories available yet. Add a new category to get started!
          </p>
        ) : (
          cities.map((city) => (
            <div
              key={city._id}
              className="border rounded-lg p-4 mb-4 bg-white shadow-md"
            >
              <div className="flex justify-between items-center">
                <h3 className="text-xl font-bold text-blue-800">{city.name}</h3>
                <button
                  className="text-red-500 hover:text-red-600"
                  onClick={() => deleteCity(city._id)}
                >
                  <FaTrash />
                </button>
              </div>
              {city.subcities.length > 0 && (
                <ul className="mt-4 space-y-2">
                  {city.subcities.map((subcity) => (
                    <li
                      key={subcity._id}
                      className="flex justify-between items-center bg-gray-100 p-2 rounded"
                    >
                      <span className="text-gray-800">{subcity.name}</span>
                      <button
                        className="text-red-500 hover:text-red-600"
                        onClick={() => deleteSubcity(city._id, subcity._id)}
                      >
                        <FaTrash />
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default CityManager;
