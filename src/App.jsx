import { useState } from "react";
import Admin from "./Admin";

export default function App() {
  const [page, setPage] = useState("home");
  const [lang, setLang] = useState("th");

  const text = {
    th: {
      home: "หน้าแรก",
      leagues: "ลีกการแข่งขัน",
      teams: "ทีม",
      fixtures: "โปรแกรมแข่งขัน",
      results: "ผลการแข่งขัน",
      standings: "ตารางคะแนน",
      news: "ข่าวสาร",
      contact: "ติดต่อเรา",
      headline: "เวทีแห่งการแข่งขัน\nศักยภาพ และชัยชนะ",
      description: "ศูนย์รวมลีกฟุตบอล โปรแกรมแข่งขัน ผลการแข่งขัน และตารางคะแนนในที่เดียว",
      explore: "ดูลีกรายการแข่งขัน",
      admin: "ระบบผู้ดูแล",
      footer: "พื้นที่ของการแข่งขัน เพื่อทุกคนที่รักฟุตบอล"
    },
    en: {
      home: "Home",
      leagues: "Leagues",
      teams: "Teams",
      fixtures: "Fixtures",
      results: "Results",
      standings: "Standings",
      news: "News",
      contact: "Contact",
      headline: "THE STAGE FOR\nCOMPETITION & VICTORY",
      description: "Your home for football leagues, fixtures, results and standings.",
      explore: "EXPLORE LEAGUES",
      admin: "ADMIN LOGIN",
      footer: "A home for everyone who loves football."
    }
  };

  const t = text[lang];

  if (page === "admin") {
    return (
      <>
        <button
          className="back-home"
          onClick={() => setPage("home")}
        >
          ← {t.home}
        </button>
        <Admin />
      </>
    );
  }

  const leagues = [
    "BA VIP PRO LEAGUE",
    "BA 35UP LEAGUE",
    "BA 40UP LEAGUE",
    "BA OPEN LEAGUE"
  ];

  return (
    <div className="app">
      <header className="header">
        <a className="brand" href="#" onClick={() => setPage("home")}>
          <span className="brand-mark">BA</span>
          <span>PRO <b>LEAGUE</b></span>
        </a>

        <div className="header-actions">
          <button
            className="language"
            onClick={() => setLang(lang === "th" ? "en" : "th")}
          >
            {lang === "th" ? "EN" : "TH"}
          </button>
          <button
            className="admin-link"
            onClick={() => setPage("admin")}
          >
            {t.admin}
          </button>
        </div>
      </header>

      <nav className="nav">
        {[t.home, t.leagues, t.teams, t.fixtures, t.results, t.standings, t.news, t.contact].map((item, index) => (
          <a
            href={index === 1 ? "#leagues" : "#"}
            key={item}
          >
            {item}
          </a>
        ))}
      </nav>

      <main>
        <section className="hero">
          <div className="hero-content">
            <div className="eyebrow">● BA PRO LEAGUE</div>
            <h1>{t.headline}</h1>
            <p>{t.description}</p>
            <a className="primary-button" href="#leagues">
              {t.explore} ↗
            </a>
          </div>
          <div className="hero-decoration">
            <div className="ball">⚽</div>
            <span>BA</span>
          </div>
          <div className="hero-bottom">EST. BA PRO LEAGUE</div>
        </section>

        <section className="section" id="leagues">
          <div className="section-heading">
            <div>
              <span className="eyebrow">OUR COMPETITIONS</span>
              <h2>{t.leagues}</h2>
            </div>
            <span className="section-number">01 / 04</span>
          </div>

          <div className="league-grid">
            {leagues.map((league, index) => (
              <article className="league-card" key={league}>
                <span className="card-number">0{index + 1}</span>
                <div className="card-icon">⚽</div>
                <h3>{league}</h3>
                <p>BA PRO LEAGUE</p>
                <span className="card-arrow">↗</span>
              </article>
            ))}
          </div>
        </section>

        <section className="information">
          {[
            ["MATCH CENTER", t.fixtures],
            ["LATEST RESULTS", t.results],
            ["RANKING", t.standings]
          ].map(([label, heading]) => (
            <div className="info-card" key={label}>
              <span className="eyebrow">{label}</span>
              <h2>{heading}</h2>
              <div className="placeholder">BA PRO LEAGUE</div>
            </div>
          ))}
        </section>

        <section className="admin-banner">
          <div>
            <span className="eyebrow">CONTROL CENTER</span>
            <h2>{t.admin}</h2>
          </div>
          <button
            className="admin-icon"
            onClick={() => setPage("admin")}
            aria-label={t.admin}
          >
            ↗
          </button>
        </section>
      </main>

      <footer>
        <div className="brand">
          <span className="brand-mark">BA</span>
          PRO LEAGUE
        </div>
        <p>{t.footer}</p>
        <small>© 2026 BA PRO LEAGUE. ALL RIGHTS RESERVED.</small>
      </footer>
    </div>
  );
}
