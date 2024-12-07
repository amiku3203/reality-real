import React, { useState } from "react";
import { toast } from "react-hot-toast";

const AddMedia = () => {
    const [formData, setFormData] = useState({
        title: "",
        description: "",
        mediaThumbnail: null,
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleFileChange = (e) => {
        setFormData((prev) => ({ ...prev, mediaThumbnail: e.target.files[0] }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const toastId = toast.loading("Adding media...");

        try {
            const form = new FormData();
            form.append("title", formData.title);
            form.append("description", formData.description);
            form.append("mediaThumbnail", formData.mediaThumbnail);

            const response = await fetch("http://localhost:8000/api/v1/media/addMedia", {
                method: "POST",
                body: form,
            });

            const data = await response.json();

            if (response.ok) {
                toast.success(data.message, { id: toastId });
                setFormData({ title: "", description: "", mediaThumbnail: null });
            } else {
                toast.error(data.message || "Failed to add media", { id: toastId });
            }
        } catch (error) {
            toast.error("Something went wrong!", { id: toastId });
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 p-6">
            <form
                onSubmit={handleSubmit}
                className="bg-white shadow-lg rounded-md p-8 w-full max-w-lg"
            >
                <h2 className="text-2xl font-bold text-black mb-6 text-center border-b-2 border-orange-500 pb-2">
                    Add Media
                </h2>

                <div className="mb-5">
                    <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
                        Media Title
                    </label>
                    <input
                        type="text"
                        id="title"
                        name="title"
                        value={formData.title}
                        onChange={handleChange}
                        placeholder="Enter media title"
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-orange-500 focus:border-orange-500 shadow-sm"
                        required
                    />
                </div>

                <div className="mb-5">
                    <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
                        Media Description
                    </label>
                    <textarea
                        id="description"
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        placeholder="Describe the media"
                        rows="4"
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-orange-500 focus:border-orange-500 shadow-sm"
                        required
                    />
                </div>

                <div className="mb-5">
                    <label htmlFor="mediaThumbnail" className="block text-sm font-medium text-gray-700 mb-1">
                        Thumbnail Image
                    </label>
                    <input
                        type="file"
                        id="mediaThumbnail"
                        name="mediaThumbnail"
                        accept="image/*"
                        onChange={handleFileChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-orange-500 focus:border-orange-500 shadow-sm file:mr-4 file:py-2 file:px-4 file:border-0 file:bg-orange-100 file:text-orange-600 hover:file:bg-orange-200"
                        required
                    />
                </div>

                <button
                    type="submit"
                    className="w-full bg-orange-500 text-white font-medium py-2 px-4 rounded-md hover:bg-orange-600 shadow-md transition"
                >
                    Submit Media
                </button>
            </form>
        </div>
    );
};

export default AddMedia;
