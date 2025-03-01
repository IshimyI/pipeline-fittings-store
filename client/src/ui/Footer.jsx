import { NavLink } from "react-router-dom";
import React from "react";

export default function Footer() {
  return (
    <footer>
      <div>
        <div>
          <NavLink to="/">Криоарматура</NavLink>
        </div>
        <nav>
          <NavLink to="/about">О нас</NavLink>
          <NavLink to="/contacts">Контакты</NavLink>
          <NavLink to="/selector">Подбор арматуры высокого давления</NavLink>
        </nav>
      </div>
    </footer>
  );
}
