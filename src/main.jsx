import React, { useState } from "react";
import { createRoot } from "react-dom/client";
import "./style.css";

function App() {
  const [lang, setLang] = useState("th");

  const content = {
    th: {
      home: "หน้าแรก",
      leagues: "ลีกการแข่งขัน",
      teams: "ทีม",
      fixtures: "โปรแกรมแข่งขัน",
      results: "ผลการแข่งขัน",
      standings: "ตารางคะแนน",
      news: "ข่าวสาร",
      contact: "ติดต่อเรา",
      tag: "แพลตฟอร์มฟุตบอลสำหรับทุกการแข่งขัน",
      headline: "เวทีแห่งการแข่งขัน\nศักยภาพ และชัยชนะ",
      desc: "ศูนย์รวมลีกฟุตบอล โปรแกรมแข่งขัน ผลการแข่งขัน และตารางคะแนนในที่เดียว",
      explore: "ดูลีกรายการต่าง ๆ",
      schedule: "โปรแกรมการแข่งขัน",
      upcoming: "เร็ว ๆ นี้",
      score: "ผลการแข่งขันล่าสุด",
      table: "ตารางคะแนน",
      admin: "ระบบจัดการสำหรับผู้ดูแล",
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
      tag: "Football Competition Platform",
      headline: "THE STAGE FOR\nCOMPETITION & VICTORY",
      desc: "Your home for football leagues, fixtures, results and standings.",
      explore: "EXPLORE LEAGUES",
      schedule: "UPCOMING FIXTURES",
      upcoming: "COMING SOON",
      score: "LATEST RESULTS",
      table: "LEAGUE STANDINGS",
      admin: "ADMINISTRATION",
      footer: "A home for everyone who loves football."
    }
  };

  const t = content[lang];

  const leagues = [
    { name: "BA VIP PRO LEAGUE", detail: "Premium Competition" },
    { name: "BA 35UP LEAGUE", detail: "35+ Competition" },
    { name: "BA 40UP LEAGUE", detail: "40+ Competition" },
    { name: "BA OPEN LEAGUE", detail: "Open Competition" }
  ];

  return (
    <div className="app">
      <header className="header">
        <a className="brand" href="#">
          <span className="brand-mark">BA</span>
          <span>PRO <b>LEAGUE</b></span>
        </a>

        <button className="language" onClick={() => setLang(lang === "th" ? "en" : "th")}>
          {lang === "th" ? "EN" : "TH"} / {lang === "th" ? "ไทย" : "English"}
        </button>
      </header>

      <nav className="nav">
        {[
          t.home, t.leagues, t.teams, t.fixtures,
          t.results, t.standings, t.news, t.contact
        ].map((item, index) => (
          <a href={index === 1 ? "#leagues" : "#"} key={item}>{item}</a>
        ))}
      </nav>

      <main>
        <section className="hero">
          <div className="hero-content">
            <div className="eyebrow">● {t.tag}</div>
            <h1>{t.headline}</h1>
            <p>{t.desc}</p>
            <a className="primary-button" href="#leagues">{t.explore} ↗</a>
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
              <article className="league-card" key={league.name}>
                <span className="card-number">0{index + 1}</span>
                <div className="card-icon">⚽</div>
                <h3>{league.name}</h3>
                <p>{league.detail}</p>
                <span className="card-arrow">↗</span>
              </article>
            ))}
          </div>
        </section>

        <section className="section information">
          <div className="info-card">
            <span className="eyebrow">MATCH CENTER</span>
            <h2>{t.schedule}</h2>
            <p>{t.upcoming}</p>
            <div className="placeholder">— : —</div>
          </div>
          <div className="info-card">
            <span className="eyebrow">LIVE DATA</span>
            <h2>{t.score}</h2>
            <p>{t.results}</p>
            <div className="placeholder">BA PRO LEAGUE</div>
          </div>
          <div className="info-card">
            <span className="eyebrow">RANKING</span>
            <h2>{t.table}</h2>
            <p>{t.standings}</p>
            <div className="placeholder">01 — 02 — 03</div>
          </div>
        </section>

        <section className="admin-banner">
          <div>
            <span className="eyebrow">CONTROL CENTER</span>
            <h2>{t.admin}</h2>
          </div>
          <span className="admin-icon">⚙</span>
        </section>
      </main>

      <footer>
        <div className="brand"><span className="brand-mark">BA</span> PRO LEAGUE</div>
        <p>{t.footer}</p>
        <small>© 2026 BA PRO LEAGUE. ALL RIGHTS RESERVED.</small>
      </footer>
    </div>
  );
}

createRoot(document.getElementById("root")).render(<App />);
