const path = require('path');
const fs = require('fs');

const downloadPdf = (req, res) => {
   
  // Extract the dynamic file name from the request params
  const { fileName } = req.params;
  console.log(fileName);
  // Construct the absolute path to the PDF file
  const filePath = path.join(__dirname, fileName);

  console.log(filePath);
  // Check if the file exists
  if (!fs.existsSync(filePath)) {
    return res.status(404).json({ error: 'File not found.' });
  }

  // Set headers for download
  res.setHeader('Content-Type', 'application/pdf');
  res.setHeader('Content-Disposition', `attachment; filename="${fileName}"`);

  // Send the file for download
  res.sendFile(filePath, (err) => {
    if (err) {
      console.error('Error sending file:', err);
      res.status(500).send('Error occurred while sending the file.');
    }
  });
};

module.exports = { downloadPdf };
