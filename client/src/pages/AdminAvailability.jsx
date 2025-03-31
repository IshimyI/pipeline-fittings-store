import { useCallback, useEffect, useMemo, useState } from "react";
import axiosInstance from "../axiosInstance";
import AddProductForm from "../components/AddProductForm";

const isValidUrl = (str) => {
  const pattern = /^(https?:\/\/)/;
  return pattern.test(str);
};

const getImageUrl = (image) => {
  if (!image) return "/uploads/no-photo.png";
  if (isValidUrl(image)) return image;
  if (image.startsWith("/uploads/")) return image; // Preserve upload paths
  if (image) {
    return `/uploads/categories/${image}.jpg`;
  }
  return "/uploads/no-photo.png";
};

export default function AdminAvailability({ user }) {
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchProduct, setSearchProduct] = useState("");
  const [quantityUpdates, setQuantityUpdates] = useState({});

  const extractQuantity = useCallback((availability) => {
    const value = parseInt(availability.replace(/\D/g, "")) || 0;
    return Math.max(value, 0);
  }, []);

  // Загрузка данных
  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      const [categoriesRes, productsRes] = await Promise.all([
        axiosInstance.get("/ListCategories"),
        axiosInstance.get("/ListProducts"),
      ]);

      setCategories(categoriesRes.data);
      setProducts(
        productsRes.data.map((p) => ({
          ...p,
          availability: extractQuantity(p.availability),
        }))
      );
    } catch (error) {
      setError("Ошибка при загрузке данных");
    } finally {
      setLoading(false);
    }
  }, [extractQuantity]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleQuantityChange = useCallback(async (productId, newQuantity) => {
    try {
      setQuantityUpdates((prev) => ({ ...prev, [productId]: true }));

      await axiosInstance.patch(`/products/${productId}`, {
        availability: newQuantity,
      });

      setProducts((prev) =>
        prev.map((product) =>
          product.id === productId
            ? { ...product, availability: newQuantity }
            : product
        )
      );
    } catch (error) {
      setError("Ошибка при обновлении количества");
    } finally {
      setQuantityUpdates((prev) => ({ ...prev, [productId]: false }));
    }
  }, []);

  // Оптимизированные вычисления
  const filteredData = useMemo(() => {
    const lowerSearchQuery = searchQuery.toLowerCase();
    const lowerProductQuery = searchProduct.toLowerCase();

    return categories
      .filter((category) =>
        category.name.toLowerCase().includes(lowerSearchQuery)
      )
      .map((category) => ({
        ...category,
        products: products
          .filter(
            (p) =>
              p.categoryId === category.id &&
              p.name.toLowerCase().includes(lowerProductQuery)
          )
          .sort((a, b) => a.name.localeCompare(b.name)),
      }))
      .filter((category) => category.products.length > 0);
  }, [categories, products, searchQuery, searchProduct]);

  if (loading) return <LoadingIndicator />;
  if (error) return <Error message={error} />;

  return (
    <div className="max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold mb-8">Управление товарами</h1>
      <div>
        <AddProductForm
          categories={categories}
          onProductCreated={fetchData}
          user={user}
        />
      </div>

      <SearchControls
        searchQuery={searchQuery}
        searchProduct={searchProduct}
        onSearchChange={setSearchQuery}
        onProductSearchChange={setSearchProduct}
        categories={categories}
      />

      <ProductGrid>
        {filteredData.map((category) => (
          <CategorySection
            key={category.id}
            category={category}
            onQuantityChange={handleQuantityChange}
            quantityUpdates={quantityUpdates}
          />
        ))}
      </ProductGrid>
    </div>
  );
}

// Вынесенные компоненты
const LoadingIndicator = () => (
  <div className="text-center p-8">Загрузка...</div>
);

const Error = ({ message }) => (
  <div className="text-red-500 p-8">{message}</div>
);

const SearchControls = ({
  searchQuery,
  searchProduct,
  onSearchChange,
  onProductSearchChange,
  categories,
}) => (
  <div className="mb-6 flex gap-4 flex-wrap">
    <input
      type="text"
      placeholder="Поиск по категориям"
      value={searchQuery}
      list="categories"
      onChange={(e) => onSearchChange(e.target.value)}
      className="flex-1 p-2 rounded bg-gray-800 text-white"
    />
    <datalist id="categories">
      {categories.map((category) => (
        <option key={category.id} value={category.name} />
      ))}
    </datalist>
    <input
      type="text"
      placeholder="Поиск по товарам"
      value={searchProduct}
      onChange={(e) => onProductSearchChange(e.target.value)}
      className="flex-1 p-2 rounded bg-gray-800 text-white"
    />
  </div>
);

const ProductGrid = ({ children }) => (
  <section className="bg-gray-800 rounded-lg p-6">{children}</section>
);

const CategorySection = ({ category, onQuantityChange, quantityUpdates }) => (
  <div key={category.id} className="mb-8">
    <h2 className="text-2xl font-semibold mb-4">{category.name}</h2>
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {category.products.map((product) => (
        <ProductItem
          key={product.id}
          product={product}
          onQuantityChange={onQuantityChange}
          quantityUpdates={quantityUpdates}
        />
      ))}
    </div>
  </div>
);

const ProductItem = ({ product, onQuantityChange, quantityUpdates }) => (
  <div className="bg-gray-700 p-4 rounded-lg">
    <img
      src={getImageUrl(product.image)}
      alt={product.name}
      className="w-full h-48 object-cover rounded-lg mb-3"
      onError={(e) => (e.target.src = "/uploads/no-photo.png")}
    />
    <h3 className="font-medium text-lg mb-2">{product.name}</h3>

    <ProductInfo
      price={product.price}
      availability={product.availability}
      onQuantityChange={(value) => onQuantityChange(product.id, value)}
      isUpdating={quantityUpdates[product.id]}
    />
  </div>
);

const ProductInfo = ({ price, availability, onQuantityChange, isUpdating }) => (
  <div className="space-y-2">
    <p>Цена: {price}₽</p>

    <div className="flex flex-col items-center gap-2">
      <QuantityInput
        value={availability}
        onChange={onQuantityChange}
        disabled={isUpdating}
      />

      <SaveButton
        onClick={() => onQuantityChange(availability)}
        isUpdating={isUpdating}
      />

      <CurrentQuantity value={availability} />
    </div>
  </div>
);

const QuantityInput = ({ value, onChange, disabled }) => (
  <input
    type="number"
    value={value}
    min="0"
    onChange={(e) => {
      const newValue = Math.max(parseInt(e.target.value) || 0, 0);
      onChange(newValue);
    }}
    className="w-20 px-2 py-1 bg-gray-600 rounded text-white"
    disabled={disabled}
  />
);

const SaveButton = ({ onClick, isUpdating }) => (
  <button
    onClick={onClick}
    disabled={isUpdating}
    className="px-3 py-1 bg-blue-600 hover:bg-blue-700 rounded text-white disabled:bg-gray-500"
  >
    {isUpdating ? "Сохранение..." : "Сохранить"}
  </button>
);

const CurrentQuantity = ({ value }) => (
  <p className="text-sm text-gray-400">Текущее количество: {value}</p>
);
