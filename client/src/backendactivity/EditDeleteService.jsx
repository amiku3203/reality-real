import React, { useState, useEffect } from 'react';
import { FaCheckCircle, FaEdit, FaTrash } from 'react-icons/fa';

const WhatWeDo = () => {
  const [whatWeDo, setWhatWeDo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [editingService, setEditingService] = useState(null);
  const [editedService, setEditedService] = useState({ title: '', description: '' });

  // Fetch data from API
  useEffect(() => {
    const fetchWhatWeDo = async () => {
      try {
        const response = await fetch('https://reality-demo.onrender.com/api/v1/about');
        const data = await response.json();
        if (response.ok) {
          setWhatWeDo(data.data[0]); // Assuming there's only one document
        } else {
          setError('Failed to fetch data');
        }
      } catch (error) {
        setError('Failed to fetch data');
      } finally {
        setLoading(false);
      }
    };

    fetchWhatWeDo();
  }, []);

  const handleDelete = async (serviceId) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this service?");
    if (confirmDelete) {
      const response = await fetch(`https://reality-demo.onrender.com/api/v1/about/service/delete/${serviceId}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        setWhatWeDo({
          ...whatWeDo,
          services: whatWeDo.services.filter((service) => service._id !== serviceId),
        });
        alert('Service deleted successfully');
      } else {
        alert('Error deleting service');
      }
    }
  };

  const handleEdit = (service) => {
    setEditingService(service._id);
    setEditedService({ title: service.title, description: service.description });
  };

  const handleSaveEdit = async () => {
    const response = await fetch(`https://reality-demo.onrender.com/api/v1/about/service/edit/${editingService}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(editedService),
    });

    if (response.ok) {
      const updatedService = await response.json();
      setWhatWeDo({
        ...whatWeDo,
        services: whatWeDo.services.map((service) =>
          service._id === editingService ? { ...service, ...editedService } : service
        ),
      });
      setEditingService(null);
      alert('Service updated successfully');
    } else {
      alert('Error updating service');
    }
  };

  if (loading) {
    return <div className="text-center text-xl text-gray-600">Loading...</div>;
  }

  if (error) {
    return <div className="text-center text-xl text-red-500">{error}</div>;
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-10 rounded-xl">
      {/* Services Section */}
      <div className="space-y-8">
        <h3 className="text-4xl font-semibold text-gray-800 text-center mb-8">Our Services</h3>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {whatWeDo?.services?.map((service) => (
            <div
              key={service._id}
              className="bg-gradient-to-r from-orange-500 to-orange-300 p-6 rounded-lg shadow-lg hover:shadow-2xl transition-all duration-300 ease-in-out transform hover:scale-105"
            >
              <div className="flex items-center mb-4">
                <FaCheckCircle className="text-white text-3xl mr-4" />
                <h4 className="text-2xl font-semibold text-black">{service.title}</h4>
              </div>
              <p className="text-lg text-gray-800">{service.description}</p>

              <div className="flex justify-between mt-4">
                <button
                  onClick={() => handleEdit(service)}
                  className="bg-yellow-500 text-white py-2 px-4 rounded-full flex items-center space-x-1"
                >
                  <FaEdit />
                  <span>Edit</span>
                </button>
                <button
                  onClick={() => handleDelete(service._id)}
                  className="bg-red-500 text-white py-2 px-4 rounded-full flex items-center space-x-1"
                >
                  <FaTrash />
                  <span>Delete</span>
                </button>
              </div>

              {editingService === service._id && (
                <div className="mt-4">
                  <input
                    type="text"
                    className="w-full p-3 border border-gray-300 rounded-md mb-2"
                    value={editedService.title}
                    onChange={(e) => setEditedService({ ...editedService, title: e.target.value })}
                  />
                  <textarea
                    className="w-full p-3 border border-gray-300 rounded-md"
                    value={editedService.description}
                    onChange={(e) => setEditedService({ ...editedService, description: e.target.value })}
                  ></textarea>
                  <button
                    onClick={handleSaveEdit}
                    className="bg-blue-500 text-white py-2 px-4 rounded-full mt-4"
                  >
                    Save
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default WhatWeDo;
