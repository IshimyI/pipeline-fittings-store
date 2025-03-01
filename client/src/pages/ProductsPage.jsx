import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axiosInstance from "../axiosInstance";

export default function ProductsPage() {
  const { categoryId } = useParams();
  const [products, setProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const fetchProducts = async () => {
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
      }
    };

    fetchProducts();
  }, [categoryId]);

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="bg-gray-900 text-white flex justify-center">
      <main className="w-full max-w-screen-lg p-6">
        <section>
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

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProducts.length > 0 ? (
              filteredProducts.map((product) => (
                <button
                  key={product.id}
                  onClick={() => console.log(11)}
                  className="bg-gray-800 p-6 rounded-lg shadow-lg transition-transform transform hover:scale-105"
                >
                  <img
                    src={product.image ? product.image : "/img/no-photo.png"}
                    alt={product.name}
                    className="w-full object-cover rounded-lg mb-4"
                  />
                  <p className="text-center text-xl font-semibold">
                    {product.name}
                  </p>
                </button>
              ))
            ) : (
              <p className="text-center text-xl text-gray-300">
                Товары не найдены
              </p>
            )}
          </div>
        </section>
      </main>
    </div>
  );
}
