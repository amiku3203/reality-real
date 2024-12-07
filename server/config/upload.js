const multer= require("multer")

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'projectsAssests/')
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
      cb(null, file.fieldname + '-' + uniqueSuffix)
    }
  })


  
  
  const upload = multer({ storage: storage, limits: {
    fieldSize: 10 * 1024 * 1024, // Allow up to 10MB for non-file fields
    fileSize: 5 * 1024 * 1024,   // Allow file size up to 5MB
    files: 50,                    // Limit number of files to 5
    fields: 50,                  // Limit number of fields to 20
  }, })


  module.exports=upload;