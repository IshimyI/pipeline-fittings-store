import React, { useEffect, useState } from "react";
import axiosInstance from "../axiosInstance";
import { OrdersService } from "../ui/OrderService";

export default function BasketPage({ user }) {
  const [cartItems, setCartItems] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  useEffect(() => {
    const fetchCart = async () => {
      if (user?.id) {
        try {
          setLoading(true);
          setError(null);
          const response = await axiosInstance.get("/basket", {
            params: { userId: user.id },
          });

          const cartProducts = response.data.map((item) => ({
            ...item.product,
            quantity: item.quantity,
          }));

          setCartItems(cartProducts);
        } catch (error) {
          console.error("Ошибка загрузки корзины:", error);
          setError("Не удалось загрузить корзину");
        } finally {
          setLoading(false);
        }
      }
    };

    fetchCart();
  }, [user]);

  const handleRemoveFromCart = async (productId) => {
    try {
      await axiosInstance.delete("/basket", {
        data: { userId: user.id, productId },
      });

      setCartItems((prev) => prev.filter((item) => item.id !== productId));
    } catch (error) {
      console.error("Ошибка удаления:", error);
      setError("Не удалось удалить товар");
    }
  };

  const handleCheckout = async () => {
    if (isSubmitting) return;

    setIsSubmitting(true);
    setError(null);
    try {
      const orderData = {
        userId: user.id,
        items: cartItems.map((item) => ({
          productId: item.id,
          quantity: item.quantity,
          productName: item.name, // Добавляем имя товара
        })),
        total: cartItems.reduce(
          (sum, item) =>
            sum + (item.price ? parseFloat(item.price) : 0) * item.quantity,
          0
        ),
        email: user.email, // Добавляем email пользователя
      };

      const orderResponse = await OrdersService.createOrder(orderData);
      if (orderResponse) {
        await axiosInstance.delete("/basket/clear", {
          data: { userId: user.id },
        });
        setCartItems([]);
        setSuccessMessage(
          "Заказ успешно создан! Менеджер свяжется с вами для уточнения деталей."
        );
        setTimeout(() => setSuccessMessage(""), 5000);
      }
    } catch (error) {
      console.error("Ошибка оформления:", error);
      setError("Не удалось оформить заказ");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <main className="w-full max-w-4xl p-6 space-y-8 bg-krio-background rounded-xl shadow-2xl border-2 border-krio-primary/20 my-8 hover:shadow-krio-primary/10 transition-shadow duration-300">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto"></div>
          <p className="mt-4 text-white">Загрузка корзины...</p>
        </main>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <main className="w-full max-w-4xl p-6 space-y-8 bg-krio-background rounded-xl shadow-2xl border-2 border-krio-primary/20 my-8 hover:shadow-krio-primary/10 transition-shadow duration-300">
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
      <main className="w-full max-w-4xl p-6 space-y-8 bg-krio-background rounded-xl shadow-2xl border-2 border-krio-primary/20 my-8 hover:shadow-krio-primary/10 transition-shadow duration-300">
        <h1 className="text-2xl md:text-3xl font-bold text-white mb-6">
          Ваша корзина
        </h1>

        {/* Сообщения об ошибках/успехе */}
        {error && (
          <div className="bg-red-900/30 border border-red-500 rounded-lg p-4 mb-6">
            <p className="text-red-300">{error}</p>
          </div>
        )}

        {successMessage && (
          <div className="bg-green-900/30 border border-green-500 rounded-lg p-4 mb-6">
            <p className="text-green-300">{successMessage}</p>
          </div>
        )}

        {/* Содержимое корзины */}
        <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-6">
          {cartItems.length === 0 ? (
            <div className="text-center py-12">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-16 w-16 mx-auto text-gray-500"
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
              <p className="mt-4 text-gray-400">Ваша корзина пуста</p>
            </div>
          ) : (
            <>
              <div className="space-y-4 mb-6">
                {cartItems.map((item) => (
                  <div
                    key={item.id}
                    className="bg-gray-800/30 border border-gray-700 rounded-lg p-4 hover:bg-gray-800/50 transition-colors relative group"
                  >
                    <button
                      onClick={() => handleRemoveFromCart(item.id)}
                      className="absolute top-3 right-3 text-red-400 hover:text-red-300 transition-colors"
                      title="Удалить товар"
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

                    <div className="flex items-start space-x-4">
                      <div className="flex-shrink-0">
                        <img
                          src={item.img || "/img/no-photo.png"}
                          alt={item.name}
                          className="h-16 w-16 object-cover rounded"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="text-lg font-semibold text-white truncate">
                          {item.name}
                        </h3>
                        <p className="text-gray-400 text-sm mt-1">
                          Количество: {item.quantity}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="text-lg font-semibold text-white">
                          {isNaN(parseFloat(item.price))
                            ? "По запросу"
                            : `${item.price} ₽`}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="border-t border-gray-700 pt-6">
                <div className="flex justify-between items-center mb-6">
                  <span className="text-xl font-bold text-white">Итого:</span>
                  <span className="text-xl font-bold text-white">
                    По запросу
                  </span>
                </div>

                <button
                  onClick={handleCheckout}
                  disabled={isSubmitting || cartItems.length === 0}
                  className={`w-full bg-indigo-600 hover:bg-indigo-700 text-white py-3 px-4 rounded-lg text-lg font-medium ${
                    isSubmitting || cartItems.length === 0
                      ? "opacity-50 cursor-not-allowed"
                      : ""
                  }`}
                >
                  {isSubmitting ? "Оформление..." : "Перейти к оформлению"}
                </button>
              </div>
            </>
          )}
        </div>
      </main>
    </div>
  );
}
