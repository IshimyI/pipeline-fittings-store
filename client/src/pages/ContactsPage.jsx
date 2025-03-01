import React from "react";

export default function ContactsPage() {
  return (
    <div>
      <main>
        <section id="contacts">
          <div>
            <h2>Свяжитесь с нами</h2>
          </div>
          <p>Мы всегда рады помочь! Вы можете связаться с нами через:</p>

          <div>
            <div>
              <div>
                <i className="fas fa-map-marker-alt"></i>
              </div>
              <h3>Адрес</h3>
              <p>Москва, ул. Инновационная, д. 10</p>
              <div id="map">
                <div style={{ position: "relative", overflow: "hidden" }}>
                  <a
                    href="https://yandex.ru/maps/org/kolledzh_avtomatizatsii_i_informatsionnykh_tekhnologiy_20_uchebnoye_otdeleniye_didzhital/1011075765/?utm_medium=mapframe&utm_source=maps"
                    style={{
                      color: "#eee",
                      fontSize: "12px",
                      position: "absolute",
                      top: "0px",
                    }}
                  >
                    Колледж автоматизации и информационных технологий № 20,
                    учебное отделение Диджитал
                  </a>
                  <a
                    href="https://yandex.ru/maps/213/moscow/category/college/184106236/?utm_medium=mapframe&utm_source=maps"
                    style={{
                      color: "#eee",
                      fontSize: "12px",
                      position: "absolute",
                      top: "14px",
                    }}
                  >
                    Колледж в Москве
                  </a>
                  <iframe
                    src="https://yandex.ru/map-widget/v1/?from=mapframe&ll=37.707774%2C55.816179&mode=search&oid=1011075765&ol=biz&z=17.85"
                    width="560"
                    height="400"
                    frameborder="1"
                    allowfullscreen="true"
                    style={{ position: "relative" }}
                  ></iframe>
                </div>
              </div>
            </div>

            <div>
              <div>
                <i className="fas fa-phone"></i>
              </div>
              <h3>Телефон</h3>
              <p>
                <a href="tel:+74951234567">+7 (495) 123-45-67</a>
              </p>
            </div>

            <div>
              <div>
                <i className="fas fa-envelope"></i>
              </div>
              <h3>Email</h3>
              <p>
                <a href="mailto:info@krioarmatura.ru">info@krioarmatura.ru</a>
              </p>
            </div>

            <div>
              <div>
                <i className="fas fa-share-alt"></i>
              </div>
              <h3>Социальные сети</h3>
              <p>
                <a href="#" target="_blank">
                  ВКонтакте
                </a>{" "}
                |
                <a href="#" target="_blank">
                  Facebook
                </a>{" "}
                |
                <a href="#" target="_blank">
                  Instagram
                </a>
              </p>
            </div>
          </div>

          <div>
            <h3>Обратная связь</h3>
            <form id="feedbackForm">
              <div>
                <input
                  type="text"
                  id="name"
                  name="name"
                  placeholder="Ваше имя"
                  required
                />
              </div>
              <div>
                <input
                  type="email"
                  id="email"
                  name="email"
                  placeholder="Ваш email"
                  required
                />
              </div>
              <div>
                <textarea
                  id="message"
                  name="message"
                  placeholder="Ваше сообщение"
                  rows="5"
                  required
                ></textarea>
              </div>
              <button type="submit">Отправить</button>
            </form>
          </div>
        </section>
      </main>
    </div>
  );
}
