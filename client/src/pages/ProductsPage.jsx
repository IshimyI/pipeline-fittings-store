import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axiosInstance from "../axiosInstance";
import Dialog from "../ui/Dialog";

export default function ProductsPage({ user, category }) {
  const { categoryId } = useParams();
  const [products, setProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [sortOption, setSortOption] = useState("name");
  const [availabilityFilter, setAvailabilityFilter] = useState("all");

  const isValidUrl = (str) => {
    const pattern = /^(https?:\/\/)/;
    return pattern.test(str);
  };

  const getImageUrl = (image) => {
    if (isValidUrl(image)) {
      return image;
    }
    if (image) {
      return `/img/categories/${image}.jpg`;
    }
    return "/img/no-photo.png";
  };

  const handleImageError = (e) => {
    e.target.src = "/img/no-photo.png";
  };

  const handleSortChange = (e) => {
    setSortOption(e.target.value);
  };

  const handleAvailabilityFilterChange = (e) => {
    setAvailabilityFilter(e.target.value);
  };

  const sortProducts = (products) => {
    if (!Array.isArray(products)) return products;
    let sortedProducts = [...products];

    switch (sortOption) {
      case "name":
        sortedProducts.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case "price":
        sortedProducts.sort((a, b) => a.price - b.price);
        break;
      case "availability":
        sortedProducts.sort((a, b) =>
          a.availability.localeCompare(b.availability)
        );
        break;
      default:
        break;
    }
    return sortedProducts;
  };

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        let response;
        if (categoryId) {
          response = await axiosInstance.get(`/listProducts/${categoryId}`);
        } else {
          response = await axiosInstance.get(`/listProducts`);
        }
        setProducts(response.data);
      } catch (error) {
        console.error("Ошибка при загрузке товаров:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [categoryId]);

  const openModal = (product) => {
    setSelectedProduct(product);
    setIsOpen(true);
  };

  const closeModal = () => {
    setSelectedProduct(null);
    setIsOpen(false);
  };

  const availabilityOptions = [
    "all",
    ...[...new Set(products.map((product) => product.availability))],
  ];

  const filteredProducts = products
    .filter((product) =>
      product.name.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .filter((product) => {
      if (availabilityFilter === "all") {
        return true;
      }
      return product.availability === availabilityFilter;
    });

  const sortedProducts = sortProducts(filteredProducts);

  return (
    <div className="bg-gray-900 text-white flex justify-center">
      <main className="w-full max-w-[1280px] p-6 flex">
        <aside className="h-48 w-1/4 mt-16 p-6 bg-gray-800 rounded-lg mr-6">
          <h3 className="text-2xl font-semibold text-gray-300 mb-4">Фильтры</h3>
          <div className="mb-4">
            <h4 className="text-xl font-semibold text-gray-300">Наличие</h4>
            <select
              value={availabilityFilter}
              onChange={handleAvailabilityFilterChange}
              className="w-full p-3 bg-gray-700 text-white rounded-lg"
            >
              {availabilityOptions.map((option, index) => (
                <option key={index} value={option}>
                  {option === "all" ? "Все товары" : option}
                </option>
              ))}
            </select>
          </div>
        </aside>

        <section className="w-3/4">
          <h2 className="text-3xl font-bold text-center text-gray-300 mb-8">
            Товары в категории
          </h2>

          <div className="mb-8">
            <input
              type="text"
              placeholder="Поиск по названию..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full p-3 bg-gray-800 text-white rounded-lg"
            />
          </div>

          <div className="mb-8">
            <select
              value={sortOption}
              onChange={handleSortChange}
              className="w-full p-3 bg-gray-800 text-white rounded-lg"
            >
              <option value="name">По имени</option>
              <option value="price">По цене</option>
              <option value="availability">По количеству</option>
            </select>
          </div>

          {loading ? (
            <div className="text-center text-gray-300">Загрузка...</div>
          ) : sortedProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {sortedProducts.map((product) => (
                <button
                  key={product.id}
                  onClick={() => openModal(product)}
                  className="bg-gray-800 p-6 rounded-lg shadow-lg transition-transform transform hover:scale-105"
                >
                  <img
                    src={getImageUrl(product.image)}
                    alt={product.name}
                    className="w-64 h-64 object-cover rounded-lg mb-4"
                    onError={handleImageError}
                  />
                  <p className="text-center text-xl font-semibold">
                    {product.name}
                  </p>
                </button>
              ))}
            </div>
          ) : (
            <p className="text-center text-xl text-gray-300">
              Товары не найдены
            </p>
          )}
        </section>
      </main>

      <Dialog
        user={user}
        isOpen={isOpen}
        onClose={closeModal}
        product={selectedProduct}
        category={category}
      />
    </div>
  );
}
