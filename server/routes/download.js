const express = require('express');
const { downloadPdf } = require('../middleware/download'); // Adjust path as needed

const router = express.Router();

// Dynamic route to handle different PDF files
router.get('/:fileName', downloadPdf);

module.exports = router;
