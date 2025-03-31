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
    if (log) {
      handleLogin(e);
    } else {
      handleSignUp(e);
    }
  };

  return (
    <div className="flex items-center text-white justify-center min-h-screen bg-[url('/uploads/BG-image.png')] bg-fixed bg-center bg-no-repeat bg-cover bg-opacity-10 p-8">
      <div className="w-full max-w-md p-8 space-y-6 bg-krio-foreground rounded-lg shadow-xl border border-gray-700">
        <h2 className="text-2xl font-semibold text-center text-gray-300 uppercase tracking-wide">
          {log ? "Вход" : "Регистрация"}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="em1" className="block text-gray-400 font-medium">
              Почта
            </label>
            <input
              name="email"
              type="email"
              id="em1"
              className="w-full px-3 py-2 mt-1 bg-krio-background border border-gray-700 rounded-md focus:ring-2 focus:ring-blue-600 focus:outline-none"
            />
          </div>

          {!log && (
            <div>
              <label
                htmlFor="name1"
                className="block text-gray-400 font-medium"
              >
                Логин
              </label>
              <input
                name="name"
                type="text"
                id="name1"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-3 py-2 mt-1 bg-krio-background border border-gray-700 rounded-md focus:ring-2 focus:ring-blue-600 focus:outline-none"
              />
            </div>
          )}

          <div>
            <label htmlFor="pass1" className="block text-gray-400 font-medium">
              Пароль
            </label>
            <input
              name="password"
              type="password"
              id="pass1"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3 py-2 mt-1 bg-krio-background border border-gray-700 rounded-md focus:ring-2 focus:ring-blue-600 focus:outline-none"
            />
          </div>

          {!log && (
            <div>
              <label
                htmlFor="pass2"
                className="block text-gray-400 font-medium"
              >
                Подтвердите пароль
              </label>
              <input
                name="confirmPassword"
                type="password"
                id="pass2"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full px-3 py-2 mt-1 bg-krio-background border border-gray-700 rounded-md focus:ring-2 focus:ring-blue-600 focus:outline-none"
              />
            </div>
          )}

          {error && (
            <div className="text-red-500 text-sm text-center">{error}</div>
          )}

          <button
            type="submit"
            className="w-full py-2 font-semibold text-white bg-blue-700 rounded-md hover:bg-blue-800 focus:ring-2 focus:ring-blue-500 focus:outline-none"
          >
            {log ? "Войти" : "Зарегистрироваться"}
          </button>
        </form>

        <div className="text-center">
          <button
            onClick={toggleForm}
            className="text-blue-500 hover:underline"
          >
            {log ? "Еще нет аккаунта?" : "Уже есть аккаунт?"}
          </button>
        </div>
      </div>
    </div>
  );
}
