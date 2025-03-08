export default function Cart({ items = [], onClose, onCheckout, onRemove }) {
  const hasAnyRequestPrice = items.some((item) =>
    String(item.price).toLowerCase().includes("запросу")
  );

  const totalSum = items.reduce((sum, item) => {
    const price = parseFloat(String(item.price).replace(/[^0-9.]/g, ""));
    const quantity = item.quantity || 1;
    return isNaN(price) ? sum : sum + price * quantity;
  }, 0);

  const formattedTotal = hasAnyRequestPrice
    ? "По запросу"
    : `${totalSum.toFixed(2)} ₽`;

  return (
    <div className="fixed bottom-4 right-4 bg-gray-800 p-4 rounded-lg shadow-xl w-sm">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-xl font-semibold">Корзина</h3>
        <button onClick={onClose} className="text-gray-400 hover:text-white">
          ×
        </button>
      </div>

      {items.length === 0 ? (
        <p className="text-gray-400">Корзина пуста</p>
      ) : (
        <>
          <div className="mb-4 max-h-64 overflow-y-auto">
            {items.map((item) => (
              <div
                key={item.id}
                className="flex justify-between items-center mb-2"
              >
                <div className="flex flex-col max-w-[60%]">
                  <span className="truncate">{item.name}</span>
                  <span className="text-xs text-gray-400">
                    Количество: {item.quantity || 1}
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-nowrap">
                    {String(item.price).toLowerCase().includes("запросу")
                      ? "По запросу"
                      : item.price}
                  </span>
                  <button
                    onClick={() => onRemove(item.id)}
                    className="text-red-500 hover:text-red-700"
                  >
                    ✕
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="border-t pt-4">
            <div className="flex justify-between mb-4">
              <span>Итого:</span>
              <span className="font-semibold">{formattedTotal}</span>
            </div>
            <button
              onClick={onCheckout}
              className="w-full bg-green-600 hover:bg-green-700 py-2 rounded-lg"
              disabled={items.length === 0}
            >
              Оформить заказ
            </button>
          </div>
        </>
      )}
    </div>
  );
}
