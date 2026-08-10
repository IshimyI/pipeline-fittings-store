import { useState, useEffect, useCallback } from "react";
import axiosInstance from "../axiosInstance";

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

const EngineerIcon = () => (
  <svg
    className="w-5 h-5"
    fill="none"
    stroke="currentColor"
    strokeWidth={1.8}
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
    />
    <circle cx="12" cy="12" r="3" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const BookIcon = () => (
  <svg
    className="w-5 h-5"
    fill="none"
    stroke="currentColor"
    strokeWidth={1.8}
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25"
    />
  </svg>
);

const SaveButton = () => (
  <button
    type="submit"
    className="flex items-center gap-1.5 px-4 py-2 bg-krio-primary text-white text-sm font-medium rounded-lg shadow-md hover:bg-krio-primary/80 transition whitespace-nowrap"
  >
    <SaveIcon />
    Сохранить
  </button>
);

const Section = ({ title, children }) => (
  <section className="space-y-6">
    <div className="text-center">
      <h2 className="text-2xl md:text-3xl font-bold text-white uppercase tracking-[0.15em]">
        {title}
      </h2>
      <div className="w-16 h-0.5 bg-krio-primary mx-auto mt-3" />
    </div>
    {children}
  </section>
);

const ClientCard = ({ client, isAdmin, onUpdate, onDelete }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState(client.name);
  const [imgSrc, setImgSrc] = useState(client.imgSrc);

  const handleSave = async (e) => {
    e.preventDefault();
    await onUpdate(client.id, { name, imgSrc });
    setIsEditing(false);
  };

  const handleCancel = () => {
    setName(client.name);
    setImgSrc(client.imgSrc);
    setIsEditing(false);
  };

  return (
    <div className="relative p-2 sm:p-3 bg-krio-foreground rounded-lg sm:rounded-xl shadow-md sm:shadow-lg border border-krio-primary/20 flex flex-col items-center w-full h-full">
      {isEditing ? (
        <form
          onSubmit={handleSave}
          className="w-full h-full flex flex-col gap-2"
        >
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-2 py-1 text-sm bg-krio-background rounded border border-krio-primary/20 text-white"
            required
          />
          <input
            type="url"
            value={imgSrc}
            onChange={(e) => setImgSrc(e.target.value)}
            className="w-full px-2 py-1 text-sm bg-krio-background rounded border border-krio-primary/20 text-white"
            required
          />
          <div className="flex gap-2 mt-auto">
            <button
              type="button"
              onClick={handleCancel}
              className="px-2 py-1 text-xs bg-krio-primary/20 rounded hover:bg-krio-primary/30 text-krio-secondary"
            >
              Отмена
            </button>
            <button
              type="submit"
              className="px-2 py-1 text-xs bg-krio-primary rounded hover:bg-krio-primary/80 text-white"
            >
              Сохранить
            </button>
          </div>
        </form>
      ) : (
        <>
          <div className="w-full aspect-square flex items-center justify-center overflow-hidden bg-white p-1 sm:p-2">
            <img
              src={client.imgSrc}
              alt={client.name}
              className="object-contain w-full h-full"
              loading="lazy"
            />
          </div>
          <p className="text-krio-secondary text-xs sm:text-sm font-medium text-center mt-1 sm:mt-2 whitespace-nowrap truncate w-full px-1">
            {client.name}
          </p>
        </>
      )}
      {isAdmin && !isEditing && (
        <div className="absolute top-2 right-2 flex gap-2 z-10">
          <button
            onClick={(e) => {
              e.stopPropagation();
              setIsEditing(true);
            }}
            className="p-1.5 bg-krio-primary/80 hover:bg-krio-primary rounded-full shadow-lg"
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
          <button
            onClick={(e) => {
              e.stopPropagation();
              onDelete(client.id);
            }}
            className="p-1.5 bg-red-500/80 hover:bg-red-500 rounded-full shadow-lg"
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
        </div>
      )}
    </div>
  );
};

const AddClientCard = ({ onAdd }) => {
  const [name, setName] = useState("");
  const [imgSrc, setImgSrc] = useState("");
  const [isEditing, setIsEditing] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await onAdd({ name, imgSrc });
    setName("");
    setImgSrc("");
    setIsEditing(false);
  };

  return (
    <div className="relative p-2 sm:p-3 bg-krio-foreground rounded-lg sm:rounded-xl shadow-md sm:shadow-lg border border-dashed border-krio-primary/40 flex flex-col items-center w-full h-full min-h-[200px]">
      {!isEditing ? (
        <button
          onClick={() => setIsEditing(true)}
          className="w-full h-full flex flex-col items-center justify-center gap-2 text-krio-secondary hover:text-krio-primary transition-colors"
        >
          <svg
            className="w-8 h-8"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 4v16m8-8H4"
            />
          </svg>
          <span className="text-xs sm:text-sm">Добавить клиента</span>
        </button>
      ) : (
        <form
          onSubmit={handleSubmit}
          className="w-full h-full flex flex-col gap-3 p-2"
        >
          <input
            type="text"
            placeholder="Название"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-2 py-1 text-sm bg-krio-background rounded border border-krio-primary/20 text-white"
            required
          />
          <input
            type="url"
            placeholder="URL изображения"
            value={imgSrc}
            onChange={(e) => setImgSrc(e.target.value)}
            className="w-full px-2 py-1 text-sm bg-krio-background rounded border border-krio-primary/20 text-white"
            required
          />
          <div className="flex gap-2 mt-auto">
            <button
              type="button"
              onClick={() => setIsEditing(false)}
              className="px-3 py-1 text-xs bg-krio-primary/20 rounded hover:bg-krio-primary/30 text-krio-secondary"
            >
              Отмена
            </button>
            <button
              type="submit"
              className="px-3 py-1 text-xs bg-krio-primary rounded hover:bg-krio-primary/80 text-white"
            >
              Добавить
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

export default function AboutPage({ user }) {
  const [aboutContent, setAboutContent] = useState("");
  const [aboutSecondPart, setAboutSecondPart] = useState("");
  const [aboutActions, setAboutActions] = useState("");
  const [aboutCompanyFirst, setAboutCompanyFirst] = useState("");
  const [aboutCompanySecond, setAboutCompanySecond] = useState("");
  const [clients, setClients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const isAdmin = user?.isAdmin;

  const fetchAboutData = useCallback(async () => {
    try {
      setLoading(true);
      const [aboutRes, companiesRes] = await Promise.all([
        axiosInstance.get("/about"),
        axiosInstance.get("/companies"),
      ]);

      setAboutContent(aboutRes.data?.title || "");
      setAboutSecondPart(aboutRes.data?.content || "");
      setAboutActions(aboutRes.data?.actions || "");
      setAboutCompanyFirst(aboutRes.data?.company_first || "");
      setAboutCompanySecond(aboutRes.data?.company_second || "");

      setClients(companiesRes.data);
    } catch (err) {
      setError(err.response?.data?.message || "Ошибка при загрузке данных");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchAboutData();
  }, [fetchAboutData]);

  const handlerUpdateField = async (field, value) => {
    try {
      const res = await axiosInstance.put("/about", { [field]: value });
      if (res.status === 200) {
        if (field === "title") setAboutContent(res.data.title);
        if (field === "content") setAboutSecondPart(res.data.content);
        if (field === "actions") setAboutActions(res.data.actions);
        if (field === "company_first")
          setAboutCompanyFirst(res.data.company_first);
        if (field === "company_second")
          setAboutCompanySecond(res.data.company_second);
      }
    } catch (error) {
      console.error("Ошибка при обновлении:", error);
    }
  };

  const handleAddClient = async (newClient) => {
    try {
      await axiosInstance.post("/companies", newClient);
      await fetchAboutData();
    } catch (error) {
      console.error("Ошибка при добавлении:", error);
    }
  };

  const handleUpdateClient = async (id, updatedData) => {
    try {
      await axiosInstance.put(`/companies/${id}`, updatedData);
      await fetchAboutData();
    } catch (error) {
      console.error("Ошибка при обновлении:", error);
    }
  };

  const handleDeleteClient = async (id) => {
    try {
      await axiosInstance.delete(`/companies/${id}`);
      await fetchAboutData();
    } catch (error) {
      console.error("Ошибка при удалении:", error);
    }
  };

  if (loading) {
    return <div>Загрузка данных...</div>;
  }

  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

  return (
    <div className="flex items-center justify-center min-h-screen">
      <main
        className="w-full max-w-[90%] md:max-w-[60%] lg:max-w-[75%] p-6 space-y-6
                    bg-krio-background rounded-lg shadow-lg border border-gray-700 my-8 mx-auto"
      >
        <Section title="О компании">
          <div className="p-6 2xl:p-8 bg-krio-foreground rounded-2xl shadow-2xl space-y-6 2xl:space-y-8">
            <div className="space-y-4">
              {isAdmin && (
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    handlerUpdateField("title", aboutContent);
                  }}
                  className="flex flex-col sm:flex-row items-start sm:items-center gap-2 w-full mt-4"
                >
                  <input
                    type="text"
                    value={aboutContent}
                    onChange={(e) => setAboutContent(e.target.value)}
                    placeholder="Заголовок"
                    className="flex-1 w-full px-3 py-2 text-sm text-white bg-krio-background border border-krio-primary/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-krio-primary transition-all"
                    required
                  />
                  <SaveButton />
                </form>
              )}
              <p className="text-gray-300 leading-relaxed">
                <strong className="text-krio-primary text-center text-sm md:text-xl font-semibold break-words whitespace-normal">
                  {" "}
                  &quot;Криоарматура&quot;
                </strong>{" "}
                {aboutContent}
              </p>
              <div className="h-px bg-krio-primary/20 my-4" />{" "}
              {isAdmin && (
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    handlerUpdateField("content", aboutSecondPart);
                  }}
                  className="flex flex-col sm:flex-row items-start sm:items-center gap-2 w-full mt-4"
                >
                  <input
                    type="text"
                    value={aboutSecondPart}
                    onChange={(e) => setAboutSecondPart(e.target.value)}
                    placeholder="Описание"
                    className="flex-1 w-full px-3 py-2 text-sm text-white bg-krio-background border border-krio-primary/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-krio-primary transition-all"
                    required
                  />
                  <SaveButton />
                </form>
              )}
              <p className="text-gray-300 leading-relaxed">{aboutSecondPart}</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 2xl:grid-cols-4 4k:grid-cols-5 gap-4 2xl:gap-6 pt-4">
              <div className="p-4 bg-krio-primary/5 rounded-xl border-2 border-krio-primary/20 hover:border-krio-primary/50 hover:-translate-y-0.5 transition-all duration-300">
                <span className="block text-xs font-mono tracking-widest text-krio-primary/50 mb-2">
                  01
                </span>
                <h3 className="text-krio-primary text-lg font-semibold mb-2">
                  Космос
                </h3>
                <p className="text-gray-300 text-sm">
                  Компоненты для ракетных систем и спутниковых комплексов
                </p>
              </div>

              <div className="p-4 bg-krio-primary/5 rounded-xl border-2 border-krio-primary/20 hover:border-krio-primary/50 hover:-translate-y-0.5 transition-all duration-300">
                <span className="block text-xs font-mono tracking-widest text-krio-primary/50 mb-2">
                  02
                </span>
                <h3 className="text-krio-primary text-lg font-semibold mb-2">
                  Нефтегаз
                </h3>
                <p className="text-gray-300 text-sm">
                  Арматура для криогенных хранилищ и СПГ-терминалов
                </p>
              </div>

              <div className="p-4 bg-krio-primary/5 rounded-xl border-2 border-krio-primary/20 hover:border-krio-primary/50 hover:-translate-y-0.5 transition-all duration-300">
                <span className="block text-xs font-mono tracking-widest text-krio-primary/50 mb-2">
                  03
                </span>
                <h3 className="text-krio-primary text-lg font-semibold mb-2">
                  Машины
                </h3>
                <p className="text-gray-300 text-sm">
                  Комплектующие для специальной техники и промышленных установок
                </p>
              </div>
            </div>
          </div>
        </Section>
        <Section title="Наши клиенты">
          <div className="p-4 sm:p-6 2xl:p-8 bg-krio-foreground rounded-xl sm:rounded-2xl shadow-lg sm:shadow-2xl">
            <div className="grid grid-cols-2 xs:grid-cols-3 sm:grid-cols-4 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-5 2xl:grid-cols-6 gap-2 sm:gap-3 md:gap-4 2xl:gap-6 justify-items-center">
              {isAdmin && <AddClientCard onAdd={handleAddClient} />}
              {clients.map((client) => (
                <ClientCard
                  key={client.id}
                  client={client}
                  isAdmin={isAdmin}
                  onUpdate={handleUpdateClient}
                  onDelete={handleDeleteClient}
                />
              ))}
            </div>
          </div>
        </Section>
        <Section title="Услуги">
          <div className="p-6 2xl:p-8 bg-krio-foreground rounded-2xl shadow-2xl space-y-6 2xl:space-y-8 border border-krio-primary/20">
            <div className="grid grid-cols-1 gap-6 2xl:gap-8">
              <div className="space-y-3">
                {isAdmin && (
                  <form
                    onSubmit={(e) => {
                      e.preventDefault();
                      handlerUpdateField("actions", aboutActions);
                    }}
                    className="flex flex-col sm:flex-row items-start sm:items-center gap-2 w-full mt-4"
                  >
                    <input
                      type="text"
                      value={aboutActions}
                      onChange={(e) => setAboutActions(e.target.value)}
                      placeholder="Услуги"
                      className="flex-1 w-full px-3 py-2 text-sm text-white bg-krio-background border border-krio-primary/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-krio-primary transition-all"
                      required
                    />
                    <SaveButton />
                  </form>
                )}
                <p className="text-gray-300 leading-relaxed text-lg">
                  <strong className="text-krio-primary text-center text-sm md:text-xl font-semibold break-words whitespace-normal">
                    &quot;Криоарматура&quot;
                  </strong>{" "}
                  {aboutActions}
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-4 bg-krio-primary/5 rounded-xl border-2 border-krio-primary/20 hover:border-krio-primary/50 hover:-translate-y-0.5 transition-all duration-300 group">
                    <div className="flex items-start gap-3 mb-2">
                      <div className="w-8 h-8 bg-krio-primary/20 rounded-lg flex items-center justify-center">
                        <svg
                          className="w-4 h-4 text-krio-primary"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M13 10V3L4 14h7v7l9-11h-7z"
                          />
                        </svg>
                      </div>
                      <h3 className="text-krio-primary font-semibold text-lg">
                        Консалтинг
                      </h3>
                    </div>
                    <ul className="space-y-2 text-gray-300 text-sm pl-2">
                      <li className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 bg-krio-primary rounded-full" />
                        Подбор оборудования под задачи
                      </li>
                      <li className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 bg-krio-primary rounded-full" />
                        Технико-экономическое обоснование
                      </li>
                      <li className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 bg-krio-primary rounded-full" />
                        Аудит существующих систем
                      </li>
                    </ul>
                  </div>

                  <div className="p-4 bg-krio-primary/5 rounded-xl border-2 border-krio-primary/20 hover:border-krio-primary/50 hover:-translate-y-0.5 transition-all duration-300 group">
                    <div className="flex items-start gap-3 mb-2">
                      <div className="w-8 h-8 bg-krio-primary/20 rounded-lg flex items-center justify-center">
                        <svg
                          className="w-4 h-4 text-krio-primary"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z"
                          />
                        </svg>
                      </div>
                      <h3 className="text-krio-primary font-semibold text-lg">
                        Инжиниринг
                      </h3>
                    </div>
                    <ul className="space-y-2 text-gray-300 text-sm pl-2">
                      <li className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 bg-krio-primary rounded-full" />
                        Рабочая документация
                      </li>
                      <li className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 bg-krio-primary rounded-full" />
                        Прочностные расчеты
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="p-4 bg-krio-background/50 rounded-lg border-l-2 border-krio-primary">
                <p className="text-center text-krio-secondary italic tracking-wide">
                  «Каждое решение проходит 5-ступенчатый контроль качества»
                </p>
              </div>
            </div>
          </div>
        </Section>
        <Section title="Наша команда">
          <div className="p-6 2xl:p-8 bg-krio-foreground rounded-2xl shadow-2xl space-y-6 2xl:space-y-8 border border-krio-primary/20">
            <div className="grid grid-cols-1 md:grid-cols-2 2xl:grid-cols-3 4k:grid-cols-4 gap-6 2xl:gap-8">
              <div className="space-y-4">
                <div className="space-y-4">
                  {isAdmin && (
                    <form
                      onSubmit={(e) => {
                        e.preventDefault();
                        handlerUpdateField("company_first", aboutCompanyFirst);
                      }}
                      className="flex flex-col sm:flex-row items-start sm:items-center gap-2 w-full mt-4"
                    >
                      <input
                        type="text"
                        value={aboutCompanyFirst}
                        onChange={(e) => setAboutCompanyFirst(e.target.value)}
                        placeholder="Блок команды 1"
                        className="flex-1 w-full px-3 py-2 text-sm text-white bg-krio-background border border-krio-primary/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-krio-primary transition-all"
                        required
                      />
                      <SaveButton />
                    </form>
                  )}

                  <p className="text-gray-300 leading-relaxed text-lg">
                    {aboutCompanyFirst}
                  </p>

                  <div className="flex flex-col space-y-3">
                    <div className="p-3 bg-krio-background/50 rounded-lg border border-krio-primary/20 transition-colors">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-krio-primary/20 rounded-full flex items-center justify-center">
                          <span className="text-krio-primary">
                            <EngineerIcon />
                          </span>
                        </div>
                        <div>
                          <h4 className="text-krio-primary font-medium">
                            Инженерный состав
                          </h4>
                          <div className="flex items-center gap-2">
                            <div className="text-gray-300 text-sm">
                              15+ лет опыта
                            </div>
                            <div className="w-12 h-1 bg-krio-primary/20 rounded-full">
                              <div className="w-10/12 h-full bg-krio-primary rounded-full" />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                {isAdmin && (
                  <form
                    onSubmit={(e) => {
                      e.preventDefault();
                      handlerUpdateField("company_second", aboutCompanySecond);
                    }}
                    className="flex flex-col sm:flex-row items-start sm:items-center gap-2 w-full mt-4"
                  >
                    <input
                      type="text"
                      value={aboutCompanySecond}
                      onChange={(e) => setAboutCompanySecond(e.target.value)}
                      placeholder="Блок команды 2"
                      className="flex-1 w-full px-3 py-2 text-sm text-white bg-krio-background border border-krio-primary/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-krio-primary transition-all"
                      required
                    />
                    <SaveButton />
                  </form>
                )}
                <p className="text-gray-300 leading-relaxed text-lg">
                  {aboutCompanySecond}
                </p>
                <div className="p-3 bg-krio-background/50 rounded-lg border border-krio-primary/20  transition-colors">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-krio-primary/20 rounded-full flex items-center justify-center">
                      <span className="text-krio-primary">
                        <BookIcon />
                      </span>
                    </div>
                    <div>
                      <h4 className="text-krio-primary font-medium">
                        Обучение
                      </h4>
                      <div className="flex items-center gap-2">
                        <div className="text-gray-300 text-sm">
                          120+ часов/год
                        </div>
                        <div className="w-12 h-1 bg-krio-primary/20 rounded-full">
                          <div className="w-8/12 h-full bg-krio-primary rounded-full" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Section>
      </main>
    </div>
  );
}
