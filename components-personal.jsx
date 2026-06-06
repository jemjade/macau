/* global React, FREE_SLOTS, PERSONAL, ACTIVITY_META, PEOPLE */
// Personal schedule — By Group (who's doing what) + By Person (single calendar)

const { useState, useMemo, useEffect } = React;
const PERSONAL_EDIT_KEY = 'mr-personal-edits-v1';

// Helper: find activity meta with fallback
function metaFor(activity) {
  return ACTIVITY_META[activity] || { emoji: "📍", color: "#6b6760" };
}

// Helper: find person record by name
function personByName(name) {
  return PEOPLE.find(p => p.name === name);
}

function personalKey(name, slot) {
  return `${name}::${slot}`;
}

function loadPersonalEdits() {
  try {
    return JSON.parse(localStorage.getItem(PERSONAL_EDIT_KEY) || "{}");
  } catch (err) {
    return {};
  }
}

function savePersonalEdits(edits) {
  localStorage.setItem(PERSONAL_EDIT_KEY, JSON.stringify(edits));
}

function mergePersonal(edits) {
  const map = new Map();
  PERSONAL.forEach(item => {
    map.set(personalKey(item.name, item.slot), Object.assign({}, item));
  });
  Object.values(edits || {}).forEach(item => {
    if (!item || !item.name || !item.slot || !item.activity) return;
    map.set(personalKey(item.name, item.slot), Object.assign({}, item, { edited: true }));
  });
  return Array.from(map.values());
}

function activityOptions() {
  const defaults = [
    "베니션 야경 산책",
    "코타이 야시장",
    "카지노 투어 · 갤럭시",
    "호텔 라운지 · 휴식",
    "세나도 광장 + 성 바울 성당",
    "타이파 빌리지 푸드 투어",
    "마카오 타워 번지점프",
    "베니션 곤돌라",
    "수영장 · 호텔",
    "쇼핑 · 코타이 갤러리",
    "마지막 쇼핑 / 카페",
    "타이파 빌리지 재방문",
    "호텔 휴식",
    "클라이밍",
    "복싱",
    "크로스핏",
    "쿠킹클래스",
    "트레일런",
    "학사비치 해수욕장",
    "타이파 워터프런트 사이클",
    "기아 힐 모닝런",
    "마카오 타워 스카이파크",
    "콜로안 카트",
  ];
  const set = new Set(defaults);
  PERSONAL.forEach(item => set.add(item.activity));
  return Array.from(set);
}

// ─── BY GROUP view ───────────────────────────────────────────
function ByGroupView({ personal }) {
  // Group PERSONAL records by slot, then by activity.
  const grouped = useMemo(() => {
    const result = {};
    FREE_SLOTS.forEach(s => result[s.id] = {});
    personal.forEach(p => {
      if (!result[p.slot]) result[p.slot] = {};
      if (!result[p.slot][p.activity]) result[p.slot][p.activity] = [];
      result[p.slot][p.activity].push(p);
    });
    return result;
  }, [personal]);

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
function ByPersonView({ personal, selected, setSelected }) {
  useEffect(() => { localStorage.setItem('mr-me', selected); }, [selected]);

  const person = personByName(selected);
  const myItems = useMemo(() => personal.filter(p => p.name === selected), [personal, selected]);

  // Who else is doing the same things?
  const buddies = useMemo(() => {
    const byActivity = {};
    myItems.forEach(my => {
      byActivity[my.slot] = personal
        .filter(p => p.slot === my.slot && p.activity === my.activity && p.name !== selected)
        .map(p => p.name);
    });
    return byActivity;
  }, [myItems, personal, selected]);

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

// ─── EDITOR ────────────────────────────────────────────────
function PersonalEditor({ personal, selected, setSelected, edits, setEdits }) {
  const options = useMemo(activityOptions, []);
  const [draft, setDraft] = useState({});
  const [status, setStatus] = useState("");

  useEffect(() => {
    const next = {};
    FREE_SLOTS.forEach(slot => {
      const item = personal.find(p => p.name === selected && p.slot === slot.id) || {};
      next[slot.id] = {
        activity: item.activity || "",
        note: item.note || "",
      };
    });
    setDraft(next);
    setStatus("");
  }, [personal, selected]);

  function setSlot(slotId, field, value) {
    setDraft(prev => Object.assign({}, prev, {
      [slotId]: Object.assign({}, prev[slotId], { [field]: value }),
    }));
  }

  function saveMine() {
    const next = Object.assign({}, edits);
    FREE_SLOTS.forEach(slot => {
      const row = draft[slot.id] || {};
      if (!row.activity) return;
      next[personalKey(selected, slot.id)] = {
        name: selected,
        slot: slot.id,
        activity: row.activity,
        note: row.note || "",
      };
    });
    savePersonalEdits(next);
    setEdits(next);
    setStatus("저장 완료 · 이 기기에서 바로 반영됐어요");
  }

  function resetMine() {
    const next = Object.assign({}, edits);
    FREE_SLOTS.forEach(slot => delete next[personalKey(selected, slot.id)]);
    savePersonalEdits(next);
    setEdits(next);
    setStatus("내 수정값을 초기화했어요");
  }

  async function copyUpdate() {
    const lines = [
      `[개인 일정 수정] ${selected}`,
      ...FREE_SLOTS.map(slot => {
        const row = draft[slot.id] || {};
        return `${slot.label}: ${row.activity || "미정"}${row.note ? ` · ${row.note}` : ""}`;
      }),
    ];
    const text = lines.join('\n');
    try {
      await navigator.clipboard.writeText(text);
      setStatus("운영진에게 보낼 수정 내용이 복사됐어요");
    } catch (err) {
      setStatus(text);
    }
  }

  return (
    <div className="personal-editor">
      <div className="editor-head">
        <div>
          <div className="editor-kicker">EDIT YOUR FREE TIME</div>
          <h3>내 자유시간 일정 수정</h3>
        </div>
        <label className="editor-name">
          <span>NAME</span>
          <select value={selected} onChange={e => setSelected(e.target.value)}>
            {PEOPLE.map(p => <option key={p.bib} value={p.name}>{p.bib} · {p.name}</option>)}
          </select>
        </label>
      </div>

      <div className="editor-grid">
        {FREE_SLOTS.map(slot => {
          const row = draft[slot.id] || {};
          return (
            <div key={slot.id} className="editor-row">
              <div className="editor-slot">
                <b>{slot.title}</b>
                <span>{slot.label}</span>
              </div>
              <select
                value={row.activity || ""}
                onChange={e => setSlot(slot.id, 'activity', e.target.value)}
              >
                <option value="">미정</option>
                {options.map(opt => <option key={opt} value={opt}>{opt}</option>)}
              </select>
              <input
                value={row.note || ""}
                onChange={e => setSlot(slot.id, 'note', e.target.value)}
                placeholder="메모 · 집결시간 · 예약명"
              />
            </div>
          );
        })}
      </div>

      <div className="editor-actions">
        <button onClick={saveMine}>저장</button>
        <button className="secondary" onClick={copyUpdate}>수정 내용 복사</button>
        <button className="ghost" onClick={resetMine}>초기화</button>
        {status && <span className="editor-status">{status}</span>}
      </div>
    </div>
  );
}

// ─── Main section ──────────────────────────────────────────
function PersonalSchedule() {
  const [view, setView] = useState('group');
  const [selected, setSelected] = useState(() => localStorage.getItem('mr-me') || PEOPLE[2]?.name || PEOPLE[0]?.name);
  const [edits, setEdits] = useState(loadPersonalEdits);
  const personal = useMemo(() => mergePersonal(edits), [edits]);

  return (
    <section id="personal">
      <div className="section-hdr">
        <span className="num">03 / FREE TIME</span>
        <h2>개인 일정<br/><span className="it">who&apos;s</span> WHERE</h2>
        <span className="meta">자유시간 · 활동별 그룹핑</span>
      </div>

      <div className="personal-intro">
        <p>
          자유시간에 누가 어디 가는지. 아래에서 본인 일정을 수정하면 활동별 그룹핑과 개인뷰에 바로 반영됩니다.
          지금 저장은 이 기기 기준이고, 운영진 공유용으로 수정 내용을 복사할 수 있어요.
        </p>
      </div>

      <PersonalEditor
        personal={personal}
        selected={selected}
        setSelected={setSelected}
        edits={edits}
        setEdits={setEdits}
      />

      <div className="view-toggle" role="tablist" style={{marginBottom:'30px'}}>
        <button className={view === 'group' ? 'active' : ''} onClick={() => setView('group')}>▦ By Group · 활동별</button>
        <button className={view === 'person' ? 'active' : ''} onClick={() => setView('person')}>◉ By Person · 본인만</button>
      </div>

      {view === 'group'
        ? <ByGroupView personal={personal} />
        : <ByPersonView personal={personal} selected={selected} setSelected={setSelected} />}
    </section>
  );
}
window.PersonalSchedule = PersonalSchedule;
