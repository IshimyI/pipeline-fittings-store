import { useNavigate } from "react-router-dom";
import { useEffect, useState, useCallback, memo } from "react";
import Category from "../ui/Category";
import axiosInstance from "../axiosInstance";
import AddProductForm from "../components/AddProductForm";
import Dialog from "../ui/Dialog";
import ImageUploader from "../components/ImageUploader";
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
    image: null,
    availability: 0,
    params: "",
  });
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [latestNews, setLatestNews] = useState([]);
  const [latestProduct, setLatestProduct] = useState(null);

  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      const [categoriesRes, productsRes, newsRes, latestProductRes] =
        await Promise.all([
          axiosInstance.get("/ListCategories"),
          axiosInstance.get("/ListProducts"),
          axiosInstance.get("/ListNews"),
          axiosInstance.get("/latestProduct"),
        ]);

      setCategories(categoriesRes.data);
      setProducts(productsRes.data);
      setLatestNews(newsRes.data.slice(0, 3));
      setLatestProduct(latestProductRes.data);
    } catch (error) {
      setError("Ошибка при загрузке данных");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

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

      const formDataToSend = new FormData();
      formDataToSend.append("name", formData.name.trim());

      if (formData.image instanceof File) {
        formDataToSend.append("image", formData.image);
      } else if (editingCategory.img) {
        formDataToSend.append("existingImage", editingCategory.img);
      }

      const response = await axiosInstance.put(
        `/updateCategory/${editingCategory.id}/${user.id}`,
        formDataToSend,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.status === 200) {
        setCategories((prev) =>
          prev.map((c) => (c.id === editingCategory.id ? response.data : c))
        );
        setEditingCategory(null);
        setShowForm(null);
        setFormData({
          name: "",
          image: null,
        });
      }
    } catch (error) {
      setError(error.response?.data?.message || error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = useCallback((e) => {
    const { name, files } = e.target;

    if (name === "image") {
      setFormData((prev) => ({ ...prev, [name]: files[0] }));
    } else {
      const { value } = e.target;
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
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
          image: formData.image || "no-photo.png",
          availability: formData.availability || 0,
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
          img: formData.image || "no-photo.png",
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
        image: null,
        availability: 0,
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
      className="flex items-center justify-center min-h-screen bg-[url('/uploads/BG-image.png')] bg-fixed bg-center bg-no-repeat bg-cover bg-opacity-10 p-2 md:p-8"
      role="main"
    >
      <main className="max-w-7xl  4k:max-w-[1800px] mx-auto">
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
                      type="number"
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
                <ImageUploader
                  onImageSelected={(file) => {
                    setFormData((prev) => ({
                      ...prev,
                      image: file,
                    }));
                  }}
                  image={
                    formData.image instanceof File
                      ? URL.createObjectURL(formData.image)
                      : editingCategory?.img || "/uploads/no-photo.png"
                  }
                  className="mt-2"
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
                      image: null,
                      availability: 0,
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
        <div className="text-white min-h-screen p-2 md:p-6">
          <div className="max-w-7xl 2xl:max-w-[1440px] 4k:max-w-[1800px] mx-auto">
            <div>
              <AddProductForm
                categories={categories}
                onProductCreated={fetchData}
                user={user}
              />
            </div>
            <section className="mb-16 grid grid-cols-1 lg:grid-cols-[3fr_1fr] gap-2 md:gap-8">
              <div>
                <h2 className="text-4xl font-bold text-center text-gray-300 mb-8 lg:mb-12">
                  Последние новости
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {latestNews.slice(0, 3).map((news) => (
                    <article
                      key={news.id}
                      className="bg-krio-background rounded-xl p-5 shadow-lg hover:shadow-2xl transition-all duration-300 group"
                      onClick={() => navigate(`/news/${news.id}`)}
                    >
                      <div className="relative overflow-hidden rounded-lg mb-4">
                        <img
                          src={news.image || "/uploads/no-photo.png"}
                          alt={news.title}
                          className="w-full h-52 object-contain transform group-hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                      <h3 className="text-xl font-semibold mb-3 line-clamp-2">
                        {news.title}
                      </h3>
                      <p className="text-gray-400 text-sm line-clamp-3 mb-4">
                        {news.summary}
                      </p>
                      <button
                        onClick={() => navigate(`/news/${news.id}`)}
                        className="text-blue-400 hover:text-blue-300 text-sm font-medium"
                      >
                        Читать далее →
                      </button>
                    </article>
                  ))}
                </div>
              </div>

              <div className="lg:pl-4">
                <h2 className="text-4xl font-bold text-center text-gray-300 mb-8 lg:mb-12">
                  Новый товар
                </h2>
                {latestProduct && (
                  <div
                    className="bg-krio-background rounded-xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 group sticky top-6 cursor-pointer"
                    onClick={() => {
                      setSelectedProduct(latestProduct);
                      setIsDialogOpen(true);
                    }}
                  >
                    <div className="flex flex-col gap-6">
                      <div className="relative overflow-hidden rounded-lg">
                        <img
                          src={latestProduct.image || "/uploads/no-photo.png"}
                          alt={latestProduct.name}
                          className="w-full h-52 object-contain transform group-hover:scale-105 transition-transform duration-300"
                          onError={(e) => {
                            e.target.src = "/uploads/no-photo.png";
                            e.target.onerror = null;
                          }}
                        />
                      </div>
                      <div className="flex flex-col">
                        <h3 className="text-2xl font-semibold mb-2 line-clamp-2">
                          {latestProduct.name}
                        </h3>
                        <div className="flex items-center justify-between mb-4">
                          <p className="text-xl text-blue-400 font-medium">
                            По запросу
                          </p>
                          <span className="text-sm text-emerald-400 bg-emerald-900/30 px-3 py-1 rounded-full">
                            {latestProduct.availability > 0
                              ? "Есть в наличии"
                              : "Под заказ"}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </section>
            <section>
              <h2 className="text-4xl font-bold text-center text-gray-300 mb-12">
                Каталог
              </h2>
              <div className="grid grid-cols-2 lg:grid-cols-3 gap-2 md:gap-12">
                <button
                  onClick={() => goToCategory()}
                  className="w-full focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-xl transform transition-transform hover:scale-105"
                  aria-label="Показать все категории"
                >
                  <div className="bg-krio-background p-8 rounded-xl shadow-xl hover:shadow-2xl transition-shadow duration-300">
                    <img
                      src="/uploads/categories/all-categories.png"
                      alt="Все категории"
                      className="w-full object-cover rounded-xl mb-6"
                      loading="lazy"
                    />
                    <p className="text-center text-sm md:text-xl font-semibold break-words whitespace-normal">
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
      <Dialog
        user={user}
        isOpen={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        product={selectedProduct}
        category={categories}
      />
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
