const multer = require("multer");
const path = require("path");
const {
  cloudinary,
  createWatermarkOptions,
} = require("../configs/cloudinaryConfig");
const { Readable } = require("stream");

const storage = multer.memoryStorage();

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

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 5 * 1024 * 1024,
  },
  fileFilter: fileFilter,
});

const uploadProductImage = async (req, res, next) => {
  upload.single("image")(req, res, async (err) => {
    if (err) {
      return res.status(400).json({
        message: "Ошибка при загрузке файла",
        error: err.message,
      });
    }

    if (!req.file) {
      return next();
    }

    try {
      const stream = Readable.from(req.file.buffer);

      const cloudinaryUpload = new Promise((resolve, reject) => {
        const uploadStream = cloudinary.uploader.upload_stream(
          {
            folder: "products",
            resource_type: "image",
            transformation: [
              { width: 800, crop: "scale" },
              createWatermarkOptions(),
            ],
          },
          (error, result) => {
            if (error) return reject(error);
            resolve(result);
          }
        );

        stream.pipe(uploadStream);
      });

      const result = await cloudinaryUpload;

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

const uploadCategoryImage = async (req, res, next) => {
  upload.single("image")(req, res, async (err) => {
    if (err) {
      return res.status(400).json({
        message: "Ошибка при загрузке файла",
        error: err.message,
      });
    }

    if (!req.file) {
      return next();
    }

    try {
      const stream = Readable.from(req.file.buffer);

      const cloudinaryUpload = new Promise((resolve, reject) => {
        const uploadStream = cloudinary.uploader.upload_stream(
          {
            folder: "categories",
            resource_type: "image",
            transformation: [
              { width: 800, crop: "scale" },
              createWatermarkOptions(),
            ],
          },
          (error, result) => {
            if (error) return reject(error);
            resolve(result);
          }
        );

        stream.pipe(uploadStream);
      });

      const result = await cloudinaryUpload;

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

const uploadNewsImage = async (req, res, next) => {
  upload.single("image")(req, res, async (err) => {
    if (err) {
      return res.status(400).json({
        message: "Ошибка при загрузке файла",
        error: err.message,
      });
    }

    if (!req.file) {
      return next();
    }

    try {
      const stream = Readable.from(req.file.buffer);

      const cloudinaryUpload = new Promise((resolve, reject) => {
        const uploadStream = cloudinary.uploader.upload_stream(
          {
            folder: "news",
            resource_type: "image",
            transformation: [
              { width: 800, crop: "scale" },
              createWatermarkOptions(),
            ],
          },
          (error, result) => {
            if (error) return reject(error);
            resolve(result);
          }
        );

        stream.pipe(uploadStream);
      });

      const result = await cloudinaryUpload;

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
const uploadCompanyImage = async (req, res, next) => {
  upload.single("image")(req, res, async (err) => {
    if (err) {
      return res.status(400).json({
        message: "Ошибка при загрузке файла",
        error: err.message,
      });
    }

    if (!req.file) {
      return next();
    }

    try {
      const stream = Readable.from(req.file.buffer);

      const cloudinaryUpload = new Promise((resolve, reject) => {
        const uploadStream = cloudinary.uploader.upload_stream(
          {
            folder: "companies", // Изменим папку для хранения
            resource_type: "image",
            transformation: [
              { width: 800, crop: "scale" },
              createWatermarkOptions(),
            ],
          },
          (error, result) => {
            if (error) return reject(error);
            resolve(result);
          }
        );

        stream.pipe(uploadStream);
      });

      const result = await cloudinaryUpload;

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
  uploadNewsImage,
  uploadCompanyImage,
};
