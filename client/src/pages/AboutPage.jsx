import React from "react";

export default function AboutPage() {
  return (
    <div className="flex items-center justify-center bg-gray-900">
      <main className="w-full max-w-4xl p-8 space-y-6 bg-gray-800 rounded-lg shadow-lg border border-gray-700 my-8">
        <section id="overview" className="space-y-6">
          <h2 className="text-2xl font-bold text-center text-gray-200">
            Общее описание
          </h2>
          <p className="text-gray-300">
            Компания “Криоарматура” уже более 20 лет успешно работает на рынке
            поставок стендовой, воздушной и криогенной арматуры, являясь
            надежным партнером для ведущих предприятий России.
          </p>
          <p className="text-gray-300">
            Наша продукция востребована в таких высокотехнологичных отраслях,
            как космическая промышленность, нефтегазовый сектор и
            машиностроение.
          </p>
        </section>

        <section id="clients" className="space-y-6">
          <h2 className="text-2xl font-bold text-center text-gray-200">
            Наши клиенты
          </h2>
          <p className="text-gray-300">
            Мы гордимся долгосрочным сотрудничеством с такими корпорациями, как:
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="flex flex-col items-center bg-white p-4 rounded-md">
              <p className="text-gray-400">Роскосмос</p>
              <img
                src="/img/companies/Roscosmos.png"
                alt="Лого Роскосмоса"
                className="w-32 h-32 object-cover rounded-md"
              />
            </div>
            <div className="flex flex-col items-center bg-white p-4 rounded-md">
              <p className="text-gray-400">Алмаз-Антей</p>
              <img
                src="/img/companies/Almaz-Antey.jpg"
                alt="Лого Алмаз-Антея"
                className="w-32 h-32 object-cover rounded-md"
              />
            </div>
            <div className="flex flex-col items-center bg-white p-4 rounded-md">
              <p className="text-gray-400">Прогресс</p>
              <img
                src="/img/companies/Progress.jpg"
                alt="Лого Прогресса"
                className="w-32 h-32 object-cover rounded-md"
              />
            </div>
            <div className="flex flex-col items-center bg-white p-4 rounded-md">
              <p className="text-gray-400">Криогенмаш</p>
              <img
                src="/img/companies/Kriogenmash.jpg"
                alt="Лого Криогенмаша"
                className="w-32 h-32 object-cover rounded-md"
              />
            </div>
            <div className="flex flex-col items-center bg-white p-4 rounded-md">
              <p className="text-gray-400">Техгаз</p>
              <img
                src="/img/companies/tech-gas.png"
                alt="Лого Техгаза"
                className="w-32 h-32 object-cover rounded-md"
              />
            </div>
            <div className="flex flex-col items-center bg-white p-4 rounded-md">
              <p className="text-gray-400">ООО ЗИД</p>
              <img
                src="/img/companies/zid.png"
                alt="Лого ООО ЗИД"
                className="w-32 h-32 object-cover rounded-md"
              />
            </div>
            <div className="flex flex-col items-center bg-white p-4 rounded-md">
              <p className="text-gray-400">НИИМАШ</p>
              <img
                src="/img/companies/niimash.jpg"
                alt="Лого НИИМАШа"
                className="w-32 h-32 object-cover rounded-md"
              />
            </div>
            <div className="flex flex-col items-center bg-white p-4 rounded-md">
              <p className="text-gray-400">СЭГЗ</p>
              <img
                src="/img/companies/segs.png"
                alt="Лого СЭГЗа"
                className="w-32 h-32 object-cover rounded-md"
              />
            </div>
          </div>
        </section>

        <section id="services" className="space-y-6">
          <h2 className="text-2xl font-bold text-center text-gray-200">
            Услуги
          </h2>
          <p className="text-gray-300">
            Кроме поставок, “Криоарматура” предоставляет полный комплекс услуг,
            включая консультации по выбору оборудования, что позволяет нашим
            клиентам быть уверенными в надежности и долговечности поставленных
            решений.
          </p>
        </section>

        <section id="team" className="space-y-6">
          <h2 className="text-2xl font-bold text-center text-gray-200">
            Наша команда
          </h2>
          <p className="text-gray-300">
            Наша команда объединяет высококвалифицированных специалистов,
            которые постоянно совершенствуют свои знания и следят за новейшими
            тенденциями в отрасли. Мы стремимся не только удовлетворять
            потребности клиентов, но и превосходить их ожидания, предлагая
            передовые и надежные решения для самых сложных задач.
          </p>
        </section>

        <section id="mission" className="space-y-6">
          <h2 className="text-2xl font-bold text-center text-gray-200">
            Наша миссия
          </h2>
          <p className="text-gray-300">
            “Криоарматура” — это ваш партнер на пути к инновациям и
            стабильности.
          </p>
        </section>
      </main>
    </div>
  );
}
