import { useState, useEffect } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import "./style-news.css";

function NewsPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [allNews, setAllNews] = useState([]);
  const [selectedNews, setSelectedNews] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const queryParams = new URLSearchParams(location.search);
  const startPage = parseInt(queryParams.get("page")) || 1;

  const [expandedPages, setExpandedPages] = useState(0);
  const gridNewsPerPage = 9;
  const [totalPages, setTotalPages] = useState(1);

  const isSingleNews = Boolean(id);

  const toggleMobileMenu = (e) => {
    e.preventDefault();
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  useEffect(() => {
    setIsLoading(true);
    fetch("https://nnitrbackend.onrender.com/api/news")
      .then((res) => res.json())
      .then((data) => {
        const sorted = data.sort(
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt),
        );
        setAllNews(sorted);

        const otherNewsCount = sorted.length - 1;
        setTotalPages(Math.ceil(otherNewsCount / gridNewsPerPage) || 1);
        setIsLoading(false);
      })
      .catch((err) => {
        console.error("Помилка завантаження новин:", err);
        setIsLoading(false);
      });
  }, []); //

  useEffect(() => {
    if (id) {
      setIsLoading(true);
      fetch(`https://nnitrbackend.onrender.com/api/news/${id}`)
        .then((res) => res.json())
        .then((data) => {
          setSelectedNews(data);
          setIsLoading(false);
          window.scrollTo(0, 0);
        })
        .catch((err) => {
          console.error("Помилка завантаження статті:", err);
          setIsLoading(false);
        });
    } else {
      setSelectedNews(null);
    }
  }, [id]);

  useEffect(() => {
    setExpandedPages(0);
  }, [startPage]);

  const formatDate = (dateStr) => {
    if (!dateStr) return "5 червня 2026";
    return new Date(dateStr).toLocaleDateString("uk-UA", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

  const goHome = () => navigate("/");
  const goToNewsList = () => navigate("/news");
  const goToNews = (newsId) => navigate(`/news/${newsId}`);
  const goToTeachers = () => navigate("/teachers");

  const goToPage = (page) => {
    if (page >= 1 && page <= totalPages) {
      navigate(`/news?page=${page}`);
    }
  };

  const loadMoreNews = () => {
    const maxCurrentPage = startPage + expandedPages;
    if (maxCurrentPage < totalPages) {
      setExpandedPages((prev) => prev + 1);
    }
  };

  const currentPageDisplay = startPage + expandedPages;

  const mainNews = allNews[0];

  const getGridNews = () => {
    if (allNews.length <= 1) return [];
    const startIndex = 1 + (startPage - 1) * gridNewsPerPage;
    const totalVisibleGrid = gridNewsPerPage + expandedPages * gridNewsPerPage;
    const endIndex = startIndex + totalVisibleGrid;
    return allNews.slice(startIndex, endIndex);
  };

  const gridNews = getGridNews();
  const hasMoreToLoad = currentPageDisplay < totalPages;

  const sideNews = allNews
    .filter((news) => news.id !== selectedNews?.id)
    .slice(0, 12);

  const getPaginationNumbers = () => {
    const pages = [];
    const maxVisible = 7;

    if (totalPages <= maxVisible) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      pages.push(1);
      if (currentPageDisplay > 3) pages.push("...");

      const start = Math.max(2, currentPageDisplay - 1);
      const end = Math.min(totalPages - 1, currentPageDisplay + 1);

      for (let i = start; i <= end; i++) {
        if (i > 1 && i < totalPages) pages.push(i);
      }

      if (currentPageDisplay < totalPages - 2) pages.push("...");
      pages.push(totalPages);
    }
    return pages;
  };

  return (
    <div className="newspage-wrapper">
      <header className="main-page-header-light">
        <div
          className="header-logo"
          onClick={goHome}
          style={{ cursor: "pointer" }}
        >
          <img
            className="logo-white"
            src="/images/logo-5.svg"
            alt="Логотип ІТ Інституту"
          />
          <div className="logo-text-light">
            ННІ інформаційних
            <br />
            технологій та
            <br />
            робототехніки
          </div>
        </div>
        <a
          className="phone-menu-light"
          href="#mobile-menu-overlay"
          onClick={toggleMobileMenu}
        >
          <i className="fas fa-bars"></i>
        </a>

        <nav className="header-nav-light">
          <ul className="menu-list-light">
            <li>
              <a
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  goToNewsList();
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
                  <a href="#">Розклад занять</a>
                </li>
                <li>
                  <a href="#">Кабінет студента</a>
                </li>
                <li>
                  <a href="#">Дистанційне навчання</a>
                </li>
                <li>
                  <a href="#">Рейтинг студентів</a>
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
                <svg
                  className="search-icon-light"
                  viewBox="0 -0.5 25 25"
                  fill="none"
                >
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

      {/* BREADCRUMBS */}
      <div className="breadcrumbs">
        <a
          href="#"
          onClick={(e) => {
            e.preventDefault();
            goHome();
          }}
        >
          Головна
        </a>
        <i className="fas fa-chevron-right separator"></i>
        <span
          className="current-page"
          onClick={goToNewsList}
          style={{ cursor: "pointer" }}
        >
          Новини
        </span>
        {isSingleNews && selectedNews && (
          <>
            <i className="fas fa-chevron-right separator"></i>
            <span
              className="current-page"
              style={{
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis",
                maxWidth: "300px",
                display: "inline-block",
                verticalAlign: "bottom",
              }}
            >
              {selectedNews.title}
            </span>
          </>
        )}
      </div>

      {/* MAIN CONTENT */}
      {isLoading && (
        <div
          style={{ padding: "50px", textAlign: "center", fontSize: "1.2rem" }}
        >
          Завантаження даних...
        </div>
      )}

      {!isLoading && !isSingleNews ? (
        /* ============================================================
           СТОРІНКА ЗІ СПИСКОМ НОВИН (ГРИД)
           ============================================================ */
        <main className="news-page-container">
          {/* ГОЛОВНА НОВИНА */}
          {mainNews && (
            <div
              className="main-news-item"
              onClick={() => goToNews(mainNews.id)}
              style={{ cursor: "pointer" }}
            >
              <article className="news-article-card">
                <div className="news-image-wrapper">
                  <img
                    src={mainNews.imagePath || "/images/0043.jpg"}
                    alt={mainNews.title}
                  />
                </div>
                <div className="news-content-wrapper">
                  <time className="news-date">
                    {formatDate(mainNews.createdAt)}
                  </time>
                  <h1 className="news-main-title">{mainNews.title}</h1>
                  <div className="news-text-body">
                    <p>
                      {mainNews.content
                        ? mainNews.content.substring(0, 350) + "..."
                        : "Немає вмісту."}
                    </p>
                  </div>
                </div>
              </article>
            </div>
          )}

          <h2 className="section-title">Інші новини</h2>

          {/* СІТКА НОВИН */}
          <section className="news-grid">
            {gridNews.map((news) => (
              <article
                key={news.id}
                className="news-grid-card"
                onClick={() => goToNews(news.id)}
                style={{ cursor: "pointer" }}
              >
                <div className="card-image-box">
                  <img
                    src={news.imagePath || "/images/0043.jpg"}
                    alt={news.title}
                  />
                  <div className="image-overlay-text">ІНСТИТУТ</div>
                </div>
                <div className="card-info-box">
                  <h3 className="card-title">{news.title}</h3>
                  <time className="card-date">
                    {formatDate(news.createdAt)}
                  </time>
                  <p className="card-description">
                    {news.content
                      ? news.content.substring(0, 180) + "..."
                      : "Детальніше всередині статті."}
                  </p>
                </div>
              </article>
            ))}
            {allNews.length <= 1 && <p>Новин наразі немає.</p>}
          </section>

          {/* ПАГІНАЦІЯ */}
          <div className="news-footer">
            <div className="load-more-container">
              <button
                className="btn-load-more"
                onClick={loadMoreNews}
                disabled={!hasMoreToLoad}
                style={{
                  opacity: !hasMoreToLoad ? 0.5 : 1,
                  cursor: !hasMoreToLoad ? "not-allowed" : "pointer",
                }}
              >
                {!hasMoreToLoad ? "Більше немає новин" : "Більше новин"}
              </button>
            </div>

            <hr className="pagination-divider" />

            <nav
              className="pagination-container"
              aria-label="Навігація сторінками новин"
            >
              <a
                href="#"
                className="pagination-text-arrow prev"
                onClick={(e) => {
                  e.preventDefault();
                  goToPage(currentPageDisplay - 1);
                }}
                style={{
                  color: currentPageDisplay <= 1 ? "#ccc" : "#888",
                  cursor: currentPageDisplay <= 1 ? "not-allowed" : "pointer",
                }}
              >
                <i className="fas fa-arrow-left"></i> <span>Попередня</span>
              </a>

              <ul className="pagination-list">
                {getPaginationNumbers().map((page, index) => (
                  <li key={index}>
                    {page === "..." ? (
                      <span className="pagination-dots">...</span>
                    ) : (
                      <a
                        href="#"
                        className={`pagination-number ${currentPageDisplay === page ? "active" : ""}`}
                        onClick={(e) => {
                          e.preventDefault();
                          goToPage(page);
                        }}
                      >
                        {page}
                      </a>
                    )}
                  </li>
                ))}
              </ul>

              <a
                href="#"
                className="pagination-text-arrow next"
                onClick={(e) => {
                  e.preventDefault();
                  goToPage(currentPageDisplay + 1);
                }}
                style={{
                  color: currentPageDisplay >= totalPages ? "#ccc" : "#888",
                  cursor:
                    currentPageDisplay >= totalPages
                      ? "not-allowed"
                      : "pointer",
                }}
              >
                <span>Наступна</span> <i className="fas fa-arrow-right"></i>
              </a>
            </nav>

            <div
              style={{
                textAlign: "center",
                marginTop: "20px",
                color: "#888",
                fontSize: "14px",
              }}
            ></div>
          </div>
        </main>
      ) : (
        /* ============================================================
           СТОРІНКА З ОДНІЄЮ НОВИНОЮ (з правою колонкою)
           ============================================================ */
        !isLoading &&
        selectedNews && (
          <main className="news-page-container single-news-layout">
            {/* ЛІВА КОЛОНКА - ГОЛОВНА НОВИНА */}
            <section className="article-main-column">
              <article className="article-full-content">
                <time className="article-publication-date">
                  {formatDate(selectedNews.createdAt)}
                </time>
                <h1 className="article-page-title">{selectedNews.title}</h1>

                {selectedNews.imagePath && (
                  <div className="article-main-media">
                    <img
                      src={selectedNews.imagePath}
                      alt={selectedNews.title}
                    />
                  </div>
                )}

                <div className="article-text-paragraph-box">
                  {selectedNews.content
                    ?.split("\n")
                    .map((paragraph, idx) => <p key={idx}>{paragraph}</p>) || (
                    <p>Немає вмісту.</p>
                  )}
                </div>

                <button
                  className="btn-load-more"
                  onClick={goToNewsList}
                  style={{ marginTop: "30px" }}
                >
                  <i
                    className="fas fa-arrow-left"
                    style={{ marginRight: "10px" }}
                  ></i>
                  Повернутися до новин
                </button>
              </article>
            </section>

            {/* ПРАВА КОЛОНКА - ІНШІ НОВИНИ (SIDEBAR) */}
            <aside className="side-news-panel">
              <h2 className="side-panel-heading">Інші новини</h2>

              <div className="side-news-vertical-stack">
                {sideNews.map((news) => (
                  <article
                    key={news.id}
                    className="side-news-mini-card"
                    onClick={() => goToNews(news.id)}
                    style={{ cursor: "pointer" }}
                  >
                    <div className="side-card-preview-img">
                      <img
                        src={news.imagePath || "/images/0043.jpg"}
                        alt={news.title}
                      />
                    </div>
                    <div className="side-card-text-details">
                      <time className="side-card-posted-time">
                        {formatDate(news.createdAt)}
                      </time>
                      <h3 className="side-card-clickable-title">
                        <a
                          href="#"
                          onClick={(e) => {
                            e.preventDefault();
                            goToNews(news.id);
                          }}
                        >
                          {news.title}
                        </a>
                      </h3>
                    </div>
                  </article>
                ))}
              </div>
            </aside>
          </main>
        )
      )}

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

      {/* ============================================================
          МОБІЛЬНЕ МЕНЮ (ПОВНЕ)
          ============================================================ */}
      <div
        id="mobile-menu-overlay"
        className={`fullscreen-menu-light ${isMobileMenuOpen ? "active" : ""}`}
        style={{ display: isMobileMenuOpen ? "block" : "none" }}
      >
        <a href="#" className="close-menu-light" onClick={toggleMobileMenu}>
          &times;
        </a>
        <nav className="mobile-menu-nav-light">
          <ul className="mobile-menu-list-light">
            <li>
              <a
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  toggleMobileMenu(e);
                  goToNewsList();
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
                  goHome();
                }}
              >
                ГОЛОВНА
              </a>
            </li>

            <li className="mobile-dropdown-item-light">
              <input type="checkbox" id="drop-vstup" />
              <label
                htmlFor="drop-vstup"
                className="mobile-dropdown-trigger-light"
              >
                ВСТУПНИКАМ
                <i className="fas fa-chevron-down arrow-icon"></i>
              </label>
              <ul className="mobile-sub-list-light">
                <li>
                  <a href="#">Перелік спеціальностей</a>
                </li>
                <li>
                  <a href="#">Умови вступу</a>
                </li>
              </ul>
            </li>

            <li className="mobile-dropdown-item-light">
              <input type="checkbox" id="drop-student" />
              <label
                htmlFor="drop-student"
                className="mobile-dropdown-trigger-light"
              >
                СТУДЕНТУ
                <i className="fas fa-chevron-down arrow-icon"></i>
              </label>
              <ul className="mobile-sub-list-light">
                <li>
                  <a href="#">Розклад занять</a>
                </li>
                <li>
                  <a href="#">Кабінет студента</a>
                </li>
                <li>
                  <a href="#">Дистанційне навчання</a>
                </li>
                <li>
                  <a href="#">Рейтинг студентів</a>
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

export default NewsPage;
