const Section = ({ title, children }) => (
  <section className="space-y-6">
    <h2 className="text-2xl font-bold text-center text-white glow-text">
      {title}
    </h2>
    {children}
  </section>
);

const ClientCard = ({ client }) => (
  <div className="group relative p-6 bg-white rounded-2xl shadow-2xl">
    <div className="flex flex-col items-center space-y-4">
      <div className="w-full flex justify-center">
        <img
          src={client.imgSrc}
          alt={client.alt}
          className="h-24 object-contain filter transition-all"
        />
      </div>
      <p className="text-gray-800 text-lg font-medium text-center">
        {client.name}
      </p>
    </div>
  </div>
);

export default function AboutPage() {
  const clients = [
    {
      name: "Роскосмос",
      imgSrc: "/uploads/companies/Roscosmos.png",
      alt: "Лого Роскосмоса",
    },
    {
      name: "Алмаз-Антей",
      imgSrc: "/uploads/companies/Almaz-Antey.jpg",
      alt: "Лого Алмаз-Антея",
    },
    {
      name: "Прогресс",
      imgSrc: "/uploads/companies/Progress.jpg",
      alt: "Лого Прогресса",
    },
    {
      name: "Криогенмаш",
      imgSrc: "/uploads/companies/Kriogenmash.jpg",
      alt: "Лого Криогенмаша",
    },
    {
      name: "Техгаз",
      imgSrc: "/uploads/companies/tech-gas.png",
      alt: "Лого Техгаза",
    },
    {
      name: "ООО ЗИД",
      imgSrc: "/uploads/companies/zid.png",
      alt: "Лого ООО ЗИД",
    },
    {
      name: "НИИМАШ",
      imgSrc: "/uploads/companies/niimash.jpg",
      alt: "Лого НИИМАШа",
    },
    { name: "СЭГЗ", imgSrc: "/uploads/companies/segs.png", alt: "Лого СЭГЗа" },
  ];

  return (
    <div className="flex items-center justify-center min-h-screen">
      <main className="w-full max-w-4xl 2xl:max-w-[1440px] 4k:max-w-[1800px] p-6 space-y-6 bg-krio-background rounded-lg shadow-lg border border-gray-700 my-8 mx-auto">
        <Section title="О компании">
          <div className="p-6 2xl:p-8 bg-krio-foreground rounded-2xl shadow-2xl space-y-6 2xl:space-y-8">
            <div className="space-y-4">
              <p className="text-gray-300 leading-relaxed">
                <strong className="text-krio-primary">
                  {" "}
                  &quot;Криоарматура&quot;
                </strong>{" "}
                уже более 20 лет успешно работает на рынке поставок
                высокотехнологичной стендовой, воздушной и криогенной арматуры.
                Мы гордимся тем, что являемся надежным партнером для ведущих
                предприятий в России, обеспечивая качественные решения, которые
                соответствуют самым строгим стандартам.
              </p>
              <div className="h-px bg-krio-primary/20 my-4" />{" "}
              <p className="text-gray-300 leading-relaxed">
                Мы с гордостью поставляем нашу продукцию в такие
                высокотехнологичные отрасли, как:
                <span className="text-krio-primary ml-2">
                  космическая промышленность
                </span>
                ,
                <span className="text-krio-primary mx-2">
                  нефтегазовый сектор
                </span>{" "}
                и<span className="text-krio-primary ml-2">машиностроение</span>,
                где особое внимание уделяется надежности и долговечности каждой
                детали.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 2xl:grid-cols-4 4k:grid-cols-5 gap-4 2xl:gap-6 pt-4">
              <div className="p-4 bg-krio-primary/5 rounded-xl border-2 border-krio-primary/20 transform transition ">
                <h3 className="text-krio-primary text-lg font-semibold mb-2">
                  Космос
                </h3>
                <p className="text-gray-300 text-sm">
                  Компоненты для ракетных систем и спутниковых комплексов
                </p>
              </div>

              <div className="p-4 bg-krio-primary/5 rounded-xl border-2 border-krio-primary/20 transform transition ">
                <h3 className="text-krio-primary text-lg font-semibold mb-2">
                  Нефтегаз
                </h3>
                <p className="text-gray-300 text-sm">
                  Арматура для криогенных хранилищ и СПГ-терминалов
                </p>
              </div>

              <div className="p-4 bg-krio-primary/5 rounded-xl border-2 border-krio-primary/20 transform transition ">
                <h3 className="text-krio-primary text-lg font-semibold mb-2">
                  Машины
                </h3>
                <p className="text-gray-300 text-sm">
                  Комплектующие для специальной техники и промышленных установок
                </p>
              </div>
            </div>
          </div>
        </Section>

        <Section title="Наши клиенты">
          <div className="p-6 2xl:p-8 bg-krio-foreground rounded-2xl shadow-2xl">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 4k:grid-cols-5 gap-6 2xl:gap-8">
              {clients.map((client, index) => (
                <ClientCard key={index} client={client} />
              ))}
            </div>
          </div>
        </Section>

        <Section title="Услуги">
          <div className="p-6 2xl:p-8 bg-krio-foreground rounded-2xl shadow-2xl space-y-6 2xl:space-y-8 border border-krio-primary/20">
            <div className="grid grid-cols-1 gap-6 2xl:gap-8">
              <div className="space-y-3">
                <p className="text-gray-300 leading-relaxed text-lg">
                  <strong className="text-krio-primary font-semibold">
                    &quot;Криоарматура&quot;
                  </strong>{" "}
                  не ограничивается лишь поставками арматуры. Мы предлагаем
                  своим клиентам{" "}
                  <span className="text-krio-primary underline underline-offset-4 decoration-dotted">
                    полный спектр услуг
                  </span>
                  , включая:
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-4 bg-krio-primary/5 rounded-xl border-2 border-krio-primary/20  transition-colors group">
                    <div className="flex items-start gap-3 mb-2">
                      <div className="w-8 h-8 bg-krio-primary/20 rounded-lg flex items-center justify-center">
                        <svg
                          className="w-4 h-4 text-krio-primary"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M13 10V3L4 14h7v7l9-11h-7z"
                          />
                        </svg>
                      </div>
                      <h3 className="text-krio-primary font-semibold text-lg">
                        Консалтинг
                      </h3>
                    </div>
                    <ul className="space-y-2 text-gray-300 text-sm pl-2">
                      <li className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 bg-krio-primary rounded-full" />
                        Подбор оборудования под задачи
                      </li>
                      <li className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 bg-krio-primary rounded-full" />
                        Технико-экономическое обоснование
                      </li>
                      <li className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 bg-krio-primary rounded-full" />
                        Аудит существующих систем
                      </li>
                    </ul>
                  </div>

                  <div className="p-4 bg-krio-primary/5 rounded-xl border-2 border-krio-primary/20  transition-colors group">
                    <div className="flex items-start gap-3 mb-2">
                      <div className="w-8 h-8 bg-krio-primary/20 rounded-lg flex items-center justify-center">
                        <svg
                          className="w-4 h-4 text-krio-primary"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z"
                          />
                        </svg>
                      </div>
                      <h3 className="text-krio-primary font-semibold text-lg">
                        Инжиниринг
                      </h3>
                    </div>
                    <ul className="space-y-2 text-gray-300 text-sm pl-2">
                      <li className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 bg-krio-primary rounded-full" />
                        3D-моделирование систем
                      </li>
                      <li className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 bg-krio-primary rounded-full" />
                        Рабочая документация
                      </li>
                      <li className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 bg-krio-primary rounded-full" />
                        Прочностные расчеты
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="p-4 bg-krio-background/50 rounded-lg border border-krio-primary/20">
                <p className="text-center text-krio-secondary italic">
                  «Каждое решение проходит 5-ступенчатый контроль качества»
                </p>
              </div>
            </div>
          </div>
        </Section>

        <Section title="Наша команда">
          <div className="p-6 2xl:p-8 bg-krio-foreground rounded-2xl shadow-2xl space-y-6 2xl:space-y-8 border border-krio-primary/20">
            <div className="grid grid-cols-1 md:grid-cols-2 2xl:grid-cols-3 4k:grid-cols-4 gap-6 2xl:gap-8">
              <div className="space-y-4">
                <div className="space-y-4">
                  <p className="text-gray-300 leading-relaxed text-lg">
                    В нашей команде работают{" "}
                    <strong className="text-krio-primary font-semibold">
                      высококвалифицированные специалисты
                    </strong>
                    , которые не только обладают глубокими знаниями в своей
                    области, но и постоянно совершенствуют свои навыки.
                  </p>

                  <div className="flex flex-col space-y-3">
                    <div className="p-3 bg-krio-background/50 rounded-lg border border-krio-primary/20 transition-colors">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-krio-primary/20 rounded-full flex items-center justify-center">
                          <span className="text-krio-primary">👨💻</span>
                        </div>
                        <div>
                          <h4 className="text-krio-primary font-medium">
                            Инженерный состав
                          </h4>
                          <div className="flex items-center gap-2">
                            <div className="text-gray-300 text-sm">
                              15+ лет опыта
                            </div>
                            <div className="w-12 h-1 bg-krio-primary/20 rounded-full">
                              <div className="w-10/12 h-full bg-krio-primary rounded-full" />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <p className="text-gray-300 leading-relaxed text-lg">
                  Мы гордимся тем, что наша команда всегда готова предложить{" "}
                  <span className="text-krio-primary font-semibold">
                    передовые решения
                  </span>{" "}
                  для самых сложных задач, сочетая традиционные подходы с
                  инновационными технологиями.
                </p>
                <div className="p-3 bg-krio-background/50 rounded-lg border border-krio-primary/20  transition-colors">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-krio-primary/20 rounded-full flex items-center justify-center">
                      <span className="text-krio-primary">📖</span>
                    </div>
                    <div>
                      <h4 className="text-krio-primary font-medium">
                        Обучение
                      </h4>
                      <div className="flex items-center gap-2">
                        <div className="text-gray-300 text-sm">
                          120+ часов/год
                        </div>
                        <div className="w-12 h-1 bg-krio-primary/20 rounded-full">
                          <div className="w-8/12 h-full bg-krio-primary rounded-full" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Section>
      </main>
    </div>
  );
}
