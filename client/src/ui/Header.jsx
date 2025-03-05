import { NavLink } from "react-router-dom";
import React from "react";

export default function Header({ user, handleLogout }) {
  return (
    <header className="flex justify-between items-center p-4 bg-gray-900 text-white border-b border-gray-700">
      <div className="text-xl font-bold">
        <NavLink to="/" className="hover:text-blue-400">
          Криоарматура
        </NavLink>
      </div>
      <nav className="space-x-6 text-sm font-medium">
        <NavLink to="/about" className="hover:text-blue-400">
          О нас
        </NavLink>
        <NavLink to="/contacts" className="hover:text-blue-400">
          Контакты
        </NavLink>
        <NavLink to="/selector" className="hover:text-blue-400">
          Подбор арматуры высокого давления
        </NavLink>
      </nav>
      <div className="flex items-center space-x-4">
        <NavLink to="/basket" className="hover:text-blue-400">
          {user ? "Корзина" : "Гость"}
        </NavLink>
        {!user ? (
          <>
            <NavLink to="/login" className="hover:text-blue-400">
              Вход
            </NavLink>
          </>
        ) : (
          <button
            onClick={handleLogout}
            type="button"
            className="px-3 py-1 bg-red-600 hover:bg-red-700 rounded-lg text-white"
          >
            Выйти
          </button>
        )}
      </div>
    </header>
  );
}
