/* global React, FREE_SLOTS, PERSONAL, ACTIVITY_META, PEOPLE */
// Personal schedule — By Group (who's doing what) + By Person (single calendar)

const { useState, useMemo, useEffect } = React;

// Helper: find activity meta with fallback
function metaFor(activity) {
  return ACTIVITY_META[activity] || { emoji: "📍", color: "#6b6760" };
}

// Helper: find person record by name
function personByName(name) {
  return PEOPLE.find(p => p.name === name);
}

// ─── BY GROUP view ───────────────────────────────────────────
function ByGroupView() {
  // Group PERSONAL records by slot, then by activity.
  const grouped = useMemo(() => {
    const result = {};
    FREE_SLOTS.forEach(s => result[s.id] = {});
    PERSONAL.forEach(p => {
      if (!result[p.slot]) result[p.slot] = {};
      if (!result[p.slot][p.activity]) result[p.slot][p.activity] = [];
      result[p.slot][p.activity].push(p);
    });
    return result;
  }, []);

  return (
    <div className="bygroup">
      {FREE_SLOTS.map(slot => {
        const acts = grouped[slot.id] || {};
        // Sort activities by participant count desc
        const sortedActs = Object.entries(acts).sort(([,a], [,b]) => b.length - a.length);
        const total = Object.values(acts).reduce((s, arr) => s + arr.length, 0);
        return (
          <div key={slot.id} className="slot-block">
            <div className="slot-hd">
              <div className="slot-num">{slot.label}</div>
              <div className="slot-title"><span className="it">the</span> {slot.title}</div>
              <div className="slot-cnt">{total} / 22 PAX</div>
            </div>
            <div className="slot-desc">{slot.desc}</div>
            <div className="group-grid">
              {sortedActs.map(([activity, members]) => {
                const m = metaFor(activity);
                return (
                  <div key={activity} className="group-card">
                    <div className="group-hd">
                      <span className="group-emoji">{m.emoji}</span>
                      <div className="group-title">{activity}</div>
                      <div className="group-cnt">{members.length}<span>명</span></div>
                    </div>
                    <div className="group-members">
                      {members.map((mem, i) => {
                        const pr = personByName(mem.name);
                        const ig = pr ? pr.ig : null;
                        return (
                          <a
                            key={i}
                            className="mem-chip"
                            href={ig ? `https://www.instagram.com/${ig}` : '#'}
                            target={ig ? '_blank' : undefined}
                            rel="noopener noreferrer"
                            title={ig ? `@${ig}` : mem.name}
                          >
                            {mem.name}
                            {mem.note && <span className="mem-note"> · {mem.note}</span>}
                          </a>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
}

// ─── BY PERSON view ─────────────────────────────────────────
function ByPersonView() {
  const names = PEOPLE.map(p => p.name);
  const [selected, setSelected] = useState(() => localStorage.getItem('mr-me') || PEOPLE[2]?.name || names[0]);
  useEffect(() => { localStorage.setItem('mr-me', selected); }, [selected]);

  const person = personByName(selected);
  const myItems = useMemo(() => PERSONAL.filter(p => p.name === selected), [selected]);

  // Who else is doing the same things?
  const buddies = useMemo(() => {
    const byActivity = {};
    myItems.forEach(my => {
      byActivity[my.slot] = PERSONAL
        .filter(p => p.slot === my.slot && p.activity === my.activity && p.name !== selected)
        .map(p => p.name);
    });
    return byActivity;
  }, [myItems, selected]);

  return (
    <div className="byperson">
      <div className="picker">
        <div className="picker-label">PICK YOUR NAME</div>
        <div className="picker-grid">
          {PEOPLE.map(p => (
            <button
              key={p.bib}
              className={"picker-chip" + (p.name === selected ? " active" : "") + (p.lead ? " lead" : "")}
              onClick={() => setSelected(p.name)}
            >
              <span className="picker-bib">{p.bib}</span>
              <span className="picker-nm">{p.name}</span>
            </button>
          ))}
        </div>
      </div>

      {person && (
        <div className="person-detail">
          <div className="person-detail-hd">
            <div className="pd-bib">{person.bib}</div>
            <div className="pd-info">
              <div className="pd-name">{person.name}</div>
              <a className="pd-ig" href={`https://www.instagram.com/${person.ig}`} target="_blank" rel="noopener noreferrer">
                @{person.ig} ↗
              </a>
            </div>
            <div className="pd-role">{person.role}</div>
          </div>

          {myItems.length === 0 ? (
            <div className="pd-empty">아직 자유시간 일정이 등록되지 않았어요.</div>
          ) : (
            <div className="pd-slots">
              {FREE_SLOTS.map(slot => {
                const mine = myItems.find(p => p.slot === slot.id);
                if (!mine) return null;
                const m = metaFor(mine.activity);
                const others = buddies[slot.id] || [];
                return (
                  <div key={slot.id} className="pd-slot">
                    <div className="pd-slot-time">{slot.label}</div>
                    <div className="pd-slot-body">
                      <div className="pd-slot-title">
                        <span className="pd-slot-emoji">{m.emoji}</span>
                        {mine.activity}
                      </div>
                      {mine.note && <div className="pd-slot-note">{mine.note}</div>}
                      {others.length > 0 ? (
                        <div className="pd-slot-buddies">
                          <span className="pd-slot-lbl">같이 가는 사람 ({others.length})</span>
                          <div className="buddy-chips">
                            {others.map(n => (
                              <span key={n} className="buddy-chip">{n}</span>
                            ))}
                          </div>
                        </div>
                      ) : (
                        <div className="pd-slot-solo">SOLO · 혼자 시간</div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

// ─── Main section ──────────────────────────────────────────
function PersonalSchedule() {
  const [view, setView] = useState('group');

  return (
    <section id="personal">
      <div className="section-hdr">
        <span className="num">03 / FREE TIME</span>
        <h2>개인 일정<br/><span className="it">who&apos;s</span> WHERE</h2>
        <span className="meta">자유시간 · 활동별 그룹핑</span>
      </div>

      <div className="personal-intro">
        <p>
          자유시간에 누가 어디 가는지. 시트 <code>PERSONAL</code> 탭에서 각자 채우면 같은 활동끼리 자동으로 묶입니다.
          같은 그룹으로 갈 사람 찾거나, 본인 일정만 보고 싶으면 뷰 바꿔보세요.
        </p>
      </div>

      <div className="view-toggle" role="tablist" style={{marginBottom:'30px'}}>
        <button className={view === 'group' ? 'active' : ''} onClick={() => setView('group')}>▦ By Group · 활동별</button>
        <button className={view === 'person' ? 'active' : ''} onClick={() => setView('person')}>◉ By Person · 본인만</button>
      </div>

      {view === 'group' ? <ByGroupView /> : <ByPersonView />}
    </section>
  );
}
window.PersonalSchedule = PersonalSchedule;
