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

  // Валидация при изменении данных
  useEffect(() => {
    validateForm();
  }, [formData]);

  const validateForm = () => {
    const newErrors = {};

    // Валидация имени
    if (!formData.name.trim()) {
      newErrors.name = "Имя обязательно";
    } else if (!/^([а-яё]{2,}|[a-z]{2,})$/i.test(formData.name.trim())) {
      newErrors.name = "Некоректное имя";
    }

    // Валидация email
    if (!formData.email.trim()) {
      newErrors.email = "Email обязателен";
    } else if (
      !/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/i.test(
        formData.email
      )
    ) {
      newErrors.email = "Некорректный email адрес";
    }

    // Валидация телефона
    if (
      formData.phone &&
      !/^\+?[78][-\(]?\d{3}\)?-?\d{3}-?\d{2}-?\d{2}$/.test(formData.phone)
    ) {
      newErrors.phone = "Некоректный номер телефона";
    }

    // Валидация сообщения
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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    // Сброс ошибки при изменении поля
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
    <div className="flex items-center text-white justify-center min-h-screen bg-[url('/img/BG-image.png')] bg-fixed bg-center bg-no-repeat bg-cover bg-opacity-10">
      <main className="w-full max-w-4xl p-8 space-y-6 bg-krio-background rounded-lg shadow-lg border border-gray-700 my-8 opacity-100">
        <section id="contacts" className="space-y-6">
          <div>
            <h2 className="text-2xl font-bold text-center text-gray-200">
              Свяжитесь с нами
            </h2>
          </div>
          <p className="text-gray-300 text-center">
            Мы всегда рады помочь! Вы можете связаться с нами через:
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-4 bg-krio-foreground rounded-lg shadow-md">
              <h3 className="text-lg font-semibold text-gray-200">Адрес</h3>
              <p className="text-gray-400">Москва, ул. Инновационная, д. 10</p>
              <div id="map" className="mt-4">
                <iframe
                  src="https://yandex.ru/map-widget/v1/?from=mapframe&ll=37.707774%2C55.816179&mode=search&oid=1011075765&ol=biz&z=17.85"
                  width="100%"
                  height="300"
                  className="rounded-lg border border-gray-600"
                  allowFullScreen
                ></iframe>
              </div>
            </div>
            <div className="p-4 bg-krio-foreground rounded-lg shadow-md">
              <h3 className="text-lg font-semibold text-gray-200">Телефон</h3>
              <p className="text-gray-400">
                <a
                  href="tel:+74951234567"
                  className="text-blue-400 hover:underline"
                >
                  +7 (495) 123-45-67
                </a>
              </p>
            </div>
            <div className="p-4 bg-krio-foreground rounded-lg shadow-md">
              <h3 className="text-lg font-semibold text-gray-200">Email</h3>
              <p className="text-gray-400">
                <a
                  href="mailto:info@krioarmatura.ru"
                  className="text-blue-400 hover:underline"
                >
                  info@krioarmatura.ru
                </a>
              </p>
            </div>
            <div className="p-4 bg-krio-foreground rounded-lg shadow-md">
              <h3 className="text-lg font-semibold text-gray-200">
                Социальные сети
              </h3>
              <p className="text-gray-400">
                <a href="#" className="text-blue-400 hover:underline">
                  ВКонтакте
                </a>{" "}
                |
                <a href="#" className="text-blue-400 hover:underline">
                  {" "}
                  Facebook
                </a>{" "}
                |
                <a href="#" className="text-blue-400 hover:underline">
                  {" "}
                  Instagram
                </a>
              </p>
            </div>
          </div>
          <div className="p-6 bg-krio-foreground rounded-lg shadow-md">
            <h3 className="text-lg font-semibold text-gray-200 text-center mb-4">
              Обратная связь
            </h3>

            {submitStatus.success && (
              <div className="mb-4 p-3 bg-green-600 text-white rounded">
                Сообщение успешно отправлено!
              </div>
            )}

            {submitStatus.error && (
              <div className="mb-4 p-3 bg-red-600 text-white rounded">
                {submitStatus.error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder="Ваше имя"
                  className={`w-full px-3 py-2 bg-krio-background border ${
                    errors.name ? "border-red-500" : "border-gray-600"
                  } rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none`}
                />
                {dirtyFields.name && errors.name && (
                  <p className="mt-1 text-sm text-red-500">{errors.name}</p>
                )}
              </div>

              <div>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder="Ваш email для связи"
                  className={`w-full px-3 py-2 bg-krio-background border ${
                    errors.email ? "border-red-500" : "border-gray-600"
                  } rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none`}
                />
                {dirtyFields.email && errors.email && (
                  <p className="mt-1 text-sm text-red-500">{errors.email}</p>
                )}
              </div>

              <div>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder="Ваш телефон для связи"
                  className={`w-full px-3 py-2 bg-krio-background border ${
                    errors.phone ? "border-red-500" : "border-gray-600"
                  } rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none`}
                />
                {dirtyFields.phone && errors.phone && (
                  <p className="mt-1 text-sm text-red-500">{errors.phone}</p>
                )}
              </div>

              <div>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder="Ваше сообщение"
                  rows="5"
                  className={`w-full px-3 py-2 bg-krio-background border ${
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
                className={`w-full py-2 font-semibold text-white ${
                  submitStatus.loading || !formValid
                    ? "bg-gray-600 cursor-not-allowed"
                    : "bg-blue-600 hover:bg-blue-700"
                } rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none transition-colors`}
              >
                {submitStatus.loading ? "Отправка..." : "Отправить"}
              </button>
            </form>
          </div>
        </section>
      </main>
    </div>
  );
}
