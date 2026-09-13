import { useState, useEffect, type ChangeEvent, type FormEvent, type ReactNode, type SyntheticEvent } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import axiosInstance from "../axiosInstance";
import type { NewsItem, User } from "../types";

const SaveIcon = () => (
  <svg
    className="w-4 h-4"
    fill="none"
    stroke="currentColor"
    strokeWidth={2}
    viewBox="0 0 24 24"
  >
    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
  </svg>
);

const EditIcon = () => (
  <svg
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
);

const DeleteIcon = () => (
  <svg
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
);

const CloseIcon = () => (
  <svg
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
);

const PageTitle = ({ children }: { children: ReactNode }) => (
  <div className="text-center">
    <h1 className="text-2xl md:text-3xl font-bold text-white uppercase tracking-[0.15em]">
      {children}
    </h1>
    <div className="w-16 h-0.5 bg-krio-primary mx-auto mt-3" />
  </div>
);

const inputClass =
  "w-full p-4 bg-krio-background border border-krio-primary/30 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-krio-primary transition-all";

interface NewsPageProps {
  user: User | null;
}

interface NewsFormData {
  title: string;
  content: string;
  image: File | string | null;
}

export default function NewsPage({ user }: NewsPageProps) {
  const [news, setNews] = useState<NewsItem[]>([]);
  const [selectedNews, setSelectedNews] = useState<NewsItem | null>(null);
  const [loading, setLoading] = useState(true);
  const [, setModalLoading] = useState(false);
  const [error, setError] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState<NewsFormData>({
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
      const response = await axiosInstance.get<NewsItem[]>("/listNews");
      setNews(response.data);
      setError("");
    } catch (err) {
      console.error("Error fetching news:", err);
      setError("Не удалось загрузить новости");
    } finally {
      setLoading(false);
    }
  };

  const fetchNewsById = async (newsId: string | number) => {
    try {
      setModalLoading(true);
      const response = await axiosInstance.get<NewsItem>(`/news/${newsId}`);
      setSelectedNews(response.data);
      setIsModalOpen(true);
      setError("");
    } catch (err) {
      console.error("Error fetching news item:", err);
    } finally {
      setModalLoading(false);
    }
  };

  const handleCreateNews = async (e: FormEvent<HTMLFormElement>) => {
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
          ? `/updateNews/${selectedNews.id}`
          : "/createNews";

      await axiosInstance.post(endpoint, newsData, config);

      setFormData({ title: "", content: "", image: null });
      setShowForm(false);
      setIsEditing(false);
      fetchNews();
    } catch (err) {
      const message = axios.isAxiosError(err)
        ? err.response?.data?.message
        : undefined;
      setFormError(message || "Ошибка при сохранении новости");
    } finally {
      setFormLoading(false);
    }
  };

  const handleDeleteNews = async (newsId: number) => {
    if (!window.confirm("Вы уверены, что хотите удалить эту новость?")) {
      return;
    }

    try {
      setLoading(true);
      await axiosInstance.delete(`/deleteNews/${newsId}`);
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
  const handleEditNews = (newsItem: NewsItem) => {
    setFormData({
      title: newsItem.title,
      content: newsItem.content,
      image: newsItem.image, // Сохраняем текущее изображение
    });
    setSelectedNews(newsItem);
    setIsEditing(true);
    setShowForm(true);
  };

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;

    if (name === "image") {
      const files = (e.target as HTMLInputElement).files;
      setFormData((prev) => ({ ...prev, image: files?.[0] ?? null }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = {
      year: "numeric",
      month: "long",
      day: "numeric",
    };
    return new Date(dateString).toLocaleDateString("ru-RU", options);
  };

  const prefetchNews = async (newsId: number) => {
    if (!news.find((n) => n.id === newsId)) {
      await axiosInstance.get(`/news/${newsId}`);
    }
  };

  return (
    <div className="min-h-screen flex justify-center py-8 px-4">
      <main className="w-full max-w-[90%] md:max-w-[60%] lg:max-w-[75%] p-6 space-y-8 bg-krio-background rounded-lg shadow-lg border border-gray-700 my-8 h-fit">
        <PageTitle>Новости</PageTitle>

        {user?.isAdmin && (
          <div>
            <button
              onClick={() => {
                setFormData({ title: "", content: "", image: null });
                setIsEditing(false);
                setShowForm(!showForm);
              }}
              className="px-6 py-3 bg-krio-primary text-white text-sm font-medium rounded-lg shadow-md hover:bg-krio-primary/80 transition"
            >
              {showForm ? "Отменить" : "Добавить новость"}
            </button>

            {showForm && (
              <div className="mt-6 p-6 bg-krio-foreground rounded-2xl shadow-2xl border border-krio-primary/20 space-y-6">
                <h3 className="text-xl font-semibold text-white">
                  {isEditing ? "Редактировать новость" : "Создать новость"}
                </h3>

                {formError && (
                  <div className="p-3 bg-red-500/10 border border-red-500/40 rounded-lg text-red-300 text-sm">
                    {formError}
                  </div>
                )}

                <form onSubmit={handleCreateNews} className="space-y-6">
                  <div>
                    <label className="block text-gray-300 text-sm mb-2">
                      Заголовок *
                    </label>
                    <input
                      name="title"
                      value={formData.title}
                      onChange={handleInputChange}
                      className={inputClass}
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-gray-300 text-sm mb-2">
                      Содержание *
                    </label>
                    <textarea
                      name="content"
                      value={formData.content}
                      onChange={handleInputChange}
                      rows={6}
                      className={inputClass}
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-gray-300 text-sm mb-2">
                      Изображение
                    </label>
                    <input
                      name="image"
                      type="file"
                      accept="image/png, image/jpeg, image/jpg"
                      onChange={handleInputChange}
                      className={inputClass}
                    />
                  </div>
                  {isEditing && selectedNews?.image && (
                    <div>
                      <p className="text-gray-300 text-sm mb-2">
                        Текущее изображение:
                      </p>
                      <img
                        src={selectedNews.image}
                        alt="Превью"
                        className="w-48 h-48 object-contain rounded-lg border border-krio-primary/20"
                      />
                    </div>
                  )}

                  <div className="flex justify-end gap-3">
                    <button
                      type="button"
                      onClick={() => setShowForm(false)}
                      className="px-4 py-2 text-sm bg-krio-primary/20 rounded-lg hover:bg-krio-primary/30 text-krio-secondary transition"
                    >
                      Отмена
                    </button>
                    <button
                      type="submit"
                      disabled={formLoading}
                      className="flex items-center gap-1.5 px-4 py-2 bg-krio-primary text-white text-sm font-medium rounded-lg shadow-md hover:bg-krio-primary/80 transition disabled:opacity-50"
                    >
                      <SaveIcon />
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
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            {news.map((item) => (
              <div
                key={item.id}
                className="relative group p-4 bg-krio-foreground rounded-xl border-2 border-krio-primary/20 hover:border-krio-primary/50 hover:-translate-y-0.5 transition-all duration-300"
              >
                {user?.isAdmin && (
                  <div className="absolute top-3 right-3 flex gap-2 z-10 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleEditNews(item);
                      }}
                      className="p-1.5 bg-krio-primary/80 hover:bg-krio-primary text-white rounded-full shadow-lg"
                      title="Редактировать новость"
                    >
                      <EditIcon />
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDeleteNews(item.id);
                      }}
                      className="p-1.5 bg-red-500/80 hover:bg-red-500 text-white rounded-full shadow-lg"
                      title="Удалить новость"
                    >
                      <DeleteIcon />
                    </button>
                  </div>
                )}

                <div
                  className="cursor-pointer"
                  onClick={() => fetchNewsById(item.id)}
                  onMouseEnter={() => prefetchNews(item.id)}
                >
                  <div className="mb-4 aspect-square overflow-hidden rounded-lg bg-white">
                    <img
                      src={item.image ?? undefined}
                      alt={item.title}
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                      onError={(e: SyntheticEvent<HTMLImageElement>) => {
                        e.currentTarget.src = "/uploads/no-photo.png";
                      }}
                    />
                  </div>
                  <h3 className="text-lg font-semibold text-white mb-2">
                    {item.title}
                  </h3>
                  <p className="text-krio-secondary/70 text-xs font-mono tracking-wide mb-3">
                    {formatDate(item.createdAt)}
                  </p>
                  <p className="text-gray-300 text-sm line-clamp-3">
                    {item.content}
                  </p>
                  <button
                    className="mt-4 text-sm text-krio-primary hover:text-krio-secondary transition-colors"
                    onMouseEnter={() => prefetchNews(item.id)}
                    onClick={(e) => {
                      e.stopPropagation();
                      fetchNewsById(item.id);
                    }}
                  >
                    Читать далее →
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      {isModalOpen && selectedNews && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-md flex items-center justify-center p-4 z-[100]"
          onClick={() => {
            setIsModalOpen(false);
            navigate("/news");
          }}
        >
          <div
            className="bg-krio-background rounded-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl border border-krio-primary/20"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-6">
              <div className="flex justify-between items-start mb-6">
                <div className="pr-4">
                  <h2 className="text-2xl font-bold text-white mb-2">
                    {selectedNews.title}
                  </h2>
                  <p className="text-krio-secondary/70 text-xs font-mono tracking-wide">
                    {formatDate(selectedNews.createdAt)}
                  </p>
                </div>
                <button
                  onClick={() => {
                    setIsModalOpen(false);
                    navigate("/news");
                  }}
                  className="text-krio-primary hover:text-krio-secondary hover:bg-krio-foreground/40 rounded-full transition-colors p-1 -mt-2 -mr-2"
                  aria-label="Закрыть"
                >
                  <CloseIcon />
                </button>
              </div>

              <div className="mb-6 rounded-lg overflow-hidden bg-white/5 border border-krio-primary/10">
                <img
                  src={selectedNews.image ?? undefined}
                  alt={selectedNews.title}
                  className="w-full h-auto max-h-[500px] object-contain"
                  loading="lazy"
                  onError={(e: SyntheticEvent<HTMLImageElement>) => {
                    e.currentTarget.src = "/uploads/no-photo.png";
                  }}
                />
              </div>

              <div className="text-gray-300 whitespace-pre-line leading-relaxed space-y-4">
                {selectedNews.content}
              </div>

              <div className="mt-8 pt-6 border-t border-krio-primary/20 flex justify-end">
                <button
                  onClick={() => {
                    setIsModalOpen(false);
                    navigate("/news");
                  }}
                  className="px-5 py-2.5 text-sm font-medium bg-krio-foreground text-krio-secondary hover:bg-krio-primary hover:text-krio-background rounded-lg transition-colors"
                >
                  Закрыть
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
