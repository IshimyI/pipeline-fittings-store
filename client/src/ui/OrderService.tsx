import axiosInstance from "../axiosInstance";
interface OrderItem {
  productId: number;
  quantity: number;
}
interface OrderData {
  userId?: number;
  email?: string;
  items: OrderItem[];
  total: number | string;
}
interface OrderResponse {
  id: number;
  email?: string;
  userId?: number;
  items: OrderItem[];
  total: number | string;
  createdAt: string;
}
export class OrdersService {
  static async createOrder(orderData: OrderData): Promise<OrderResponse> {
    try {
      const response = await axiosInstance.post<OrderResponse>(
        "/createOrder",
        orderData
      );

      if (orderData.userId) {
        try {
          await this.clearBasket(orderData.userId);
        } catch (clearError) {
          console.error("Error clearing basket:", clearError);
        }
      }

      return response.data;
    } catch (error) {
      console.error("Error creating order:", error);
      throw new Error(
        error.response?.data?.message || "Ошибка оформления заказа"
      );
    }
  }
  static async clearBasket(userId: number): Promise<void> {
    try {
      const response = await axiosInstance.delete("/basket/clear", {
        data: { userId },
      });

      if (response.status !== 200) {
        throw new Error(
          `Basket clearing failed with status: ${response.status}`
        );
      }

      // Verify the response indicates successful clearing
      if (!response.data || response.data.error) {
        throw new Error(response.data?.error || "Failed to clear basket");
      }
    } catch (error) {
      console.error("Error clearing basket:", error);
      throw new Error(
        error instanceof Error ? error.message : "Failed to clear basket"
      );
    }
  }

  static async getAllOrders(): Promise<OrderResponse[]> {
    try {
      const response = await axiosInstance.get<OrderResponse[]>("/allOrders");
      return response.data;
    } catch (error) {
      console.error("Ошибка при получении заказов:", error);
      throw new Error(
        error instanceof Error ? error.message : "Failed to fetch orders"
      );
    }
  }
}
