import { useEffect, useMemo, useState } from "react";
import axiosInstance from "../axiosInstance";

const getImageUrl = (image) => {
  if (/^(https?:\/\/)/.test(image)) return image;
  return image ? `/img/categories/${image}.jpg` : "/img/no-photo.png";
};

export default function AdminAvailability({ user }) {
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchProduct, setSearchProduct] = useState("");
  const [quantityUpdates, setQuantityUpdates] = useState({});

  const extractQuantity = (availability) => {
    const match = availability.match(/\d+/);
    return match ? parseInt(match[0]) : 0;
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [categoriesRes, productsRes] = await Promise.all([
          axiosInstance.get("/listcategories"),
          axiosInstance.get("/listProducts"),
        ]);

        setCategories(categoriesRes.data);
        setProducts(productsRes.data);
        setLoading(false);
      } catch (error) {
        setError("Ошибка при загрузке данных");
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleQuantityChange = async (productId, newQuantity) => {
    try {
      setQuantityUpdates((prev) => ({ ...prev, [productId]: true }));
      await axiosInstance.post(`/changeProduct/${productId}`, {
        availability: newQuantity,
        user,
      });

      setProducts((prev) =>
        prev.map((product) =>
          product.id === productId
            ? { ...product, availability: `На складе ${newQuantity}+ единиц` }
            : product
        )
      );
    } catch (error) {
      setError("Ошибка при обновлении количества");
    } finally {
      setQuantityUpdates((prev) => ({ ...prev, [productId]: false }));
    }
  };

  // Основные изменения здесь
  const filteredCategories = useMemo(() => {
    return categories.filter((category) => {
      const hasCategoryMatch = category.name
        .toLowerCase()
        .includes(searchQuery.toLowerCase());
      const hasProductMatch = products.some(
        (p) =>
          p.categoryId === category.id &&
          p.name.toLowerCase().includes(searchProduct.toLowerCase())
      );
      return hasCategoryMatch && hasProductMatch;
    });
  }, [categories, searchQuery, products, searchProduct]);

  const filteredProducts = useMemo(() => {
    return products.filter((product) =>
      product.name.toLowerCase().includes(searchProduct.toLowerCase())
    );
  }, [products, searchProduct]);

  if (loading) return <div className="text-center p-8">Загрузка...</div>;
  if (error) return <div className="text-red-500 p-8">{error}</div>;

  return (
    <div className="flex items-center text-white justify-center min-h-screen bg-[url('/img/BG-image.png')] bg-fixed bg-center bg-no-repeat bg-cover bg-opacity-10 p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Управление товарами</h1>

        <div className="mb-6 flex flex-wrap gap-4">
          <input
            type="text"
            placeholder="Поиск по категориям..."
            className="bg-krio-foreground text-white px-4 py-2 rounded-lg flex-1"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            list="category"
          />
          <datalist id="category">
            {filteredCategories.map((category) => (
              <option key={category.id} value={category.name} />
            ))}
          </datalist>
          <input
            type="text"
            placeholder="Поиск по продуктам..."
            className="bg-krio-foreground text-white px-4 py-2 rounded-lg flex-1"
            value={searchProduct}
            onChange={(e) => setSearchProduct(e.target.value)}
          />
        </div>

        <section className="bg-krio-background rounded-lg p-6">
          {filteredCategories.map((category) => {
            const categoryProducts = filteredProducts
              .filter((p) => p.categoryId === category.id)
              .sort((a, b) => a.name.localeCompare(b.name));

            return (
              <div key={category.id} className="mb-8">
                <h2 className="text-2xl font-semibold mb-4">{category.name}</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {categoryProducts.map((product) => (
                    <div
                      key={product.id}
                      className="bg-krio-foreground p-4 rounded-lg"
                    >
                      <img
                        src={getImageUrl(product.image)}
                        alt={product.name}
                        className="w-full h-48 object-cover rounded-lg mb-3"
                        onError={(e) => (e.target.src = "/img/no-photo.png")}
                      />
                      <h3 className="font-medium text-lg mb-2">
                        {product.name}
                      </h3>
                      <div className="space-y-2">
                        <p>Цена: {product.price}</p>
                        <div className="flex flex-col items-center gap-2">
                          <span>Количество:</span>
                          <div className="flex items-center gap-2">
                            <input
                              type="number"
                              value={extractQuantity(product.availability)}
                              onChange={(e) => {
                                const value = parseInt(e.target.value);
                                if (!isNaN(value)) {
                                  setProducts((prev) =>
                                    prev.map((p) =>
                                      p.id === product.id
                                        ? {
                                            ...p,
                                            availability: `На складе ${value}+ единиц`,
                                          }
                                        : p
                                    )
                                  );
                                }
                              }}
                              className="w-20 px-2 py-1 bg-krio-primary rounded"
                            />
                            <button
                              onClick={() =>
                                handleQuantityChange(
                                  product.id,
                                  extractQuantity(product.availability)
                                )
                              }
                              disabled={quantityUpdates[product.id]}
                              className="px-3 py-1 bg-blue-600 hover:bg-blue-700 rounded text-white disabled:bg-gray-500"
                            >
                              {quantityUpdates[product.id]
                                ? "Сохранение..."
                                : "Сохранить"}
                            </button>
                          </div>
                          {quantityUpdates[product.id] && (
                            <span className="text-sm text-gray-400">
                              Сохранение...
                            </span>
                          )}
                        </div>
                        <p>Текущее количество: {product.availability}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </section>
      </div>
    </div>
  );
}
