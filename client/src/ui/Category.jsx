export default function Category({ category }) {
  // Проверяет, является ли строка полным URL
  const isValidUrl = (str) => {
    const pattern = /^(https?:\/\/)/; // Правильное экранирование
    return pattern.test(str);
  };

  // Обработчик ошибок при загрузке изображения
  const handleImageError = (e) => {
    console.error("Image load error:", e.target.src);
    e.target.src = "/img/no-photo.png";
  };

  // Функция для получения правильного URL изображения
  // Приоритет:
  // 1. Если нет изображения - заглушка
  // 2. Если полный URL - используем как есть
  // 3. Если путь начинается с /uploads/ - используем как есть (файлы хранятся в public)
  // 4. Если начинается с categories/ - добавляем /uploads/
  // 5. Если это default-category.jpg - используем из /img/
  // 6. Иначе пытаемся сформировать путь из /img/categories/ или используем заглушку
  const imageUrl = () => {
    if (!category.image) return "/img/no-photo.png";
    if (isValidUrl(category.image)) return category.image;
    if (category.image.startsWith("/uploads/")) return category.image;
    if (category.image.startsWith("categories/"))
      return `/uploads/${category.image}`;
    if (category.image === "default-category.jpg")
      return `/img/${category.image}`;
    return category.image && category.image !== "alt"
      ? `/img/categories/${category.image}.png`
      : "/img/no-photo.png";
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
