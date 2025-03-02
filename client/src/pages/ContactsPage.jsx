import React from "react";

export default function ContactsPage({ user }) {
  return (
    <div className="flex items-center justify-center bg-gray-900 text-white">
      <main className="w-full max-w-4xl p-8 space-y-6 bg-gray-800 rounded-lg shadow-lg border border-gray-700 my-8">
        <section id="contacts" className="space-y-6">
          <div>
            <h2 className="text-2xl font-bold text-center text-gray-200">
              Свяжитесь с нами
            </h2>
          </div>
          <p className="text-gray-300 text-center">
            Мы всегда рады помочь! Вы можете связаться с нами через:
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-4 bg-gray-700 rounded-lg shadow-md">
              <h3 className="text-lg font-semibold text-gray-200">Адрес</h3>
              <p className="text-gray-400">Москва, ул. Инновационная, д. 10</p>
              <div id="map" className="mt-4">
                <iframe
                  src="https://yandex.ru/map-widget/v1/?from=mapframe&ll=37.707774%2C55.816179&mode=search&oid=1011075765&ol=biz&z=17.85"
                  width="100%"
                  height="300"
                  className="rounded-lg border border-gray-600"
                  allowFullScreen
                ></iframe>
              </div>
            </div>

            <div className="p-4 bg-gray-700 rounded-lg shadow-md">
              <h3 className="text-lg font-semibold text-gray-200">Телефон</h3>
              <p className="text-gray-400">
                <a
                  href="tel:+74951234567"
                  className="text-blue-400 hover:underline"
                >
                  +7 (495) 123-45-67
                </a>
              </p>
            </div>

            <div className="p-4 bg-gray-700 rounded-lg shadow-md">
              <h3 className="text-lg font-semibold text-gray-200">Email</h3>
              <p className="text-gray-400">
                <a
                  href="mailto:info@krioarmatura.ru"
                  className="text-blue-400 hover:underline"
                >
                  info@krioarmatura.ru
                </a>
              </p>
            </div>

            <div className="p-4 bg-gray-700 rounded-lg shadow-md">
              <h3 className="text-lg font-semibold text-gray-200">
                Социальные сети
              </h3>
              <p className="text-gray-400">
                <a href="#" className="text-blue-400 hover:underline">
                  ВКонтакте
                </a>{" "}
                |
                <a href="#" className="text-blue-400 hover:underline">
                  {" "}
                  Facebook
                </a>{" "}
                |
                <a href="#" className="text-blue-400 hover:underline">
                  {" "}
                  Instagram
                </a>
              </p>
            </div>
          </div>

          <div className="p-6 bg-gray-700 rounded-lg shadow-md">
            <h3 className="text-lg font-semibold text-gray-200 text-center">
              Обратная связь
            </h3>
            <form id="feedbackForm" className="space-y-4">
              <div>
                <input
                  type="text"
                  id="name"
                  name="name"
                  placeholder="Ваше имя"
                  value={user.name}
                  required
                  className="w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
              </div>
              <div>
                <input
                  type="email"
                  id="email"
                  name="email"
                  placeholder="Ваш email"
                  value={user.email}
                  required
                  className="w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
              </div>
              <div>
                <textarea
                  id="message"
                  name="message"
                  placeholder="Ваше сообщение"
                  rows="5"
                  required
                  className="w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                ></textarea>
              </div>
              <button
                type="submit"
                className="w-full py-2 font-semibold text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:outline-none"
              >
                Отправить
              </button>
            </form>
          </div>
        </section>
      </main>
    </div>
  );
}
