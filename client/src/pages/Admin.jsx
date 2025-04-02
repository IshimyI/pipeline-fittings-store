import { useState } from "react";
import AdminFeedback from "./AdminFeedback";
import AdminAvailability from "./AdminAvailability";
import AdminOrder from "./AdminOrder";
export default function Admin({ user }) {
  const [showFeedback, setShowFeedback] = useState(true);
  const [showAvailability, setShowAvailability] = useState(false);
  const [showOrder, setShowOrder] = useState(false);

  const toggleFeedback = () => {
    setShowFeedback(!showFeedback);
    setShowAvailability(false);
    setShowOrder(false);
  };
  const toggleAvailability = () => {
    setShowAvailability(!showAvailability);
    setShowFeedback(false);
    setShowOrder(false);
  };

  const toggleOrder = () => {
    setShowOrder(!showOrder);
    setShowFeedback(false);
    setShowAvailability(false);
  };

  return (
    <div className="flex items-center text-white justify-center min-h-screen bg-[url('/uploads/BG-image.png')] bg-fixed bg-center bg-no-repeat bg-cover bg-opacity-10 p-8">
      <div className="w-full max-w-4xl space-y-6">
        <div className="flex flex-col md:flex-row justify-center gap-4 mb-8">
          <button
            onClick={toggleAvailability}
            className={`px-6 py-3 rounded-lg transition-colors ${
              showAvailability
                ? "bg-blue-700 text-white"
                : "bg-gray-700 hover:bg-gray-600"
            }`}
          >
            Управление наличием
          </button>
          <button
            onClick={toggleFeedback}
            className={`px-6 py-3 rounded-lg transition-colors ${
              showFeedback
                ? "bg-blue-700 text-white"
                : "bg-gray-700 hover:bg-gray-600"
            }`}
          >
            Список обращений
          </button>
          <button
            onClick={toggleOrder}
            className={`px-6 py-3 rounded-lg transition-colors ${
              showOrder
                ? "bg-blue-700 text-white"
                : "bg-gray-700 hover:bg-gray-600"
            }`}
          >
            Список заказов
          </button>
        </div>
        {showFeedback && (
          <div className="bg-krio-background p-6 rounded-lg shadow-lg">
            <AdminFeedback user={user} />
          </div>
        )}
        {showAvailability && (
          <div className="bg-krio-background p-6 rounded-lg shadow-lg">
            <AdminAvailability user={user} />
          </div>
        )}
        {showOrder && (
          <div className="bg-krio-background p-6 rounded-lg shadow-lg">
            <AdminOrder user={user} />
          </div>
        )}
      </div>
    </div>
  );
}
