const express = require("express");
const { addMedia, getMedia, editMedia, deleteMedia } = require("../controller/media/mediacontroller");
const upload = require("../config/upload");
const router = express.Router();

// Add Media Route
router.post("/addMedia", upload.single("mediaThumbnail"), addMedia);


router.get("/allmedia", getMedia )

router.put("/editMedia/:id", upload.single("mediaThumbnail"),  editMedia);

// Delete Media Route
router.delete("/deleteMedia/:id",  deleteMedia);


module.exports = router;
