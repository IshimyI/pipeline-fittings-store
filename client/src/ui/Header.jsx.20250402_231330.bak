import { useState } from "react";
import { NavLink } from "react-router-dom";

export default function Header({ user, handleLogout }) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);
  const closeMenu = () => setIsOpen(false);

  const commonLinkStyles = (isActive) =>
    `px-3 py-2 text-base font-medium transition-all duration-300 ${
      isActive
        ? "text-krio-secondary bg-krio-foreground/20"
        : "text-krio-primary hover:text-krio-secondary hover:bg-krio-foreground/10"
    }`;

  return (
    <header className="sticky top-0 z-50 backdrop-blur-md bg-krio-background/95 text-white border-b border-krio-primary/20 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center lg:hidden">
            <button
              onClick={toggleMenu}
              className="inline-flex items-center justify-center p-2 rounded-md text-krio-primary hover:text-krio-secondary focus:outline-none"
              aria-expanded={isOpen}
            >
              <span className="sr-only">
                {isOpen ? "Закрыть меню" : "Открыть меню"}
              </span>
              <svg
                className="h-8 w-8 relative"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path
                  className={`transition-transform duration-300 origin-center ${
                    isOpen
                      ? "rotate-45 translate-y-[2px] translate-x-[2px]"
                      : ""
                  }`}
                  d="M3 12H21"
                />
                <path
                  className={`transition-opacity duration-300 ${
                    isOpen ? "opacity-0" : "opacity-100"
                  }`}
                  d="M3 6H21"
                />
                <path
                  className={`transition-transform duration-300 origin-center ${
                    isOpen
                      ? "-rotate-45 translate-y-[-2px] translate-x-[-2px]"
                      : ""
                  }`}
                  d="M3 18H21"
                />
              </svg>
            </button>
          </div>

          <div className="flex-shrink-0 flex items-center lg:mr-8">
            <NavLink
              to="/"
              className="flex items-center space-x-2 group"
              onClick={() => setIsOpen(false)}
            >
              <div className="w-9 h-9 bg-krio-secondary rounded-lg flex items-center justify-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 text-krio-background"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
                  />
                </svg>
              </div>
              <span className="text-2xl font-bold text-krio-secondary">
                Криоарматура
              </span>
            </NavLink>
          </div>

          <nav className="hidden lg:flex flex-1 items-center justify-center space-x-4">
            <NavLink
              to="/"
              className={({ isActive }) =>
                `px-3 py-2 text-sm font-medium rounded-md transition-all duration-300 ${
                  isActive
                    ? "text-krio-secondary bg-krio-foreground/30"
                    : "text-krio-primary hover:text-krio-secondary hover:bg-krio-foreground/20"
                }`
              }
            >
              Каталог
            </NavLink>
            <NavLink
              to="/about"
              className={({ isActive }) =>
                `px-3 py-2 text-sm font-medium rounded-md transition-all duration-300 ${
                  isActive
                    ? "text-krio-secondary bg-krio-foreground/30"
                    : "text-krio-primary hover:text-krio-secondary hover:bg-krio-foreground/20"
                }`
              }
            >
              О нас
            </NavLink>
            <NavLink
              to="/contacts"
              className={({ isActive }) =>
                `px-3 py-2 text-sm font-medium rounded-md transition-all duration-300 ${
                  isActive
                    ? "text-krio-secondary bg-krio-foreground/30"
                    : "text-krio-primary hover:text-krio-secondary hover:bg-krio-foreground/20"
                }`
              }
            >
              Контакты
            </NavLink>
            <NavLink
              to="/selector"
              className={({ isActive }) =>
                `px-3 py-2 text-sm font-medium rounded-md transition-all duration-300 ${
                  isActive
                    ? "text-krio-secondary bg-krio-foreground/30"
                    : "text-krio-primary hover:text-krio-secondary hover:bg-krio-foreground/20"
                }`
              }
            >
              Подбор арматуры
            </NavLink>
          </nav>

          <div className="flex items-center space-x-2 lg:space-x-4">
            {user?.isAdmin && (
              <NavLink
                to="/admin"
                className={({ isActive }) =>
                  `hidden lg:flex items-center space-x-1 px-3 py-2 rounded-md text-sm font-medium transition-all duration-300 ${
                    isActive
                      ? "bg-krio-foreground/30 text-krio-secondary"
                      : "text-krio-primary hover:bg-krio-foreground/20 hover:text-krio-secondary"
                  }`
                }
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
                <span>Админ</span>
              </NavLink>
            )}

            <div className="flex items-center space-x-2">
              {!user?.isAdmin && (
                <NavLink
                  to="/basket"
                  className={({ isActive }) =>
                    `flex items-center space-x-1 px-3 py-2 rounded-md text-sm font-medium transition-all duration-300 ${
                      isActive
                        ? "bg-krio-foreground/30 text-krio-secondary"
                        : "text-krio-primary hover:bg-krio-foreground/20 hover:text-krio-secondary"
                    }`
                  }
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                    />
                  </svg>
                  <span className="hidden lg:inline">Корзина</span>
                </NavLink>
              )}

              {!user ? (
                <NavLink
                  to="/login"
                  className="flex items-center space-x-2 px-3 lg:px-4 py-2 bg-krio-primary text-krio-background text-sm font-medium rounded-md shadow-md hover:bg-krio-secondary hover:text-krio-foreground transition-all duration-300"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1"
                    />
                  </svg>
                  <span className="hidden lg:inline">Вход</span>
                </NavLink>
              ) : (
                <button
                  onClick={handleLogout}
                  className="flex items-center space-x-2 px-0 md:px-3 lg:px-4 py-2 bg-red-600 text-white text-sm font-medium rounded-md shadow-md hover:bg-red-700 transition-all duration-300"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                    />
                  </svg>
                  <span className="hidden lg:inline">Выйти</span>
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      <div
        className={`lg:hidden fixed inset-0 z-40 transition-all duration-300 ${
          isOpen ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
      >
        <div
          className="fixed inset-0 transition-opacity duration-300"
          onClick={closeMenu}
        />
        <div
          className={`relative z-50 bg-krio-background/99 border-t border-b border-krio-primary/20 transform transition-transform duration-300 ${
            isOpen ? "translate-y-15" : "-translate-y-full"
          }`}
        >
          <nav className="pt-2 pb-4">
            <NavLink
              to="/"
              onClick={() => setIsOpen(false)}
              className={({ isActive }) =>
                commonLinkStyles(isActive) + " block mx-4 my-1 rounded-md"
              }
            >
              Каталог
            </NavLink>
            <NavLink
              to="/about"
              onClick={() => setIsOpen(false)}
              className={({ isActive }) =>
                commonLinkStyles(isActive) + " block mx-4 my-1 rounded-md"
              }
            >
              О нас
            </NavLink>
            <NavLink
              to="/contacts"
              onClick={() => setIsOpen(false)}
              className={({ isActive }) =>
                commonLinkStyles(isActive) + " block mx-4 my-1 rounded-md"
              }
            >
              Контакты
            </NavLink>
            <NavLink
              to="/selector"
              onClick={() => setIsOpen(false)}
              className={({ isActive }) =>
                commonLinkStyles(isActive) + " block mx-4 my-1 rounded-md"
              }
            >
              Подбор арматуры
            </NavLink>
            {user?.isAdmin && (
              <NavLink
                to="/admin"
                onClick={() => setIsOpen(false)}
                className={({ isActive }) =>
                  commonLinkStyles(isActive) + " block mx-4 my-1 rounded-md"
                }
              >
                Админ-панель
              </NavLink>
            )}
            {!user?.isAdmin && (
              <NavLink
                to="/basket"
                onClick={() => setIsOpen(false)}
                className={({ isActive }) =>
                  commonLinkStyles(isActive) + " block mx-4 my-1 rounded-md"
                }
              >
                Корзина
              </NavLink>
            )}
          </nav>
        </div>
      </div>
    </header>
  );
}
