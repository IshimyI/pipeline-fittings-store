import { useState, useRef, useEffect } from "react";
import axiosInstance from "../axiosInstance";
const ImageUploader = ({
  onImageSelected,
  className = "",
  label = "Загрузить изображение",
  image = null, // Add image prop
}) => {
  const [preview, setPreview] = useState(null);
  const [error, setError] = useState("");
  const fileInputRef = useRef(null);
  // Handle initial image
  useEffect(() => {
    if (image) {
      const imageUrl = image.startsWith("http")
        ? image
        : image.startsWith("/uploads")
        ? `${import.meta.env.VITE_TARGET}${image}`
        : image;
      setPreview(imageUrl);
    }
  }, [image]);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    // Проверка типа файла
    const allowedTypes = [
      "image/jpeg",
      "image/jpg",
      "image/png",
      "image/gif",
      "image/webp",
    ];
    if (!allowedTypes.includes(file.type)) {
      setError(
        "Неподдерживаемый формат файла. Разрешены только JPG, PNG, GIF и WebP."
      );
      return;
    }
    // Проверка размера файла (5MB максимум)
    if (file.size > 5 * 1024 * 1024) {
      setError("Размер файла не должен превышать 5MB.");
      return;
    }
    // Создание превью
    const reader = new FileReader();
    reader.onloadend = () => {
      setPreview(reader.result);
    };
    reader.readAsDataURL(file);
    // Передача файла родительскому компоненту
    onImageSelected(file);
    setError("");
  };
  return (
    <div className={`w-full ${className}`}>
      <div className="flex flex-col items-center">
        {preview && (
          <div className="mb-4">
            <img
              src={preview}
              alt="Предпросмотр"
              className="w-full max-w-[200px] h-auto rounded-lg object-cover"
              onError={(e) => {
                console.error("Image load error:", e.target.src);
                setPreview("/uploads/no-photo.png");
                setError(`Не удалось загрузить изображение: ${preview}`);
              }}
            />
          </div>
        )}
        <button
          type="button"
          onClick={() => fileInputRef.current.click()}
          className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg text-white transition-colors"
        >
          {label}
        </button>
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileChange}
          accept="image/jpeg,image/jpg,image/png,image/gif,image/webp"
          className="hidden"
        />
        {error && <p className="text-red-500 mt-2 text-sm">{error}</p>}
      </div>
    </div>
  );
};
export default ImageUploader;
