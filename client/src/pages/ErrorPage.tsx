import { useNavigate } from "react-router";
import type { User } from "../types";

interface ErrorPageProps {
  user?: User | null;
}

export default function ErrorPage({ user: _user }: ErrorPageProps) {
  const navigate = useNavigate();

  const goToHome = () => {
    navigate("/");
  };

  return (
    <div className="flex items-center text-white justify-center min-h-screen p-8">
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
