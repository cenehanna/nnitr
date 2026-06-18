import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./style-index.css";

function HomePage() {
  const navigate = useNavigate();

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [newsList, setNewsList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Завантаження новин з бекенду
  useEffect(() => {
    fetch("http://localhost:3000/api/news")
      .then((res) => {
        if (!res.ok) throw new Error("Помилка завантаження новин");
        return res.json();
      })
      .then((data) => {
        const sortedNews = data.sort(
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt),
        );
        setNewsList(sortedNews);
        setIsLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setIsLoading(false);
      });
  }, []);

  const toggleMobileMenu = (e) => {
    e.preventDefault();
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  // Функції навігації
  const goToNews = () => navigate("/news");
  const goToTeachers = () => navigate("/teachers");
  const goHome = () => navigate("/");
  const goToSingleNews = (newsId) => navigate(`/news/${newsId}`); // Нова функція

  const mainNews = newsList[0];
  const sideNews = newsList.slice(1, 4);

  const formatDate = (dateString) => {
    if (!dateString) return "";
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(dateString).toLocaleDateString("uk-UA", options);
  };

  const truncateWords = (text, maxWords) => {
    if (!text) return "";
    const words = text.split(/\s+/);
    if (words.length <= maxWords) return text;
    return words.slice(0, maxWords).join(" ") + "...";
  };

  return (
    <div className="homepage-wrapper">
      {/* HEADER */}
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
                  <a href="#">Викладачі</a>
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

      {/* SECTION: WELCOME */}
      <section className="welcome">
        <div className="picture1">
          <img
            src="/images/650992215_1586445863205549_262152620574679865_n.jpg"
            alt="Студенти"
          />
        </div>
        <div className="picture2">
          <img
            src="/images/492315414_1537877657329704_901161845122679388_n.jpg"
            alt="Робототехніка"
          />
        </div>
        <div className="welcome-overlay"></div>
        <div className="welcome-content">
          <h1 className="welcome-title">
            Приєднуйся до покоління інженерів, розробників та новаторів
          </h1>
          <div className="welcome-buttons">
            <a href="#" className="btn-primary">
              Подати заявку <span>⟶</span>
            </a>
          </div>
        </div>
      </section>

      {/* SECTION: SPECIALTIES */}
      <section className="specialties">
        <div className="specialties-image">
          <img src="/images/_MG_2424.jpg" alt="Спеціальності інституту" />
        </div>
        <div className="specialties-overlay"></div>
        <div className="specialties-container">
          <div className="specialties-info">
            <p className="specialties-description">
              Навчально-науковий інститут інформаційних технологій та
              робототехніки готує висококваліфікованих фахівців для сучасних
              галузей IT, автоматизації, енергетики та транспорту.
            </p>
          </div>
          <div className="specialties-list-wrapper">
            <ul className="specialties-list">
              <li>
                <a
                  href="https://nupp.edu.ua/page/os-125-kb-b.html"
                  target="_blank"
                  rel="noreferrer"
                >
                  Кібербезпека
                </a>
              </li>
              <li>
                <a
                  href="https://nupp.edu.ua/page/os-122-kn-b.html"
                  target="_blank"
                  rel="noreferrer"
                >
                  Комп'ютерні науки
                </a>
              </li>
              <li>
                <a
                  href="https://nupp.edu.ua/page/os-123-ki-b.html"
                  target="_blank"
                  rel="noreferrer"
                >
                  Комп'ютерна інженерія
                </a>
              </li>
              <li>
                <a
                  href="https://nupp.edu.ua/page/os-133-gm-b.html"
                  target="_blank"
                  rel="noreferrer"
                >
                  Галузеве машинобудування
                </a>
              </li>
              <li>
                <a
                  href="https://nupp.edu.ua/page/os-141-esae-b.html"
                  target="_blank"
                  rel="noreferrer"
                >
                  Електромеханічні системи автоматизації та електропривод
                </a>
              </li>
              <li>
                <a
                  href="https://nupp.edu.ua/page/os-151-rask-b.html"
                  target="_blank"
                  rel="noreferrer"
                >
                  Робототехніка та автоматизовані системи керування
                </a>
              </li>
              <li>
                <a
                  href="https://nupp.edu.ua/page/os-141-veee-b.html"
                  target="_blank"
                  rel="noreferrer"
                >
                  Відновлювальна електроенергетика та енергопостачання
                  електричного транспорту
                </a>
              </li>
              <li>
                <a
                  href="https://nupp.edu.ua/page/os-172-tr-b.html"
                  target="_blank"
                  rel="noreferrer"
                >
                  Телекомунікації та радіотехніка
                </a>
              </li>
              <li>
                <a
                  href="https://nupp.edu.ua/page/os-274-at-b.html"
                  target="_blank"
                  rel="noreferrer"
                >
                  Автомобільний транспорт
                </a>
              </li>
            </ul>
          </div>
          <div className="specialties-footer">
            <p className="specialties-action-text">
              Натисніть на спеціальність, щоб дізнатися більше про програму
              навчання, кар'єрні перспективи та умови вступу.
            </p>
          </div>
        </div>
      </section>

      {/* SECTION: NEWS - З НАВІГАЦІЄЮ НА ОКРЕМУ НОВИНУ */}
      <section className="news-main-page">
        <h1 className="news-page-title">Останні новини</h1>

        {isLoading ? (
          <div style={{ textAlign: "center", padding: "20px" }}>
            Завантаження новин...
          </div>
        ) : newsList.length === 0 ? (
          <div style={{ textAlign: "center", padding: "20px" }}>
            Новин поки немає
          </div>
        ) : (
          <div className="news-block">
            {/* Головна новина - клікабельна */}
            {mainNews && (
              <article
                className="main-news"
                onClick={() => goToSingleNews(mainNews.id)}
                style={{ cursor: "pointer" }}
              >
                <div className="main-news-image-wrapper">
                  <img src={mainNews.imagePath} alt={mainNews.title} />
                </div>
                <time className="news-date">
                  {formatDate(mainNews.createdAt)}
                </time>
                <h3 className="main-news-header">{mainNews.title}</h3>
                <p className="main-news-text">
                  {truncateWords(mainNews.content, 40)}
                </p>
              </article>
            )}

            {/* Маленькі новини - клікабельні */}
            <div className="small-news">
              {sideNews.map((news) => (
                <article
                  key={news.id}
                  className="small-news-item"
                  onClick={() => goToSingleNews(news.id)}
                  style={{ cursor: "pointer" }}
                >
                  <time className="news-date">
                    {formatDate(news.createdAt)}
                  </time>
                  <h3 className="small-news-header">{news.title}</h3>
                  <div className="small-news-content">
                    <img src={news.imagePath} alt={news.title} />
                    <p>{truncateWords(news.content, 18)}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        )}

        <div className="news-more-wrapper">
          <a
            href="#"
            className="btn-all-news"
            onClick={(e) => {
              e.preventDefault();
              goToNews();
            }}
          >
            Усі новини
          </a>
        </div>
      </section>

      {/* SECTION: ACADEMIC MOBILITY */}
      <section className="academical-mobility">
        <h1 className="mobility-title">Академічна мобільність</h1>
        <p className="mobility-subtitle">
          Академічна мобільність з Полтавською політехнікою — це твій унікальний
          шанс вийти за межі звичного навчання та відкрити світ! Програми
          обміну, зокрема Erasmus+, дозволяють студентам безкоштовно навчатися
          протягом семестру в провідних європейських університетах, зануритися в
          абсолютно нове культурне й мовне середовище, знайти друзів з усього
          світу та отримати потужний практичний досвід для майбутньої
          IT-кар'єри.
        </p>

        <div className="academics-block">
          <a
            href="https://nupp.edu.ua/news/ctudenti-politekhniki-zavershili-navchannya-za-programoyu-erasmus-v-alba-yulii.html"
            target="_blank"
            rel="noreferrer"
            className="academics-card"
          >
            <div className="academics-card-image">
              <img src="/images/karinashupuk.jpg" alt="Карина Шупик, Румунія" />
            </div>
            <h3 className="academics-card-header">
              Карина Шупик, 4 курс спеціальності «Комп'ютерні науки»
            </h3>
            <p className="academics-card-text">
              «Навчання в Румунії за програмою Erasmus+ стало для мене часом
              відкриттів. В Університеті Алба-Юлії я вивчала англійською мовою
              актуальні IT-дисципліни: Artificial Intelligence, Computer
              Graphics та Development of Mobile Applications, фокусуючись на
              практичних завданнях. Адаптуватися допомогли волонтери мережі ESN,
              які влаштовували незабутні заходи — наприклад, чотириденний
              Halloween у Трансильванії та Erasmus+ Generation Summit. Також я
              мала змогу поподорожувати Угорщиною, Австрією та Італією. Щиро
              вдячна рідному університету за цей дивовижний досвід!»
            </p>
          </a>

          <a
            href="https://nupp.edu.ua/news/ctudenti-zaversili-navchanna-za-programoyu-akademichnoi-mobilnosti-erasmus-u-rumunskomu-universiteti.html"
            target="_blank"
            rel="noreferrer"
            className="academics-card"
          >
            <div className="academics-card-image">
              <img src="/images/image29.jpeg" alt="Анастасія Курилех" />
            </div>
            <h3 className="academics-card-header">
              Анастасія Курилех, 3 курс спеціальності «Комп'ютерні науки»
            </h3>
            <p className="academics-card-text">
              «Навчання в Румунії за програмою Erasmus+ — це неймовірна
              можливість побачити країну не як турист. Корпуси університету
              розташовані в історичному центрі Альба-Юлії, поруч із дивовижною
              цитаделлю та горами. Навчальний процес англійською мовою
              побудований на лабораторних і проєктах, а викладачі завжди готові
              допомогти. Оскільки бакалаврат тут триває 3 роки, підходи до
              викладання дещо різняться, але невеликі IT-групи дозволяють
              працювати у власному темпі. Також ми вивчаємо румунську мову,
              комфортно живемо в гуртожитку з краєвидом на гори та щовихідних
              подорожуємо з волонтерами ESN!»
            </p>
          </a>

          <a
            href="https://nupp.edu.ua/news/ctudenti-zaversili-navchanna-za-programoyu-akademichnoi-mobilnosti-erasmus-u-rumunskomu-universiteti.html"
            target="_blank"
            rel="noreferrer"
            className="academics-card"
          >
            <div className="academics-card-image">
              <img src="/images/image5.jpeg" alt="Ярослав Яцевич" />
            </div>
            <h3 className="academics-card-header">
              Ярослав Яцевич, 2 курс спеціальності «Комп'ютерні науки»
            </h3>
            <p className="academics-card-text">
              «Два місяці в Університеті Алба-Юлія стали для мене часом
              відкриттів та особистого зростання. Навчання англійською мовою та
              адаптація до нової освітньої системи спочатку були викликом, але
              підтримка місцевих студентів і волонтерів ESN допомогла швидко
              увійти в темп. Окрім навчання, я захопився атмосферою міста, а
              разом із одногрупниками ми вже встигли дослідити архітектурні
              перлини Румунії та відвідати Туреччину. Цей досвід відкрив нові
              горизонти для мого майбутнього!»
            </p>
          </a>
        </div>
      </section>

      {/* FOOTER */}
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
            <li className="mobile-dropdown-item">
              <input type="checkbox" id="drop-vstup" />
              <label htmlFor="drop-vstup" className="mobile-dropdown-trigger">
                ВСТУПНИКАМ <i className="fas fa-chevron-down arrow-icon"></i>
              </label>
              <ul className="mobile-sub-list">
                <li>
                  <a href="#">Перелік спеціальностей</a>
                </li>
                <li>
                  <a href="#">Умови вступу</a>
                </li>
              </ul>
            </li>
            <li className="mobile-dropdown-item">
              <input type="checkbox" id="drop-student" />
              <label htmlFor="drop-student" className="mobile-dropdown-trigger">
                СТУДЕНТУ <i className="fas fa-chevron-down arrow-icon"></i>
              </label>
              <ul className="mobile-sub-list">
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
                  <a href="#">Викладачі</a>
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
          </ul>
        </nav>
      </div>
    </div>
  );
}

export default HomePage;
