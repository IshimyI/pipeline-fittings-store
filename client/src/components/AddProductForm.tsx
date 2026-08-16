import { useState, useEffect, type ChangeEvent, type FormEvent } from "react";
import axios from "axios";
import axiosInstance from "../axiosInstance";
import ImageUploader from "./ImageUploader";
import type { User, Category, Product } from "../types";

interface AddProductFormProps {
  user: User | null;
  onProductCreated?: (product: Product) => void;
}

interface FormState {
  name: string;
  categoryId: string;
  price: string;
  availability: number;
  params: Record<string, unknown>;
}

const emptyForm: FormState = {
  name: "",
  categoryId: "",
  price: "",
  availability: 0,
  params: {},
};

const AddProductForm = ({ user, onProductCreated }: AddProductFormProps) => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [error, setError] = useState("");
  const [, setCategoryError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isCategoryLoading, setIsCategoryLoading] = useState(false);
  const [showForm, setShowForm] = useState<"product" | "category" | "editCategory" | null>(null);
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [formData, setFormData] = useState<FormState>(emptyForm);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axiosInstance.get<Category[]>("/listCategories");
        setCategories(response.data);
      } catch (error) {
        console.error("Ошибка при загрузке категорий:", error);
        setError("Не удалось загрузить категории");
      }
    };

    fetchCategories();
  }, []);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleImageSelected = (file: File) => {
    setSelectedImage(file);
  };

  const handleCreateCategory = async (e: FormEvent) => {
    e.preventDefault();
    setIsCategoryLoading(true);
    setCategoryError("");

    try {
      if (!formData.name) {
        setCategoryError("Пожалуйста, введите название категории");
        return;
      }

      const categoryFormData = new FormData();
      categoryFormData.append("name", formData.name);
      if (selectedImage) {
        categoryFormData.append("image", selectedImage);
      }

      const response = await axiosInstance.post<Category>(
        "/createCategory",
        categoryFormData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      setCategories((prev) => [...prev, response.data]);
      setFormData(emptyForm);
      setSelectedImage(null);
      setShowForm(null);
    } catch (error) {
      console.error("Ошибка при создании категории:", error);
      if (axios.isAxiosError(error) && error.response?.status === 400) {
        setCategoryError("Категория с таким названием уже существует");
      } else if (axios.isAxiosError(error) && error.response?.status === 413) {
        setCategoryError("Размер изображения слишком большой");
      } else {
        setCategoryError(
          (axios.isAxiosError(error) && error.response?.data?.message) ||
            "Произошла ошибка при создании категории"
        );
      }
    } finally {
      setIsCategoryLoading(false);
    }
  };

  const handleSubmit = async (e: FormEvent) => {
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
      productFormData.append("availability", String(formData.availability));
      productFormData.append("params", JSON.stringify(formData.params));

      if (selectedImage) {
        productFormData.append("image", selectedImage);
      }

      const response = await axiosInstance.post<{ product: Product }>(
        "/createProduct",
        productFormData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      setFormData(emptyForm);
      setSelectedImage(null);
      setShowForm(null);

      if (onProductCreated) {
        onProductCreated(response.data.product);
      }
    } catch (error) {
      console.error("Ошибка при создании товара:", error);
      const message = axios.isAxiosError(error) ? error.response?.data?.message : undefined;
      setError(message || "Произошла ошибка при создании товара");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      {showForm && (
        <div className="mb-8 bg-krio-background p-6 rounded-xl shadow-lg border border-krio-primary/20">
          <h3 className="text-2xl font-semibold mb-6 text-white">
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
                className="w-full p-4 bg-krio-foreground border border-krio-primary/30 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-krio-primary"
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
                    className="w-full p-4 bg-krio-foreground border border-krio-primary/30 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-krio-primary"
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
                    className="w-full p-4 bg-krio-foreground border border-krio-primary/30 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-krio-primary"
                    required
                  />
                </div>
                <div>
                  <label className="block text-gray-300 mb-2">Наличие</label>
                  <input
                    type="number"
                    min="0"
                    name="availability"
                    value={formData.availability}
                    onChange={handleInputChange}
                    className="w-full p-4 bg-krio-foreground border border-krio-primary/30 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-krio-primary"
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
            <div className="flex flex-col md:flex-row justify-end gap-4">
              <button
                type="button"
                onClick={() => {
                  setShowForm(null);
                  setFormData(emptyForm);
                }}
                className="px-6 py-3 bg-gray-700 hover:bg-gray-600 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-gray-500"
              >
                Отмена
              </button>
              <button
                type="submit"
                disabled={isLoading || isCategoryLoading}
                className="flex items-center justify-center gap-2 px-6 py-3 bg-krio-primary hover:bg-krio-primary/80 text-white rounded-lg shadow-md transition-colors focus:outline-none focus:ring-2 focus:ring-krio-primary disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {!(isLoading || isCategoryLoading) && (
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2}
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                )}
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
          <div className="mb-8 flex flex-col md:flex-row gap-6 justify-end">
            <button
              onClick={() => setShowForm("product")}
              className="bg-krio-primary hover:bg-krio-primary/80 text-white px-6 py-3 rounded-lg shadow-md transition-colors focus:outline-none focus:ring-2 focus:ring-krio-primary"
              disabled={isLoading}
              aria-label="Добавить новый товар"
            >
              {isLoading ? "Загрузка..." : "+ Новый товар"}
            </button>
            <button
              onClick={() => setShowForm("category")}
              className="bg-krio-primary hover:bg-krio-primary/80 text-white px-6 py-3 rounded-lg shadow-md transition-colors focus:outline-none focus:ring-2 focus:ring-krio-primary"
              disabled={isLoading}
              aria-label="Добавить новую категорию"
            >
              {isLoading ? "Загрузка..." : "+ Новая категория"}
            </button>
          </div>
        )}
        {error && (
          <div
            className="mb-6 p-4 bg-red-500/10 border border-red-500/40 text-red-300 rounded-lg"
            role="alert"
            aria-live="polite"
          >
            {error}
          </div>
        )}
        {isLoading && (
          <div className="flex justify-center items-center py-8">
            <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-krio-primary"></div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AddProductForm;
