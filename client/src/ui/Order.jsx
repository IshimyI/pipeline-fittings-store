import React from "react";

export default function Order({ order }) {
  return (
    <div className="bg-krio-background shadow-lg rounded-lg p-6 mb-6 w-full max-w-xl border border-gray-700">
      <div className="mb-4 border-b border-gray-700 pb-2">
        <h3 className="text-xl font-semibold text-gray-200">
          {order.user.name}
        </h3>
        <p className="text-gray-400">{order.user.email}</p>
      </div>
      <div className="space-y-3">
        {order.items.map((item, index) => (
          <div
            key={index}
            className="flex justify-between border-b border-gray-700 pb-2"
          >
            <div>
              <p className="text-lg font-medium text-gray-300">
                {item.productName}
              </p>
              <p className="text-gray-400">Количество: {item.quantity}</p>
            </div>
            <p className="text-lg font-semibold text-gray-200">
              {item.price} ₽
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
