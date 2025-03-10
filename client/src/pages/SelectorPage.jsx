import React from "react";

export default function SelectorPage() {
  return (
    <div className="flex items-center text-white justify-center min-h-screen bg-[url('/img/BG-image.png')] bg-fixed bg-center bg-no-repeat bg-cover bg-opacity-10 p-8">
      <main className="w-full max-w-4xl p-8 space-y-6 bg-krio-background rounded-lg shadow-lg border border-gray-700 my-8">
        <section className="space-y-6">
          <h1 className="text-2xl font-bold text-center text-gray-200">
            Общее описание
          </h1>
          <p className="text-gray-300">
            Трубопроводная арматура используется при монтаже и обслуживании
            систем водо- и газоснабжения, отопления, а также для перекачки
            жидкостей, газов, вязких и порошковых веществ. Ее основная задача —
            регулирование потока, закрытие, смешивание или защита оборудования
            при аварийных ситуациях.
          </p>
        </section>

        <section className="space-y-6">
          <h1 className="text-2xl font-bold text-center text-gray-200">
            Как выбрать трубопроводную арматуру
          </h1>
          <p className="text-gray-300">
            Выбор трубопроводной арматуры зависит от нескольких ключевых
            факторов:
          </p>
          <ul className="list-disc list-inside space-y-2 text-gray-400">
            <li>
              <strong>Назначение:</strong> арматура должна выполнять функции
              открытия/закрытия потока или регулирования, смешивания.
            </li>
            <li>
              <strong>Условия эксплуатации:</strong> оценка окружающей среды
              (температура, влажность) и характеристики рабочей среды
              (агрессивная, коррозионная и т.д.).
            </li>
            <li>
              <strong>Параметры сети:</strong> давление, расход, температура,
              влажность.
            </li>
            <li>
              <strong>Присоединительные размеры:</strong> проверка соответствия
              диаметра трубопровода стандартам.
            </li>
            <li>
              <strong>Способ установки:</strong> выбор между резьбовыми,
              фланцевыми или сварными соединениями.
            </li>
          </ul>
        </section>

        <section className="space-y-6">
          <h1 className="text-2xl font-bold text-center text-gray-200">
            Базовые параметры
          </h1>
          <ul className="list-disc list-inside space-y-2 text-gray-400">
            <li>
              <strong>Условный проход (DN/Ду):</strong> внутренний диаметр,
              определяющий пропускную способность.
            </li>
            <li>
              <strong>Рабочее давление:</strong> максимальное давление, при
              котором устройство сохраняет характеристики.
            </li>
            <li>
              <strong>Материалы:</strong> чугун, латунь, нержавеющая сталь —
              выбор материала зависит от рабочей среды.
            </li>
          </ul>
        </section>

        <section className="space-y-6">
          <h1 className="text-2xl font-bold text-center text-gray-200">
            Виды арматуры
          </h1>
          <ul className="list-disc list-inside space-y-2 text-gray-400">
            <li>
              <strong>Запорная:</strong> для полного или частичного перекрытия
              потока.
            </li>
            <li>
              <strong>Предохранительная:</strong> для защиты оборудования от
              избыточного давления.
            </li>
            <li>
              <strong>Регулирующая:</strong> для управления потоком жидкости или
              газа.
            </li>
          </ul>
        </section>
      </main>
    </div>
  );
}
