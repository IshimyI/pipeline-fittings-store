export default function Category({ category }) {
  const isValidUrl = (str) => {
    const pattern = /^(https?:\/\/)/;
    return pattern.test(str);
  };

  const handleImageError = (e) => {
    e.target.src = "/img/no-photo.png";
  };

  const imageUrl = isValidUrl(category.image)
    ? category.image
    : category.image && category.image !== "alt"
    ? `/img/categories/${category.image}.png`
    : "/img/no-photo.png";

  return (
    <div className="category bg-krio-background p-6 rounded-lg shadow-lg transform transition-transform hover:scale-105">
      <img
        src={imageUrl}
        alt={category.name}
        className="w-full h-full object-cover rounded-lg mb-4"
        onError={handleImageError}
      />
      <p className="text-center text-xl font-semibold">{category.name}</p>
    </div>
  );
}
