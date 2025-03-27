import { useEffect, useMemo, useState } from "react";
import axiosInstance from "../axiosInstance";

export default function AdminFeedback({ user }) {
  const [feedbackMessages, setFeedbackMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [sortOrder, setSortOrder] = useState("desc");
  const [filterStatus, setFilterStatus] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const fetchFeedback = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await axiosInstance.get("/feedback");
        if (response.status === 200) {
          setFeedbackMessages(response.data);
        }
      } catch (error) {
        console.error("Ошибка загрузки сообщений:", error);
        setError(
          "Не удалось загрузить сообщения. Пожалуйста, попробуйте позже."
        );
      } finally {
        setLoading(false);
      }
    };
    fetchFeedback();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm("Вы уверены, что хотите удалить это сообщение?")) {
      try {
        await axiosInstance.delete(`/feedback/${id}`);
        setFeedbackMessages((messages) =>
          messages.filter((msg) => msg.id !== id)
        );
      } catch (error) {
        console.error("Ошибка удаления:", error);
        setError("Не удалось удалить сообщение");
      }
    }
  };

  const sortedAndFilteredMessages = useMemo(() => {
    return feedbackMessages
      .filter((message) => {
        if (filterStatus === "all") return true;
        return message.status === filterStatus;
      })
      .filter(
        (message) =>
          message.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
          message.email?.toLowerCase().includes(searchQuery.toLowerCase()) ||
          message.message?.toLowerCase().includes(searchQuery.toLowerCase())
      )
      .sort((a, b) => {
        const dateA = new Date(a.createdAt);
        const dateB = new Date(b.createdAt);
        return sortOrder === "desc" ? dateB - dateA : dateA - dateB;
      });
  }, [feedbackMessages, sortOrder, filterStatus, searchQuery]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-900 p-8">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto"></div>
          <p className="mt-4 text-white">Загрузка сообщений...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-900 p-8">
        <div className="bg-red-900/30 border border-red-500 rounded-lg p-6 max-w-md text-center">
          <p className="text-red-300 font-medium">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="mt-4 px-4 py-2 bg-red-700 hover:bg-red-600 rounded text-white"
          >
            Попробовать снова
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-2xl md:text-3xl font-bold text-white mb-6">
          Обратная связь от клиентов
        </h1>

        {/* Панель управления */}
        <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-4 mb-6">
          <div className="flex flex-col md:flex-row gap-4 mb-4">
            <input
              type="text"
              placeholder="Поиск по сообщениям..."
              className="bg-gray-700/50 text-white px-4 py-2 rounded-lg flex-1 border border-gray-600 focus:border-gray-500 focus:outline-none"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <div className="flex flex-wrap gap-4">
            <select
              className="bg-gray-700/50 text-white px-4 py-2 rounded-lg border border-gray-600 focus:border-gray-500 focus:outline-none"
              value={sortOrder}
              onChange={(e) => setSortOrder(e.target.value)}
            >
              <option value="desc">Сначала новые</option>
              <option value="asc">Сначала старые</option>
            </select>

            <select
              className="bg-gray-700/50 text-white px-4 py-2 rounded-lg border border-gray-600 focus:border-gray-500 focus:outline-none"
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
            >
              <option value="all">Все сообщения</option>
              <option value="new">Новые</option>
              <option value="processed">Обработанные</option>
            </select>
          </div>
        </div>

        {/* Список сообщений */}
        <div className="space-y-4">
          {sortedAndFilteredMessages.length === 0 ? (
            <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-8 text-center">
              <p className="text-gray-400">
                Нет сообщений, соответствующих критериям
              </p>
            </div>
          ) : (
            sortedAndFilteredMessages.map((message) => (
              <div
                key={message.id}
                className="bg-gray-800/50 border border-gray-700 rounded-lg p-5 hover:bg-gray-800/70 transition-colors relative group"
              >
                <button
                  onClick={() => handleDelete(message.id)}
                  className="absolute top-3 right-3 text-red-400 hover:text-red-300 transition-colors"
                  title="Удалить сообщение"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
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

                <div className="flex justify-between items-start mb-3">
                  <h3 className="text-lg font-semibold text-white">
                    {message.name || "Без имени"}
                    {message.status === "new" && (
                      <span className="ml-2 bg-green-500/20 text-green-400 text-xs px-2 py-1 rounded-full">
                        Новое
                      </span>
                    )}
                  </h3>
                  <span className="text-sm text-gray-400">
                    {new Date(message.createdAt).toLocaleString()}
                  </span>
                </div>

                <div className="mb-3">
                  <p className="text-gray-300">
                    <span className="text-gray-400">Email:</span>{" "}
                    {message.email || "Не указан"}
                  </p>
                  {message.phone && (
                    <p className="text-gray-300">
                      <span className="text-gray-400">Телефон:</span>{" "}
                      {message.phone}
                    </p>
                  )}
                </div>

                <div className="bg-gray-700/30 rounded p-3">
                  <p className="text-gray-200 whitespace-pre-line">
                    {message.message}
                  </p>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
