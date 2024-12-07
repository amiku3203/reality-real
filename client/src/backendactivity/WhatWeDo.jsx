import React, { useState } from 'react';
import { FaPlus, FaTrashAlt } from 'react-icons/fa';
import toast, {Toaster} from "react-hot-toast";
const WhatWeDo = () => {
  const [services, setServices] = useState([{ title: '', description: '' }]);
  const [description, setDescription] = useState('');

  const handleServiceChange = (index, field, value) => {
    const updatedServices = [...services];
    updatedServices[index][field] = value;
    setServices(updatedServices);
  };

  const addServiceField = () => {
    setServices([...services, { title: '', description: '' }]);
  };

  const removeServiceField = (index) => {
    const updatedServices = services.filter((_, i) => i !== index);
    setServices(updatedServices);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:8000/api/v1/about', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ services, description }),
      });

      if (response.ok) {
        toast.success("Hey You are Just Added One Servie");
        setServices([{ title: '', description: '' }]);
        setDescription('');
      } else {
        alert('Failed to add data');
      }
    } catch (error) {
      console.error('Error adding data:', error);
      alert('Failed to add data');
    }
  };

  return (
    <div className="max-w-5xl mx-auto sm:p-8 rounded-xl">
      <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-800 mb-6 text-center">
        What We Do
      </h2>
      <form onSubmit={handleSubmit} className="space-y-8">
        <div>
          <label className="block text-lg font-semibold text-gray-700 mb-2">
            Overview:
          </label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-400 focus:border-blue-400"
            rows="4"
            placeholder="Provide a brief overview of your services..."
            required
          ></textarea>
        </div>
        <div className="space-y-6">
          {services.map((service, index) => (
            <div
              key={index}
              className="bg-white border border-gray-200 rounded-lg p-6 shadow-md relative transition-transform transform"
            >
              <button
                type="button"
                onClick={() => removeServiceField(index)}
                className="absolute top-2 right-2 text-red-500 hover:text-red-700"
              >
                <FaTrashAlt />
              </button>
              <div className="mb-4">
                <label className="block text-lg font-medium text-gray-700">Title:</label>
                <input
                  type="text"
                  value={service.title}
                  onChange={(e) => handleServiceChange(index, 'title', e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-green-400 focus:border-green-400"
                  placeholder="Enter service title"
                  required
                />
              </div>
              <div>
                <label className="block text-lg font-medium text-gray-700">Description:</label>
                <textarea
                  value={service.description}
                  onChange={(e) => handleServiceChange(index, 'description', e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-green-400 focus:border-green-400"
                  rows="3"
                  placeholder="Provide a brief description"
                  required
                ></textarea>
              </div>
            </div>
          ))}
        </div>
        <div className="flex flex-col sm:flex-row gap-4 justify-center sm:justify-between items-center mt-6">
          <button
            type="button"
            onClick={addServiceField}
            className="flex items-center gap-2 bg-blue-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            <FaPlus /> Add Service
          </button>
          <button
            type="submit"
            className="bg-green-500 text-white px-6 py-3 rounded-lg shadow-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-400"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default WhatWeDo;
