const multer = require("multer");
const path = require("path");
const { cloudinary, createWatermarkOptions } = require("../configs/cloudinaryConfig");
const { Readable } = require("stream");

// Configure storage for temporary file upload
const storage = multer.memoryStorage();

// File filter for image types
const fileFilter = (req, file, cb) => {
  const allowedTypes = [
    "image/jpeg",
    "image/jpg",
    "image/png",
    "image/gif",
    "image/webp",
  ];

  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(
      new Error(
        "Неподдерживаемый формат файла. Разрешены только JPG, PNG, GIF и WebP."
      ),
      false
    );
  }
};

// Configure multer with memory storage
const upload = multer({
  storage: storage,
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB max file size
  },
  fileFilter: fileFilter,
});

// Middleware for uploading product images to Cloudinary
const uploadProductImage = async (req, res, next) => {
  // First use multer to handle the file upload to memory
  upload.single("image")(req, res, async (err) => {
    if (err) {
      return res.status(400).json({
        message: "Ошибка при загрузке файла",
        error: err.message,
      });
    }

    // If no file was uploaded, just continue
    if (!req.file) {
      return next();
    }

    try {
      // Create a readable stream from the buffer
      const stream = Readable.from(req.file.buffer);
      
      // Create a promise to handle the Cloudinary upload
      const cloudinaryUpload = new Promise((resolve, reject) => {
        const uploadStream = cloudinary.uploader.upload_stream(
          {
            folder: "products",
            resource_type: "image",
            transformation: [
              { width: 800, crop: "scale" },
              createWatermarkOptions()
            ]
          },
          (error, result) => {
            if (error) return reject(error);
            resolve(result);
          }
        );
        
        // Pipe the readable stream to the Cloudinary upload stream
        stream.pipe(uploadStream);
      });

      // Wait for the upload to complete
      const result = await cloudinaryUpload;
      
      // Add the Cloudinary URL to the request
      req.file.cloudinaryUrl = result.secure_url;
      req.file.cloudinaryPublicId = result.public_id;
      req.file.filename = path.basename(result.secure_url);
      
      next();
    } catch (error) {
      console.error("Cloudinary upload error:", error);
      return res.status(500).json({
        message: "Ошибка при загрузке изображения в облако",
        error: error.message,
      });
    }
  });
};

// Middleware for uploading category images to Cloudinary
const uploadCategoryImage = async (req, res, next) => {
  // First use multer to handle the file upload to memory
  upload.single("image")(req, res, async (err) => {
    if (err) {
      return res.status(400).json({
        message: "Ошибка при загрузке файла",
        error: err.message,
      });
    }

    // If no file was uploaded, just continue
    if (!req.file) {
      return next();
    }

    try {
      // Create a readable stream from the buffer
      const stream = Readable.from(req.file.buffer);
      
      // Create a promise to handle the Cloudinary upload
      const cloudinaryUpload = new Promise((resolve, reject) => {
        const uploadStream = cloudinary.uploader.upload_stream(
          {
          folder: "categories",
          resource_type: "image",
          transformation: [
            { width: 800, crop: "scale" },
            createWatermarkOptions()
          ]
          },
          (error, result) => {
            if (error) return reject(error);
            resolve(result);
          }
        );
        
        // Pipe the readable stream to the Cloudinary upload stream
        stream.pipe(uploadStream);
      });

      // Wait for the upload to complete
      const result = await cloudinaryUpload;
      
      // Add the Cloudinary URL to the request
      req.file.cloudinaryUrl = result.secure_url;
      req.file.cloudinaryPublicId = result.public_id;
      req.file.filename = path.basename(result.secure_url);
      
      next();
    } catch (error) {
      console.error("Cloudinary upload error:", error);
      return res.status(500).json({
        message: "Ошибка при загрузке изображения в облако",
        error: error.message,
      });
    }
  });
};

module.exports = {
  uploadProductImage,
  uploadCategoryImage,
};