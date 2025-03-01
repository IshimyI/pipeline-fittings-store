import { useNavigate } from "react-router-dom";
import Category from "../ui/Category";
import axiosInstance from "../axiosInstance";
import { useEffect, useState } from "react";

export default function MainPage() {
  const [categories, setCategories] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axiosInstance.get("/listCategories");
        const data = response.data;
        setCategories(data);
      } catch (error) {
        console.error("Ошибка при загрузке категорий:", error);
      }
    };

    fetchCategories();
  }, []);

  const goToCategory = (categoryId) => {
    if (categoryId) {
      navigate(`/category/${categoryId}`);
    } else {
      navigate(`/category`);
    }
  };

  return (
    <div className="bg-gray-900 text-white flex items-center justify-center">
      <main className="w-full max-w-screen-lg p-6">
        <section>
          <h2 className="text-3xl font-bold text-center text-gray-300 mb-8">
            Каталог
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            <button onClick={() => goToCategory()}>
              <div className="category bg-gray-800 p-6 rounded-lg shadow-lg transform transition-transform hover:scale-105">
                <img
                  src={`img/categories/all-categories.png`}
                  alt="Все категории"
                  className="w-full h-full object-cover rounded-lg mb-4"
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
              >
                <Category category={category} />
              </button>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
