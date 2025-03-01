import { NavLink } from "react-router-dom";
import React from "react";

export default function Header({ user, handleLogout }) {
  return (
    <header>
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
      <div>
        <NavLink to="/profile">{user ? user.name : "Гость"}</NavLink>
        <span> Тут пробел </span>
        {!user && <NavLink to="/signup">Регистрация</NavLink>}
        <span> Тут пробел </span>
        {!user && <NavLink to="/login">Вход</NavLink>}
        {user && (
          <>
            <span> </span>
            <button onClick={handleLogout} type="button">
              Выйти
            </button>
          </>
        )}
      </div>
    </header>
  );
}
