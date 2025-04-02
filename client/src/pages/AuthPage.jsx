import { useState } from "react";

export default function AuthPage({ handleLogin, handleSignUp }) {
  const [log, setLog] = useState(true);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [name, setName] = useState("");
  const [error, setError] = useState("");

  const toggleForm = () => {
    setLog(!log);
    setError("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!log && password !== confirmPassword) {
      setError("Пароли не совпадают!");
      return;
    }
    if (password.length < 6) {
      setError("Пароль должен содержать минимум 6 символов");
      return;
    }
    log ? handleLogin(e) : handleSignUp(e);
  };

  return (
    <div className="flex items-center justify-center min-h-screen p-4">
      <div className="w-full max-w-md p-8 space-y-8 bg-krio-foreground rounded-xl shadow-2xl transition-all duration-300">
        <div className="text-center text-krio-secondary">
          <h2 className="text-3xl font-bold mb-2">
            {log ? "Добро пожаловать" : "Создайте аккаунт"}
          </h2>
          <p className="text-krio-secondary">
            {log ? "Войдите в свой аккаунт" : "Начните работу с платформой"}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-krio-secondary mb-1">
              Электронная почта
            </label>
            <div className="relative">
              <input
                name="email"
                type="email"
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all text-krio-secondary"
                placeholder="example@mail.com"
              />
              <svg
                className="absolute right-3 top-3.5 h-5 w-5 text-krio-secondary"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                />
              </svg>
            </div>
          </div>

          {!log && (
            <div>
              <label className="block text-sm font-medium text-krio-secondary mb-1">
                Имя пользователя
              </label>
              <input
                name="name"
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all text-krio-secondary"
                placeholder="Ваш логин"
              />
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-krio-secondary mb-1">
              Пароль
            </label>
            <div className="relative">
              <input
                name="password"
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all text-krio-secondary"
                placeholder="••••••••"
              />
              <svg
                className="absolute right-3 top-3.5 h-5 w-5 text-krio-secondary"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                />
              </svg>
            </div>
          </div>

          {!log && (
            <div>
              <label className="block text-sm font-medium text-krio-secondary mb-1">
                Подтверждение пароля
              </label>
              <input
                name="confirmPassword"
                type="password"
                required
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all text-krio-secondary"
                placeholder="••••••••"
              />
            </div>
          )}

          {error && (
            <div className="p-3 bg-red-50 border border-red-200 text-red-700 rounded-lg text-sm flex items-center space-x-2">
              <svg
                className="h-5 w-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                />
              </svg>
              <span>{error}</span>
            </div>
          )}

          <button
            type="submit"
            className="w-full py-3.5 bg-blue-600 hover:bg-blue-700 text-krio-secondary font-semibold rounded-lg transition-all duration-300 transform hover:scale-[1.01]"
          >
            {log ? "Войти →" : "Зарегистрироваться"}
          </button>
        </form>

        <div className="text-center text-sm text-krio-secondary">
          {log ? "Нет аккаунта?" : "Уже зарегистрированы?"}{" "}
          <button
            onClick={toggleForm}
            className="text-blue-600 hover:text-blue-700 font-semibold underline underline-offset-2"
          >
            {log ? "Создать аккаунт" : "Войти в систему"}
          </button>
        </div>
      </div>
    </div>
  );
}
