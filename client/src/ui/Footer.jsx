import React from "react";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="bg-krio-background text-white py-12 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          {/* О компании */}
          <div>
            <h3 className="text-xl font-semibold text-krio-primary mb-6">
              О компании
            </h3>
            <ul className="space-y-4">
              <li>
                <Link
                  to="/about"
                  className="text-gray-400 hover:text-krio-secondary transition-colors duration-300"
                >
                  О нас
                </Link>
              </li>
              <li>
                <Link
                  to="/contacts"
                  className="text-gray-400 hover:text-krio-secondary transition-colors duration-300"
                >
                  Контакты
                </Link>
              </li>
            </ul>
          </div>

          {/* Каталог */}
          <div>
            <h3 className="text-xl font-semibold text-krio-primary mb-6">
              Каталог
            </h3>
            <ul className="space-y-4">
              <li>
                <Link
                  to="/category"
                  className="text-gray-400 hover:text-krio-secondary transition-colors duration-300"
                >
                  Все товары
                </Link>
              </li>
              <li>
                <Link
                  to="/"
                  className="text-gray-400 hover:text-krio-secondary transition-colors duration-300"
                >
                  Категории
                </Link>
              </li>
            </ul>
          </div>

          {/* Контакты */}
          <div>
            <h3 className="text-xl font-semibold text-krio-primary mb-6">
              Контакты
            </h3>
            <ul className="space-y-4">
              <li className="text-gray-400">
                <span className="block">Телефон:</span>
                <a
                  href="tel:+74951234567"
                  className="hover:text-krio-secondary transition-colors duration-300"
                >
                  +7 (995) 887 06 11
                </a>
              </li>
              <li className="text-gray-400">
                <span className="block">Email:</span>
                <a
                  href="mailto:krioarmatura@yandex.ru"
                  className="hover:text-krio-secondary transition-colors duration-300"
                >
                  krioarmatura@yandex.ru
                </a>
              </li>
            </ul>
          </div>

          {/* Социальные сети */}
          <div>
            <h3 className="text-xl font-semibold text-krio-primary mb-6">
              Мы в соцсетях
            </h3>
            <div className="flex space-x-6">
              <a
                href="#"
                className="text-gray-400 hover:text-krio-secondary transition-colors duration-300"
              >
                <span className="sr-only">VK</span>
                <svg
                  className="h-6 w-6"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M15.684 0H8.316C1.592 0 0 1.592 0 8.316v7.368C0 22.408 1.592 24 8.316 24h7.368C22.408 24 24 22.408 24 15.684V8.316C24 1.592 22.408 0 15.684 0zm3.692 17h-1.372c-.538 0-.697-.447-1.668-1.418C15.377 14.623 14.932 14 14.5 14c-.388 0-.482.118-.482.75v1.583c0 .422-.137.667-1.25.667-1.846 0-3.89-1.118-5.33-3.193C5.93 11.71 5.446 9.807 5.446 9.35c0-.24.087-.458.534-.458h1.372c.402 0 .534.192.683.645.683 2.016 1.837 3.785 2.307 3.785.175 0 .254-.08.254-.53V10.89c-.05-1.063-.577-1.153-.577-1.532 0-.18.147-.367.38-.367h2.157c.29 0 .4.16.4.53v2.88c0 .31.137.417.24.417.176 0 .32-.107.643-.43 1.003-1.122 1.718-2.845 1.718-2.845.096-.21.308-.405.587-.405h1.37c.418 0 .515.213.418.505-.175.818-1.871 3.223-1.871 3.223-.154.25-.22.36 0 .643.145.21.5.643.757.972.47.595.83 1.095.934 1.44.11.346-.08.526-.477.526z" />
                </svg>
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-krio-secondary transition-colors duration-300"
              >
                <span className="sr-only">Telegram</span>
                <svg
                  className="h-6 w-6"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.894 8.221l-1.97 9.28c-.145.658-.537.818-1.084.508l-3-2.21-1.446 1.394c-.14.18-.357.223-.548.223l.188-2.623 4.823-4.351c.192-.18-.045-.277-.297-.097l-5.965 3.759-2.564-.801c-.657-.206-.675-.657.147-.976l10.018-3.863c.547-.206 1.025.128.847.766z" />
                </svg>
              </a>
            </div>
          </div>
        </div>
        <div className="mt-12 pt-8 border-t border-gray-700">
          <p className="text-center text-gray-400">
            © {new Date().getFullYear()} Криоарматура. Все права защищены.
          </p>
        </div>
      </div>
    </footer>
  );
}
