import { useEffect, useRef, useState } from "react";
import axiosInstance from "../axiosInstance";

export default function Dialog({ isOpen, onClose, product, user, category }) {
  const dialogRef = useRef(null);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    categoryId: product?.categoryId || "",
    name: product?.name || "",
    image: product?.image || null,
    price: product?.price || "",
    availability: product?.availability || "",
    params: product?.params || { Размер: "M", Цвет: "Красный" },
  });
  const [bool, setBool] = useState(false);
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

  useEffect(() => {
    if (product) {
      let initialParams = product.params || { Размер: "M", Цвет: "Красный" };
      if (typeof initialParams === "string") {
        try {
          initialParams = JSON.parse(initialParams.replace(/"/g, '"'));
        } catch (e) {
          console.error("Ошибка парсинга параметров:", e);
          initialParams = { Размер: "M", Цвет: "Красный" };
        }
      }
      setFormData({
        categoryId: product.categoryId || "",
        name: product.name || "",
        image: product.image || "",
        price: product.price || "",
        availability: product.availability || "",
        params: initialParams,
      });
      setImagePreview(product.image ? getImageUrl(product.image) : null);
    }
  }, [product]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    if (name === "image") {
      if (e.target.files && e.target.files[0]) {
        const file = e.target.files[0];
        setImageFile(file);
        const imageUrl = URL.createObjectURL(file);
        setImagePreview(imageUrl);
        setFormData((prevData) => ({
          ...prevData,
          image: imageUrl, // Store the preview URL for immediate display
        }));
      }
      return;
    }

    if (name === "params") {
      try {
        if (!value.trim()) {
          setFormData((prev) => ({ ...prev, params: {} }));
          return;
        }

        let parsedValue;
        try {
          parsedValue = JSON.parse(value);
        } catch {
          parsedValue = value;
        }

        setFormData((prev) => ({ ...prev, params: parsedValue }));
      } catch (error) {
        console.error("Ошибка обработки параметров:", error);
        setFormData((prev) => ({ ...prev, params: value }));
      }
      return;
    }

    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const parseTextFormat = (text) => {
    const lines = text.split("").filter((line) => line.trim());
    const result = {};
    for (const line of lines) {
      const [key, ...valueParts] = line.split(":").map((part) => part.trim());
      if (key && valueParts.length > 0) {
        const paramValue = valueParts.join(":").trim();
        result[key] = paramValue.replace(/^["']|["']$/g, "");
      }
    }
    return result;
  };

  const validateParamsObject = (obj) => {
    if (typeof obj !== "object" || obj === null || Array.isArray(obj)) {
      throw new Error("Параметры должны быть в формате объекта");
    }
    for (const [key, value] of Object.entries(obj)) {
      if (typeof key !== "string") {
        throw new Error("Ключи параметров должны быть строками");
      }
      if (typeof value !== "string" && typeof value !== "number") {
        throw new Error("Значения параметров должны быть строками или числами");
      }
    }
  };

  const handleSave = async () => {
    try {
      if (!formData.name.trim()) {
        throw new Error("Название обязательно");
      }

      // Создаем FormData для отправки файла
      const formDataToSend = new FormData();
      formDataToSend.append("name", formData.name);
      formDataToSend.append("categoryId", formData.categoryId);
      formDataToSend.append("price", formData.price);
      formDataToSend.append("availability", formData.availability);

      const paramsString =
        typeof formData.params === "object"
          ? JSON.stringify(formData.params)
          : formData.params;
      formDataToSend.append("params", paramsString);

      // Добавляем информацию о пользователе
      formDataToSend.append("user", JSON.stringify(user));

      // Если есть новый файл изображения, добавляем его
      if (imageFile) {
        formDataToSend.append("image", imageFile);
      } else if (formData.image) {
        // Если нет нового файла, но есть путь к изображению, отправляем его
        formDataToSend.append("imagePath", formData.image);
      }

      const response = await axiosInstance.post(
        `/changeProduct/${product.id}`,
        formDataToSend,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.status !== 200) {
        throw new Error("Ошибка при сохранении изменений");
      }

      setIsEditing(false);
      onClose();
      // Перезагрузка страницы для обновления данных
      window.location.reload();
    } catch (error) {
      console.error("Ошибка сохранения:", error);
      alert(error.message);
    }
  };

  const isValidUrl = (str) => {
    if (typeof str !== "string") return false;

    try {
      new URL(str);

      // Дополнительная проверка на допустимые протоколы
      const allowedProtocols = ["http:", "https:"];
      const url = new URL(str);
      return allowedProtocols.includes(url.protocol);
    } catch (e) {
      return false;
    }
  };

  // Handles image URL resolution with fallback to no-photo image
  // Supports direct URLs, upload paths, and default fallback
  const getImageUrl = (image) => {
    if (!image) return "/uploads/no-photo.png";
    if (isValidUrl(image)) return image;
    if (image.startsWith("/uploads/")) return image;
    return "/uploads/no-photo.png";
  };

  const handleImageError = (e) => {
    e.target.src = "/uploads/no-photo.png";
  };

  useEffect(() => {
    const handleCancel = (event) => {
      event.preventDefault();
      onClose();
    };

    const dialog = dialogRef.current;
    if (dialog) {
      dialog.addEventListener("cancel", handleCancel);
    }

    return () => {
      if (dialog) {
        dialog.removeEventListener("cancel", handleCancel);
      }
    };
  }, [onClose]);

  const renderParams = (params) => {
    let parsedParams = params;

    if (typeof params === "string") {
      try {
        parsedParams = JSON.parse(params);
      } catch (e) {
        console.error("Ошибка парсинга параметров:", e);
        return (
          <div className="text-red-500 text-sm">
            Ошибка формата параметров. Используйте корректный JSON.
          </div>
        );
      }
    }
    if (!parsedParams || typeof parsedParams !== "object") {
      return null;
    }
    return Object.entries(parsedParams).map(([key, value]) => (
      <div
        key={key}
        className="flex justify-between md:items-center items-start py-1 px-1.5 text-xs"
      >
        <span className="text-gray-400 truncate">{key}</span>
        <span className="text-blue-300 ml-2 max-w-[60%] text-right truncate">
          {typeof value === "object" ? JSON.stringify(value) : String(value)}
        </span>
      </div>
    ));
  };

  const handleOutsideClick = (event) => {
    if (dialogRef.current && !dialogRef.current.contains(event.target)) {
      onClose();
    }
  };

  const handleEscapeKey = (event) => {
    if (event.key === "Escape") {
      onClose();
    }
  };

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      document.addEventListener("mousedown", handleOutsideClick);
      document.addEventListener("keydown", handleEscapeKey);
    } else {
      document.body.style.overflow = "auto";
      document.removeEventListener("mousedown", handleOutsideClick);
      document.removeEventListener("keydown", handleEscapeKey);
    }

    return () => {
      document.body.style.overflow = "auto";
      document.removeEventListener("mousedown", handleOutsideClick);
      document.removeEventListener("keydown", handleEscapeKey);
    };
  }, [isOpen]);

  return (
    <>
      {isOpen && (
        <div className="dialog-overlay" onClick={handleOutsideClick}></div>
      )}
      <dialog
        ref={dialogRef}
        open={isOpen}
        className="dialog m-auto p-8 bg-krio-background text-white rounded-lg shadow-lg max-w-250 w-11/12 transform transition-all duration-500 opacity-100"
        style={{ backdropFilter: "blur(10px)" }}
        aria-labelledby="dialog-title"
        aria-hidden={!isOpen}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-white text-3xl font-bold hover:text-red-500 transition-colors duration-300"
          aria-label="Закрыть"
        >
          &times;
        </button>
        {product ? (
          <>
            <h4
              id="dialog-title"
              className="text-3xl font-semibold mb-6 text-center"
            >
              {product.name}
            </h4>
            {!bool ? (
              <div className="space-y-4">
                <div className="flex flex-col md:flex-row gap-4">
                  <div className=" md:w-1/3 flex items-center justify-center">
                    <img
                      src={getImageUrl(product.image)}
                      alt={product.name}
                      className="w-auto object-contain rounded-lg md:w-auto max-md:max-h-40 max-md:mx-auto"
                      onError={handleImageError}
                    />
                  </div>

                  <div className="md:w-2/3 space-y-3 overflow-y-auto pr-2">
                    <div className="space-y-3">
                      <div className="bg-krio-foreground p-3 rounded-lg">
                        <p className="text-sm text-gray-400 mb-1">Цена</p>
                        <p className="text-xl text-white font-mono">
                          По запросу
                        </p>
                      </div>

                      <div className="grid grid-cols- md:grid-cols-2 gap-2">
                        <div className="bg-krio-foreground p-2 rounded-lg">
                          <p className="text-xs text-gray-400 mb-1">
                            Категория
                          </p>
                          <p className="text-sm text-white truncate">
                            {category?.find((c) => c.id === product.categoryId)
                              ?.name || "Категория не указана"}
                          </p>
                        </div>

                        <div className="bg-krio-foreground p-2 rounded-lg ">
                          <p className="text-xs text-gray-400 mb-1">Наличие</p>
                          <p className="text-sm text-white">
                            {product.availability === "Под заказ за 7 дней"
                              ? "Под заказ"
                              : "Есть в наличии"}
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="bg-krio-foreground p-3 rounded-lg">
                      <h4 className="text-sm font-semibold text-white mb-2 border-b border-gray-600 pb-1">
                        Характеристики
                      </h4>
                      <div className="space-y-1.5">
                        {renderParams(product.params)}
                      </div>
                    </div>

                    {user?.isAdmin && (
                      <button
                        onClick={() => setBool(true)}
                        className="w-full py-2 bg-blue-600 hover:bg-blue-700 text-sm rounded-lg 
                   transition-all duration-300 flex items-center justify-center gap-1.5"
                      >
                        <svg
                          className="w-4 h-4"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                        </svg>
                        Редактировать
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ) : (
              <div className="space-y-6">
                <h4 className="text-2xl font-bold text-white mb-4">
                  Редактирование товара
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-4">
                    <div>
                      <label className="block text-gray-300 mb-2">
                        Название
                      </label>
                      <input
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        className="w-full p-3 bg-krio-foreground border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>

                    <div>
                      <label className="block text-gray-300 mb-2">
                        ID Категории
                      </label>
                      <input
                        name="categoryId"
                        value={formData.categoryId}
                        onChange={handleInputChange}
                        className="w-full p-3 bg-krio-foreground border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>

                    <label className="block text-gray-300 mb-2">
                      Список категорий
                    </label>
                    <div className="flex flex-col gap-1 overflow-scroll max-h-60">
                      {category.map((el, index) => (
                        <p
                          key={el.name}
                          className="text-white bg-krio-foreground px-1.5 rounded"
                        >
                          {index + 1}. {el.name}
                        </p>
                      ))}
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-gray-300 mb-2">Цена</label>
                      <input
                        name="price"
                        value={formData.price}
                        onChange={handleInputChange}
                        className="w-full p-3 bg-krio-foreground border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-gray-300 mb-2">
                        Изображение
                      </label>
                      {imagePreview && (
                        <div className="mb-2">
                          <img
                            src={imagePreview}
                            alt="Предпросмотр"
                            className="max-h-32 rounded-lg"
                            onError={handleImageError}
                          />
                        </div>
                      )}
                      <input
                        name="image"
                        type="file"
                        accept="image/png, image/jpeg, image/jpg"
                        onChange={handleInputChange}
                        className="w-full p-3 bg-krio-foreground border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>

                    <div>
                      <label className="block text-gray-300 mb-2">
                        Наличие
                      </label>
                      <input
                        name="availability"
                        value={formData.availability}
                        onChange={handleInputChange}
                        className="w-full p-3 bg-krio-foreground border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>

                    <div>
                      <label className="block text-gray-300 mb-2">
                        Характеристики (JSON)
                      </label>
                      <textarea
                        name="params"
                        value={
                          typeof formData.params === "string"
                            ? formData.params
                            : JSON.stringify(formData.params, null, 2)
                        }
                        onChange={handleInputChange}
                        className="w-full p-3 bg-krio-foreground border border-gray-600 rounded-lg text-white font-mono text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 min-h-[150px]"
                      />
                    </div>
                  </div>
                </div>

                <div className="flex justify-end gap-4 mt-6">
                  <button
                    onClick={() => setBool(false)}
                    className="px-6 py-2 bg-krio-primary hover:bg-krio-foreground text-white rounded-lg transition-colors duration-300"
                  >
                    Отмена
                  </button>
                  <button
                    onClick={handleSave}
                    className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors duration-300"
                  >
                    Сохранить изменения
                  </button>
                </div>
              </div>
            )}
          </>
        ) : null}
      </dialog>
    </>
  );
}
