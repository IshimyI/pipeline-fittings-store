import { useState } from "react";

const inputClass =
  "w-full px-4 py-3 bg-krio-foreground border border-krio-primary/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-krio-primary transition-all text-white placeholder:text-gray-400";

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
      <div className="w-full max-w-md p-8 space-y-8 bg-krio-background rounded-xl shadow-2xl border border-krio-primary/20 transition-all duration-300">
        <div className="text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-white uppercase tracking-[0.1em]">
            {log ? "Добро пожаловать" : "Создайте аккаунт"}
          </h2>
          <div className="w-16 h-0.5 bg-krio-primary mx-auto mt-3" />
          <p className="text-krio-secondary mt-4">
            {log ? "Войдите в свой аккаунт" : "Начните работу с платформой"}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-krio-secondary mb-1.5">
              Электронная почта
            </label>
            <div className="relative">
              <input
                name="email"
                type="email"
                required
                className={inputClass}
                placeholder="example@mail.com"
              />
              <svg
                className="absolute right-3 top-3.5 h-5 w-5 text-krio-primary"
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
              <label className="block text-sm font-medium text-krio-secondary mb-1.5">
                Имя пользователя
              </label>
              <input
                name="name"
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                className={inputClass}
                placeholder="Ваше имя"
              />
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-krio-secondary mb-1.5">
              Пароль
            </label>
            <div className="relative">
              <input
                name="password"
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className={inputClass}
                placeholder="••••••••"
              />
              <svg
                className="absolute right-3 top-3.5 h-5 w-5 text-krio-primary"
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
              <label className="block text-sm font-medium text-krio-secondary mb-1.5">
                Подтверждение пароля
              </label>
              <input
                name="confirmPassword"
                type="password"
                required
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className={inputClass}
                placeholder="••••••••"
              />
            </div>
          )}

          {error && (
            <div className="p-3 bg-red-500/10 border border-red-500/40 text-red-300 rounded-lg text-sm flex items-center gap-2">
              <svg
                className="h-5 w-5 shrink-0"
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
            className="w-full py-3.5 bg-krio-primary hover:bg-krio-primary/80 text-white font-semibold rounded-lg shadow-md transition-all duration-300 transform hover:scale-[1.01]"
          >
            {log ? "Войти →" : "Зарегистрироваться"}
          </button>
          <div className="text-sm 2xl:text-base mt-2 text-gray-400">
            Нажимая на кнопку, вы соглашаетесь с{" "}
            <a className="text-krio-primary underline" href="/terms">
              Пользовательским соглашением
            </a>{" "}
            и{" "}
            <a className="text-krio-primary underline" href="/privacy">
              Политикой конфиденциальности
            </a>
          </div>
        </form>

        <div className="text-center text-sm text-krio-secondary">
          {log ? "Нет аккаунта?" : "Уже зарегистрированы?"}{" "}
          <button
            onClick={toggleForm}
            className="text-krio-primary hover:text-krio-secondary font-semibold underline underline-offset-2 transition-colors"
          >
            {log ? "Создать аккаунт" : "Войти в систему"}
          </button>
        </div>
      </div>
    </div>
  );
}
