import React, { useEffect, useState } from "react";
import { FaTrash, FaEdit } from "react-icons/fa";
import { motion } from "framer-motion";
import Modal from "react-modal";

Modal.setAppElement("#root");

const Awards = () => {
    const [awards, setAwards] = useState([]);
    const [loading, setLoading] = useState(true);
    const [editingAward, setEditingAward] = useState(null); // For editing mode
    const [editForm, setEditForm] = useState({ title: "", description: "", mediaThumbnail: null });
    const [previewImage, setPreviewImage] = useState(null);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        setLoading(true);
        try {
            const response = await fetch("http://localhost:8000/api/v1/media/allmedia");
            const data = await response.json();
            setAwards(data.media);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
        setLoading(false);
    };

    const handleDelete = async (id) => {
        try {
            await fetch(`http://localhost:8000/api/v1/media/deleteMedia/${id}`, {
                method: "DELETE",
            });
            setAwards(awards.filter((award) => award._id !== id));
        } catch (error) {
            console.error("Error deleting media:", error);
        }
    };

    const handleEditClick = (award) => {
        setEditingAward(award);
        setEditForm({ title: award.title, description: award.description, mediaThumbnail: null });
        setPreviewImage(award.mediaThumbnails ? `http://localhost:8000${award.mediaThumbnails}` : null);
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        setEditForm({ ...editForm, mediaThumbnail: file });
        setPreviewImage(URL.createObjectURL(file));
    };

    const handleEditSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append("title", editForm.title);
        formData.append("description", editForm.description);
        if (editForm.mediaThumbnail) {
            formData.append("mediaThumbnail", editForm.mediaThumbnail);
        }

        try {
            const response = await fetch(`http://localhost:8000/api/v1/media/editMedia/${editingAward._id}`, {
                method: "PUT",
                body: formData,
            });
            const updatedAward = await response.json();

            setAwards(
                awards.map((award) =>
                    award._id === editingAward._id ? updatedAward.media : award
                )
            );
            setEditingAward(null);
            setPreviewImage(null);
        } catch (error) {
            console.error("Error editing media:", error);
        }
    };

    if (loading) {
        return <div className="text-center">Loading...</div>;
    }

    return (
        <div className="p-6">
            <h2 className="text-center text-4xl font-bold text-orange-600 mb-12">
                Best Awards & Recognition
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                {awards?.map((award) => (
                    <motion.div
                        key={award._id}
                        className="bg-white p-6 rounded-lg shadow-xl"
                        whileHover={{ scale: 1.05 }}
                    >
                        <img
                            src={`http://localhost:8000${award.mediaThumbnails}`}
                            alt={award.title}
                            className="w-full h-64 object-cover rounded-lg mb-4"
                        />
                        <h3 className="text-xl font-semibold text-gray-800 mb-2">{award.title}</h3>
                        <p className="text-gray-600">{award.description}</p>

                        <div className="flex justify-around mt-4">
                            <button
                                onClick={() => handleEditClick(award)}
                                className="text-green-500 hover:text-green-700"
                            >
                                <FaEdit /> Edit
                            </button>
                            <button
                                onClick={() => handleDelete(award._id)}
                                className="text-red-500 hover:text-red-700"
                            >
                                <FaTrash /> Delete
                            </button>
                        </div>
                    </motion.div>
                ))}
            </div>

            {editingAward && (
                <Modal
                    isOpen={!!editingAward}
                    onRequestClose={() => setEditingAward(null)}
                    className="mx-auto w-full max-w-md bg-white rounded-lg shadow-xl p-6"
                    overlayClassName="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center"
                >
                    <form onSubmit={handleEditSubmit} encType="multipart/form-data">
                        <h2 className="text-center text-2xl mb-4">Edit Media</h2>
                        <input
                            type="text"
                            value={editForm.title}
                            onChange={(e) => setEditForm({ ...editForm, title: e.target.value })}
                            placeholder="Title"
                            className="w-full p-2 border border-gray-300 mb-4"
                            required
                        />
                        <textarea
                            value={editForm.description}
                            onChange={(e) =>
                                setEditForm({ ...editForm, description: e.target.value })
                            }
                            placeholder="Description"
                            className="w-full p-2 border border-gray-300 mb-4"
                            required
                        />
                        <input
                            type="file"
                            accept="image/*"
                            onChange={handleImageChange}
                            className="mb-4"
                        />
                        {previewImage && (
                            <img
                                src={previewImage}
                                alt="Preview"
                                className="w-full max-h-40 object-cover rounded-lg mb-4"
                            />
                        )}
                        <div className="flex justify-end mt-4">
                            <button type="submit" className="bg-blue-500 text-white px-4 py-2">
                                Save
                            </button>
                        </div>
                    </form>
                </Modal>
            )}
        </div>
    );
};

export default Awards;
