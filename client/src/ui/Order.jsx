export default function Order({ order }) {
  const user = order.user || {
    name: "Неизвестный клиент",
    email: order.email || "Нет email",
  };
  const items = order.items || [];
  const total = order.total || "Не указана";

  return (
    <div className="bg-gray-800/50 hover:bg-gray-800/70 transition-all border border-gray-700 rounded-lg shadow-lg overflow-hidden">
      <div className="p-6">
        <div className="flex justify-between items-start mb-4 pb-4 border-b border-gray-700">
          <div>
            <h3>
              <span className="text-l text-white"> Имя: </span>
              <span className="text-gray-100 font-bold text-m mt-1">
                {user.name || "Неизвестный пользователь"}
                <span className="ml-3 bg-gray-700/50 text-gray-300 px-2 py-1 rounded-full text-xs">
                  #{order.id}
                </span>
              </span>
            </h3>
            <span className="text-l text-white"> Почта: </span>
            <span className="text-gray-100 font-bold text-m mt-1">
              {user.email}
            </span>
          </div>
          <span className="text-sm text-gray-400">
            {new Date(order.createdAt).toLocaleString()}
          </span>
        </div>

        <div className="mb-4">
          {items.length > 0 ? (
            <div className="space-y-3">
              {items.map((item, index) => (
                <div
                  key={index}
                  className="flex justify-between items-center pb-3 border-b border-gray-700/50 last:border-0"
                >
                  <div>
                    <p className="text-md font-medium text-white">
                      {item.productName || "Без названия"}
                    </p>
                    <div className="flex space-x-4 mt-1 text-sm text-gray-400">
                      <span>{item.quantity} шт.</span>
                      {item.size && <span>Размер: {item.size}</span>}
                    </div>
                  </div>
                  <p className="text-md font-semibold text-white">
                    {item.price ? `${item.price} ₽` : "По запросу"}
                  </p>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-400 text-center py-3">
              Нет товаров в заказе
            </p>
          )}
        </div>

        <div className="flex justify-end pt-4 border-t border-gray-700">
          <div className="text-lg font-bold text-white">
            Итого: {typeof total === "number" ? `${total} ₽` : total}
          </div>
        </div>
      </div>
    </div>
  );
}
