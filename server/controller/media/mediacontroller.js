const Media = require("../../models/media/media");

// Add Media Controller
const addMedia = async (req, res) => {
    try {
        const { title, description } = req.body;

        // Validate input
        if (!title || !description || !req.file) {
            return res.status(400).json({ message: "All fields are required" });
        }

        // Get the uploaded image URL
        const imageUrl = `/projectsAssests/${req.file.filename}`;

        // Create a new media entry
        const newMedia = new Media({
            title,
            description,
            mediaThumbnails: imageUrl, // Updated to use the string type
        });

        // Save the media to the database
        await newMedia.save();

        // Send a success response
        res.status(201).json({ message: "Media added successfully", media: newMedia });
    } catch (error) {
        // Handle server errors
        res.status(500).json({ message: "Internal server error", error: error.message });
    }
};




const getMedia = async (req, res) => {
    try {
        // Fetch all media from the database
        const mediaList = await Media.find();

        // Check if media entries exist
        if (mediaList.length === 0) {
            return res.status(404).json({ message: "No media found" });
        }

        // Send the media list as a response
        res.status(200).json({ message: "Media retrieved successfully", media: mediaList });
    } catch (error) {
        // Handle server errors
        res.status(500).json({ message: "Internal server error", error: error.message });
    }
};


const editMedia = async (req, res) => {
    try {
        const { id } = req.params;
        const { title, description } = req.body;

        // Check if a new image is uploaded
        let updatedFields = { title, description };
        if (req.file) {
            const imageUrl = `/projectsAssests/${req.file.filename}`;
            updatedFields.mediaThumbnails = imageUrl;
        }

        // Update the media entry
        const media = await Media.findByIdAndUpdate(id, updatedFields, { new: true });

        if (!media) {
            return res.status(404).json({ message: "Media not found" });
        }

        res.status(200).json({ message: "Media updated successfully", media });
    } catch (error) {
        res.status(500).json({ message: "Internal server error", error: error.message });
    }
};

const deleteMedia = async (req, res) => {
    try {
        const { id } = req.params;

        const media = await Media.findByIdAndDelete(id);

        if (!media) {
            return res.status(404).json({ message: "Media not found" });
        }

        res.status(200).json({ message: "Media deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Internal server error", error: error.message });
    }
};

module.exports = {
    addMedia,getMedia,editMedia,deleteMedia
};
