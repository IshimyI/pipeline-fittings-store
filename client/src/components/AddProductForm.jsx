import { useState, useEffect } from "react";
import axiosInstance from "../axiosInstance";
import ImageUploader from "./ImageUploader";

const AddProductForm = ({ user, onProductCreated }) => {
  const [categories, setCategories] = useState([]);
  const [error, setError] = useState("");
  const [categoryError, setcategoryError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isCategoryLoading, setIsCategoryLoading] = useState(false);
  const [showForm, setShowForm] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    categoryId: "",
    price: "",
    availability: 0,
    params: {},
  });

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axiosInstance.get("/listCategories");
        setCategories(response.data);
      } catch (error) {
        console.error("Ошибка при загрузке категорий:", error);
        setError("Не удалось загрузить категории");
      }
    };

    fetchCategories();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleImageSelected = (file) => {
    setSelectedImage(file);
  };

  const handleCreateCategory = async (e) => {
    e.preventDefault();
    setIsCategoryLoading(true);
    setcategoryError("");

    try {
      if (!formData.name) {
        setcategoryError("Пожалуйста, введите название категории");
        return;
      }

      const categoryFormData = new FormData();
      categoryFormData.append("name", formData.name);
      if (selectedImage) {
        categoryFormData.append("image", selectedImage);
      }

      const response = await axiosInstance.post(
        "/createCategory",
        categoryFormData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      setCategories((prev) => [...prev, response.data]);
      setFormData({
        name: "",
        categoryId: "",
        price: "",
        availability: 0,
        params: {},
      });
      setSelectedImage(null);
      setShowForm(null);
    } catch (error) {
      console.error("Ошибка при создании категории:", error);
      if (error.response?.status === 400) {
        setcategoryError("Категория с таким названием уже существует");
      } else if (error.response?.status === 413) {
        setcategoryError("Размер изображения слишком большой");
      } else {
        setcategoryError(
          error.response?.data?.message ||
            "Произошла ошибка при создании категории"
        );
      }
    } finally {
      setIsCategoryLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      if (!formData.name || !formData.categoryId || !formData.price) {
        setError("Пожалуйста, заполните все обязательные поля");
        setIsLoading(false);
        return;
      }

      const productFormData = new FormData();
      productFormData.append("name", formData.name);
      productFormData.append("categoryId", formData.categoryId);
      productFormData.append("price", formData.price);
      productFormData.append("availability", formData.availability);
      productFormData.append("params", JSON.stringify(formData.params));

      if (selectedImage) {
        productFormData.append("image", selectedImage);
      }

      const response = await axiosInstance.post(
        "/createProduct",
        productFormData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      setFormData({
        name: "",
        categoryId: "",
        price: "",
        availability: 0,
        params: {},
      });
      setSelectedImage(null);
      setShowForm(null);

      if (onProductCreated) {
        onProductCreated(response.data.product);
      }
    } catch (error) {
      console.error("Ошибка при создании товара:", error);
      setError(
        error.response?.data?.message || "Произошла ошибка при создании товара"
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
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
              if (showForm === "category") {
                handleCreateCategory(e);
              } else if (showForm === "product") {
                handleSubmit(e);
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
              <label className="block text-white mb-2">
                Изображение товара
              </label>
              <ImageUploader
                onImageSelected={handleImageSelected}
                image="/uploads/no-photo.png"
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
                disabled={isLoading || isCategoryLoading}
                className="px-6 py-3 bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading || isCategoryLoading
                  ? "Загрузка..."
                  : showForm === "editCategory"
                  ? "Сохранить"
                  : "Создать"}
              </button>
            </div>
          </form>
        </div>
      )}
      <div>
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
      </div>
    </div>
  );
};

export default AddProductForm;
