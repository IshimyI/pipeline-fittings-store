import { NavLink } from "react-router";

export default function Header({ user, handleLogout }) {
  return (
    <header className="sticky top-0 z-50 backdrop-blur-md bg-krio-background text-white border-b border-gray-700 shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex-shrink-0">
            <NavLink
              to="/"
              className="text-2xl font-bold text-krio-primary hover:text-krio-secondary transition-colors duration-300"
            >
              Криоарматура
            </NavLink>
          </div>
          <nav className="hidden md:flex space-x-8">
            <NavLink
              to="/"
              className={({ isActive }) =>
                `${
                  isActive
                    ? "text-krio-secondary border-b-2 border-krio-secondary"
                    : "text-white"
                } hover:text-krio-secondary hover:border-b-2 hover:border-krio-secondary transition-colors duration-300 text-sm font-medium`
              }
            >
              Каталог
            </NavLink>
            <NavLink
              to="/about"
              className={({ isActive }) =>
                `${
                  isActive
                    ? "text-krio-secondary border-b-2 border-krio-secondary"
                    : "text-white"
                } hover:text-krio-secondary hover:border-b-2 hover:border-krio-secondary transition-colors duration-300 text-sm font-medium`
              }
            >
              О нас
            </NavLink>
            <NavLink
              to="/contacts"
              className={({ isActive }) =>
                `${
                  isActive
                    ? "text-krio-secondary border-b-2 border-krio-secondary"
                    : "text-white"
                } hover:text-krio-secondary hover:border-b-2 hover:border-krio-secondary transition-colors duration-300 text-sm font-medium`
              }
            >
              Контакты
            </NavLink>
            <NavLink
              to="/selector"
              className={({ isActive }) =>
                `${
                  isActive
                    ? "text-krio-secondary border-b-2 border-krio-secondary"
                    : "text-white"
                } hover:text-krio-secondary hover:border-b-2 hover:border-krio-secondary transition-colors duration-300 text-sm font-medium`
              }
            >
              Подбор арматуры
            </NavLink>
          </nav>
          <div className="flex items-center space-x-6">
            {user?.isAdmin && (
              <NavLink
                to="/admin"
                className={({ isActive }) =>
                  `${
                    isActive
                      ? "text-krio-secondary border-b-2 border-krio-secondary"
                      : "text-white"
                  } hover:text-krio-secondary hover:border-b-2 hover:border-krio-secondary transition-colors duration-300`
                }
              >
                Панель администратора
              </NavLink>
            )}
            {!user?.isAdmin && (
              <NavLink
                to="/basket"
                className={({ isActive }) =>
                  `${
                    isActive
                      ? "text-krio-secondary border-b-2 border-krio-secondary"
                      : "text-white"
                  } hover:text-krio-secondary hover:border-b-2 hover:border-krio-secondary transition-colors duration-300`
                }
              >
                Корзина
              </NavLink>
            )}
            {!user ? (
              <NavLink
                to="/login"
                className="px-4 py-2 text-sm font-medium text-white bg-krio-primary rounded-md hover:bg-krio-secondary transition-colors duration-300"
              >
                Вход
              </NavLink>
            ) : (
              <button
                onClick={handleLogout}
                type="button"
                className="px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-md hover:bg-red-700 transition-colors duration-300"
              >
                Выйти
              </button>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
