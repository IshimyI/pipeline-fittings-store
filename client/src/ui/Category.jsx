export default function Category({ category }) {
  const isValidUrl = (str) => {
    const pattern = /^(https?:\/\/)/;
    return pattern.test(str);
  };

  const handleImageError = (e) => {
    console.error("Image load error:", e.target.src);
    e.target.src = "/uploads/no-photo.png";
  };

  const imageUrl = () => {
    if (!category.image) return "/uploads/no-photo.png";
    if (isValidUrl(category.image)) return category.image;
    if (category.image.startsWith("/uploads/")) return category.image;
    if (category.image.startsWith("categories/"))
      return `/uploads/${category.image}`;
    if (category.image === "cno-photo.png") return `/uploads/${category.image}`;
    return category.image && category.image !== "alt"
      ? `/uploads/categories/${category.image}.png`
      : "/uploads/no-photo.png";
  };

  return (
    <div className="category bg-krio-background p-6 rounded-lg shadow-lg transform transition-transform hover:scale-105">
      <img
        src={imageUrl()}
        alt={category.name}
        className="w-full h-full object-cover rounded-lg mb-4"
        onError={handleImageError}
      />
      <p className="text-center text-sm md:text-xl font-semibold break-words whitespace-normal">
        {category.name}
      </p>
    </div>
  );
}
