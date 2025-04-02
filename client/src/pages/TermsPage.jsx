export default function TermsPage() {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <main
        className="w-full max-w-[80%] md:max-w-[60%] lx:max-w-[80%] p-6 space-y-6 
                  bg-krio-background rounded-lg shadow-lg border border-gray-700 my-8 mx-auto"
      >
        <h2 className="text-2xl 2xl:text-3xl 4k:text-4xl font-bold text-center text-white">
          Пользовательское соглашение
        </h2>
        <div className="flex flex-col space-y-4">
          <section className="p-6 bg-krio-foreground text-krio-secondary rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold mb-4">
              1. Общие положения Пользовательского соглашения
            </h2>

            <div className="space-y-6">
              <div>
                <p className="mb-3">
                  <strong>1.1.</strong> В настоящем документе и вытекающих или
                  связанным с ним отношениях Сторон применяются следующие
                  термины и определения:
                </p>
                <ol className="list-[lower-alpha] pl-6 space-y-2">
                  <li>
                    <strong>Платформа</strong> — программно-аппаратные средства,
                    интегрированные с Сайтом Администрации;
                  </li>
                  <li>
                    <strong>Пользователь</strong> — дееспособное физическое
                    лицо, присоединившееся к настоящему Соглашению в собственном
                    интересе либо выступающее от имени и в интересах
                    представляемого им юридического лица;
                  </li>
                  <li>
                    <strong>Сайт Администрации/Сайт</strong> — интернет-сайты,
                    размещенные в домене
                    pipeline-fittings-store-client.vercel.app и его поддоменах;
                  </li>
                  <li>
                    <strong>Сервис</strong> — комплекс услуг и лицензия,
                    предоставляемые Пользователю с использованием Платформы;
                  </li>
                  <li>
                    <strong>Соглашение</strong> — настоящее соглашение со всеми
                    дополнениями и изменениями.
                  </li>
                </ol>
              </div>

              <div>
                <p>
                  <strong>1.2.</strong> Использование вами Сервиса любым
                  способом и в любой форме в пределах его объявленных
                  функциональных возможностей, включая:
                </p>
                <ul className="list-disc pl-6 mt-2 space-y-1">
                  <li>просмотр размещенных на Сайте материалов;</li>
                  <li>регистрация и/или авторизация на Сайте;</li>
                  <li>
                    размещение или отображение на Сайте любых материалов,
                    включая, но не ограничиваясь:
                    <ul className="list-circle pl-4 mt-1">
                      <li>тексты</li>
                      <li>гипертекстовые ссылки</li>
                      <li>изображения</li>
                      <li>аудио и видео-файлы</li>
                      <li>сведения и/или иная информация</li>
                    </ul>
                  </li>
                </ul>
                <p className="mt-2">
                  создает договор на условиях настоящего Соглашения в
                  соответствии с положениями ст.437 и 438 Гражданского кодекса
                  Российской Федерации.
                </p>
              </div>

              <div>
                <p className="mb-3">
                  <strong>1.3.</strong> Воспользовавшись любой из указанных выше
                  возможностей по использованию Сервиса вы подтверждаете, что:
                </p>
                <ol className="list-[lower-alpha] pl-6 space-y-2">
                  <li>
                    Ознакомились с условиями настоящего Соглашения в полном
                    объеме до начала использования Сервиса;
                  </li>
                  <li>
                    Принимаете все условия настоящего Соглашения в полном объеме
                    без каких-либо изъятий и ограничений с вашей стороны и
                    обязуетесь их соблюдать или прекратить использование
                    Сервиса.
                    <p className="mt-1">
                      Если вы не согласны с условиями настоящего Соглашения или
                      не имеете права на заключение договора на их основе, вам
                      следует незамедлительно прекратить любое использование
                      Сервиса.
                    </p>
                  </li>
                  <li>
                    Соглашение (в том числе любая из его частей) может быть
                    изменено Администрацией без какого-либо специального
                    уведомления. Новая редакция Соглашения вступает в силу с
                    момента ее размещения на Сайте Администрации либо доведения
                    до сведения Пользователя в иной удобной форме, если иное не
                    предусмотрено новой редакцией Соглашения.
                  </li>
                </ol>
              </div>

              <div className="mt-4">
                <p>
                  <strong>Важно знать!</strong> Для придания юридической силы
                  дисклеймеру, включенному в текст соглашения с пользователем,
                  необходимо подтвердить факт ознакомления и принятия
                  пользователем его условий. Для этого используется
                  предусмотренный законодательством механизм заключения
                  договоров.
                </p>
              </div>
            </div>
          </section>
          <section className="p-6 bg-krio-foreground text-krio-secondary rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold mb-4">
              2. Условия пользования по Соглашению
            </h2>

            <div className="space-y-6">
              <div>
                <p className="mb-2">
                  <span className="font-semibold">2.1.</span> Использование
                  функциональных возможностей Сервиса допускается только после
                  прохождения Пользователем регистрации и авторизации на Сайте в
                  соответствии с установленной Администрацией процедурой.
                </p>
              </div>

              <div>
                <p className="mb-2">
                  <span className="font-semibold">2.2.</span> Технические,
                  организационные и коммерческие условия использования Сервиса,
                  в том числе его функциональных возможностей, доводятся до
                  сведения Пользователей путем:
                </p>
                <ul className="list-disc pl-6 space-y-1">
                  <li>отдельного размещения на Сайте</li>
                  <li>нотификации Пользователей</li>
                </ul>
              </div>

              <div>
                <p className="mb-2">
                  <span className="font-semibold">2.3.</span> Выбранные
                  Пользователем логин и пароль являются:
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>
                    Необходимой и достаточной информацией для доступа на Сайт
                  </li>
                  <li>
                    Конфиденциальными данными, которые Пользователь не имеет
                    права передавать третьим лицам
                  </li>
                  <li>
                    Объектом полной ответственности Пользователя, который
                    самостоятельно выбирает способ их хранения
                  </li>
                </ul>
              </div>
            </div>
          </section>
          <section className="p-6 bg-krio-foreground text-krio-secondary rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold mb-4">
              3. Лицензия на использование Сайта и допустимое использование
              Сервиса
            </h2>

            <div className="space-y-4">
              <p>
                В данном разделе описываются разрешенные способы использования
                Сайта и предоставляемого на его основе Сервиса.
              </p>

              <p>
                <strong>Безвозмездность лицензии</strong> препятствует
                применению
                <strong>Закона о защите прав потребителя</strong> в случае,
                когда на стороне пользователя выступает физическое лицо.
              </p>
            </div>
          </section>
          <section className="p-6 bg-krio-foreground text-krio-secondary rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold mb-4">
              4. Гарантии Пользователя по Соглашению
            </h2>

            <div className="space-y-4">
              <p>
                В разделе указываются <strong>гарантии и заверения</strong> со
                стороны пользователя о соблюдении требований законодательства и
                Пользовательского соглашения при использовании Сайта и Сервиса
                на его основе.
              </p>

              <p>
                Данные положения необходимы, в частности, для последующего
                <strong>возложения ответственности</strong> на пользователя за
                нарушения законодательства или прав третьих лиц в связи с
                публикацией на сайте противоправных материалов.
              </p>
            </div>
          </section>
          <section className="p-6 bg-krio-foreground text-krio-secondary rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold mb-4">
              5. Лицензия на использование пользовательского контента
            </h2>

            <div className="space-y-4">
              <p>
                При организации социального сервиса или платформы для размещения
                пользователями различных материалов в публичном доступе
                необходимо оформлять
                <strong>лицензионное соглашение</strong> с каждым пользователем
                на использование его материалов в рамках такого
                Интернет-сервиса.
              </p>

              <p>
                <strong>Например:</strong> Разрешение пользователя на
                использование его фотографий может потребоваться для их
                публикации на страницах других пользователей и т.д.
              </p>

              <p>
                <strong>Подтверждение правомочий:</strong> Получение лицензии
                подтверждает факт использования контента с разрешения
                пользователя, который несет ответственность за наличие у него
                законных оснований для предоставления такой лицензии.
              </p>
            </div>
          </section>
          <section className="p-6 bg-krio-foreground text-krio-secondary rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold mb-4">
              6. Ограничения использования
            </h2>

            <div className="space-y-4">
              <p>
                В Пользовательском соглашении необходимо с достаточной ясностью
                изложить условия об <strong>ограничении ответственности</strong>{" "}
                за:
              </p>

              <ul className="list-disc pl-6 space-y-2">
                <li>Предоставление и использование Сервиса</li>
                <li>Публикацию пользовательского контента через Сервис</li>
                <li>
                  Содержание материалов, ссылок и информации, размещаемых
                  пользователями
                </li>
              </ul>

              <p>
                <strong>Требования законодательства:</strong> Соблюдение
                положений
                <strong>Федерального закона «Об информации»</strong> (в редакции
                <strong>антипиратского закона</strong>) предполагает обязанность
                информационного посредника удалять спорные материалы по первому
                требованию правообладателя.
              </p>

              <p>
                <strong>Правомочия владельца:</strong> Пользовательское
                соглашение должно предоставлять правообладателю интернет-сервиса
                осуществлять удаление контента
                <strong>
                  без предварительного согласования и уведомления пользователя
                </strong>
                .
              </p>
            </div>
          </section>
          <section className="p-6 bg-krio-foreground text-krio-secondary rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold mb-4">
              7. Уведомления и рассылка
            </h2>

            <div className="space-y-3">
              <p>
                Данное положение Соглашения направлено на соблюдение требований
                <strong>о недопущении СПАМа</strong> и регулирует порядок
                осуществления рассылок.
              </p>

              <ul className="list-disc pl-6">
                <li>Запрет несанкционированных массовых рассылок</li>
                <li>Требования к содержанию уведомлений</li>
                <li>Порядок отписки от рассылок</li>
              </ul>
            </div>
          </section>
          <section className="p-6 bg-krio-foreground text-krio-secondary rounded-lg shadow-md mt-6">
            <h2 className="text-2xl font-semibold mb-4">
              8. Условия использования аналога собственноручной подписи
            </h2>

            <div className="space-y-4">
              <p>
                Раздел устанавливает порядок использования следующих элементов в
                качестве
                <strong>простой электронной подписи</strong>:
              </p>

              <ul className="list-disc pl-6 space-y-2">
                <li>Комбинация логина и пароля</li>
                <li>Адрес электронной почты</li>
                <li>Иные идентификационные данные</li>
              </ul>

              <p>
                <strong>Юридические последствия:</strong> Использование
                указанных элементов придает юридическую силу действиям сторон и
                упрощает документооборот, приравнивая электронные операции к
                совершённым собственноручно.
              </p>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}
