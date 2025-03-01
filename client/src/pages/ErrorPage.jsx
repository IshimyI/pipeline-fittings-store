import React from "react";
import { useNavigate } from "react-router";

export default function ErrorPage({ user }) {
  const navigate = useNavigate();

  const goToHome = () => {
    navigate("/");
  };

  return (
    <div className="bg-gray-900 text-white flex flex-col items-center justify-center min-h-100">
      <h2 className="text-3xl font-bold text-gray-300 mb-8">
        Ошибка! Страница не найдена
      </h2>
      <button
        onClick={goToHome}
        className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-6 rounded-lg shadow-lg transition-all duration-300"
      >
        Перейти на главную
      </button>
    </div>
  );
}
