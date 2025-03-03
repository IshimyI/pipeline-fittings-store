import { useNavigate } from "react-router-dom";
import Category from "../ui/Category";
import axiosInstance from "../axiosInstance";
import { useEffect, useState } from "react";

export default function MainPage({ user, category }) {
  const [categories, setCategories] = useState(category);
  const [error, setError] = useState("");
  const [editingCategory, setEditingCategory] = useState(null);
  const [showForm, setShowForm] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    categoryId: "",
    price: "",
    image: "",
    availability: "",
    params: "",
  });

  const handleDeleteCategory = async (categoryId) => {
    try {
      if (window.confirm("Вы уверены, что хотите удалить эту категорию?")) {
        const userId = user.id;
        await axiosInstance.delete(`/deleteCategory/${categoryId}/${userId}`);
        const newCategories = categories.filter((c) => c.id !== categoryId);
        setCategories(newCategories);
      }
    } catch (error) {
      console.error("Ошибка удаления категории:", error);
      setError("Не удалось удалить категорию");
    }
  };

  const handleEditCategory = async (e) => {
    e.stopPropagation();
    try {
      if (!formData.name.trim()) {
        throw new Error("Название категории обязательно");
      }

      const payload = {
        name: formData.name.trim(),
        img: formData.image || "default-category.jpg",
      };

      const response = await axiosInstance.put(
        `/updateCategory/${editingCategory.id}/${user.id}`,
        payload
      );

      if (response.status === 200) {
        const updatedCategories = categories.map((c) =>
          c.id === editingCategory.id ? response.data : c
        );
        setCategories(updatedCategories);
        setEditingCategory(null);
        setShowForm(null);
        setFormData({
          name: "",
          categoryId: "",
          price: "",
          image: "",
          availability: "",
          params: "",
        });
      }
    } catch (error) {
      console.error("Ошибка редактирования:", error);
      setError(error.response?.data?.message || error.message);
    }
  };

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
              <div className="md:col-span-2">
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
                  onClick={() => {
                    setShowForm(null);
                    setEditingCategory(null);
                  }}
                  className="px-4 py-2 bg-gray-600 rounded hover:bg-gray-700"
                >
                  Отмена
                </button>
                <button
                  onClick={handleEditCategory}
                  className="px-4 py-2 bg-blue-600 rounded hover:bg-blue-700"
                >
                  Сохранить
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
              <div key={category.id} className="relative group">
                {user?.isAdmin && (
                  <div className="absolute top-2 right-2 flex gap-2 z-10">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDeleteCategory(category.id);
                      }}
                      className="top-2 right-2 p-2 text-red-500 hover:text-red-700 transition-colors z-10"
                      title="Удалить категорию"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                        />
                      </svg>
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setEditingCategory(category);
                        setShowForm("editCategory");
                        setFormData({
                          ...formData,
                          name: category.name,
                          image: category.img,
                        });
                      }}
                      className="p-2 text-blue-500 hover:text-blue-700 transition-colors"
                      title="Редактировать категорию"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                        />
                      </svg>
                    </button>
                  </div>
                )}

                <button
                  onClick={() => goToCategory(category.id)}
                  className="focus:outline-none w-full transform transition-transform hover:scale-105"
                >
                  <Category category={category} />
                </button>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
