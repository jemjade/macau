/* global React, SCHEDULE */
// Schedule with timeline / cards / list views, current-time highlight, modal detail + RSVP.

const { useState, useEffect, useMemo, useCallback } = React;

// localStorage-backed RSVP map
function useRsvp() {
  const [map, setMap] = useState(() => {
    try { return JSON.parse(localStorage.getItem('mr-rsvp') || '{}'); } catch { return {}; }
  });
  const set = useCallback((key, val) => {
    setMap(m => {
      const next = { ...m, [key]: val };
      localStorage.setItem('mr-rsvp', JSON.stringify(next));
      return next;
    });
  }, []);
  return [map, set];
}

// Parse "HH:MM" on a given YYYY-MM-DD as a Macau (UTC+8) Date
function tsFor(date, time) {
  if (!time) return null;
  return new Date(`${date}T${time}:00+08:00`);
}

function statusOf(item, day, now) {
  const start = tsFor(day.date, item.time);
  if (!start) return 'future';
  let end;
  if (item.end) end = tsFor(day.date, item.end);
  else end = new Date(start.getTime() + 30 * 60000); // default 30min window
  if (now < start) return 'future';
  if (now >= start && now < end) return 'now';
  return 'past';
}

function DayHdr({ day, isToday }) {
  const dateStr = day.date ? String(day.date).replace(/-/g, '.') : '';
  return (
    <div className={"day-hdr" + (isToday ? " is-today" : "")}>
      <div className="day-num">DAY {day.day}</div>
      <div className="day-info">
        <div className="day-date">
          {dateStr}{dateStr && day.label ? ' · ' : ''}{day.label}
        </div>
        <div className="day-title">{day.title}</div>
      </div>
      <div className="day-tag">{isToday ? "TODAY" : day.label}</div>
    </div>
  );
}

// ─── TIMELINE view ───
function TimelineView({ day, now, onPick }) {
  return (
    <div className="tl">
      {day.items.map((it, i) => {
        const st = statusOf(it, day, now);
        const cls = [
          'tl-row',
          it.hero ? 'is-hero' : '',
          st === 'now' ? 'is-now' : '',
          st === 'past' ? 'is-past' : ''
        ].filter(Boolean).join(' ');
        return (
          <div key={i} className={cls} onClick={() => onPick({ day, item: it })}>
            <div className="time">{it.time}{it.end ? `–${it.end}` : ''}</div>
            <div className="axis"><div className="pin" /></div>
            <div className="body">
              <div className="title">
                <span className="icon">{it.icon}</span>
                {it.title}
              </div>
              <div className="sub">{it.sub}</div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

// ─── CARDS view ───
function CardsView({ day, now, onPick }) {
  return (
    <div className="cards">
      {day.items.map((it, i) => {
        const st = statusOf(it, day, now);
        const cls = [
          'card',
          it.hero ? 'is-hero' : '',
          st === 'now' ? 'is-now' : '',
          st === 'past' ? 'is-past' : ''
        ].filter(Boolean).join(' ');
        return (
          <div key={i} className={cls} onClick={() => onPick({ day, item: it })}>
            {st === 'now' && <div className="card-now-tag">● NOW</div>}
            <div className="card-time">{it.time}{it.end ? ` – ${it.end}` : ''}</div>
            <div className="card-title">{it.icon} {it.title}</div>
            <div className="card-sub">{it.sub}</div>
          </div>
        );
      })}
    </div>
  );
}

// ─── LIST view ───
function ListView({ day, now, onPick }) {
  return (
    <div>
      {day.items.map((it, i) => {
        const st = statusOf(it, day, now);
        const cls = [
          'list-row',
          it.hero ? 'is-hero' : '',
          st === 'now' ? 'is-now' : '',
          st === 'past' ? 'is-past' : ''
        ].filter(Boolean).join(' ');
        return (
          <div key={i} className={cls} onClick={() => onPick({ day, item: it })}>
            <div className="list-time">{it.time}</div>
            <div className="list-title"><span>{it.icon}</span> {it.title}</div>
            <div className="list-arrow">→</div>
          </div>
        );
      })}
    </div>
  );
}

// ─── Modal ───
function Modal({ data, onClose }) {
  const [rsvp, setRsvp] = useRsvp();
  if (!data) return null;
  const { day, item } = data;
  const key = `${day.date}-${item.time}-${item.title}`;
  const myRsvp = rsvp[key];
  const yesCount = useMemo(() => {
    // pseudo count: number of "yes" + 1 for ambiance
    const all = Object.entries(rsvp).filter(([k,v]) => k.startsWith(`${day.date}-${item.time}`));
    return all.filter(([,v]) => v === 'yes').length;
  }, [rsvp, day.date, item.time]);

  useEffect(() => {
    const h = (e) => e.key === 'Escape' && onClose();
    document.addEventListener('keydown', h);
    return () => document.removeEventListener('keydown', h);
  }, [onClose]);

  return (
    <div className="modal-veil" onClick={onClose}>
      <div className="modal" onClick={e => e.stopPropagation()}>
        <div className="modal-hd">
          <div>
            <div className="modal-time">
              DAY {day.day} · {day.date.replaceAll('-', '.')} · {item.time}{item.end ? `–${item.end}` : ''}
            </div>
            <h3>{item.icon} {item.title}</h3>
          </div>
          <button className="modal-close" onClick={onClose}>✕</button>
        </div>
        <div className="modal-body">
          <p style={{fontSize:'14px',lineHeight:1.6}}>{item.desc}</p>
          <div className="modal-meta">
            <div className="k">시간</div><div>{item.time}{item.end ? ` – ${item.end}` : ''} (현지시간)</div>
            <div className="k">장소</div><div>{item.location}</div>
            <div className="k">카테고리</div><div>{item.sub}</div>
          </div>
          {item.rsvp && (
            <div className="modal-rsvp">
              <div className="lbl">자유시간 / 옵션 활동 · RSVP</div>
              {item.options && (
                <div style={{fontSize:'12px',marginBottom:'10px',color:'var(--muted)'}}>
                  추천 옵션: {item.options.join(' · ')}
                </div>
              )}
              <div className="rsvp-row">
                <button
                  className={"rsvp-btn yes" + (myRsvp === 'yes' ? ' active' : '')}
                  onClick={() => setRsvp(key, myRsvp === 'yes' ? null : 'yes')}>
                  ✓ 참석
                </button>
                <button
                  className={"rsvp-btn no" + (myRsvp === 'no' ? ' active' : '')}
                  onClick={() => setRsvp(key, myRsvp === 'no' ? null : 'no')}>
                  ✕ 자유 / 불참
                </button>
              </div>
              <div className="rsvp-count">
                내 상태: {myRsvp === 'yes' ? '✓ 참석' : myRsvp === 'no' ? '✕ 자유/불참' : '미응답'}
                {yesCount > 0 && ` · 참석 ${yesCount}명`}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// ─── Section ───
function Schedule({ defaultView = 'timeline' }) {
  const [view, setView] = useState(defaultView);
  useEffect(() => { setView(defaultView); }, [defaultView]);
  const now = useNow(30000);
  const [picked, setPicked] = useState(null);

  const todayDate = now.toISOString().slice(0,10);

  const Views = { timeline: TimelineView, cards: CardsView, list: ListView };
  const V = Views[view];

  return (
    <section id="schedule">
      <div className="section-hdr">
        <span className="num">02 / SCHEDULE</span>
        <h2><span className="it">the</span> 일정</h2>
        <span className="meta">3 DAYS · 16 SESSIONS · LIVE</span>
      </div>

      <div className="view-toggle" role="tablist">
        <button className={view === 'timeline' ? 'active' : ''} onClick={() => setView('timeline')}>▤ Timeline</button>
        <button className={view === 'cards' ? 'active' : ''} onClick={() => setView('cards')}>▦ Cards</button>
        <button className={view === 'list' ? 'active' : ''} onClick={() => setView('list')}>≡ List</button>
      </div>

      {SCHEDULE.map(day => (
        <div key={day.day} style={{marginBottom: '50px'}}>
          <DayHdr day={day} isToday={day.date === todayDate} />
          <V day={day} now={now} onPick={setPicked} />
        </div>
      ))}

      <Modal data={picked} onClose={() => setPicked(null)} />
    </section>
  );
}
window.Schedule = Schedule;
