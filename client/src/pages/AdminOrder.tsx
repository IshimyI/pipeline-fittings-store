import { useEffect, useState } from "react";
import axiosInstance from "../axiosInstance";
import Order from "../ui/Order";
import type { User, Order as OrderType } from "../types";

interface AdminOrderProps {
  user: User | null;
}

export default function AdminOrder({ user: _user }: AdminOrderProps) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [orders, setOrders] = useState<OrderType[]>([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await axiosInstance.get<OrderType[]>("/allOrders");
        setOrders(response.data);
      } catch (error) {
        console.error("Ошибка загрузки заказов:", error);
        setError("Не удалось загрузить заказы. Пожалуйста, попробуйте позже.");
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  const handleStatusChange = async (orderId: number, newStatus: string) => {
    try {
      await axiosInstance.put(`/orders/${orderId}/status`, {
        status: newStatus,
      });

      console.log("Обновление статуса:", orderId, newStatus);
      const response = await axiosInstance.get<OrderType[]>("/allOrders");
      console.log("Полученные заказы после обновления:", response.data);
      setOrders(response.data);
    } catch (error) {
      console.error("Ошибка обновления статуса:", error);
      alert("Не удалось обновить статус.");
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-900 p-8">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto"></div>
          <p className="mt-4 text-white">Загрузка заказов...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-900 p-8">
        <div className="bg-red-900/30 border border-red-500 rounded-lg p-6 max-w-md text-center">
          <p className="text-red-300 font-medium">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="mt-4 px-4 py-2 bg-red-700 hover:bg-red-600 rounded text-white"
          >
            Попробовать снова
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-2xl md:text-3xl font-bold text-white mb-6">
          Управление заказами
        </h1>

        <div className="space-y-6">
          {orders.length === 0 ? (
            <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-8 text-center">
              <p className="text-gray-400">Нет доступных заказов</p>
            </div>
          ) : (
            orders.map((order) => (
              <Order
                key={order.id}
                order={order}
                handleStatusChange={handleStatusChange}
              />
            ))
          )}
        </div>
      </div>
    </div>
  );
}
