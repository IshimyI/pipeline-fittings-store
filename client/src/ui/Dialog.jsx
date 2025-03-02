import { useEffect, useRef, useState } from "react";
import axiosInstance from "../axiosInstance";

export default function Dialog({ isOpen, onClose, product, user }) {
  const dialogRef = useRef(null);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    categoryId: product?.categoryId || "",
    name: product?.name || "",
    image: product?.image || "",
    price: product?.price || "",
    availability: product?.availability || "",
    params: product?.params || {},
  });
  const [bool, setBool] = useState(false);

  useEffect(() => {
    if (product) {
      let initialParams = product.params || {};
      if (typeof initialParams === "string") {
        try {
          initialParams = JSON.parse(initialParams);
        } catch (e) {
          console.error("Ошибка парсинга параметров:", e);
          initialParams = {};
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
    }
  }, [product]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === "params") {
      try {
        const parsedParams = JSON.parse(value);
        setFormData({ ...formData, [name]: parsedParams });
      } catch (e) {
        console.error("Некорректный JSON");
        setFormData({ ...formData });
      }
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSave = async () => {
    try {
      const paramsData = JSON.stringify(formData.params);

      const response = await axiosInstance.post(
        `/changeProduct/${product.id}`,
        {
          ...formData,
          params: paramsData,
          user,
        }
      );

      if (response.status !== 200) {
        throw new Error("Ошибка при сохранении изменений");
      }

      setIsEditing(false);
      onClose();
    } catch (error) {
      console.error("Ошибка сохранения:", error);
    }
  };

  const isValidUrl = (str) => {
    const pattern = /^(https?:\/\/)/;
    return pattern.test(str);
  };

  const getImageUrl = (image) => {
    if (isValidUrl(image)) {
      return image;
    }
    if (image) {
      return `/img/categories/${image}.jpg`;
    }
    return "/img/no-photo.png";
  };

  const handleImageError = (e) => {
    e.target.src = "/img/no-photo.png";
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
    if (typeof params === "string") {
      try {
        params = JSON.parse(params); // пытаемся распарсить строку
      } catch (e) {
        console.error("Ошибка парсинга параметров:", e);
        return null;
      }
    }

    return Object.entries(params).map(([key, value]) => (
      <div key={key} className="text-gray-300">
        <strong>{key}:</strong> {value}
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
        className="dialog m-auto p-8 bg-gray-800 text-white rounded-lg shadow-lg max-w-250 w-full transform transition-all duration-500 opacity-100"
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
            <h3
              id="dialog-title"
              className="text-4xl font-semibold mb-6 text-center"
            >
              {product.name}
            </h3>
            {!bool ? (
              <div>
                <div className="flex flex-col lg:flex-row gap-8">
                  <div className="flex-1 flex justify-center items-center">
                    <img
                      src={getImageUrl(product.image)}
                      alt={product.name}
                      className="w-128 max-w-[600px] object-cover rounded-lg shadow-xl border-2 border-gray-600"
                      onError={handleImageError}
                    />
                  </div>
                  <div>
                    <div className="flex-1">
                      <p className="text-xl text-gray-300 mb-3">
                        <strong>Цена:</strong> {product.price}
                      </p>
                      <p className="text-xl text-gray-300 mb-3">
                        <strong>Категория:</strong>{" "}
                        {product.categoryId || "Не указана"}
                      </p>
                      <p className="text-xl text-gray-300 mb-3">
                        <strong>Наличие:</strong> {product.availability}
                      </p>
                      <div className="mt-6">
                        <h4 className="text-2xl font-semibold text-gray-300 mb-4">
                          Характеристики:
                        </h4>
                        <div className="space-y-3">
                          {renderParams(product.params)}
                        </div>
                      </div>
                      {user && user?.isAdmin ? (
                        <button onClick={() => setBool(true)}>
                          Редактировать карточку товара
                        </button>
                      ) : (
                        ""
                      )}
                    </div>
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
                        className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
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
                        className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>

                    <div>
                      <label className="block text-gray-300 mb-2">Цена</label>
                      <input
                        name="price"
                        value={formData.price}
                        onChange={handleInputChange}
                        className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>

                    <div>
                      <label className="block text-gray-300 mb-2">
                        Категории с их айди
                      </label>
                      <p className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"> <
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <label className="block text-gray-300 mb-2">
                        Изображение (URL или имя файла)
                      </label>
                      <input
                        name="image"
                        value={formData.image}
                        onChange={handleInputChange}
                        className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
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
                        className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>

                    <div>
                      <label className="block text-gray-300 mb-2">
                        Характеристики (JSON)
                      </label>
                      <textarea
                        name="params"
                        value={JSON.stringify(formData.params, null, 2)}
                        onChange={handleInputChange}
                        className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg text-white font-mono text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 min-h-[150px]"
                      />
                    </div>
                  </div>
                </div>

                <div className="flex justify-end gap-4 mt-6">
                  <button
                    onClick={() => setBool(false)}
                    className="px-6 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-lg transition-colors duration-300"
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
