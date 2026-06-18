import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./style-index.css"; // Використовує ті самі стилі

function TeachersPage() {
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = (e) => {
    e.preventDefault();
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  // Функції навігації для хедера
  const goHome = () => navigate("/");
  const goToNews = () => navigate("/news");
  const goToTeachers = () => navigate("/teachers");

  return (
    <div className="homepage-wrapper">
      {/* HEADER (Скопійовано з головної) */}
      <header className="main-page-header">
        <div
          className="header-logo"
          onClick={goHome}
          style={{ cursor: "pointer" }}
        >
          <img
            className="logo-white"
            src="/images/logo-3.svg"
            alt="Логотип ІТ Інституту"
          />
          <div className="logo-text">
            ННІ інформаційних
            <br />
            технологій та
            <br />
            робототехніки
          </div>
        </div>

        <a
          className="phone-menu"
          href="#mobile-menu-overlay"
          onClick={toggleMobileMenu}
        >
          <i className="fas fa-bars"></i>
        </a>

        <nav className="header-nav">
          <ul className="menu-list">
            <li>
              <a
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  goToNews();
                }}
              >
                НОВИНИ
              </a>
            </li>
            <li className="dropdown">
              <a href="#">ВСТУПНИКАМ</a>
              <ul className="dropdown-menu">
                <li>
                  <a href="#">Перелік спеціальностей</a>
                </li>
                <li>
                  <a href="#">Умови вступу</a>
                </li>
              </ul>
            </li>
            <li className="dropdown">
              <a href="#">СТУДЕНТУ</a>
              <ul className="dropdown-menu">
                <li>
                  <a href="https://portal.nupp.edu.ua/self/time-table">
                    Розклад занять
                  </a>
                </li>
                <li>
                  <a href="https://portal.nupp.edu.ua/">Кабінет студента</a>
                </li>
                <li>
                  <a href="https://dist.nupp.edu.ua/login/index.php">
                    Дистанційне навчання
                  </a>
                </li>
                <li>
                  <a href="https://nupp.edu.ua/page/reyting-studentiv-navchalno-naukovogo-institutu-informatsiynikh-tekhnologiy-ta-robototekhniki.html">
                    Рейтинг студентів
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    onClick={(e) => {
                      e.preventDefault();
                      goToTeachers();
                    }}
                  >
                    Викладачі
                  </a>
                </li>
              </ul>
            </li>
            <li>
              <a
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  goToTeachers();
                }}
              >
                КОНТАКТИ
              </a>
            </li>
            <li className="search-item">
              <a href="#" className="search-box">
                <svg className="search-icon" viewBox="0 -0.5 25 25" fill="none">
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M5.5 10.7655C5.50003 8.01511 7.44296 5.64777 10.1405 5.1113C12.8381 4.57483 15.539 6.01866 16.5913 8.55977C17.6437 11.1009 16.7544 14.0315 14.4674 15.5593C12.1804 17.0871 9.13257 16.7866 7.188 14.8415C6.10716 13.7604 5.49998 12.2942 5.5 10.7655Z"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M17.029 16.5295L19.5 19.0005"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </a>
            </li>
          </ul>
        </nav>
      </header>

      {/* ЦЕНТРАЛЬНИЙ КОНТЕНТ: АДМІНІСТРАЦІЯ */}
      <section className="administration-section">
        <div className="admin-container">
          <h1 className="admin-main-title">Адміністрація інституту</h1>

          <div className="admin-grid">
            {/* Картка 1: Пенц */}
            <article className="admin-card">
              <div className="admin-card-image">
                <img src="/images/PenzVF.jpg" alt="Пенц Володимир Федорович" />
              </div>
              <div className="admin-card-info">
                <span className="admin-badge">Директор</span>
                <h2 className="admin-name">
                  ПЕНЦ
                  <br />
                  Володимир Федорович
                </h2>
                <p className="admin-role">
                  Директор навчально-наукового інституту інформаційних
                  технологій та робототехніки
                </p>
                <div className="admin-degrees">
                  <p>Кандидат технічних наук, доцент</p>
                  <p>Відмінник освіти України</p>
                  <p>Заслужений працівник Полтавської політехніки</p>
                </div>
                <div className="admin-contacts">
                  <a href="tel:+380675323964">
                    <i className="fas fa-phone"></i> (067) 532-39-64
                  </a>
                  <a href="mailto:pents@nupp.edu.ua">
                    <i className="fas fa-envelope"></i> pents@nupp.edu.ua
                  </a>
                </div>
                <button className="admin-btn-more">Читати далі ➯</button>
              </div>
            </article>

            {/* Картка 2: Вергал */}
            <article className="admin-card">
              <div className="admin-card-image">
                <img src="/images/VergalKY.webp" alt="Вергал Ксенія Юріївна" />
              </div>
              <div className="admin-card-info">
                <span className="admin-badge">Заступник директора</span>
                <h2 className="admin-name">
                  ВЕРГАЛ
                  <br />
                  Ксенія Юріївна
                </h2>
                <p className="admin-role">
                  Заступник директора з навчально-методичної роботи
                </p>
                <div className="admin-degrees">
                  <p>Кандидат економічних наук, доцент</p>
                </div>
                <div className="admin-contacts">
                  <a href="tel:+380966226801">
                    <i className="fas fa-phone"></i> (096) 622-68-01
                  </a>
                  <a href="mailto:itm.verhal@nupp.edu.ua">
                    <i className="fas fa-envelope"></i> itm.verhal@nupp.edu.ua
                  </a>
                </div>
                <button className="admin-btn-more">Читати далі ➯</button>
              </div>
            </article>

            {/* Картка 3: Кузьменко */}
            <article className="admin-card">
              <div className="admin-card-image">
                <img
                  src="/images/Kuzmenko.webp"
                  alt="Кузьменко Олександра Костянтинівна"
                />
              </div>
              <div className="admin-card-info">
                <span className="admin-badge">Заступник директора</span>
                <h2 className="admin-name">
                  КУЗЬМЕНКО
                  <br />
                  Олександра Костянтинівна
                </h2>
                <p className="admin-role">
                  Заступник директора з виховної та наукової роботи
                </p>
                <div className="admin-degrees">
                  <p>Кандидат економічних наук, доцент</p>
                </div>
                <div className="admin-contacts">
                  <a href="tel:+380507260703">
                    <i className="fas fa-phone"></i> (050) 726-07-03
                  </a>
                  <a href="mailto:kuzmenko_O@nupp.edu.ua">
                    <i className="fas fa-envelope"></i> kuzmenko_O@nupp.edu.ua
                  </a>
                </div>
                <button className="admin-btn-more">Читати далі ➯</button>
              </div>
            </article>
          </div>
        </div>
      </section>

      {/* FOOTER (Скопійовано з головної) */}
      <footer className="site-footer">
        <div className="footer-container">
          <div className="footer-logo">
            <img
              src="/images/nupp_logo.webp"
              alt="Герб Полтавської політехніки"
            />
          </div>
          <div className="contact-group">
            <p>Телефон приймальної комісії:</p>
            <a href="tel:+380532561604">+38 (0532) 56-16-04</a>
            <a href="tel:+380990576517">+38 (099) 057-65-17</a>
          </div>
          <div className="contact-group">
            <p>
              E-mail:{" "}
              <a href="mailto:kanc@nupp.edu.ua" className="footer-link">
                kanc@nupp.edu.ua
              </a>
            </p>
            <p>
              E-mail:{" "}
              <a href="mailto:vstup@nupp.edu.ua" className="footer-link">
                vstup@nupp.edu.ua
              </a>
            </p>
          </div>
          <div className="footer-info">
            <address className="footer-address">
              36011, м. Полтава, проспект Віталія Грицаєнка, 24.
            </address>
            <div className="footer-socials">
              <a
                href="https://www.instagram.com"
                target="_blank"
                rel="noreferrer"
                aria-label="Instagram"
              >
                <i className="fab fa-instagram"></i>
              </a>
              <a
                href="https://www.youtube.com"
                target="_blank"
                rel="noreferrer"
                aria-label="YouTube"
              >
                <i className="fab fa-youtube"></i>
              </a>
              <a
                href="https://www.facebook.com"
                target="_blank"
                rel="noreferrer"
                aria-label="Facebook"
              >
                <i className="fab fa-facebook-f"></i>
              </a>
            </div>
          </div>
        </div>
      </footer>

      {/* MOBILE MENU OVERLAY */}
      <div
        id="mobile-menu-overlay"
        className={`fullscreen-menu ${isMobileMenuOpen ? "active" : ""}`}
        style={{ display: isMobileMenuOpen ? "block" : "none" }}
      >
        <a href="#" className="close-menu" onClick={toggleMobileMenu}>
          &times;
        </a>
        <nav className="mobile-menu-nav">
          <ul className="mobile-menu-list">
            <li>
              <a
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  toggleMobileMenu(e);
                  goToNews();
                }}
              >
                НОВИНИ
              </a>
            </li>
            <li>
              <a
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  toggleMobileMenu(e);
                  goToTeachers();
                }}
              >
                КОНТАКТИ
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
}

export default TeachersPage;
