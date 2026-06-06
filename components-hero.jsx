/* global React */
// Hero + countdown + topbar + logo strip + footer

const { useState, useEffect, useMemo } = React;

// ─── shared time helper ───
function useNow(interval = 1000) {
  // For demo: allow ?simulate=YYYY-MM-DDTHH:MM (Macau local) to fake current time
  const sim = useMemo(() => {
    const p = new URLSearchParams(location.search).get('simulate');
    if (!p) return null;
    return new Date(p);
  }, []);
  const [now, setNow] = useState(() => sim || new Date());
  useEffect(() => {
    if (sim) { setNow(sim); return; }
    const t = setInterval(() => setNow(new Date()), interval);
    return () => clearInterval(t);
  }, [interval, sim]);
  return now;
}
window.useNow = useNow;

function TopBar() {
  const now = useNow(1000);
  const macauTime = new Intl.DateTimeFormat('en-GB', {
    timeZone: 'Asia/Macau',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false,
  }).format(now);
  return (
    <div className="topbar">
      <div className="topbar-inner">
        <span className="dot" />
        <span>MACAU TIME · {macauTime}</span>
        <span className="topbar-bib">UTC+8</span>
        <span className="topbar-spacer" />
        <nav>
          <a href="#schedule">SCHEDULE</a>
          <a href="#personal">FREE TIME</a>
          <a href="#people">PEOPLE</a>
          <a href="#places">PLACES</a>
          <a href="#map">MAP</a>
          <a href="#courses">COURSES</a>
          <a href="#check">CHECK</a>
        </nav>
      </div>
    </div>
  );
}
window.TopBar = TopBar;

function LogoStrip() {
  return (
    <div className="logo-strip">
      <div className="logo-strip-inner">
        <span className="sup-by">SUPPORTED BY</span>
        <div className="logo-tile mgto">
          <div className="mgto-mark">
            <span className="mgto-l">M</span>
            <span className="mgto-g">G</span>
            <span className="mgto-t">T</span>
            <span className="mgto-o">O</span>
          </div>
          <div className="logo-cap">
            <div className="cap-en">Macao Government<br/>Tourism Office</div>
            <div className="cap-zh">澳門特別行政區政府旅遊局</div>
          </div>
        </div>
        <span className="logo-x">×</span>
        <div className="logo-tile nb">
          <img src="logos/new-balance.png" alt="New Balance" />
          <div className="logo-cap">
            <div className="cap-en">New Balance<br/>Korea</div>
            <div className="cap-zh">公式パートナー</div>
          </div>
        </div>
      </div>
    </div>
  );
}
window.LogoStrip = LogoStrip;

// ─── Countdown ───
function Countdown({ target }) {
  const now = useNow(1000);
  const diff = Math.max(0, target.getTime() - now.getTime());
  const days = Math.floor(diff / 86400000);
  const hours = Math.floor((diff % 86400000) / 3600000);
  const mins = Math.floor((diff % 3600000) / 60000);
  const secs = Math.floor((diff % 60000) / 1000);
  const live = diff === 0;
  return (
    <div className="countdown">
      <div className="countdown-label">{live ? "● LIVE — TRIP IN PROGRESS" : "── COUNTDOWN TO TAKEOFF ──"}</div>
      <div className="countdown-grid">
        <div className="countdown-cell">
          <div className="v hot">{String(days).padStart(2,'0')}</div>
          <div className="l">Days</div>
        </div>
        <div className="countdown-cell">
          <div className="v">{String(hours).padStart(2,'0')}</div>
          <div className="l">Hrs</div>
        </div>
        <div className="countdown-cell">
          <div className="v">{String(mins).padStart(2,'0')}</div>
          <div className="l">Min</div>
        </div>
        <div className="countdown-cell">
          <div className="v">{String(secs).padStart(2,'0')}</div>
          <div className="l">Sec</div>
        </div>
      </div>
      <div className="countdown-footer">
        <span>ICN 09:50</span>
        <span>→</span>
        <span>MFM 12:50</span>
      </div>
    </div>
  );
}
window.Countdown = Countdown;

function Hero() {
  const target = useMemo(() => new Date("2026-06-26T09:50:00+09:00"), []);
  const now = useNow(1000);
  const diff = Math.max(0, target.getTime() - now.getTime());
  const days = Math.floor(diff / 86400000);
  const hours = Math.floor((diff % 86400000) / 3600000);
  const mins = Math.floor((diff % 3600000) / 60000);
  const secs = Math.floor((diff % 60000) / 1000);

  return (
    <header className="cover">
      <div className="cover-frame">
        {/* Masthead */}
        <div className="cover-masthead">
          <div className="center">Macao Government Tourism Office <em>×</em> New Balance Korea</div>
        </div>

        {/* Issue dateline */}
        <div className="cover-issue">
          <span><strong>26—28 JUN 2026</strong> · MACAU SAR · 中國澳門</span>
          <span>RUN · SWIM · BIKE · FREE TIME</span>
          <span>STUDIOCITY MACAO · COTAI</span>
        </div>

        {/* Main split */}
        <div className="cover-main">
          <div className="cover-headline">
            <div className="cover-eyebrow">
              <span className="rule" />
              <span>The <span className="accent">Sixth</span> Class of Runfluencers</span>
            </div>
            <h1 className="motion-title">
              <span className="line">MACAU</span>
              <span className="line"><span className="serif-it">in</span> <span className="hot">MOTION</span></span>
              <span className="line korean-title">런플 6기</span>
            </h1>
            <p className="cover-deck">
              마카오 관광청 × 뉴발란스 협찬 <strong>런플루언서 6기</strong> 20인의 자유여행.
              세 종목, 세 도시, 세 날. 함께 달리고, 같이 자유롭게 — 각자 자기 페이스로.
            </p>
            <dl className="cover-credit">
              <div><dt>FLIGHT</dt> Jeju Air 7C</div>
              <div><dt>STAY</dt> StudioCity Macao</div>
              <div><dt>PAX</dt> 22</div>
              <div><dt>DURATION</dt> 3 Days</div>
            </dl>
          </div>

          <div className="cover-bib">
            <div className="cover-bib-card">
              <div className="meta-top">
                <span>BIB · 2026</span>
                <span><strong>★ MGTO × NB</strong></span>
              </div>
              <div className="num">
                26
                <span className="sup">JUN</span>
              </div>
              <div className="scale">
                <div><b>FRI</b>Day 1</div>
                <div><b>SAT</b>Day 2</div>
                <div><b>SUN</b>Day 3</div>
              </div>
            </div>

            <div className="cover-countdown">
              <div className="lbl">
                <span>Countdown</span>
                <span className="accent">TO TAKEOFF ↗</span>
              </div>
              <div className="grid">
                <div className="c hot"><div className="v">{String(days).padStart(2,'0')}</div><div className="l">Days</div></div>
                <div className="c"><div className="v">{String(hours).padStart(2,'0')}</div><div className="l">Hrs</div></div>
                <div className="c"><div className="v">{String(mins).padStart(2,'0')}</div><div className="l">Min</div></div>
                <div className="c"><div className="v">{String(secs).padStart(2,'0')}</div><div className="l">Sec</div></div>
              </div>
            </div>
          </div>
        </div>

        <div className="cover-rule-pattern" />

        <div className="cover-ticker">
          <div className="cell">
            <div className="v">22<span className="it">pax</span></div>
            <div className="l">Runfluencers</div>
          </div>
          <div className="cell">
            <div className="v">11.5<span className="it">km</span></div>
            <div className="l">Total Run</div>
          </div>
          <div className="cell">
            <div className="v">3<span className="it">sport</span></div>
            <div className="l">Run · Swim · Bike</div>
          </div>
          <div className="cell">
            <div className="v">5<span className="it">★</span></div>
            <div className="l">StudioCity</div>
          </div>
          <div className="cell">
            <div className="v">2N3D</div>
            <div className="l">06.26 — 06.28</div>
          </div>
        </div>
      </div>
    </header>
  );
}
window.Hero = Hero;

function Footer() {
  return (
    <footer>
      <div className="footer-inner">
        <div>
          <h5>Project</h5>
          <div className="big">MACAU<br /><span className="hot">RUNFLU—</span>ENCERS<br />2026</div>
          <p style={{marginTop:'14px',fontSize:'12px',opacity:.65,maxWidth:'34ch'}}>
            Macao Government Tourism Office 후원 / New Balance 협찬. 20인 한정 비공개 프로그램.
          </p>
        </div>
        <div>
          <h5>Operations</h5>
          <ul>
            <li>운영팀 (KakaoTalk 오픈채팅)</li>
            <li>긴급 연락처 · 010-XXXX-XXXX</li>
            <li>현지 가이드 · Macau +853</li>
            <li>응급 의료 · +853 28 333 333</li>
          </ul>
        </div>
        <div>
          <h5>Sponsors</h5>
          <ul>
            <li>Macao Government Tourism Office</li>
            <li>New Balance Korea</li>
            <li>StudioCity MACAO</li>
            <li>Jeju Air</li>
          </ul>
        </div>
      </div>
      <div className="footer-meta">
        <span>© 2026 · Private Event · v1.0</span>
        <span>MADE FOR THE RUN</span>
      </div>
    </footer>
  );
}
window.Footer = Footer;
