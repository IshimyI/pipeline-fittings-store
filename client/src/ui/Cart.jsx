import { useState } from "react";

const CloseIcon = () => (
  <svg
    className="w-5 h-5"
    fill="none"
    stroke="currentColor"
    strokeWidth={2}
    viewBox="0 0 24 24"
  >
    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
  </svg>
);

const TrashIcon = () => (
  <svg
    className="w-4 h-4"
    fill="none"
    stroke="currentColor"
    strokeWidth={2}
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
    />
  </svg>
);

const ArrowIcon = () => (
  <svg
    className="w-4 h-4"
    fill="none"
    stroke="currentColor"
    strokeWidth={2}
    viewBox="0 0 24 24"
  >
    <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
  </svg>
);

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
    <div className="fixed bottom-4 right-4 bg-krio-background p-5 rounded-xl shadow-2xl border border-krio-primary/20 w-96 max-w-[92vw] z-[90]">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-bold text-white uppercase tracking-wide">
          Корзина
        </h3>
        <button
          onClick={onClose}
          className="text-krio-primary hover:text-krio-secondary hover:bg-krio-foreground/40 rounded-full transition-colors p-1"
          aria-label="Закрыть"
        >
          <CloseIcon />
        </button>
      </div>

      {items.length === 0 ? (
        <p className="text-krio-secondary/70 text-sm">Корзина пуста</p>
      ) : (
        <>
          <div className="mb-4 max-h-64 overflow-y-auto divide-y divide-krio-primary/10">
            {items.map((item) => (
              <div
                key={item.id}
                className="flex justify-between items-center py-2.5 first:pt-0"
              >
                <div className="flex flex-col max-w-[60%]">
                  <span className="truncate text-white text-sm">
                    {item.name}
                  </span>
                  <span className="text-xs text-krio-secondary/70">
                    Количество: {item.quantity || 1}
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-nowrap text-sm text-gray-300">
                    {String(item.price).toLowerCase().includes("запросу")
                      ? "По запросу"
                      : item.price}
                  </span>
                  <button
                    onClick={() => onRemove(item.id)}
                    className="p-1.5 bg-red-500/10 hover:bg-red-500/80 text-red-400 hover:text-white rounded-full transition-colors"
                    aria-label="Удалить"
                  >
                    <TrashIcon />
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="border-t border-krio-primary/20 pt-4">
            <div className="flex justify-between mb-4">
              <span className="text-gray-300">Итого:</span>
              <span className="font-semibold text-white">
                {formattedTotal}
              </span>
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
              className={`w-full flex items-center justify-center gap-2 bg-krio-primary hover:bg-krio-primary/80 text-white py-3 px-4 rounded-lg text-base font-medium shadow-md transition-colors ${
                isSubmitting ||
                items.length === 0 ||
                (!user?.id && !isEmailValid)
                  ? "opacity-50 cursor-not-allowed"
                  : ""
              }`}
            >
              {isSubmitting ? (
                "Оформление..."
              ) : (
                <>
                  Перейти к оформлению
                  <ArrowIcon />
                </>
              )}
            </button>
            <div className="text-xs mt-3 text-gray-400">
              Нажимая на кнопку, вы соглашаетесь с{" "}
              <a className="text-krio-primary underline" href="/terms">
                Пользовательским соглашением
              </a>{" "}
              и{" "}
              <a className="text-krio-primary underline" href="/privacy">
                Политикой конфиденциальности
              </a>
            </div>
            {items.length > 0 && !user?.id && (
              <div className="mt-4 bg-krio-foreground border border-krio-primary/20 rounded-lg p-4">
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
                  className={`w-full p-2 bg-krio-background border rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-krio-primary transition-all ${
                    email && !isEmailValid
                      ? "border-red-500"
                      : "border-krio-primary/30"
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
