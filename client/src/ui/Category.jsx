export default function Category({ category }) {
  // Проверяет, является ли строка полным URL
  const isValidUrl = (str) => {
    const pattern = /^(https?:\/\/)/; // Правильное экранирование
    return pattern.test(str);
  };

  // Обработчик ошибок при загрузке изображения
  const handleImageError = (e) => {
    console.error("Image load error:", e.target.src);
    // Проверка на бесконечную рекурсию
    if (!e.target.src.includes("no-photo.png")) {
      e.target.src = "/uploads/no-photo.png";
    }
  };

  // Функция для получения правильного URL изображения
  // Приоритет:
  // 1. Если нет изображения - заглушка
  // 2. Если полный URL - используем как есть
  // 3. Если путь начинается с /uploads/ - добавляем базовый URL API если он задан
  // 4. Если начинается с categories/ - добавляем /uploads/
  // 5. Если это default-category.jpg - используем из /uploads/
  // 6. Иначе пытаемся сформировать путь из /uploads/categories/ или используем заглушку
  const imageUrl = () => {
    try {
      if (!category.image) return "/uploads/no-photo.png";

      if (isValidUrl(category.image)) return category.image;

      const apiUrl = import.meta.env.VITE_TARGET || "";
      console.log("API URL:", apiUrl);

      if (category.image.startsWith("/uploads/")) {
        const fullUrl = `${apiUrl}${category.image}`;
        console.log("Full image URL:", fullUrl);
        return fullUrl;
      }

      if (category.image.startsWith("categories/"))
        return `${apiUrl}/uploads/${category.image}`;

      if (category.image === "default-category.jpg")
        return `${apiUrl}/uploads/${category.image}`;

      return category.image && category.image !== "alt"
        ? `${apiUrl}/uploads/categories/${category.image}.png`
        : "/uploads/no-photo.png";
    } catch (err) {
      console.error("Error generating image URL:", err);
      return "/uploads/no-photo.png";
    }
  };

  return (
    <div className="category bg-krio-background p-6 rounded-lg shadow-lg transform transition-transform hover:scale-105">
      <img
        src={imageUrl()}
        alt={category.name}
        className="w-full h-full object-cover rounded-lg mb-4"
        onError={handleImageError}
      />
      <p className="text-center text-xl font-semibold">{category.name}</p>
    </div>
  );
}
