import { useState } from "react";

export default function Cart({
  items = [],
  onClose,
  onCheckout,
  onRemove,
  user,
}) {
  const [showEmailModal, setShowEmailModal] = useState(false);
  const [emailInput, setEmailInput] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

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

  const handleCheckoutClick = () => {
    if (!user?.id) {
      setShowEmailModal(true);
    } else {
      onCheckout();
    }
  };

  return (
    <div className="fixed bottom-4 right-4 bg-krio-background p-4 rounded-lg shadow-xl w-96">
      {showEmailModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-krio-foreground p-6 rounded-lg w-80">
            <h3 className="text-xl font-semibold mb-4">Введите email</h3>
            <input
              type="email"
              value={emailInput}
              onChange={(e) => setEmailInput(e.target.value)}
              placeholder="Ваш email"
              className="w-full p-3 mb-4 bg-krio-background text-white rounded-lg"
            />
            <div className="flex justify-end gap-2">
              <button
                onClick={() => setShowEmailModal(false)}
                className="px-4 py-2 bg-gray-500 rounded-lg hover:bg-gray-600"
              >
                Отмена
              </button>
              <button
                onClick={async () => {
                  if (/^\S+@\S+\.\S+$/.test(emailInput)) {
                    setIsSubmitting(true);
                    try {
                      await onCheckout(emailInput);
                      setShowEmailModal(false);
                    } finally {
                      setIsSubmitting(false);
                    }
                  } else {
                    alert("Пожалуйста, введите корректный email");
                  }
                }}
                className="px-4 py-2 bg-blue-600 rounded-lg hover:bg-blue-700"
              >
                Подтвердить
              </button>
            </div>
          </div>
        </div>
      )}

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
              onClick={handleCheckoutClick}
              className={`w-full py-2 rounded-lg ${
                isSubmitting
                  ? "bg-gray-500 cursor-not-allowed"
                  : "bg-green-600 hover:bg-green-700"
              }`}
              disabled={items.length === 0 || isSubmitting}
            >
              Оформить заказ
            </button>
          </div>
        </>
      )}
    </div>
  );
}
