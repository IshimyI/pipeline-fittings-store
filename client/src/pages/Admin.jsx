import { useState } from "react";
import AdminFeedback from "./AdminFeedback";
import AdminAvailability from "./AdminAvailability";
export default function Admin({ user }) {
  const [showFeedback, setShowFeedback] = useState(true);
  const [showAvailability, setShowAvailability] = useState(false);
  const toggleFeedback = () => {
    setShowFeedback(!showFeedback);
    setShowAvailability(false);
  };
  const toggleAvailability = () => {
    setShowAvailability(!showAvailability);
    setShowFeedback(false);
  };
  return (
    <div className="flex items-center text-white justify-center min-h-screen bg-[url('/img/BG-image.png')] bg-fixed bg-center bg-no-repeat bg-cover bg-opacity-10 p-8">
      <div className="w-full max-w-4xl space-y-6">
        <div className="flex justify-center gap-4 mb-8">
          <button
            onClick={toggleFeedback}
            className={`px-6 py-3 rounded-lg transition-colors ${
              showFeedback
                ? "bg-blue-700 text-white"
                : "bg-gray-700 hover:bg-gray-600"
            }`}
          >
            Обратная связь
          </button>
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
      </div>
    </div>
  );
}
