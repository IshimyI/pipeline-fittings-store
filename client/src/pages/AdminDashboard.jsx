import { useEffect, useMemo, useState } from "react";
import axiosInstance from "../axiosInstance";

export default function AdminDashboard() {
  const [feedbackMessages, setFeedbackMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [sortOrder, setSortOrder] = useState("desc");
  const [filterStatus, setFilterStatus] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  useEffect(() => {
    const fetchFeedback = async () => {
      try {
        const response = await axiosInstance.get("/feedback");
        if (response.status === 200) {
          setFeedbackMessages(response.data);
        }
        setLoading(false);
      } catch (error) {
        setError("Ошибка при загрузке сообщений обратной связи", error);
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
        setError("Ошибка при удалении сообщения", error);
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
          message.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          message.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
          message.message.toLowerCase().includes(searchQuery.toLowerCase())
      )
      .sort((a, b) => {
        const dateA = new Date(a.createdAt);
        const dateB = new Date(b.createdAt);
        return sortOrder === "desc" ? dateB - dateA : dateA - dateB;
      });
  }, [feedbackMessages, sortOrder, filterStatus, searchQuery]);
  if (loading) return <div className="text-center p-8">Загрузка...</div>;
  if (error) return <div className="text-red-500 p-8">{error}</div>;
  return (
    <div className="min-h-screen bg-gray-900 text-white p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Панель администратора</h1>
        <div className="mb-6 flex flex-wrap gap-4">
          <input
            type="text"
            placeholder="Поиск по сообщениям..."
            className="bg-gray-800 text-white px-4 py-2 rounded-lg flex-1"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />

          <select
            className="bg-gray-800 text-white px-4 py-2 rounded-lg"
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value)}
          >
            <option value="desc">Сначала новые</option>
            <option value="asc">Сначала старые</option>
          </select>
          <select
            className="bg-gray-800 text-white px-4 py-2 rounded-lg"
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
          >
            <option value="all">Все сообщения</option>
            <option value="new">Новые</option>
            <option value="processed">Обработанные</option>
          </select>
        </div>
        <section className="bg-gray-800 rounded-lg p-6">
          <h2 className="text-2xl font-semibold mb-6">
            Сообщения обратной связи
          </h2>
          {sortedAndFilteredMessages.length === 0 ? (
            <p className="text-gray-400">Нет сообщений</p>
          ) : (
            <div className="space-y-6">
              {sortedAndFilteredMessages.map((message) => (
                <div
                  key={message.id}
                  className="bg-gray-700 rounded-lg p-4 hover:bg-gray-600 transition-colors relative group"
                >
                  <button
                    onClick={() => handleDelete(message.id)}
                    className="absolute top-2 right-2 text-red-500 opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    Удалить
                  </button>
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-semibold text-lg">{message.name}</h3>
                    <span className="text-sm text-gray-400">
                      {new Date(message.createdAt).toLocaleString()}
                    </span>
                  </div>
                  <div className="text-gray-300 mb-2">
                    <p>
                      <span className="text-gray-400">Email:</span>{" "}
                      {message.email}
                    </p>
                    {message.phone && (
                      <p>
                        <span className="text-gray-400">Телефон:</span>{" "}
                        {message.phone}
                      </p>
                    )}
                  </div>
                  <p className="text-gray-200">{message.message}</p>
                </div>
              ))}
            </div>
          )}
        </section>
      </div>
    </div>
  );
}
