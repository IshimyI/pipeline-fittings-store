import React, { useEffect, useState } from "react";
import axiosInstance from "../axiosInstance";
import { OrdersService } from "../ui/OrderService";

export default function BasketPage({ user }) {
  const [cartItems, setCartItems] = useState([]);
  const [email, setEmail] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  const isEmailValid = email && /^\S+@\S+\.\S+$/.test(email);

  const isValidUrl = (str) => {
    if (typeof str !== "string") return false;

    try {
      new URL(str);

      const allowedProtocols = ["http:", "https:"];
      const url = new URL(str);
      return allowedProtocols.includes(url.protocol);
    } catch (e) {
      return false;
    }
  };

  const getImageUrl = (image) => {
    if (!image) return "/uploads/no-photo.png";
    if (isValidUrl(image)) return image;
    if (image.startsWith("/uploads/")) return image;
    if (image.startsWith("categories/")) return `/uploads/${image}`;
    if (image === "no-photo.png") return `/uploads/${image}`;
    return `/uploads/categories/${image}.jpg?v=${Date.now()}`;
  };

  const handleImageError = (e) => {
    e.target.src = "/uploads/no-photo.png";
  };

  useEffect(() => {
    const fetchCart = async () => {
      setLoading(true);
      setError("");
      try {
        if (user?.id) {
          const response = await axiosInstance.get("/basket", {
            params: { userId: user.id },
          });
          const cartProducts = response.data.map((item) => ({
            ...item.product,
            quantity: item.quantity,
          }));
          setCartItems(cartProducts);
        } else {
          const guestCart = localStorage.getItem("guestCart");
          if (guestCart) {
            try {
              const parsedCart = JSON.parse(guestCart);
              setCartItems(parsedCart);
            } catch (parseError) {
              console.error("Ошибка парсинга гостевой корзины:", parseError);
              localStorage.removeItem("guestCart");
              setCartItems([]);
            }
          }
        }
      } catch (error) {
        console.error("Ошибка загрузки корзины:", error);
        setError("Не удалось загрузить корзину");
        setCartItems([]);
      } finally {
        setLoading(false);
      }
    };
    fetchCart();
  }, [user]);

  const handleRemoveFromCart = async (productId) => {
    try {
      if (user?.id) {
        await axiosInstance.delete("/basket", {
          data: { userId: user.id, productId },
        });
      } else {
        const newCart = cartItems.filter((item) => item.id !== productId);
        localStorage.setItem("guestCart", JSON.stringify(newCart));
        setCartItems(newCart);
      }
      setCartItems((prev) => prev.filter((item) => item.id !== productId));
    } catch (error) {
      console.error("Ошибка удаления из корзины:", error);
    }
  };

  const handleCheckout = async () => {
    if (isSubmitting) return;

    setIsSubmitting(true);
    setError(null);
    try {
      let orderData;

      if (!user?.id) {
        if (!email || !/^\S+@\S+\.\S+$/.test(email)) {
          setError("Пожалуйста, введите корректный email");
          setIsSubmitting(false);

          return;
        }

        orderData = {
          email,
          items: cartItems.map((item) => ({
            productId: item.id,
            quantity: item.quantity,
            productName: item.name,
          })),
          total: cartItems.reduce(
            (sum, item) =>
              sum + (item.price ? parseFloat(item.price) : 0) * item.quantity,
            0
          ),
        };

        const guestOrders = JSON.parse(
          localStorage.getItem("guestOrders") || "[]"
        );
        localStorage.setItem(
          "guestOrders",
          JSON.stringify([...guestOrders, orderData])
        );
        localStorage.removeItem("guestCart");
      } else {
        orderData = {
          userId: user.id,
          items: cartItems.map((item) => ({
            productId: item.id,
            quantity: item.quantity,
            productName: item.name,
          })),
          total: cartItems.reduce(
            (sum, item) =>
              sum + (item.price ? parseFloat(item.price) : 0) * item.quantity,
            0
          ),
          email: user.email,
        };

        await axiosInstance.delete("/basket/clear", {
          data: { userId: user.id },
        });
      }

      const orderResponse = await OrdersService.createOrder(orderData);
      if (orderResponse) {
        setCartItems([]);
        setSuccessMessage(
          "Заказ успешно создан! Менеджер свяжется с вами для уточнения деталей."
        );
        setTimeout(() => setSuccessMessage(""), 5000);
      }
    } catch (error) {
      console.error("Ошибка оформления:", error);
      setError(
        error.message ||
          error.response?.data?.message ||
          "Не удалось оформить заказ"
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <main
          className="w-full max-w-[90%] md:max-w-[60%] lx:max-w-[80%] p-6 space-y-6 
                    bg-krio-background rounded-lg shadow-lg border border-gray-700 my-8 mx-auto"
        >
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto"></div>
          <p className="mt-4 text-white">Загрузка корзины...</p>
        </main>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <main
          className="w-full max-w-[90%] md:max-w-[60%] lx:max-w-[80%] p-6 space-y-6 
                    bg-krio-background rounded-lg shadow-lg border border-gray-700 my-8 mx-auto"
        >
          <p className="text-red-300 font-medium">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="mt-4 px-4 py-2 bg-red-700 hover:bg-red-600 rounded text-white"
          >
            Попробовать снова
          </button>
        </main>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center min-h-screen">
      <main
        className="w-full max-w-[90%] md:max-w-[60%] lx:max-w-[80%] p-6 space-y-6 
                  bg-krio-background rounded-lg shadow-lg border border-gray-700 my-8 mx-auto"
      >
        <h1 className="text-2xl md:text-3xl 2xl:text-4xl 4k:text-5xl font-bold text-white mb-6 2xl:mb-8">
          Ваша корзина
        </h1>

        {error && (
          <div className="bg-red-900/30 border border-red-500 rounded-lg p-4 2xl:p-5 mb-6 2xl:text-lg">
            <p className="text-red-300">{error}</p>
          </div>
        )}

        {successMessage && (
          <div className="bg-green-900/30 border border-green-500 rounded-lg p-4 2xl:p-5 mb-6 2xl:text-lg">
            <p className="text-green-300">{successMessage}</p>
          </div>
        )}

        <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-6 2xl:p-8 4k:p-10">
          {cartItems.length === 0 ? (
            <div className="text-center py-12 2xl:py-16">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-16 w-16 2xl:h-20 2xl:w-20 mx-auto text-gray-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                />
              </svg>
              <p className="mt-4 2xl:mt-6 text-gray-400 2xl:text-lg">
                Ваша корзина пуста
              </p>
            </div>
          ) : (
            <>
              <div className="space-y-4 2xl:space-y-6 mb-6 2xl:mb-8">
                {cartItems.map((item) => (
                  <div
                    key={item.id}
                    className="bg-gray-800/30 border border-gray-700 rounded-lg p-4 2xl:p-5 hover:bg-gray-800/50 transition-colors relative group"
                  >
                    <button
                      onClick={() => handleRemoveFromCart(item.id)}
                      className="absolute top-3 right-3 text-red-400 hover:text-red-300 transition-colors 2xl:top-4 2xl:right-4"
                      title="Удалить товар"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 2xl:h-6 2xl:w-6"
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

                    <div className="flex items-start space-x-4 2xl:space-x-6">
                      <div className="flex-shrink-0">
                        <img
                          src={getImageUrl(item.image)}
                          alt={item.name}
                          className="h-16 w-16 2xl:h-24 2xl:w-24 object-cover rounded"
                          onError={handleImageError}
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="text-lg 2xl:text-xl font-semibold text-white truncate">
                          {item.name}
                        </h3>
                        <p className="text-gray-400 text-sm 2xl:text-base mt-1">
                          Количество: {item.quantity}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="text-lg 2xl:text-xl font-semibold text-white mr-8">
                          {isNaN(parseFloat(item.price))
                            ? "По запросу"
                            : `${item.price} ₽`}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="border-t border-gray-700 pt-6 2xl:pt-8">
                <div className="flex justify-between items-center mb-6 2xl:mb-8">
                  <span className="text-xl 2xl:text-2xl font-bold text-white">
                    Итого:
                  </span>
                  <span className="text-xl 2xl:text-2xl font-bold text-white">
                    По запросу
                  </span>
                </div>

                <button
                  onClick={handleCheckout}
                  disabled={
                    isSubmitting ||
                    cartItems.length === 0 ||
                    (!user?.id && !isEmailValid)
                  }
                  className={`w-full bg-indigo-600 hover:bg-indigo-700 text-white py-3 px-4 2xl:py-4 2xl:px-6 rounded-lg text-lg 2xl:text-xl font-medium ${
                    isSubmitting ||
                    cartItems.length === 0 ||
                    (!user?.id && !isEmailValid)
                      ? "opacity-50 cursor-not-allowed"
                      : ""
                  }`}
                >
                  {isSubmitting ? "Оформление..." : "Перейти к оформлению"}
                </button>

                {cartItems.length > 0 && !user?.id && (
                  <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-4 2xl:p-5 mt-6">
                    <label className="block text-sm 2xl:text-base font-medium text-gray-300 mb-2">
                      Email для связи
                    </label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => {
                        setEmail(e.target.value);
                        setError(null);
                      }}
                      className={`w-full p-2 2xl:p-3 border rounded text-white 2xl:text-base ${
                        email && !isEmailValid
                          ? "bg-red-900/20 border-red-500"
                          : "bg-gray-700 border-gray-600"
                      }`}
                      placeholder="Введите ваш email"
                      required
                    />
                    {email && !isEmailValid && (
                      <p className="text-red-400 text-sm 2xl:text-base mt-1">
                        Введите корректный email
                      </p>
                    )}
                  </div>
                )}
              </div>
            </>
          )}
        </div>
      </main>
    </div>
  );
}
