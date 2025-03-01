export default function Category({ category }) {
  return (
    <div className="category bg-gray-800 p-6 rounded-lg shadow-lg transform transition-transform hover:scale-105">
      <img
        src={`img/categories/${category.img}.png`}
        alt={category.name}
        className="w-full h-full object-cover rounded-lg mb-4"
      />
      <p className="text-center text-xl font-semibold">{category.name}</p>
    </div>
  );
}
