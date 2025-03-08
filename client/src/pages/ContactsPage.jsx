import React, { useState } from "react";
import axiosInstance from "../axiosInstance";
export default function ContactsPage({ user }) {
  const [formData, setFormData] = useState({
    name: user?.name || "",
    email: user?.email || "",
    phone: "",
    message: "",
  });

  const [errors, setErrors] = useState({});
  const [submitStatus, setSubmitStatus] = useState({
    loading: false,
    success: false,
    error: null,
  });

  const validateForm = () => {
    const newErrors = {};

    // Name validation
    if (!formData.name.trim()) {
      newErrors.name = "Имя обязательно";
    } else if (formData.name.trim().length < 2) {
      newErrors.name = "Имя должно содержать минимум 2 символа";
    }
    // Email validation
    if (!formData.email.trim()) {
      newErrors.email = "Email обязателен";
    } else if (
      !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(formData.email)
    ) {
      newErrors.email = "Некорректный email адрес";
    }
    // Message validation
    if (!formData.message.trim()) {
      newErrors.message = "Сообщение обязательно";
    } else if (formData.message.trim().length < 10) {
      newErrors.message = "Сообщение должно содержать минимум 10 символов";
    }
    // Phone validation (optional)
    if (formData.phone && !/^\+?[1-9]\d{10}$/.test(formData.phone.trim())) {
      newErrors.phone = "Некорректный формат телефона";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Reset previous status
    setSubmitStatus({ loading: false, success: false, error: null });

    // Validate form
    if (!validateForm()) {
      return;
    }
    setSubmitStatus({ loading: true, success: false, error: null });
    try {
      const payload = {
        name: formData.name.trim(),
        email: formData.email.trim(),
        phone: formData.phone?.trim() || null,
        message: formData.message.trim(),
      };
      const response = await axiosInstance.post("/feedback", payload);
      if (response.status === 201 || response.status === 200) {
        setSubmitStatus({
          loading: false,
          success: true,
          error: null,
        });
        // Reset form
        setFormData({
          name: user?.name || "",
          email: user?.email || "",
          phone: "",
          message: "",
        });
        // Clear success message after 3 seconds
        setTimeout(() => {
          setSubmitStatus((prev) => ({ ...prev, success: false }));
        }, 3000);
      } else {
        throw new Error(`Unexpected response status: ${response.status}`);
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
          default:
            errorMessage = error.response.data?.message || errorMessage;
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
    <div className="flex items-center justify-center bg-gray-900 text-white">
      <main className="w-full max-w-4xl p-8 space-y-6 bg-gray-800 rounded-lg shadow-lg border border-gray-700 my-8">
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
            <div className="p-4 bg-gray-700 rounded-lg shadow-md">
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
            <div className="p-4 bg-gray-700 rounded-lg shadow-md">
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
            <div className="p-4 bg-gray-700 rounded-lg shadow-md">
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
            <div className="p-4 bg-gray-700 rounded-lg shadow-md">
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
          <div className="p-6 bg-gray-700 rounded-lg shadow-md">
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
                  placeholder="Ваше имя"
                  className={`w-full px-3 py-2 bg-gray-800 border ${
                    errors.name ? "border-red-500" : "border-gray-600"
                  } rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none`}
                />
                {errors.name && (
                  <p className="mt-1 text-sm text-red-500">{errors.name}</p>
                )}
              </div>

              <div>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Ваш email для связи"
                  className={`w-full px-3 py-2 bg-gray-800 border ${
                    errors.email ? "border-red-500" : "border-gray-600"
                  } rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none`}
                />
                {errors.email && (
                  <p className="mt-1 text-sm text-red-500">{errors.email}</p>
                )}
              </div>

              <div>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="Ваш телефон для связи"
                  className={`w-full px-3 py-2 bg-gray-800 border ${
                    errors.phone ? "border-red-500" : "border-gray-600"
                  } rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none`}
                />
                {errors.phone && (
                  <p className="mt-1 text-sm text-red-500">{errors.phone}</p>
                )}
              </div>

              <div>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Ваше сообщение"
                  rows="5"
                  className={`w-full px-3 py-2 bg-gray-800 border ${
                    errors.message ? "border-red-500" : "border-gray-600"
                  } rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none`}
                />
                {errors.message && (
                  <p className="mt-1 text-sm text-red-500">{errors.message}</p>
                )}
              </div>

              <button
                type="submit"
                disabled={submitStatus.loading}
                className={`w-full py-2 font-semibold text-white ${
                  submitStatus.loading
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
