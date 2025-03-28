const Section = ({ title, children }) => (
  <section className="space-y-8">
    <h2 className="text-2xl font-bold text-center text-white">
      <span className="relative z-10 px-4 bg-krio-background">
        <span className="text-white bg-clip-text ">{title}</span>
      </span>
      <div className="absolute bottom-0 left-1/2 w-4/5 h-[2px] bg-gradient-to-r from-transparent via-krio-primary/80 to-transparent transform -translate-x-1/2 group-hover:via-krio-primary transition-all" />
    </h2>
    {children}
  </section>
);

const CardGrid = ({ items, columns = "md:grid-cols-2 lg:grid-cols-2" }) => (
  <div className={`grid grid-cols-1 ${columns} gap-6`}>
    {items.map((item, index) => (
      <div
        key={index}
        className="group p-8 bg-krio-foreground rounded-2xl border-2 border-krio-primary/20 "
      >
        <div className="absolute inset-0 bg-gradient-to-br from-krio-primary/5 to-transparent opacity-0 transition-opacity" />
        <div className="flex items-start mb-4 relative z-10">
          <div className="w-12 h-12 bg-krio-primary/10 rounded-xl flex items-center justify-center mr-4 transform transition-transform">
            <span className="text-2xl text-white  bg-clip-text">
              {index + 1}
            </span>
          </div>
          <h3 className="text-xl font-semibold text-white drop-shadow-sm">
            {item.label}
          </h3>
        </div>
        <p className="text-gray-300/90 pl-2 text-lg leading-relaxed relative z-10">
          {item.description}
        </p>
      </div>
    ))}
  </div>
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
    },
    {
      label: "Химическая промышленность",
      description:
        "Контроль процессов синтеза, переработки и транспортировки химических веществ.",
    },
    {
      label: "Энергетика",
      description:
        "Регулирование потоков рабочей среды в энергетических установках и системах.",
    },
    {
      label: "Промышленная вентиляция",
      description:
        "Контроль воздушных потоков и давления в системах вентиляции и кондиционирования.",
    },
  ];

  return (
    <div className="flex items-center justify-center min-h-screen">
      <main className="w-full max-w-4xl 2xl:max-w-[1440px] 4k:max-w-[1800px] p-6 2xl:p-8 4k:p-12 space-y-8 2xl:space-y-12 4k:space-y-16 bg-krio-background rounded-xl shadow-2xl border-2 border-krio-primary/20 my-8 hover:shadow-krio-primary/10 transition-shadow duration-300">
        <Section title="Арматура высокого давления">
          <div className="p-8 2xl:p-10 4k:p-12 bg-krio-foreground rounded-2xl border-2 border-krio-primary/20 relative overflow-hidden">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-krio-primary/5 to-transparent opacity-40" />
            <p className="text-gray-300/90 text-lg 2xl:text-xl 4k:text-2xl leading-relaxed text-center relative z-10 transform group-hover:scale-[1.01] transition-transform">
              <span className="text-krio-primary font-medium 2xl:text-2xl 4k:text-3xl">
                Инновационные решения
              </span>{" "}
              для точного контроля сложных систем. Соответствие международным
              стандартам качества и безопасности.
            </p>
          </div>
        </Section>

        <Section title="Классификация">
          <CardGrid
            items={classificationItems}
            className="2xl:grid-cols-3 4k:grid-cols-4"
          />
        </Section>

        <Section title="Технические параметры">
          <div className="grid grid-cols-1 md:grid-cols-2 2xl:grid-cols-3 4k:grid-cols-4 gap-6 2xl:gap-8 4k:gap-10">
            {parametersItems.map((item, index) => (
              <div
                key={index}
                className="p-6 2xl:p-8 4k:p-10 bg-krio-foreground rounded-2xl border-2 border-krio-primary/20 hover:border-krio-primary/40 transition-all group relative hover:shadow-[0_8px_30px_rgba(99,102,241,0.1)]"
              >
                <div className="flex items-center mb-4">
                  <div className="w-3 h-3 text-white rounded-full mr-4 animate-pulse" />
                  <h3 className="text-lg font-semibold text-white drop-shadow-sm">
                    {item.label}
                  </h3>
                </div>
                <p className="text-gray-300/90 pl-7 text-base leading-relaxed">
                  {item.description}
                </p>
                <div className="absolute bottom-4 right-4 opacity-20 group-hover:opacity-40 transition-opacity text-4xl text-krio-primary/20">
                  {String.fromCharCode(0x2460 + index)}
                </div>
              </div>
            ))}
          </div>
        </Section>

        <Section title="Отрасли применения">
          <div className="grid grid-cols-1 md:grid-cols-2 2xl:grid-cols-3 4k:grid-cols-4 gap-6 2xl:gap-8 4k:gap-10">
            {applicationsItems.map((item, index) => (
              <div
                key={index}
                className="p-6 2xl:p-8 4k:p-10 bg-krio-foreground rounded-2xl border-2 border-krio-primary/20 hover:border-krio-primary/40 transition-all group relative overflow-hidden"
              >
                <div className="flex items-start gap-6 2xl:gap-8">
                  <div className="w-16 h-16 2xl:w-20 2xl:h-20 bg-krio-primary/10 rounded-2xl flex items-center justify-center shrink-0 transform group-hover:scale-110 transition-transform">
                    <span className="text-3xl 2xl:text-4xl 4k:text-5xl text-krio-primary drop-shadow-sm">
                      {["⛢", "⚗", "⚡", "🌪"][index]}
                    </span>
                  </div>
                  <div>
                    <h3 className="text-lg 2xl:text-xl 4k:text-2xl font-semibold text-white mb-2 drop-shadow-sm">
                      {item.label}
                    </h3>
                    <p className="text-gray-300/90 text-base 2xl:text-lg leading-relaxed">
                      {item.description}
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
