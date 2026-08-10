const Section = ({ title, children }) => (
  <section className="space-y-6">
    <div className="text-center">
      <h2 className="text-2xl md:text-3xl font-bold text-white uppercase tracking-[0.15em]">
        {title}
      </h2>
      <div className="w-16 h-0.5 bg-krio-primary mx-auto mt-3" />
    </div>
    {children}
  </section>
);

const cardClass =
  "p-6 2xl:p-8 4k:p-10 bg-krio-foreground rounded-2xl border-2 border-krio-primary/20 hover:border-krio-primary/50 hover:-translate-y-0.5 transition-all duration-300";

const CardGrid = ({ items, columns = "md:grid-cols-2 2xl:grid-cols-3 4k:grid-cols-4" }) => (
  <div className={`grid grid-cols-1 ${columns} gap-6 2xl:gap-8`}>
    {items.map((item, index) => (
      <div key={index} className={cardClass}>
        <div className="flex items-start mb-4">
          <div className="w-12 h-12 bg-krio-primary/10 rounded-xl flex items-center justify-center mr-4 shrink-0">
            <span className="text-lg font-mono text-krio-primary">
              {String(index + 1).padStart(2, "0")}
            </span>
          </div>
          <h3 className="text-xl font-semibold text-white mt-2">
            {item.label}
          </h3>
        </div>
        <p className="text-gray-300/90 pl-16 -mt-2 text-base leading-relaxed">
          {item.description}
        </p>
      </div>
    ))}
  </div>
);

const DropletIcon = () => (
  <svg
    className="w-7 h-7 2xl:w-8 2xl:h-8"
    fill="none"
    stroke="currentColor"
    strokeWidth={1.8}
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M12 2.69l5.66 5.66a8 8 0 11-11.31 0z"
    />
  </svg>
);

const FlaskIcon = () => (
  <svg
    className="w-7 h-7 2xl:w-8 2xl:h-8"
    fill="none"
    stroke="currentColor"
    strokeWidth={1.5}
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M9.75 3.104v5.714a2.25 2.25 0 01-.659 1.591L5 14.5m4.75-11.396c.251.023.501.05.75.082m0 0a24.301 24.301 0 014.5 0m0 0v5.714c0 .597.237 1.17.659 1.591L19.8 15.3m-5.55-12.196c.251.023.501.05.75.082M19.8 15.3l-1.57.393A9.065 9.065 0 0112 15a9.065 9.065 0 00-6.23-1.615L5 14.5m14.8.8l1.402 1.401c1.232 1.232.65 3.318-1.067 3.611A48.309 48.309 0 0112 21c-2.773 0-5.491-.235-8.135-.687-1.718-.293-2.3-2.379-1.067-3.61L5 14.5"
    />
  </svg>
);

const LightningIcon = () => (
  <svg
    className="w-7 h-7 2xl:w-8 2xl:h-8"
    fill="none"
    stroke="currentColor"
    strokeWidth={1.8}
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z"
    />
  </svg>
);

const FanIcon = () => (
  <svg
    className="w-7 h-7 2xl:w-8 2xl:h-8"
    fill="none"
    stroke="currentColor"
    strokeWidth={1.8}
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M12 12c-3-3-3-7 0-9 1 3 1 6 0 9zm0 0c3-3 7-3 9 0-3 1-6 1-9 0zm0 0c3 3 3 7 0 9-1-3-1-6 0-9zm0 0c-3 3-7 3-9 0 3-1 6-1 9 0z"
    />
    <circle cx="12" cy="12" r="1.2" fill="currentColor" stroke="none" />
  </svg>
);

const SelectorPage = () => {
  const classificationItems = [
    {
      label: "Запорная арматура",
      description:
        "Предназначена для полного или частичного перекрытия потока рабочей среды.",
    },
    {
      label: "Регулирующая арматура",
      description:
        "Обеспечивает точное управление расходом и давлением рабочей среды.",
    },
    {
      label: "Предохранительная арматура",
      description:
        "Защищает системы от избыточного давления, предотвращая аварийные ситуации.",
    },
    {
      label: "Обратная арматура",
      description:
        "Предотвращает обратный поток рабочей среды, обеспечивая однонаправленное движение.",
    },
  ];

  const parametersItems = [
    {
      label: "Диаметр условного прохода (DN)",
      description:
        "Внутренний диаметр арматуры, соответствующий диаметру трубопровода и определяющий пропускную способность.",
    },
    {
      label: "Рабочее давление",
      description:
        "Максимальное давление, при котором арматура обеспечивает надежную работу без утечек и повреждений.",
    },
    {
      label: "Температурный диапазон",
      description:
        "Диапазон температур, в котором арматура сохраняет свои эксплуатационные характеристики.",
    },
    {
      label: "Материалы изготовления",
      description:
        "Выбор материалов (например, нержавеющая сталь, титановые сплавы) зависит от условий эксплуатации и агрессивности рабочей среды.",
    },
    {
      label: "Тип привода",
      description:
        "Механизм, обеспечивающий открытие и закрытие арматуры. Может быть ручным, электрическим, пневматическим или гидравлическим.",
    },
    {
      label: "Класс герметичности",
      description:
        "Способность арматуры обеспечивать герметичность при заданных условиях эксплуатации.",
    },
    {
      label: "Сопротивление гидравлическому удару",
      description:
        "Способность арматуры выдерживать динамические нагрузки, возникающие при быстром изменении скорости потока.",
    },
  ];

  const applicationsItems = [
    {
      label: "Нефтегазовая промышленность",
      description:
        "Управление добычей, транспортировкой и переработкой нефти и газа.",
      Icon: DropletIcon,
    },
    {
      label: "Химическая промышленность",
      description:
        "Контроль процессов синтеза, переработки и транспортировки химических веществ.",
      Icon: FlaskIcon,
    },
    {
      label: "Энергетика",
      description:
        "Регулирование потоков рабочей среды в энергетических установках и системах.",
      Icon: LightningIcon,
    },
    {
      label: "Промышленная вентиляция",
      description:
        "Контроль воздушных потоков и давления в системах вентиляции и кондиционирования.",
      Icon: FanIcon,
    },
  ];

  return (
    <div className="flex items-center justify-center min-h-screen">
      <main
        className="w-full max-w-[90%] md:max-w-[60%] lg:max-w-[75%] p-6 space-y-8
                    bg-krio-background rounded-lg shadow-lg border border-gray-700 my-8 mx-auto"
      >
        <Section title="Арматура высокого давления">
          <div className="p-8 2xl:p-10 4k:p-12 bg-krio-foreground rounded-2xl border-2 border-krio-primary/20 relative overflow-hidden">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-krio-primary/5 to-transparent opacity-40" />
            <p className="text-gray-300/90 text-lg 2xl:text-xl 4k:text-2xl leading-relaxed text-center relative">
              <span className="text-krio-primary font-medium 2xl:text-2xl 4k:text-3xl">
                Инновационные решения
              </span>{" "}
              для точного контроля сложных систем. Соответствие международным
              стандартам качества и безопасности.
            </p>
          </div>
        </Section>

        <Section title="Классификация">
          <CardGrid items={classificationItems} />
        </Section>

        <Section title="Технические параметры">
          <div className="grid grid-cols-1 md:grid-cols-2 2xl:grid-cols-3 4k:grid-cols-4 gap-6 2xl:gap-8 4k:gap-10">
            {parametersItems.map((item, index) => (
              <div key={index} className={`${cardClass} relative`}>
                <div className="flex items-center mb-4">
                  <div className="w-2 h-2 bg-krio-primary rounded-full mr-4 shrink-0" />
                  <h3 className="text-lg font-semibold text-white">
                    {item.label}
                  </h3>
                </div>
                <p className="text-gray-300/90 pl-6 text-base leading-relaxed">
                  {item.description}
                </p>
                <div className="absolute bottom-4 right-4 text-4xl text-krio-primary/10 select-none">
                  {String.fromCharCode(0x2460 + index)}
                </div>
              </div>
            ))}
          </div>
        </Section>

        <Section title="Отрасли применения">
          <div className="grid grid-cols-1 md:grid-cols-2 2xl:grid-cols-3 4k:grid-cols-4 gap-6 2xl:gap-8 4k:gap-10">
            {applicationsItems.map(({ label, description, Icon }, index) => (
              <div key={index} className={cardClass}>
                <div className="flex items-start gap-5 2xl:gap-6">
                  <div className="w-14 h-14 2xl:w-16 2xl:h-16 bg-krio-primary/10 rounded-2xl flex items-center justify-center shrink-0 text-krio-primary">
                    <Icon />
                  </div>
                  <div>
                    <h3 className="text-lg 2xl:text-xl font-semibold text-white mb-2">
                      {label}
                    </h3>
                    <p className="text-gray-300/90 text-base leading-relaxed">
                      {description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Section>
      </main>
    </div>
  );
};

export default SelectorPage;
