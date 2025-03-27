import { useState } from "react";

export default function Cart({
  items = [],
  onClose,
  onCheckout,
  onRemove,
  user,
}) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [email, setEmail] = useState("");
  const [error, setError] = useState(null);

  const isEmailValid = email && /^\S+@\S+\.\S+$/.test(email);

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
    <div className="fixed bottom-4 right-4 bg-krio-background p-4 rounded-lg shadow-xl w-96">
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
              onClick={() => {
                setIsSubmitting(true);
                onCheckout(email);
              }}
              disabled={
                isSubmitting ||
                items.length === 0 ||
                (!user?.id && !isEmailValid)
              }
              className={`w-full bg-indigo-600 hover:bg-indigo-700 text-white py-3 px-4 rounded-lg text-lg font-medium ${
                isSubmitting ||
                items.length === 0 ||
                (!user?.id && !isEmailValid)
                  ? "opacity-50 cursor-not-allowed"
                  : ""
              }`}
            >
              {isSubmitting ? "Оформление..." : "Перейти к оформлению"}
            </button>
            {items.length > 0 && !user?.id && (
              <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-4">
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Email для связи
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    setError(null);
                  }}
                  className={`w-full p-2 border rounded text-white ${
                    email && !isEmailValid
                      ? "bg-red-900/20 border-red-500"
                      : "bg-gray-700 border-gray-600"
                  }`}
                  placeholder="Введите ваш email"
                  required
                />
                {email && !isEmailValid && (
                  <p className="text-red-400 text-sm mt-1">
                    Введите корректный email
                  </p>
                )}
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
}
