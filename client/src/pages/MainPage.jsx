import { useNavigate } from "react-router-dom";
import Category from "../ui/Category";
import axiosInstance from "../axiosInstance";
import { useEffect, useState } from "react";

export default function MainPage({ user, category }) {
  const [categories, setCategories] = useState(category);
  const [error, setError] = useState("");

  const [showForm, setShowForm] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    categoryId: "",
    price: "",
    image: "",
    availability: "",
    params: "",
  });

  useEffect(() => {
    if (category && category.length > 0) {
      setCategories(category);
    }
  }, [category]);

  const navigate = useNavigate();

  const goToCategory = (categoryId) => {
    navigate(categoryId ? `/category/${categoryId}` : "/category");
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleCreate = async (type) => {
    try {
      const errors = [];
      if (type === "product") {
        if (!formData.name) errors.push("Название");
        if (!formData.categoryId) errors.push("Категория");
        if (!formData.price) errors.push("Цена");
      } else {
        if (!formData.name) errors.push("Название");
      }

      if (errors.length > 0) {
        throw new Error(`Заполните обязательные поля: ${errors.join(", ")}`);
      }

      const payload =
        type === "product"
          ? {
              name: formData.name,
              categoryId: Number(formData.categoryId),
              price: formData.price,
              image: formData.image || "default-product.jpg",
              availability: formData.availability || "in-stock",
              params: tryParseJSON(formData.params),
              user: { isAdmin: user?.isAdmin },
            }
          : {
              name: formData.name,
              img: formData.image || "default-category.jpg",
              user: { isAdmin: user?.isAdmin },
            };

      function tryParseJSON(jsonString) {
        try {
          return JSON.parse(jsonString);
        } catch (e) {
          return {};
        }
      }

      const response = await axiosInstance.post(
        type === "product" ? "/createProduct" : "/createCategory",
        payload
      );

      if (response.status === 201) {
        setShowForm(null);
        setFormData({
          name: "",
          categoryId: "",
          price: "",
          image: "",
          availability: "",
          params: "",
        });

        if (type === "category") {
          const newCategories = await axiosInstance.get("/listCategories");
          setCategories(newCategories.data);
        }
      }
    } catch (error) {
      console.error("Ошибка создания:", error);
      setError(
        error.response?.data?.message ||
          error.message ||
          "Произошла неизвестная ошибка"
      );
    }
  };

  return (
    <div className="bg-gray-900 text-white min-h-screen p-6">
      <div className="max-w-7xl mx-auto">
        {user?.isAdmin && (
          <div className="mb-8 flex gap-4 justify-end">
            <button
              onClick={() => setShowForm("product")}
              className="bg-green-600 hover:bg-green-700 px-4 py-2 rounded-lg transition-colors"
            >
              + Новый товар
            </button>
            <button
              onClick={() => setShowForm("category")}
              className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg transition-colors"
            >
              + Новая категория
            </button>
          </div>
        )}

        {error && (
          <div className="mb-4 p-4 bg-red-800 text-red-100 rounded-lg">
            {error}
          </div>
        )}

        {showForm && (
          <div className="bg-gray-800 p-6 rounded-lg mb-8 shadow-xl">
            <h2 className="text-2xl mb-4">
              {showForm === "product" ? "Новый товар" : "Новая категория"}
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block mb-2">Название *</label>
                <input
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full p-2 bg-gray-700 rounded"
                  required
                />
              </div>

              {showForm === "product" ? (
                <>
                  <div>
                    <label className="block mb-2">Категория *</label>
                    <select
                      name="categoryId"
                      value={formData.categoryId}
                      onChange={handleInputChange}
                      className="w-full p-2 bg-gray-700 rounded"
                      required
                    >
                      <option value="">Выберите категорию</option>
                      {categories.map((category) => (
                        <option key={category.id} value={category.id}>
                          {category.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block mb-2">Цена *</label>
                    <input
                      name="price"
                      type="text"
                      value={formData.price}
                      onChange={handleInputChange}
                      className="w-full p-2 bg-gray-700 rounded"
                      required
                    />
                  </div>

                  <div>
                    <label className="block mb-2">Наличие *</label>
                    <input
                      name="availability"
                      value={formData.availability}
                      onChange={handleInputChange}
                      className="w-full p-2 bg-gray-700 rounded"
                    />
                  </div>

                  <div>
                    <label className="block mb-2">Изображение</label>
                    <input
                      name="image"
                      value={formData.image}
                      onChange={handleInputChange}
                      className="w-full p-2 bg-gray-700 rounded"
                      placeholder="URL или имя файла"
                    />
                  </div>

                  <div className="md:col-span-2">
                    <label className="block mb-2">Характеристики (JSON)</label>
                    <div className="text-gray-400 text-sm mb-2">
                      Используйте формат JSON. Пример: {"{"}"Вес": "2 кг",
                      "Материал": "Пластик"{"}"}
                    </div>
                    <textarea
                      name="params"
                      value={formData.params}
                      onChange={handleInputChange}
                      className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg text-white font-mono text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 min-h-[150px]"
                      placeholder={`Пример корректного JSON:\n{\n  "Размер": "XL",\n  "Цвет": "Черный"\n}`}
                    />

                    {(() => {
                      try {
                        JSON.parse(formData.params);
                        return (
                          <div className="text-green-400 mt-2">
                            ✓ Корректный JSON
                          </div>
                        );
                      } catch (e) {
                        return (
                          <div className="text-red-400 mt-2">
                            Ошибка: {e.message}
                          </div>
                        );
                      }
                    })()}
                  </div>
                </>
              ) : (
                <div className="md:col-span-2">
                  <label className="block mb-2">Изображение категории</label>
                  <input
                    name="image"
                    value={formData.image}
                    onChange={handleInputChange}
                    className="w-full p-2 bg-gray-700 rounded"
                    placeholder="URL изображения"
                  />
                </div>
              )}

              <div className="md:col-span-2 flex gap-4 justify-end">
                <button
                  onClick={() => setShowForm(null)}
                  className="px-4 py-2 bg-gray-600 rounded hover:bg-gray-700"
                >
                  Отмена
                </button>
                <button
                  onClick={() => handleCreate(showForm)}
                  className="px-4 py-2 bg-blue-600 rounded hover:bg-blue-700"
                >
                  Создать
                </button>
              </div>
            </div>
          </div>
        )}

        <section>
          <h2 className="text-3xl font-bold text-center text-gray-300 mb-8">
            Каталог
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            <button
              onClick={() => goToCategory()}
              className="focus:outline-none"
            >
              <div className="bg-gray-800 p-6 rounded-lg shadow-lg transform transition-transform hover:scale-105 h-full">
                <img
                  src="/img/categories/all-categories.png"
                  alt="Все категории"
                  className="w-full object-cover rounded-lg mb-4"
                />
                <p className="text-center text-xl font-semibold">
                  Все категории
                </p>
              </div>
            </button>

            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => goToCategory(category.id)}
                className="focus:outline-none"
              >
                <Category category={category} />
              </button>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
