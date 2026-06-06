/* global React, PEOPLE, PLACES, CHECKLIST, ANNOUNCEMENTS, WEATHER_FORECAST */
// People · Places · Map · Info strip · Checklist · Announcements · Gallery · Sheet info

const { useState, useEffect, useMemo, useCallback } = React;

// ─── PEOPLE ───
function PersonCard({ p }) {
  // Instagram blocks direct profile-photo access and avatar proxies (unavatar.io)
  // rate-limit aggressively. We use DiceBear "initials" deterministically seeded
  // by handle — each person gets a unique colored card that doubles as a bib.
  // Click-through still opens the real IG profile in a new tab.
  const accent = encodeURIComponent('e15a3a,0a0908,2a2723,c84a32,1a1815');
  const seed = encodeURIComponent(p.ig);
  const avatar = `https://api.dicebear.com/9.x/initials/svg?seed=${seed}&backgroundColor=${accent}&textColor=f2efe7&fontSize=44&fontWeight=900&chars=2&radius=0`;
  const [photoSrc, setPhotoSrc] = useState(p.photo || avatar);
  useEffect(() => {
    setPhotoSrc(p.photo || avatar);
  }, [p.photo, avatar]);

  return (
    <a
      className={"person" + (p.lead ? " is-lead" : "")}
      href={`https://www.instagram.com/${p.ig}`}
      target="_blank"
      rel="noopener noreferrer"
      title={`@${p.ig}`}>
      <div className="person-bib">{p.bib}</div>
      <div className="person-photo">
        <img
          src={photoSrc}
          alt={p.name}
          loading="lazy"
          onError={() => setPhotoSrc(avatar)}
        />
      </div>
      <div className="person-info">
        <div className="nm">{p.name}</div>
        <div className="role">@{p.ig}</div>
      </div>
      <div className="person-hover">VIEW IG ↗</div>
    </a>
  );
}

function People() {
  return (
    <section id="people">
      <div className="section-hdr">
        <span className="num">04 / ROSTER</span>
        <h2><span className="it">the</span> 런플 6기</h2>
        <span className="meta">20 RUNFLUENCERS · 2 STAFF</span>
      </div>
      <div className="people-grid">
        {PEOPLE.map((p, i) => <PersonCard key={p.bib || p.name || i} p={p} />)}
      </div>
      <p style={{marginTop:'18px',fontFamily:'var(--f-mono)',fontSize:'11px',color:'var(--muted)',textTransform:'uppercase',letterSpacing:'0.08em'}}>
        ※ 카드 클릭 → 인스타그램 프로필 새 탭으로 열림 · 실제 프로필 사진은 별도 업로드 또는 시트 연동 시 자동 교체
      </p>
    </section>
  );
}
window.People = People;

// ─── PLACES ───
function Places() {
  return (
    <section id="places">
      <div className="section-hdr">
        <span className="num">05 / PLACES</span>
        <h2><span className="it">the</span> 장소</h2>
        <span className="meta">HOTEL · COURSES · RESTAURANTS</span>
      </div>
      <div className="places">
        {PLACES.map((p, i) => (
          <div key={i} className="place">
            <div className="place-img">
              <img src={p.img} alt={p.name} loading="lazy" />
              <span className="ph-tag">STOCK · 교체 예정</span>
            </div>
            <div className="place-body">
              <div className="type">{p.type}</div>
              <h4>{p.name}</h4>
              <p className="desc">{p.desc}</p>
              <div className="stats">
                {p.stats.map(([v, l], j) => (
                  <span key={j}><span className="v">{v}</span> {l}</span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
window.Places = Places;

// ─── MAP ───
function MapSection() {
  const ref = React.useRef(null);
  const mapRef = React.useRef(null);

  React.useEffect(() => {
    if (!ref.current || !window.L || mapRef.current) return;
    const L = window.L;

    // Center on Cotai (StudioCity area)
    const map = L.map(ref.current, {
      center: [22.150, 113.563],
      zoom: 14,
      zoomControl: true,
      scrollWheelZoom: false,
    });
    mapRef.current = map;

    // CartoDB Positron - clean minimal style that matches our editorial feel
    L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
      attribution: '&copy; OpenStreetMap &copy; CARTO',
      maxZoom: 19,
    }).addTo(map);

    const accent = getComputedStyle(document.documentElement).getPropertyValue('--hot').trim() || '#e15a3a';
    const ink = '#0a0908';

    // Hotel marker - StudioCity Macau
    const hotelIcon = L.divIcon({
      className: 'map-pin-hotel',
      html: `<div style="
        background: ${ink}; color: #f2efe7;
        width: 34px; height: 34px; border-radius: 50%;
        display:flex; align-items:center; justify-content:center;
        font-family: 'Archivo Black', sans-serif; font-size: 14px;
        border: 2px solid #f2efe7;
        box-shadow: 0 4px 12px rgba(0,0,0,.3);
      ">H</div>`,
      iconSize: [34, 34],
      iconAnchor: [17, 17],
    });
    L.marker([22.1463, 113.5709], { icon: hotelIcon }).addTo(map)
      .bindPopup('<b>StudioCity MACAO</b><br/>베이스 호텔 · 2박');

    // Day 1 - Cotai City Run (red route, illustrative polyline along Cotai strip)
    const d1 = [
      [22.1463, 113.5709], // hotel
      [22.1455, 113.5670],
      [22.1450, 113.5616], // venetian area
      [22.1465, 113.5570],
      [22.1488, 113.5555],
      [22.1510, 113.5575],
      [22.1495, 113.5640],
      [22.1463, 113.5709]
    ];
    L.polyline(d1, { color: accent, weight: 5, opacity: 0.9, lineCap: 'round' }).addTo(map);

    // Day 2 - Try Tri (small loop near Cotai sports zone)
    const d2 = [
      [22.1463, 113.5709],
      [22.1430, 113.5680],
      [22.1420, 113.5630],
      [22.1438, 113.5605],
      [22.1463, 113.5610],
      [22.1475, 113.5660],
      [22.1463, 113.5709]
    ];
    L.polyline(d2, { color: ink, weight: 4, opacity: 0.85, dashArray: '8 6', lineCap: 'round' }).addTo(map);

    // Day 3 - Taipa Heritage Run (loop through Taipa Village)
    const d3 = [
      [22.1463, 113.5709],
      [22.1510, 113.5605],
      [22.1556, 113.5550], // taipa village
      [22.1580, 113.5530],
      [22.1565, 113.5510],
      [22.1540, 113.5530],
      [22.1510, 113.5590],
      [22.1463, 113.5709]
    ];
    L.polyline(d3, { color: ink, weight: 4, opacity: 0.85, lineCap: 'round' }).addTo(map);

    // Course numbered pins
    const makePin = (text, bg, fg = '#fff') => L.divIcon({
      className: 'map-pin-num',
      html: `<div style="
        background: ${bg}; color: ${fg};
        padding: 4px 8px;
        font-family: 'JetBrains Mono', monospace; font-size: 11px;
        font-weight: 700; letter-spacing: 0.08em;
        border: 1.5px solid ${ink};
        box-shadow: 2px 2px 0 ${ink};
      ">${text}</div>`,
      iconSize: [40, 22],
      iconAnchor: [20, 11],
    });
    L.marker([22.1488, 113.5555], { icon: makePin('D1', accent) }).addTo(map)
      .bindPopup('<b>COTAI CITY RUN</b><br/>6.5km · 17:00 · 야간');
    L.marker([22.1430, 113.5605], { icon: makePin('D2', ink) }).addTo(map)
      .bindPopup('<b>TRY TRI MACAO</b><br/>Bike + Run + Swim · 09:00');
    L.marker([22.1556, 113.5550], { icon: makePin('D3', ink) }).addTo(map)
      .bindPopup('<b>TAIPA HERITAGE RUN</b><br/>5km · 07:30 · 헤리티지 코스');

    // Restaurant marker - Beifang Guan
    const foodIcon = L.divIcon({
      className: 'map-pin-food',
      html: `<div style="
        background: #f2efe7; color: ${ink};
        width: 22px; height: 22px;
        display:flex; align-items:center; justify-content:center;
        font-size: 12px;
        border: 1.5px solid ${ink};
        border-radius: 50%;
      ">🍽</div>`,
      iconSize: [22, 22],
      iconAnchor: [11, 11],
    });
    L.marker([22.1493, 113.5645], { icon: foodIcon }).addTo(map)
      .bindPopup('<b>北方館 BEIFANG GUAN</b><br/>네트워킹 디너 · 19:30');

    return () => { map.remove(); mapRef.current = null; };
  }, []);

  return (
    <section id="map">
      <div className="section-hdr">
        <span className="num">06 / COURSE MAP</span>
        <h2><span className="it">the</span> 지도</h2>
        <span className="meta">COTAI · TAIPA · INTERACTIVE</span>
      </div>
      <div className="map-wrap">
        <div className="map" ref={ref}>
          {/* Leaflet renders into the outer .map div above; this SVG is hidden fallback */}
          <svg viewBox="0 0 800 600" preserveAspectRatio="xMidYMid slice" style={{display:'none'}}>
            {/* paper-style backdrop */}
            <defs>
              <pattern id="dots" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
                <circle cx="2" cy="2" r="0.7" fill="rgba(10,9,8,0.18)" />
              </pattern>
              <pattern id="water" x="0" y="0" width="14" height="14" patternUnits="userSpaceOnUse">
                <path d="M0 7 Q 3.5 3, 7 7 T 14 7" stroke="rgba(10,9,8,0.18)" fill="none" strokeWidth="0.7"/>
              </pattern>
            </defs>
            <rect width="800" height="600" fill="#f2efe7"/>
            <rect width="800" height="600" fill="url(#dots)"/>

            {/* water bay */}
            <path d="M0 480 Q 200 440, 400 460 T 800 470 L 800 600 L 0 600 Z" fill="#e9e5d8"/>
            <path d="M0 480 Q 200 440, 400 460 T 800 470 L 800 600 L 0 600 Z" fill="url(#water)"/>
            <path d="M-20 100 Q 200 80, 350 100 Q 500 120, 800 90 L 800 -20 L -20 -20 Z" fill="#e9e5d8"/>
            <path d="M-20 100 Q 200 80, 350 100 Q 500 120, 800 90 L 800 -20 L -20 -20 Z" fill="url(#water)"/>

            {/* COTAI block */}
            <rect x="100" y="180" width="600" height="220" fill="none" stroke="#0a0908" strokeWidth="1" strokeDasharray="3 4"/>
            <text x="110" y="200" fontFamily="JetBrains Mono, monospace" fontSize="10" fill="#6b6760" letterSpacing="1.5">COTAI · TAIPA ISLAND</text>

            {/* Day 1 - Cotai City Run */}
            <path d="M150 290 Q 230 230, 320 280 Q 410 330, 500 270 Q 580 220, 640 280"
                  stroke="oklch(0.66 0.22 30)" strokeWidth="3.5" fill="none" strokeLinecap="round"
                  strokeDasharray="0" />
            {/* Day 2 - Try Tri (loop) */}
            <path d="M340 360 Q 290 320, 320 280 Q 360 250, 410 280 Q 450 320, 410 360 Q 380 380, 340 360 Z"
                  stroke="#0a0908" strokeWidth="2.5" fill="none" strokeLinecap="round"
                  strokeDasharray="6 4"/>
            {/* Day 3 - Taipa Heritage */}
            <path d="M520 380 Q 470 360, 460 320 Q 470 280, 530 290 Q 580 300, 600 350 Q 600 380, 550 390 Q 520 395, 520 380 Z"
                  stroke="#0a0908" strokeWidth="2.5" fill="none" strokeLinecap="round"/>

            {/* Hotel marker */}
            <g transform="translate(230,290)">
              <circle r="10" fill="#0a0908"/>
              <text x="0" y="4" textAnchor="middle" fontSize="11" fontWeight="700" fill="#f2efe7" fontFamily="Archivo Black, sans-serif">H</text>
              <text x="14" y="-4" fontSize="10" fill="#0a0908" fontFamily="JetBrains Mono, monospace" fontWeight="700">STUDIOCITY</text>
            </g>

            {/* Day labels */}
            <g transform="translate(640,260)">
              <rect x="0" y="-12" width="40" height="18" fill="oklch(0.66 0.22 30)"/>
              <text x="20" y="2" textAnchor="middle" fontSize="11" fill="white" fontWeight="700" fontFamily="JetBrains Mono, monospace">D1</text>
            </g>
            <g transform="translate(370,360)">
              <rect x="0" y="-12" width="40" height="18" fill="#0a0908"/>
              <text x="20" y="2" textAnchor="middle" fontSize="11" fill="white" fontWeight="700" fontFamily="JetBrains Mono, monospace">D2</text>
            </g>
            <g transform="translate(530,400)">
              <rect x="0" y="-12" width="40" height="18" fill="#0a0908"/>
              <text x="20" y="2" textAnchor="middle" fontSize="11" fill="white" fontWeight="700" fontFamily="JetBrains Mono, monospace">D3</text>
            </g>

            {/* N compass */}
            <g transform="translate(720,40)">
              <line x1="0" y1="0" x2="0" y2="22" stroke="#0a0908" strokeWidth="1.2"/>
              <polygon points="0,-4 -4,4 4,4" fill="#0a0908"/>
              <text x="0" y="-8" textAnchor="middle" fontSize="10" fontFamily="JetBrains Mono, monospace" fontWeight="700">N</text>
            </g>

            {/* scale */}
            <g transform="translate(110,540)">
              <line x1="0" y1="0" x2="80" y2="0" stroke="#0a0908" strokeWidth="1"/>
              <line x1="0" y1="-3" x2="0" y2="3" stroke="#0a0908" strokeWidth="1"/>
              <line x1="80" y1="-3" x2="80" y2="3" stroke="#0a0908" strokeWidth="1"/>
              <text x="40" y="15" textAnchor="middle" fontSize="9" fontFamily="JetBrains Mono, monospace" fill="#6b6760">2 KM</text>
            </g>

            <text x="40" y="60" fontFamily="Archivo Black, sans-serif" fontSize="24" fill="#0a0908" letterSpacing="-0.5">MACAU</text>
            <text x="40" y="80" fontFamily="JetBrains Mono, monospace" fontSize="10" fill="#6b6760" letterSpacing="2">COURSE OVERVIEW · ILLUSTRATIVE</text>
          </svg>
        </div>
        <div className="map-legend">
          <div className="lh">LEGEND</div>
          <div className="li">
            <div className="sw" style={{background:'oklch(0.66 0.22 30)'}}/>
            <div className="li-text">
              <div className="t">D1 · COTAI CITY RUN</div>
              <div className="d">6.5 km · flat · 야간 라이트런</div>
            </div>
          </div>
          <div className="li">
            <div className="sw" style={{background:'#0a0908'}}/>
            <div className="li-text">
              <div className="t">D2 · TRY TRI MACAO</div>
              <div className="d">Bike 8km + Run 3km + Swim 400m</div>
            </div>
          </div>
          <div className="li">
            <div className="sw" style={{background:'#0a0908',height:'2px',marginTop:'1px'}}/>
            <div className="li-text">
              <div className="t">D3 · TAIPA HERITAGE</div>
              <div className="d">5.0 km · 헤리티지 코스</div>
            </div>
          </div>
          <div className="li" style={{borderTop:'1px solid var(--ink)',background:'var(--paper-2)'}}>
            <div className="sw" style={{width:'14px',height:'14px',background:'#0a0908',borderRadius:'50%'}}/>
            <div className="li-text">
              <div className="t">STUDIOCITY MACAO</div>
              <div className="d">베이스 호텔 · 2박</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
window.MapSection = MapSection;

// ─── INFO STRIP (weather + timezone) ───
function InfoStrip() {
  const now = useNow(60000);
  // pretend local = Macau, +1h Korea (Macau UTC+8, Seoul UTC+9)
  const seoulOffset = 60 * 60 * 1000;
  const seoul = new Date(now.getTime() + seoulOffset);
  const fmt = (d) => `${String(d.getHours()).padStart(2,'0')}:${String(d.getMinutes()).padStart(2,'0')}`;

  return (
    <section id="info">
      <div className="section-hdr">
        <span className="num">07 / CONDITIONS</span>
        <h2><span className="it">on</span> GROUND</h2>
        <span className="meta">WEATHER · TIMEZONE · FX</span>
      </div>

      <div className="info-strip" style={{marginBottom: '20px'}}>
        <div className="info-cell">
          <div className="k">MACAU (MFM)</div>
          <div className="v small">{fmt(now)}</div>
          <div className="sub">UTC+8 · 현지시간</div>
        </div>
        <div className="info-cell">
          <div className="k">SEOUL (ICN)</div>
          <div className="v small">{fmt(seoul)}</div>
          <div className="sub">UTC+9 · KST · +1h</div>
        </div>
        <div className="info-cell">
          <div className="k">CURRENCY</div>
          <div className="v small">MOP / HKD</div>
          <div className="sub">1 KRW ≈ 0.006 MOP</div>
        </div>
        <div className="info-cell">
          <div className="k">PLUG</div>
          <div className="v small">UK 3-PIN</div>
          <div className="sub">220V · 어댑터 필수</div>
        </div>
      </div>

      <div className="info-strip">
        {WEATHER_FORECAST.map(w => (
          <div className="info-cell" key={w.date}>
            <div className="k">{w.date} · {w.label}</div>
            <div className="v">{w.high}°<span style={{fontSize:'18px',opacity:.5,marginLeft:'4px'}}>/ {w.low}°</span></div>
            <div className="sub">{w.cond} · ☔ {w.precip}%</div>
          </div>
        ))}
        <div className="info-cell">
          <div className="k">평균</div>
          <div className="v">31°<span style={{fontSize:'18px',opacity:.5,marginLeft:'4px'}}>/ 26°</span></div>
          <div className="sub">고온다습 · 우비 권장</div>
        </div>
      </div>
    </section>
  );
}
window.InfoStrip = InfoStrip;

// ─── CHECKLIST ───
function ChecklistSection() {
  const [checked, setChecked] = useState(() => {
    try { return JSON.parse(localStorage.getItem('mr-check') || '{}'); } catch { return {}; }
  });
  const toggle = (k) => {
    setChecked(c => {
      const n = { ...c, [k]: !c[k] };
      localStorage.setItem('mr-check', JSON.stringify(n));
      return n;
    });
  };

  return (
    <section id="check">
      <div className="section-hdr">
        <span className="num">08 / CHECKLIST</span>
        <h2><span className="it">the</span> 준비물</h2>
        <span className="meta">개인별 저장 · 브라우저 로컬</span>
      </div>
      <div className="checklist">
        {Object.entries(CHECKLIST).map(([cat, items]) => {
          const doneCount = items.filter(it => checked[`${cat}::${it}`]).length;
          return (
            <div key={cat} className="check-group">
              <h4>
                {cat}
                <span className="cnt">{doneCount} / {items.length}</span>
              </h4>
              {items.map(it => {
                const k = `${cat}::${it}`;
                const done = checked[k];
                return (
                  <div key={it} className={"check-item" + (done ? ' done' : '')} onClick={() => toggle(k)}>
                    <div className="box" />
                    <div className="lbl">{it}</div>
                  </div>
                );
              })}
            </div>
          );
        })}
      </div>
    </section>
  );
}
window.ChecklistSection = ChecklistSection;

// ─── ANNOUNCEMENTS ───
function Announcements() {
  return (
    <section id="news">
      <div className="section-hdr">
        <span className="num">09 / UPDATES</span>
        <h2><span className="it">the</span> 공지</h2>
        <span className="meta">FROM OPS · 최신순</span>
      </div>
      <div className="annlist">
        {ANNOUNCEMENTS.map((a, i) => (
          <div key={i} className={"ann" + (a.pin ? " pin" : "")}>
            <div className="ann-date">{a.date}<br/>2026</div>
            <div className="ann-body">
              <div className="title">
                {a.pin && <span className="pin-tag">★ PINNED</span>}
                {a.title}
              </div>
              <div className="desc">{a.desc}</div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
window.Announcements = Announcements;

// ─── RECOMMENDED COURSES ───
function RecommendedCourses() {
  const courses = [
    {
      tag: "Previous",
      name: "클라이밍",
      desc: "전신 밸런스와 집중력을 끌어올리는 실내 액티브 세션.",
      fit: "Indoor · 90min",
      href: "https://veerixhk.com/en/pages/solution-climbing",
      img: "https://images.unsplash.com/photo-1522163182402-834f871fd851?auto=format&fit=crop&w=900&q=80",
    },
    {
      tag: "Previous",
      name: "복싱",
      desc: "짧고 강한 펀치 콤비네이션으로 자유시간 텐션을 올리는 코스.",
      fit: "Sweat · 60min",
      href: "https://macaulifestyle.com/city-guide/top-fighting-meng-hou-sparta-club/",
      img: "https://images.unsplash.com/photo-1549719386-74dfcbf7dbed?auto=format&fit=crop&w=900&q=80",
    },
    {
      tag: "Previous",
      name: "크로스핏",
      desc: "팀 미션형 WOD로 서로 페이스를 맞추며 운동하는 코스.",
      fit: "Group · 75min",
      href: "https://www.crossfit.com/gym/30583/try-2-be-crossfit",
      img: "https://images.unsplash.com/photo-1534258936925-c58bed479fcb?auto=format&fit=crop&w=900&q=80",
    },
    {
      tag: "Previous",
      name: "쿠킹클래스",
      desc: "마카오 미식 도시 무드에 맞춘 로컬 푸드 체험형 클래스.",
      fit: "Local · 2h",
      href: "https://www.gastronomy.gov.mo/",
      img: "https://images.unsplash.com/photo-1556911220-bff31c812dba?auto=format&fit=crop&w=900&q=80",
    },
    {
      tag: "Previous",
      name: "트레일런",
      desc: "기아 힐처럼 짧은 업다운이 있는 코스로 러닝 감각 전환.",
      fit: "Run · 5-7km",
      href: "https://www.macaotourism.gov.mo/en/sight/guia-fortress-including-guia-chapel-and-lighthouse",
      img: "https://commons.wikimedia.org/wiki/Special:Redirect/file/Guia%20Fortress.jpg",
    },
    {
      tag: "Previous",
      name: "학사비치 해수욕장",
      desc: "바다 앞 쿨다운, 수영, 자유 촬영까지 이어지는 리커버리 코스.",
      fit: "Swim · Free",
      href: "https://www.macaotourism.gov.mo/ko/shows-and-entertainment/sports-and-recreation/beaches-and-nautical-sports",
      img: "https://commons.wikimedia.org/wiki/Special:Redirect/file/Hac%20Sa%20Beach%2009-04-2025%281%29.jpg",
    },
    {
      tag: "Codex Pick",
      name: "타이파 워터프런트 사이클",
      desc: "코타이에서 가볍게 넘어가 석양 시간대에 타기 좋은 평지 코스.",
      fit: "Bike · Sunset",
      href: "https://www.macaotourism.gov.mo/en/sight/cycling",
      img: "https://images.unsplash.com/photo-1485965120184-e220f721d03e?auto=format&fit=crop&w=900&q=80",
    },
    {
      tag: "Codex Pick",
      name: "기아 힐 모닝런",
      desc: "짧은 언덕, 전망, 유산 스팟이 한 번에 잡히는 아침 러닝 후보.",
      fit: "Run · Morning",
      href: "https://www.macaotourism.gov.mo/en/sight/guia-fortress-including-guia-chapel-and-lighthouse",
      img: "https://commons.wikimedia.org/wiki/Special:Redirect/file/Guia%20Fortress.jpg",
    },
    {
      tag: "Codex Pick",
      name: "마카오 타워 스카이파크",
      desc: "고소공포증만 괜찮다면 팀 콘텐츠로 가장 강한 한 컷이 나오는 곳.",
      fit: "Adrenaline",
      href: "https://www.skyparkmacau.com/about",
      img: "https://commons.wikimedia.org/wiki/Special:Redirect/file/Macau-tower%201.jpg",
    },
    {
      tag: "Codex Pick",
      name: "콜로안 카트",
      desc: "운동 뒤 경쟁심을 깔끔하게 태우기 좋은 짧고 선명한 레이스 코스.",
      fit: "Kart · 1.2km",
      href: "https://www.macaotourism.gov.mo/en/sight/karting",
      img: "https://images.unsplash.com/photo-1521412644187-c49fa049e84d?auto=format&fit=crop&w=900&q=80",
    },
  ];

  return (
    <section id="courses">
      <div className="section-hdr">
        <span className="num">10 / RECOMMEND</span>
        <h2><span className="it">the</span> 추천 코스</h2>
        <span className="meta">PREVIOUS CLASSES · ACTIVITY IDEAS</span>
      </div>
      <div className="course-board">
        <div className="course-lead">
          <div className="course-kicker">RUNFLUENCER ARCHIVE</div>
          <h3>이전 기수들이 좋았다고 남긴 액티브 코스들.</h3>
          <p>러닝만으로 끝내지 않고 몸을 쓰는 클래스, 로컬 체험, 바다 쿨다운까지 자유시간 후보로 묶었습니다.</p>
        </div>
        <div className="course-grid">
          {courses.map((course, i) => (
            <div key={course.name} className="course-card">
              <div className="course-img">
                <img src={course.img} alt={course.name} loading="lazy" />
                <span>{course.tag}</span>
              </div>
              <div className="course-body">
                <div className="course-index">{String(i + 1).padStart(2, '0')}</div>
                <div>
                  <div className="course-tag">{course.tag}</div>
                  <h4>{course.name}</h4>
                  <p>{course.desc}</p>
                </div>
                <div className="course-bottom">
                  <div className="course-fit">{course.fit}</div>
                  <a href={course.href} target="_blank" rel="noopener noreferrer">LINK</a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
window.RecommendedCourses = RecommendedCourses;

// ─── GALLERY ───
function Gallery() {
  const slots = Array.from({length: 12});
  return (
    <section id="gallery">
      <div className="section-hdr">
        <span className="num">11 / AFTER</span>
        <h2><span className="it">the</span> 갤러리</h2>
        <span className="meta">여행 후 · COMING JUN 28</span>
      </div>
      <div className="gallery">
        {slots.map((_, i) => (
          <div key={i} className="gphoto">
            <div className="gphoto-empty">
              <div className="ico">◷</div>
              <div>SOON</div>
            </div>
          </div>
        ))}
      </div>
      <div className="gallery-cta">
        <h4>여행 후 업로드 예정</h4>
        <p>참가자 사진 / 운영팀 공식 촬영 / 영상 콘텐츠 — 6/29부터 순차 공개</p>
      </div>
    </section>
  );
}
window.Gallery = Gallery;
