import React from "react";

const Section = ({ title, children }) => (
  <section className="space-y-6">
    <h2 className="text-2xl font-bold text-center text-gray-200">{title}</h2>
    {children}
  </section>
);

const ClientsGrid = () => {
  const clients = [
    {
      name: "Роскосмос",
      imgSrc: "/img/companies/Roscosmos.png",
      alt: "Лого Роскосмоса",
    },
    {
      name: "Алмаз-Антей",
      imgSrc: "/img/companies/Almaz-Antey.jpg",
      alt: "Лого Алмаз-Антея",
    },
    {
      name: "Прогресс",
      imgSrc: "/img/companies/Progress.jpg",
      alt: "Лого Прогресса",
    },
    {
      name: "Криогенмаш",
      imgSrc: "/img/companies/Kriogenmash.jpg",
      alt: "Лого Криогенмаша",
    },
    {
      name: "Техгаз",
      imgSrc: "/img/companies/tech-gas.png",
      alt: "Лого Техгаза",
    },
    { name: "ООО ЗИД", imgSrc: "/img/companies/zid.png", alt: "Лого ООО ЗИД" },
    {
      name: "НИИМАШ",
      imgSrc: "/img/companies/niimash.jpg",
      alt: "Лого НИИМАШа",
    },
    { name: "СЭГЗ", imgSrc: "/img/companies/segs.png", alt: "Лого СЭГЗа" },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {clients.map((client, index) => (
        <div
          key={index}
          className="flex flex-col items-center bg-white p-4 rounded-md"
        >
          <p className="text-gray-400">{client.name}</p>
          <img
            src={client.imgSrc}
            alt={client.alt}
            className="w-32 h-32 object-contain rounded-md"
          />
        </div>
      ))}
    </div>
  );
};

export default function AboutPage() {
  return (
    <div className="flex items-center text-white justify-center min-h-screen bg-[url('/img/BG-image.png')] bg-fixed bg-center bg-no-repeat bg-cover bg-opacity-10 p-8">
      <main className="w-full max-w-4xl p-8 space-y-6 bg-krio-background rounded-lg shadow-lg border border-gray-700 my-8">
        <Section title="Общее описание">
          <p className="text-gray-300">
            Компания <strong>“Криоарматура”</strong> уже более 20 лет успешно
            работает на рынке поставок высокотехнологичной стендовой, воздушной
            и криогенной арматуры. Мы гордимся тем, что являемся надежным
            партнером для ведущих предприятий в России, обеспечивая качественные
            решения, которые соответствуют самым строгим стандартам.
          </p>
          <p className="text-gray-300">
            Мы с гордостью поставляем нашу продукцию в такие высокотехнологичные
            отрасли, как космическая промышленность, нефтегазовый сектор и
            машиностроение, где особое внимание уделяется надежности и
            долговечности каждой детали.
          </p>
        </Section>

        <Section title="Наши клиенты">
          <p className="text-gray-300">
            Мы ценим и гордимся нашими партнерскими отношениями с крупнейшими
            корпорациями, для которых разработали и поставили специализированное
            оборудование. Наши клиенты — это надежные и успешные компании, на
            которых мы можем полагаться.
          </p>
          <ClientsGrid />
        </Section>

        <Section title="Услуги">
          <p className="text-gray-300">
            Компания “Криоарматура” не ограничивается лишь поставками арматуры.
            Мы предлагаем своим клиентам полный спектр услуг, включая
            консультации по выбору оборудования, проектирование, внедрение и
            послепродажную поддержку. Мы гарантируем, что каждое решение будет
            соответствовать самым высоким требованиям по надежности и
            эффективности.
          </p>
        </Section>

        <Section title="Наша команда">
          <p className="text-gray-300">
            В нашей команде работают высококвалифицированные специалисты,
            которые не только обладают глубокими знаниями в своей области, но и
            постоянно совершенствуют свои навыки, следя за новыми технологиями и
            тенденциями в отрасли. Мы гордимся тем, что наша команда всегда
            готова предложить передовые и надежные решения для самых сложных
            задач.
          </p>
        </Section>
      </main>
    </div>
  );
}
