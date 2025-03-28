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
      if (!formData.name.trim()) {
        throw new Error("Название обязательно для заполнения");
      }
      if (type === "product") {
        if (!formData.categoryId) {
          throw new Error("Выберите категорию");
        }
        if (!formData.price) {
          throw new Error("Укажите цену");
        }
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
        const existingCategory = categories.find(
          (c) => c.name.toLowerCase() === formData.name.trim().toLowerCase()
        );

        if (existingCategory) {
          throw new Error("Категория с таким названием уже существует");
        }
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
        setCategories((prev) => [...prev, response.data]);
      }
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
    <div
      className="flex items-center justify-center min-h-screen bg-[url('/img/BG-image.png')] bg-fixed bg-center bg-no-repeat bg-cover bg-opacity-10 p-8"
      role="main"
    >
      <main className="max-w-7xl 2xl:max-w-[1440px] 4k:max-w-[1800px] mx-auto">
        {/* <div
      className="flex items-center justify-center min-h-screen bg-[url('/img/BG-image.png')] bg-fixed bg-center bg-no-repeat bg-cover bg-opacity-10 p-8"
      role="main"
    >
      <div className="max-w-7xl  mx-auto"> */}
        {showForm && (
          <div className="mb-8 bg-krio-background p-6 rounded-xl shadow-lg">
            <h3 className="text-2xl font-semibold mb-6 text-gray-100">
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
              className="space-y-6"
            >
              <div>
                <label className="block text-gray-300 mb-2">Название *</label>
                <input
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full p-4 bg-krio-foreground border-2 border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
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
                      className="w-full p-4 bg-krio-foreground border-2 border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
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
                      className="w-full p-4 bg-krio-foreground border-2 border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-gray-300 mb-2">Наличие</label>
                    <input
                      name="availability"
                      value={formData.availability}
                      onChange={handleInputChange}
                      className="w-full p-4 bg-krio-foreground border-2 border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
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
                  className="w-full p-4 bg-krio-foreground border-2 border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
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
                  className="px-6 py-3 bg-gray-700 hover:bg-gray-600 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-gray-500"
                >
                  Отмена
                </button>
                <button
                  type="submit"
                  className="px-6 py-3 bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  {showForm === "editCategory" ? "Сохранить" : "Создать"}
                </button>
              </div>
            </form>
          </div>
        )}
        <div className="text-white min-h-screen p-6">
          <div className="max-w-7xl 2xl:max-w-[1440px] 4k:max-w-[1800px] mx-auto">
            {/* <div className="text-white min-h-screen p-6">
          <div className="max-w-7xl mx-auto"> */}
            {user?.isAdmin && (
              <div className="mb-8 flex gap-6 justify-end">
                <button
                  onClick={() => setShowForm("product")}
                  className="bg-green-600 hover:bg-green-700 px-6 py-3 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-green-500"
                  disabled={isLoading}
                  aria-label="Добавить новый товар"
                >
                  {isLoading ? "Загрузка..." : "+ Новый товар"}
                </button>
                <button
                  onClick={() => setShowForm("category")}
                  className="bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500"
                  disabled={isLoading}
                  aria-label="Добавить новую категорию"
                >
                  {isLoading ? "Загрузка..." : "+ Новая категория"}
                </button>
              </div>
            )}
            {error && (
              <div
                className="mb-6 p-6 bg-red-800 text-red-100 rounded-lg shadow-xl"
                role="alert"
                aria-live="polite"
              >
                {error}
              </div>
            )}
            {isLoading && (
              <div className="flex justify-center items-center py-8">
                <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-blue-500"></div>
              </div>
            )}
            <section>
              <h2 className="text-4xl font-bold text-center text-gray-300 mb-12">
                Каталог
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12">
                <button
                  onClick={() => goToCategory()}
                  className="w-full focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-xl transform transition-transform hover:scale-105"
                  aria-label="Показать все категории"
                >
                  <div className="bg-krio-background p-8 rounded-xl shadow-xl hover:shadow-2xl transition-shadow duration-300">
                    <img
                      src="/img/categories/all-categories.png"
                      alt="Все категории"
                      className="w-full object-cover rounded-xl mb-6"
                      loading="lazy"
                    />
                    <p className="text-center text-2xl font-semibold text-gray-300">
                      Все категории
                    </p>
                  </div>
                </button>
                {categories.map((category) => (
                  <div key={category.id} className="relative group">
                    {user?.isAdmin && (
                      <div className="absolute top-4 right-4 flex gap-4 z-10">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleDeleteCategory(category.id);
                          }}
                          className="p-3 text-red-500 hover:text-red-700 transition-colors focus:outline-none focus:ring-2 focus:ring-red-500 rounded-full"
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
                          className="p-3 text-blue-500 hover:text-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-full"
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
                      className="w-full focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-xl transform transition-transform hover:scale-105"
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
      </main>
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
