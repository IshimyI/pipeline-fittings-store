import { NavLink } from "react-router-dom";
import React from "react";

export default function Footer() {
  return (
    <footer className="flex justify-between items-center p-4 bg-gray-900 text-white border-t border-gray-700 ">
      <div className="text-lg font-semibold">
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
    </footer>
  );
}
