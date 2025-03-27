import React, { useState, useEffect } from "react";
import axiosInstance from "../axiosInstance";

export default function ContactsPage({ user }) {
  const [formData, setFormData] = useState({
    name: user?.name || "",
    email: user?.email || "",
    phone: "",
    message: "",
  });

  const [dirtyFields, setDirtyFields] = useState({
    name: false,
    email: false,
    phone: false,
    message: false,
  });

  const [errors, setErrors] = useState({});
  const [formValid, setFormValid] = useState(false);
  const [submitStatus, setSubmitStatus] = useState({
    loading: false,
    success: false,
    error: null,
  });

  useEffect(() => {
    validateForm();
  }, [formData]);

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "Имя обязательно";
    } else if (!/^([а-яё]{2,}|[a-z]{2,})$/i.test(formData.name.trim())) {
      newErrors.name = "Некорректное имя";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email обязателен";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Некорректный email адрес";
    }

    if (
      formData.phone &&
      !/^(\+7|8)[\s-]?\(?\d{3}\)?[\s-]?\d{3}[\s-]?\d{2}[\s-]?\d{2}$/.test(
        formData.phone
      )
    ) {
      newErrors.phone = "Некорректный номер телефона";
    }

    if (!formData.message.trim()) {
      newErrors.message = "Сообщение обязательно";
    } else if (formData.message.trim().length < 10) {
      newErrors.message = "Сообщение должно содержать минимум 10 символов";
    }

    setErrors(newErrors);
    setFormValid(Object.keys(newErrors).length === 0);
    return Object.keys(newErrors).length === 0;
  };

  const handleBlur = (e) => {
    const { name } = e.target;
    setDirtyFields((prev) => ({ ...prev, [name]: true }));
  };

  const [callMeStatus, setCallMeStatus] = useState({
    loading: false,
    success: false,
    error: null,
  });

  const handlePhone = async (e) => {
    e.preventDefault();
    const form = e.target;
    const phoneInput = form.phone;

    const rawPhone = phoneInput.value.replace(/\D/g, "");

    if (rawPhone.length !== 11) {
      setCallMeStatus({
        loading: false,
        error: "Введите 11-значный номер телефона",
      });
      return;
    }

    if (!/^[78]/.test(rawPhone)) {
      setCallMeStatus({
        loading: false,
        error: "Номер должен начинаться с 7 или 8",
      });
      return;
    }
    setCallMeStatus({ loading: true, success: false, error: null });

    try {
      const res = await axiosInstance.post("/callMe", { phone: rawPhone });

      if (res.status === 201) {
        setCallMeStatus({
          loading: false,
          success: "Заявка принята! Мы вам перезвоним",
          error: null,
        });
        form.reset();
      }
    } catch (error) {
      const serverMessage = error.response?.data?.message;
      const errorMessage =
        serverMessage || "Ошибка при отправке. Попробуйте позже";

      setCallMeStatus({
        loading: false,
        success: false,
        error: errorMessage,
      });
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitStatus({ loading: true, success: false, error: null });

    if (!validateForm()) {
      setSubmitStatus({ loading: false, success: false, error: null });
      return;
    }

    try {
      const payload = {
        name: formData.name.trim(),
        email: formData.email.trim(),
        phone: formData.phone?.trim() || null,
        message: formData.message.trim(),
      };

      const response = await axiosInstance.post("/feedback", payload);

      if (response.status === 201 || response.status === 200) {
        setSubmitStatus({ loading: false, success: true, error: null });
        setFormData({
          name: user?.name || "",
          email: user?.email || "",
          phone: "",
          message: "",
        });
        setTimeout(() => {
          setSubmitStatus((prev) => ({ ...prev, success: false }));
        }, 3000);
      }
    } catch (error) {
      console.error("Feedback submission error:", error);
      let errorMessage = "Произошла ошибка при отправке. Попробуйте позже.";

      if (error.response) {
        switch (error.response.status) {
          case 400:
            errorMessage =
              "Пожалуйста, проверьте правильность заполнения всех полей";
            break;
          case 429:
            errorMessage =
              "Слишком много запросов. Пожалуйста, подождите немного";
            break;
          case 500:
            errorMessage =
              "Внутренняя ошибка сервера. Пожалуйста, попробуйте позже";
            break;
        }
      }

      setSubmitStatus({
        loading: false,
        success: false,
        error: errorMessage,
      });
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      <main className="w-full max-w-4xl p-6 space-y-6 bg-krio-background rounded-lg shadow-lg border border-gray-700 my-8">
        <section id="contacts" className="space-y-6">
          <div>
            <h2 className="text-2xl font-bold text-center text-white">
              Свяжитесь с нами
            </h2>
            <p className="text-krio-secondary text-center mt-2">
              Мы всегда рады помочь! Вы можете связаться с нами следующими
              способами:
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-6">
              <div className="p-6 bg-krio-foreground rounded-2xl shadow-2xl transform transition-all">
                <h3 className="text-2xl font-bold text-krio-primary mb-4 glow-text">
                  Контакты
                </h3>
                <div className="space-y-4">
                  <div className="flex items-start space-x-4 group">
                    <div className="p-2 bg-krio-background/50 rounded-lg group-hover:bg-krio-primary/20 transition-colors">
                      <svg
                        className="w-6 h-6 text-krio-primary"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M12 1.5c-4.142 0-7.5 3.358-7.5 7.5 0 7.5 7.5 13.5 7.5 13.5s7.5-6 7.5-13.5c0-4.142-3.358-7.5-7.5-7.5zm0 10.5a3 3 0 110-6 3 3 0 010 6z"
                        />
                      </svg>
                    </div>
                    <div>
                      <p className="text-sm text-krio-secondary/80 mb-1">
                        Адрес
                      </p>
                      <div className="text-white text-lg font-medium">
                        ул. Академика Королёва, 13, стр. 4, Москва
                      </div>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4 group">
                    <div className="p-2 bg-krio-background/50 rounded-lg group-hover:bg-krio-primary/20 transition-colors">
                      <svg
                        className="w-6 h-6 text-krio-primary"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                        />
                      </svg>
                    </div>
                    <div>
                      <p className="text-sm text-krio-secondary/80 mb-1">
                        Телефон
                      </p>
                      <div className="text-white text-lg font-medium">
                        <a
                          href="tel:+79958870611"
                          className="hover:text-krio-primary transition-colors"
                        >
                          +7 (995) 887-06-11
                        </a>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4 group">
                    <div className="p-2 bg-krio-background/50 rounded-lg group-hover:bg-krio-primary/20 transition-colors">
                      <svg
                        className="w-6 h-6 text-krio-primary"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z"
                        />
                      </svg>
                    </div>
                    <div>
                      <p className="text-sm text-krio-secondary/80 mb-1">
                        Telegram
                      </p>
                      <div className="text-white text-lg font-medium">
                        <a
                          href="https://t.me/krioarmatura"
                          target="_blank"
                          className="text-krio-primary hover:text-white transition-colors"
                        >
                          @krioarmatura
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-6 bg-krio-background rounded-2xl border-2 border-krio-primary/20 relative overflow-hidden">
                <div className="absolute -right-8 -top-8 w-24 h-24 bg-krio-primary/10 rounded-full"></div>
                <h3 className="text-xl font-bold text-white mb-4">
                  Заказать звонок
                </h3>

                {callMeStatus.success && (
                  <div className="mb-4 p-3 bg-green-600/80 text-white rounded text-center text-sm">
                    Заявка принята! Мы вам перезвоним
                  </div>
                )}

                {callMeStatus.error && (
                  <div className="mb-4 p-3 bg-red-600/80 text-white rounded text-center text-sm">
                    {callMeStatus.error}
                  </div>
                )}

                <form
                  onSubmit={handlePhone}
                  className="flex flex-col space-y-3"
                >
                  <input
                    type="tel"
                    name="phone"
                    placeholder="+7 (XXX) XXX-XX-XX"
                    className="
w-full px-3 py-2 bg-krio-background text-white border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none
"
                    pattern="\+7\s?[\(]{0,1}\d{3}[\)]{0,1}\s?\d{3}[-]{0,1}\d{2}[-]{0,1}\d{2}"
                  />
                  <button
                    type="submit"
                    disabled={callMeStatus.loading}
                    className="bg-krio-primary text-krio-background font-bold py-2 px-4 rounded-lg hover:bg-opacity-90 transition-all flex justify-center items-center"
                  >
                    {callMeStatus.loading ? (
                      <svg
                        className="animate-spin h-5 w-5 text-white"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                    ) : (
                      "Перезвоните мне"
                    )}
                  </button>
                </form>
              </div>
            </div>

            <div className="space-y-6">
              <div className="bg-krio-foreground rounded-2xl shadow-2xl overflow-hidden border-2 border-krio-primary/20">
                <div className="p-4 bg-krio-background/30">
                  <h3 className="text-xl font-bold text-white flex items-center">
                    <svg
                      className="w-5 h-5 mr-2 text-krio-primary"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M12 0C8.13 0 5 3.13 5 7c0 1.93 1.43 4.47 3 6.24V24l4-2 4 2v-10.76c1.57-1.77 3-4.31 3-6.24 0-3.87-3.13-7-7-7zm0 9a2 2 0 110-4 2 2 0 010 4z" />
                    </svg>
                    Как добраться
                  </h3>
                </div>
                <div className="relative h-96">
                  <iframe
                    src="https://yandex.ru/map-widget/v1/?um=constructor%3A8ee14e9655b269c9eaa2997abc9cf3ce54a90ac89bb3f490ddb59296a9f63303&amp;source=constructor"
                    className="w-full h-full"
                    frameBorder="0"
                    title="Карта расположения офиса"
                  />
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-krio-foreground to-transparent h-20 pointer-events-none" />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 bg-krio-primary/10 rounded-xl border border-krio-primary/20">
                  <h4 className="text-sm text-krio-primary mb-2">
                    Часы работы
                  </h4>
                  <div className="space-y-1">
                    <p className="text-white text-sm">Пн-Пт: 09:00—19:00</p>
                    <p className="text-krio-secondary text-sm">
                      Сб-Вс: выходной
                    </p>
                  </div>
                </div>

                <div className="p-4 bg-krio-primary/10 rounded-xl border border-krio-primary/20 relative overflow-hidden">
                  <div className="absolute -right-6 -bottom-6 w-16 h-16 bg-krio-primary/5 rounded-full"></div>
                  <h4 className="text-sm text-krio-primary mb-2">
                    Срочный вопрос
                  </h4>
                  <p className="text-white text-sm">+7 (995) 887-06-11</p>
                  <span className="text-xs text-krio-secondary">
                    круглосуточно
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="p-6 bg-krio-foreground rounded-lg shadow-md">
            <h3 className="text-lg font-semibold text-white text-center mb-4">
              Форма обратной связи
            </h3>
            {submitStatus.success && (
              <div className="mb-4 p-3 bg-green-600 text-white rounded text-center">
                Сообщение успешно отправлено! Мы свяжемся с вами в ближайшее
                время.
              </div>
            )}

            {submitStatus.error && (
              <div className="mb-4 p-3 bg-red-600 text-white rounded text-center">
                {submitStatus.error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label
                  htmlFor="name"
                  className="block text-krio-secondary mb-1"
                >
                  Имя
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder="Ваше имя"
                  className={`w-full px-3 py-2 bg-krio-background text-white border ${
                    errors.name ? "border-red-500" : "border-gray-600"
                  } rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none`}
                />
                {dirtyFields.name && errors.name && (
                  <p className="mt-1 text-sm text-red-500">{errors.name}</p>
                )}
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="block text-krio-secondary mb-1"
                >
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder="Ваш email"
                  className={`w-full px-3 py-2 bg-krio-background text-white border ${
                    errors.email ? "border-red-500" : "border-gray-600"
                  } rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none`}
                />
                {dirtyFields.email && errors.email && (
                  <p className="mt-1 text-sm text-red-500">{errors.email}</p>
                )}
              </div>

              <div>
                <label
                  htmlFor="phone"
                  className="block text-krio-secondary mb-1"
                >
                  Телефон{" "}
                  <span className="text-krio-secondary text-sm">
                    (необязательно)
                  </span>
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder="+7 (XXX) XXX-XX-XX"
                  className={`w-full px-3 py-2 bg-krio-background text-white border ${
                    errors.phone ? "border-red-500" : "border-gray-600"
                  } rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none`}
                />
                {dirtyFields.phone && errors.phone && (
                  <p className="mt-1 text-sm text-red-500">{errors.phone}</p>
                )}
              </div>

              <div>
                <label
                  htmlFor="message"
                  className="block text-krio-secondary mb-1"
                >
                  Сообщение
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder="Опишите ваш вопрос или предложение..."
                  rows="5"
                  className={`w-full px-3 py-2 bg-krio-background text-white border ${
                    errors.message ? "border-red-500" : "border-gray-600"
                  } rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none`}
                />
                {dirtyFields.message && errors.message && (
                  <p className="mt-1 text-sm text-red-500">{errors.message}</p>
                )}
              </div>

              <button
                type="submit"
                disabled={submitStatus.loading || !formValid}
                className={`w-full py-2 px-4 font-semibold text-white rounded-lg transition-colors ${
                  submitStatus.loading
                    ? "bg-krio-foreground cursor-not-allowed"
                    : !formValid
                    ? "bg-krio-foreground cursor-not-allowed"
                    : "bg-blue-600 hover:bg-blue-700"
                } focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-800`}
              >
                {submitStatus.loading ? (
                  <span className="flex items-center justify-center">
                    <svg
                      className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    Отправка...
                  </span>
                ) : (
                  "Отправить сообщение"
                )}
              </button>
            </form>
          </div>
        </section>
      </main>
    </div>
  );
}
