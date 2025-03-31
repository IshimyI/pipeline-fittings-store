const multer = require("multer");
const path = require("path");
const fs = require("fs");

// Создаем директории для хранения изображений, если они не существуют
const createDirectories = () => {
  const productImagesDir = path.join(__dirname, "../../uploads/products");
  const categoryImagesDir = path.join(__dirname, "../../uploads/categories");

  if (!fs.existsSync(path.join(__dirname, "../../uploads"))) {
    fs.mkdirSync(path.join(__dirname, "../../uploads"));
  }

  if (!fs.existsSync(productImagesDir)) {
    fs.mkdirSync(productImagesDir, { recursive: true });
  }

  if (!fs.existsSync(categoryImagesDir)) {
    fs.mkdirSync(categoryImagesDir, { recursive: true });
  }
};

// Создаем директории при инициализации
createDirectories();

// Настройка хранилища для multer
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    // Определяем директорию в зависимости от типа загрузки (продукт или категория)
    const uploadType = req.path.includes("Product") ? "products" : "categories";
    const dest = path.join(__dirname, `../../uploads/${uploadType}`);
    cb(null, dest);
  },
  filename: function (req, file, cb) {
    // Генерируем уникальное имя файла с оригинальным расширением
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    const ext = path.extname(file.originalname);
    cb(null, file.fieldname + "-" + uniqueSuffix + ext);
  },
});

// Фильтр файлов для проверки типа изображения
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

// Настройка multer с ограничениями
const upload = multer({
  storage: storage,
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB максимальный размер файла
  },
  fileFilter: fileFilter,
});

module.exports = {
  uploadProductImage: upload.single("image"),
  uploadCategoryImage: upload.single("image"),
};
