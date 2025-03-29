import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="bg-krio-background text-white pt-16 pb-8 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          <div className="space-y-6">
            <h3 className="text-2xl font-bold text-krio-secondary relative pb-4 after:absolute after:bottom-0 after:left-0 after:w-16 after:h-1 after:bg-krio-primary after:rounded-full">
              О компании
            </h3>
            <ul className="space-y-3">
              <li>
                <Link
                  to="/about"
                  className="flex items-center text-krio-primary hover:text-krio-secondary transition-all duration-300 group"
                >
                  <span className="w-2 h-2 bg-krio-primary rounded-full mr-3 group-hover:bg-krio-secondary transition-all duration-300"></span>
                  О нас
                </Link>
              </li>
              <li>
                <Link
                  to="/contacts"
                  className="flex items-center text-krio-primary hover:text-krio-secondary transition-all duration-300 group"
                >
                  <span className="w-2 h-2 bg-krio-primary rounded-full mr-3 group-hover:bg-krio-secondary transition-all duration-300"></span>
                  Контакты
                </Link>
              </li>
              <li>
                <Link
                  to="/selector"
                  className="flex items-center text-krio-primary hover:text-krio-secondary transition-all duration-300 group"
                >
                  <span className="w-2 h-2 bg-krio-primary rounded-full mr-3 group-hover:bg-krio-secondary transition-all duration-300"></span>
                  Подбор арматуры
                </Link>
              </li>
            </ul>
          </div>

          {/* Каталог */}
          <div className="space-y-6">
            <h3 className="text-2xl font-bold text-krio-secondary relative pb-4 after:absolute after:bottom-0 after:left-0 after:w-16 after:h-1 after:bg-krio-primary after:rounded-full">
              Каталог
            </h3>
            <ul className="space-y-3">
              <li>
                <Link
                  to="/category"
                  className="flex items-center text-krio-primary hover:text-krio-secondary transition-all duration-300 group"
                >
                  <span className="w-2 h-2 bg-krio-primary rounded-full mr-3 group-hover:bg-krio-secondary transition-all duration-300"></span>
                  Все товары
                </Link>
              </li>
              <li>
                <Link
                  to="/"
                  className="flex items-center text-krio-primary hover:text-krio-secondary transition-all duration-300 group"
                >
                  <span className="w-2 h-2 bg-krio-primary rounded-full mr-3 group-hover:bg-krio-secondary transition-all duration-300"></span>
                  Категории
                </Link>
              </li>
            </ul>
          </div>

          <div className="space-y-6">
            <h3 className="text-2xl font-bold text-krio-secondary relative pb-4 after:absolute after:bottom-0 after:left-0 after:w-16 after:h-1 after:bg-krio-primary after:rounded-full">
              Контакты
            </h3>
            <div className="space-y-4">
              <div className="flex items-start">
                <div className="flex-shrink-0 mt-1 mr-3 text-krio-primary">
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
                      d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                    />
                  </svg>
                </div>
                <div>
                  <p className="text-sm text-krio-primary">Телефон</p>
                  <a
                    href="tel:+74951234567"
                    className="text-krio-secondary hover:text-white transition-colors duration-300 text-lg font-medium"
                  >
                    +7 (995) 887-06-11
                  </a>
                </div>
              </div>
              <div className="flex items-start">
                <div className="flex-shrink-0 mt-1 mr-3 text-krio-primary">
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
                      d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    />
                  </svg>
                </div>
                <div>
                  <p className="text-sm text-krio-primary">Email</p>
                  <a
                    href="mailto:krioarmatura@yandex.ru"
                    className="text-krio-secondary hover:text-white transition-colors duration-300 text-lg font-medium"
                  >
                    krioarmatura@yandex.ru
                  </a>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <h3 className="text-2xl font-bold text-krio-secondary relative pb-4 after:absolute after:bottom-0 after:left-0 after:w-16 after:h-1 after:bg-krio-primary after:rounded-full">
              Мы в соцсетях
            </h3>
            <div className="flex space-x-4">
              <a
                href="https://t.me/krioarmatura"
                className="w-12 h-12 bg-krio-foreground rounded-full flex items-center justify-center text-white hover:bg-krio-primary transition-all duration-300 transform hover:-translate-y-1"
                aria-label="Telegram"
              >
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

        <div className="mt-16 pt-8 border-t border-krio-primary/20">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <p className="text-krio-primary flex flex-col justify-center text-center md:text-left">
              © {new Date().getFullYear()} Криоарматура. Все права защищены.
            </p>
            <div className="flex gap-5">
              <Link
                to="/terms"
                className="text-krio-primary flex flex-col justify-center text-center md:text-left hover:text-krio-secondary transition-colors duration-300"
              >
                Пользовательское соглашение
              </Link>
              <Link
                to="/privacy"
                className="text-krio-primary flex flex-col justify-center text-center md:text-left hover:text-krio-secondary transition-colors duration-300"
              >
                Политика конфиденциальности
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
