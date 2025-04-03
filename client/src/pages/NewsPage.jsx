import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axiosInstance from "../axiosInstance";

export default function NewsPage({ user }) {
  const [news, setNews] = useState([]);
  const [selectedNews, setSelectedNews] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    image: null,
  });

  const [isEditing, setIsEditing] = useState(false);
  const [formError, setFormError] = useState("");
  const [formLoading, setFormLoading] = useState(false);

  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    fetchNews();
  }, []);

  useEffect(() => {
    if (id) {
      fetchNewsById(id);
    }
  }, [id]);

  const fetchNews = async () => {
    try {
      setLoading(true);
      const response = await axiosInstance.get("/listNews");
      setNews(response.data);
      setError("");
    } catch (err) {
      console.error("Error fetching news:", err);
      setError("Не удалось загрузить новости");
    } finally {
      setLoading(false);
    }
  };

  const fetchNewsById = async (newsId) => {
    try {
      setLoading(true);
      const response = await axiosInstance.get(`/news/${newsId}`);
      setSelectedNews(response.data);
      setIsModalOpen(true);
      setError("");
    } catch (err) {
      console.error("Error fetching news item:", err);
      setError("Не удалось загрузить новость");
    } finally {
      setLoading(false);
    }
  };

  const handleCreateNews = async (e) => {
    e.preventDefault();
    try {
      setFormLoading(true);
      setFormError("");

      if (!formData.title.trim() || !formData.content.trim()) {
        setFormError("Заполните обязательные поля");
        return;
      }

      const newsData = new FormData();
      newsData.append("title", formData.title.trim());
      newsData.append("content", formData.content.trim());

      if (formData.image instanceof File) {
        newsData.append("image", formData.image);
      }

      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      };

      const endpoint =
        isEditing && selectedNews
          ? `/updateNews/${selectedNews.id}/${user.id}`
          : "/createNews";

      await axiosInstance.post(endpoint, newsData, config);

      setFormData({ title: "", content: "", image: null });
      setShowForm(false);
      setIsEditing(false);
      fetchNews();
    } catch (err) {
      setFormError(
        err.response?.data?.message || "Ошибка при сохранении новости"
      );
    } finally {
      setFormLoading(false);
    }
  };

  const handleDeleteNews = async (newsId) => {
    if (!window.confirm("Вы уверены, что хотите удалить эту новость?")) {
      return;
    }

    try {
      setLoading(true);
      await axiosInstance.delete(`/deleteNews/${newsId}/${user.id}`);
      setNews(news.filter((item) => item.id !== newsId));

      if (selectedNews && selectedNews.id === newsId) {
        setSelectedNews(null);
        setIsModalOpen(false);
      }
    } catch (err) {
      console.error("Error deleting news:", err);
      setError("Не удалось удалить новость");
    } finally {
      setLoading(false);
    }
  };
  const handleEditNews = (newsItem) => {
    setFormData({
      title: newsItem.title,
      content: newsItem.content,
      image: newsItem.image, // Сохраняем текущее изображение
    });
    setSelectedNews(newsItem);
    setIsEditing(true);
    setShowForm(true);
  };

  const handleInputChange = (e) => {
    const { name, value, files } = e.target;

    if (name === "image") {
      setFormData((prev) => ({ ...prev, image: files[0] }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(dateString).toLocaleDateString("ru-RU", options);
  };

  const prefetchNews = async (newsId) => {
    if (!news.find((n) => n.id === newsId)) {
      await axiosInstance.get(`/news/${newsId}`);
    }
  };

  return (
    <div className="min-h-screen bg-[url('/uploads/BG-image.png')] bg-fixed bg-center bg-no-repeat bg-cover p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold text-center text-gray-300 mb-8">
          Новости
        </h1>

        {user?.isAdmin && (
          <div className="mb-8">
            <button
              onClick={() => {
                setFormData({ title: "", content: "", image: null });
                setIsEditing(false);
                setShowForm(!showForm);
              }}
              className="px-6 py-3 bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {showForm ? "Отменить" : "Добавить новость"}
            </button>

            {showForm && (
              <div className="mt-6 bg-krio-background p-6 rounded-xl shadow-lg">
                <h3 className="text-2xl font-semibold mb-6 text-gray-100">
                  {isEditing ? "Редактировать новость" : "Создать новость"}
                </h3>

                {formError && (
                  <div className="mb-4 p-3 bg-red-500 bg-opacity-20 border border-red-500 rounded-lg text-red-300">
                    {formError}
                  </div>
                )}

                <form onSubmit={handleCreateNews} className="space-y-6">
                  <div>
                    <label className="block text-gray-300 mb-2">
                      Заголовок *
                    </label>
                    <input
                      name="title"
                      value={formData.title}
                      onChange={handleInputChange}
                      className="w-full p-4 bg-krio-foreground border-2 border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-gray-300 mb-2">
                      Содержание *
                    </label>
                    <textarea
                      name="content"
                      value={formData.content}
                      onChange={handleInputChange}
                      rows="6"
                      className="w-full p-4 bg-krio-foreground border-2 border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-gray-300 mb-2">
                      Изображение
                    </label>
                    <input
                      name="image"
                      type="file"
                      accept="image/png, image/jpeg, image/jpg"
                      onChange={handleInputChange}
                      className="w-full p-4 bg-krio-foreground border-2 border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  {isEditing && selectedNews?.image && (
                    <div className="mb-4">
                      <p className="text-gray-300 text-sm mb-2">
                        Текущее изображение:
                      </p>
                      <img
                        src={selectedNews.image}
                        alt="Превью"
                        className="w-48 h-48 object-contain rounded-lg"
                      />
                    </div>
                  )}

                  <div className="flex justify-end gap-4">
                    <button
                      type="button"
                      onClick={() => setShowForm(false)}
                      className="px-6 py-3 bg-gray-700 hover:bg-gray-600 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-gray-500"
                    >
                      Отмена
                    </button>
                    <button
                      type="submit"
                      disabled={formLoading}
                      className="px-6 py-3 bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
                    >
                      {formLoading
                        ? "Сохранение..."
                        : isEditing
                        ? "Сохранить"
                        : "Создать"}
                    </button>
                  </div>
                </form>
              </div>
            )}
          </div>
        )}

        {loading ? (
          <div className="text-center text-gray-300 py-12">
            <p>Загрузка новостей...</p>
          </div>
        ) : error ? (
          <div className="text-center text-red-300 py-12">
            <p>{error}</p>
          </div>
        ) : news.length === 0 ? (
          <div className="text-center text-gray-300 py-12">
            <p>Новостей пока нет</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {news.map((item) => (
              <div
                key={item.id}
                className="bg-krio-background p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow relative group"
              >
                {user?.isAdmin && (
                  <div className="absolute top-4 right-4 flex gap-2 z-10 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleEditNews(item);
                      }}
                      className="p-2 text-blue-500 hover:text-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-full"
                      title="Редактировать новость"
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
                          d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                        />
                      </svg>
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDeleteNews(item.id);
                      }}
                      className="p-2 text-red-500 hover:text-red-700 transition-colors focus:outline-none focus:ring-2 focus:ring-red-500 rounded-full"
                      title="Удалить новость"
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
                  </div>
                )}

                <div
                  className="cursor-pointer"
                  onClick={() => fetchNewsById(item.id)}
                  onMouseEnter={() => prefetchNews(item.id)}
                >
                  <div className="mb-4 h-48 overflow-hidden rounded-lg">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-auto object-contain transition-transform hover:scale-105"
                      onError={(e) => {
                        e.target.src = "/uploads/news/default-news.jpg";
                      }}
                    />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-200 mb-2">
                    {item.title}
                  </h3>
                  <p className="text-gray-400 text-sm mb-3">
                    {formatDate(item.createdAt)}
                  </p>
                  <p className="text-gray-300 line-clamp-3">{item.content}</p>
                  <button
                    className="mt-4 text-blue-400 hover:text-blue-300 transition-colors"
                    onMouseEnter={() => prefetchNews(item.id)}
                    onClick={(e) => {
                      e.stopPropagation();
                      fetchNewsById(item.id);
                    }}
                  >
                    Читать далее
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {isModalOpen && selectedNews && (
          <div
            className="fixed inset-0 bg-black/50 backdrop-blur-md flex items-center justify-center p-4 z-[100]"
            onClick={() => {
              setIsModalOpen(false);
              navigate("/news");
            }}
          >
            <div
              className="bg-krio-background rounded-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl border border-gray-700/50"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-6">
                <div className="flex justify-between items-start mb-6">
                  <div className="pr-4">
                    <h2 className="text-2xl font-bold text-gray-100 mb-2">
                      {selectedNews.title}
                    </h2>
                    <p className="text-gray-400 text-sm">
                      {formatDate(selectedNews.createdAt)}
                    </p>
                  </div>
                  <button
                    onClick={() => {
                      setIsModalOpen(false);
                      navigate("/news");
                    }}
                    className="text-gray-400 hover:text-gray-200 transition-colors p-1 -mt-2 -mr-2"
                    aria-label="Закрыть"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-7 w-7"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </button>
                </div>

                <div className="mb-6 rounded-lg overflow-hidden bg-gray-800/50">
                  <img
                    src={selectedNews.image}
                    alt={selectedNews.title}
                    className="w-full h-auto max-h-[500px] object-contain"
                    loading="lazy"
                    onError={(e) => {
                      e.target.src = "/uploads/news/default-news.jpg";
                    }}
                  />
                </div>

                <div className="text-gray-300 whitespace-pre-line leading-relaxed space-y-4">
                  {selectedNews.content}
                </div>

                <div className="mt-8 pt-6 border-t border-gray-700/50">
                  <button
                    onClick={() => {
                      setIsModalOpen(false);
                      navigate("/news");
                    }}
                    className="px-5 py-2.5 text-sm font-medium bg-gray-700 hover:bg-gray-600 rounded-lg transition-colors float-right"
                  >
                    Закрыть
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
