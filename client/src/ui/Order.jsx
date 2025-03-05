import React from "react";

export default function Order({ order }) {
  return (
    <div className="bg-white shadow-md rounded-lg p-6 mb-6 w-full max-w-xl">
      <div className="mb-4 border-b pb-2">
        <h3 className="text-xl font-semibold">{order.user.name}</h3>
        <p className="text-gray-500">{order.user.email}</p>
      </div>
      <div className="space-y-3">
        {order.items.map((item, index) => (
          <div key={index} className="flex justify-between border-b pb-2">
            <div>
              <p className="text-lg font-medium">{item.productName}</p>
              <p className="text-gray-600">Количество: {item.quantity}</p>
            </div>
            <p className="text-lg font-semibold">{item.price} ₽</p>
          </div>
        ))}
      </div>
    </div>
  );
}
