import { useState, useRef, useEffect } from "react";

const ImageUploader = ({
  onImageSelected,
  className = "",
  label = "Загрузить изображение",
  image = null,
}) => {
  const [preview, setPreview] = useState(null);
  const [error, setError] = useState("");
  const fileInputRef = useRef(null);

  useEffect(() => {
    if (image) {
      try {
        const imageUrl = image.startsWith("http")
          ? image
          : image.startsWith("/uploads")
          ? `${import.meta.env.VITE_TARGET || ""}${image}`
          : image;

        setPreview(imageUrl);
      } catch (err) {
        console.error("Error setting image preview:", err);
        setError(`Ошибка при загрузке изображения: ${err.message}`);
        setPreview("/uploads/no-photo.png");
      }
    }
  }, [image]);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
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
    if (file.size > 5 * 1024 * 1024) {
      setError("Размер файла не должен превышать 5MB.");
      return;
    }
    const reader = new FileReader();
    reader.onloadend = () => {
      setPreview(reader.result);
    };
    reader.readAsDataURL(file);
    onImageSelected(file);
    setError("");
  };

  const handleImageError = (e) => {
    const failedSrc = e.target.src;
    console.error("Image load error:", failedSrc);

    if (failedSrc.includes(import.meta.env.VITE_TARGET)) {
      console.warn("Возможно неправильно настроена переменная VITE_TARGET");
    }

    if (!failedSrc.includes("no-photo.png")) {
      setPreview("/uploads/no-photo.png");
      setError(`Не удалось загрузить изображение. URL: ${failedSrc}`);
    }
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
              onError={handleImageError}
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
