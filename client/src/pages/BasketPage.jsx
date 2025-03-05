import React, { useEffect, useState } from "react";
import axiosInstance from "../axiosInstance";
import Order from "../ui/Order";

export default function BasketPage({ user }) {
  const [cartItems, setCartItems] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchCart = async () => {
      if (user?.id) {
        try {
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
    try {
      const orderData = {
        userId: user.id,
        items: cartItems.map((item) => ({
          productId: item.id,
          quantity: item.quantity,
        })),
        total: cartItems.reduce(
          (sum, item) => sum + item.price * item.quantity,
          0
        ),
      };

      const orderResponse = await axiosInstance.post("/createOrder", orderData);

      if (orderResponse.data.message === "Заказ успешно создан") {
        await axiosInstance.delete("/basket/clear", {
          data: { userId: user.id },
        });

        setCartItems([]);
        alert(`Заказ принят! Менеджер свяжется для уточнения деталей.`);
      }
    } catch (error) {
      console.error("Ошибка оформления:", error);
      setError("Не удалось оформить заказ");
    }
  };

  const isAnyProductByRequest = cartItems.some((item) =>
    isNaN(parseFloat(item.price))
  );

  const totalSum = cartItems.reduce((sum, item) => {
    if (isNaN(item.price) || isNaN(item.quantity)) {
      return sum;
    }
    return sum + item.price * item.quantity;
  }, 0);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axiosInstance.get("/allOrders");
        setOrders(response.data);
      } catch (error) {
        console.error("Ошибка загрузки заказов:", error);
      }
    };

    fetchOrders();
  }, []);

  const formattedTotal = isAnyProductByRequest
    ? "По запросу"
    : `${isNaN(totalSum) ? 0 : totalSum.toFixed(2)} ₽`;

  if (loading)
    return <div className="text-center p-8">Загрузка корзины...</div>;
  if (error) return <div className="text-red-500 p-8">{error}</div>;

  return (
    <div>
      {user.isAdmin ? (
        <div>
          {orders.map((order) => (
            <div className="flex text-center justify-center" key={order.id}>
              <Order order={order} />
            </div>
          ))}
        </div>
      ) : (
        <div className="min-h-screen p-8">
          <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md p-6">
            <h1 className="text-3xl font-bold mb-6">Ваша корзина</h1>

            {cartItems.length === 0 ? (
              <div className="text-center text-gray-500 py-12">
                Ваша корзина пуста
              </div>
            ) : (
              <>
                <div className="space-y-4 mb-8">
                  {cartItems.map((item) => (
                    <div
                      key={item.id}
                      className="flex items-center justify-between border-b pb-4"
                    >
                      <div className="flex items-center space-x-4">
                        <img
                          src={item.img || "/img/no-photo.png"}
                          alt={item.name}
                          className="w-20 h-20 object-cover rounded"
                        />
                        <div>
                          <h3 className="text-lg font-semibold">{item.name}</h3>
                          <p className="text-gray-600">
                            Количество: {item.quantity}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center space-x-4">
                        <p className="text-lg font-semibold">
                          {isNaN(parseFloat(item.price))
                            ? "По запросу"
                            : `${item.price} ₽`}
                        </p>
                        <button
                          onClick={() => handleRemoveFromCart(item.id)}
                          className="text-red-500 hover:text-red-700"
                        >
                          Удалить
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="border-t pt-6">
                  <div className="flex justify-between items-center mb-6">
                    <span className="text-xl font-bold">Итого:</span>
                    <span className="text-xl font-bold">По запросу</span>
                  </div>

                  <button
                    onClick={handleCheckout}
                    className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg text-lg"
                  >
                    Перейти к оформлению
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
