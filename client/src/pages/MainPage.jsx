import { useNavigate } from "react-router-dom";
import { useEffect, useState, useCallback, memo } from "react";
import Category from "../ui/Category";
import axiosInstance from "../axiosInstance";
const MemoizedCategory = memo(Category);

export default function MainPage({ user, category }) {
  const [categories, setCategories] = useState(category);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
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
  const navigate = useNavigate();
  const goToCategory = useCallback(
    (categoryId) => {
      navigate(categoryId ? `/category/${categoryId}` : "/category");
    },
    [navigate]
  );
  const handleDeleteCategory = async (categoryId) => {
    try {
      setIsLoading(true);
      if (window.confirm("Вы уверены, что хотите удалить эту категорию?")) {
        const userId = user.id;
        await axiosInstance.delete(`/deleteCategory/${categoryId}/${userId}`);
        setCategories((prev) => prev.filter((c) => c.id !== categoryId));
      }
    } catch (error) {
      setError("Не удалось удалить категорию: " + error.message);
    } finally {
      setIsLoading(false);
    }
  };
  const handleEditCategory = async (e) => {
    e.preventDefault();
    try {
      setIsLoading(true);
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
        setCategories((prev) =>
          prev.map((c) => (c.id === editingCategory.id ? response.data : c))
        );
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
      setError(error.response?.data?.message || error.message);
    } finally {
      setIsLoading(false);
    }
  };
  const handleInputChange = useCallback((e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  }, []);

  const handleCreate = async (type) => {
    try {
      setIsLoading(true);
      setError("");
      // Валидация общих полей
      if (!formData.name.trim()) {
        throw new Error("Название обязательно для заполнения");
      }
      if (type === "product") {
        // Валидация полей товара
        if (!formData.categoryId) {
          throw new Error("Выберите категорию");
        }
        if (!formData.price) {
          throw new Error("Укажите цену");
        }
        // Создание товара
        const productPayload = {
          name: formData.name.trim(),
          categoryId: Number(formData.categoryId),
          price: formData.price,
          image: formData.image || "default-product.jpg",
          availability: formData.availability || "в наличии",
          params: tryParseJSON(formData.params),
          user: { isAdmin: user?.isAdmin },
        };
        const response = await axiosInstance.post(
          "/createProduct",
          productPayload
        );
        if (response.status !== 201) {
          throw new Error("Ошибка при создании товара");
        }
      } else if (type === "category") {
        // Проверка на дубликат категории
        const existingCategory = categories.find(
          (c) => c.name.toLowerCase() === formData.name.trim().toLowerCase()
        );

        if (existingCategory) {
          throw new Error("Категория с таким названием уже существует");
        }
        // Создание категории
        const categoryPayload = {
          name: formData.name.trim(),
          img: formData.image || "default-category.jpg",
          user: { isAdmin: user?.isAdmin },
        };
        const response = await axiosInstance.post(
          "/createCategory",
          categoryPayload
        );
        if (response.status !== 201) {
          throw new Error("Ошибка при создании категории");
        }
        // Обновляем локальный state
        setCategories((prev) => [...prev, response.data]);
      }
      // Очистка формы после успешного создания
      setShowForm(null);
      setFormData({
        name: "",
        categoryId: "",
        price: "",
        image: "",
        availability: "",
        params: "",
      });
    } catch (error) {
      setError(error.message || "Произошла ошибка при создании");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (category && category.length > 0) {
      setCategories(category);
    }
  }, [category]);

  return (
    <div className="text-white min-h-screen p-6" role="main">
      <div className="max-w-7xl mx-auto">
        {showForm && (
          <div className="mb-8 bg-gray-800 p-6 rounded-lg">
            <h3 className="text-xl font-semibold mb-4">
              {showForm === "category"
                ? "Создать категорию"
                : showForm === "editCategory"
                ? "Редактировать категорию"
                : "Создать товар"}
            </h3>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                if (showForm === "editCategory") {
                  handleEditCategory(e);
                } else {
                  handleCreate(showForm);
                }
              }}
              className="space-y-4"
            >
              <div>
                <label className="block text-gray-300 mb-2">Название *</label>
                <input
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg text-white"
                  required
                />
              </div>
              {showForm === "product" && (
                <>
                  <div>
                    <label className="block text-gray-300 mb-2">
                      Категория *
                    </label>
                    <select
                      name="categoryId"
                      value={formData.categoryId}
                      onChange={handleInputChange}
                      className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg text-white"
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
                    <label className="block text-gray-300 mb-2">Цена *</label>
                    <input
                      name="price"
                      value={formData.price}
                      onChange={handleInputChange}
                      className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg text-white"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-gray-300 mb-2">Наличие</label>
                    <input
                      name="availability"
                      value={formData.availability}
                      onChange={handleInputChange}
                      className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg text-white"
                    />
                  </div>
                </>
              )}
              <div>
                <label className="block text-gray-300 mb-2">Изображение</label>
                <input
                  name="image"
                  value={formData.image}
                  onChange={handleInputChange}
                  className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg text-white"
                  placeholder="URL или имя файла"
                />
              </div>
              <div className="flex justify-end gap-4">
                <button
                  type="button"
                  onClick={() => {
                    setShowForm(null);
                    setFormData({
                      name: "",
                      categoryId: "",
                      price: "",
                      image: "",
                      availability: "",
                      params: "",
                    });
                  }}
                  className="px-4 py-2 bg-gray-600 hover:bg-gray-700 rounded-lg"
                >
                  Отмена
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg"
                >
                  {showForm === "editCategory" ? "Сохранить" : "Создать"}
                </button>
              </div>
            </form>
          </div>
        )}
        <div className=" text-white min-h-screen p-6" role="main">
          <div className="max-w-7xl mx-auto">
            {user?.isAdmin && (
              <div className="mb-8 flex gap-4 justify-end">
                <button
                  onClick={() => setShowForm("product")}
                  className="bg-green-600 hover:bg-green-700 px-4 py-2 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-green-500"
                  disabled={isLoading}
                  aria-label="Добавить новый товар"
                >
                  {isLoading ? "Загрузка..." : "+ Новый товар"}
                </button>
                <button
                  onClick={() => setShowForm("category")}
                  className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500"
                  disabled={isLoading}
                  aria-label="Добавить новую категорию"
                >
                  {isLoading ? "Загрузка..." : "+ Новая категория"}
                </button>
              </div>
            )}
            {error && (
              <div
                className="mb-4 p-4 bg-red-800 text-red-100 rounded-lg"
                role="alert"
                aria-live="polite"
              >
                {error}
              </div>
            )}
            {isLoading && (
              <div className="flex justify-center items-center py-8">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
              </div>
            )}
            <section>
              <h2 className="text-3xl font-bold text-center text-gray-300 mb-8">
                Каталог
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                <button
                  onClick={() => goToCategory()}
                  className="focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-lg transform transition-transform hover:scale-105"
                  aria-label="Показать все категории"
                >
                  <div className="bg-gray-800 p-6 rounded-lg shadow-lg h-full">
                    <img
                      src="/img/categories/all-categories.png"
                      alt="Все категории"
                      className="w-full object-cover rounded-lg mb-4"
                      loading="lazy"
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
                          className="p-2 text-red-500 hover:text-red-700 transition-colors focus:outline-none focus:ring-2 focus:ring-red-500 rounded-full"
                          title="Удалить категорию"
                          aria-label={`Удалить категорию ${category.name}`}
                          disabled={isLoading}
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
                          className="p-2 text-blue-500 hover:text-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-full"
                          title="Редактировать категорию"
                          aria-label={`Редактировать категорию ${category.name}`}
                          disabled={isLoading}
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
                      className="w-full focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-lg transform transition-transform hover:scale-105"
                      aria-label={`Перейти в категорию ${category.name}`}
                    >
                      <MemoizedCategory category={category} />
                    </button>
                  </div>
                ))}
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}

function tryParseJSON(jsonString) {
  try {
    return JSON.parse(jsonString);
  } catch (e) {
    return {};
  }
}
