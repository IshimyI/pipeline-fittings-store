export default function Category({ category }) {
  const isValidUrl = (str) => {
    const pattern = /^(https?:\/\/)/;
    return pattern.test(str);
  };

  const imageUrl = isValidUrl(category.img)
    ? category.img
    : category.img && category.img !== "alt"
    ? `/img/categories/${category.img}.png`
    : "/img/no-photo.png";

  return (
    <div className="category bg-gray-800 p-6 rounded-lg shadow-lg transform transition-transform hover:scale-105">
      <img
        src={imageUrl}
        alt={category.name}
        className="w-full h-full object-cover rounded-lg mb-4"
      />
      <p className="text-center text-xl font-semibold">{category.name}</p>
    </div>
  );
}
