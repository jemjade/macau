/* global React, ReactDOM, RUNFLUENCER_PARTICIPANTS, RUNFLUENCER_FREE_TIME_SLOTS, RUNFLUENCER_MATCHED_GROUPS, RUNFLUENCER_ROUTE_LIBRARY */

const { useEffect, useMemo, useState } = React;

function Pill({ children, tone = "default" }) {
  return <span className={`matcher-pill ${tone}`}>{children}</span>;
}

function CopyButton({ text, children, className = "" }) {
  const [copied, setCopied] = useState(false);

  async function copy() {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 1600);
    } catch (err) {
      setCopied(false);
      window.prompt("복사할 내용을 선택해 주세요.", text);
    }
  }

  return (
    <button className={`matcher-copy ${className}`} type="button" onClick={copy}>
      {copied ? "복사 완료!" : children}
    </button>
  );
}

const SLOT_INPUT_CONFIG = [
  {
    id: "d1-night",
    groups: [
      { label: "야경 포토", description: "Cotai 야경 산책 / Wynn Palace 분수", tags: ["야경", "사진", "릴스"], details: ["Cotai 야경 산책", "Wynn Palace 분수 포토 스팟"] },
      { label: "디저트 카페", description: "Taipa 디저트 워크 / 호텔 라운지", tags: ["디저트", "카페", "사진"], details: ["Taipa 디저트 워크", "호텔 근처 카페/라운지"] },
      { label: "카지노 구경", description: "짧게 둘러보고 분위기 보기", tags: ["카지노 구경", "야경", "브이로그"], details: ["카지노 구경"] },
      { label: "쇼핑 산책", description: "Cotai Gallery 짧은 쇼핑 루프", tags: ["쇼핑", "근거리"], details: ["Cotai Gallery 짧은 쇼핑 루프"] },
      { label: "회복 휴식", description: "호텔 근처에서 조용히 쉬기", tags: ["회복", "호텔", "카페"], details: ["호텔 휴식", "호텔 근처 카페/라운지"] },
      { label: "운영진 추천", description: "아직 모르겠고 잘 맞는 쪽으로", tags: ["운영진 추천"], details: [] },
    ],
  },
  {
    id: "d2-pm",
    groups: [
      { label: "로컬 먹거리", description: "Taipa Village / 디저트 / 먹방 콘텐츠", tags: ["로컬맛집", "디저트", "먹방 릴스"], details: ["Taipa Village 먹거리 코스", "Senado Square 로컬 스낵 코스"] },
      { label: "문화유산 포토", description: "Senado Square / 성 바울 성당", tags: ["문화유산", "사진", "도시산책"], details: ["Senado Square / 성 바울 성당 포토 워크"] },
      { label: "러닝 워킹 콘텐츠", description: "Taipa Waterfront / Cotai 워크", tags: ["러닝", "워킹", "릴스"], details: ["Taipa Waterfront 러닝 콘텐츠 루트", "Cotai morning walk / 워킹 콘텐츠"] },
      { label: "회복 카페 마사지", description: "리조트 카페 / 스파 / 마사지", tags: ["회복", "카페", "마사지"], details: ["리조트 카페 휴식", "가벼운 스파·마사지"] },
      { label: "쇼핑", description: "Cotai Gallery / 기념품 / 리조트 쇼핑", tags: ["쇼핑", "카페", "근거리"], details: ["쇼핑 · 코타이 갤러리"] },
      { label: "해변 로컬워크", description: "Hac Sa Beach / Coloane Village", tags: ["바다", "로컬", "사진"], details: ["Hac Sa Beach 쿨다운", "Coloane Village 로컬 워크"] },
      { label: "운영진 추천", description: "아직 모르겠고 잘 맞는 쪽으로", tags: ["운영진 추천"], details: [] },
    ],
  },
  {
    id: "d3-am",
    groups: [
      { label: "브런치 카페", description: "호텔 근처 카페 / 가벼운 아침", tags: ["카페", "회복", "근거리"], details: ["호텔 근처 카페"] },
      { label: "마지막 디저트", description: "Taipa 디저트 워크", tags: ["디저트", "로컬맛집", "스토리"], details: ["Taipa 마지막 디저트 워크"] },
      { label: "짧은 산책 포토", description: "코타이 산책 / 마지막 사진", tags: ["사진", "도시산책", "릴스"], details: ["짧은 코타이 산책"] },
      { label: "기념품 쇼핑", description: "Cotai Gallery / 마지막 쇼핑", tags: ["쇼핑", "근거리"], details: ["기념품/마지막 쇼핑", "Cotai Gallery 쇼핑 루프"] },
      { label: "로컬워크", description: "Coloane Village 짧은 로컬 산책", tags: ["로컬", "디저트", "사진"], details: ["Coloane Village 로컬 워크"] },
      { label: "회복 휴식", description: "체크아웃 전 호텔에서 쉬기", tags: ["회복", "호텔", "카페"], details: ["호텔 휴식"] },
      { label: "운영진 추천", description: "아직 모르겠고 잘 맞는 쪽으로", tags: ["운영진 추천"], details: [] },
    ],
  },
];

const MOOD_OPTIONS = [
  { value: "content", label: "콘텐츠 적극형", description: "사진/릴스/브이로그를 같이 만들고 싶어요" },
  { value: "social", label: "같이 즐기기형", description: "콘텐츠보다 동행과 경험이 중요해요" },
  { value: "recovery", label: "조용한 회복형", description: "피로를 줄이고 여유 있게 움직이고 싶어요" },
  { value: "flexible", label: "유연한 추천형", description: "그룹 분위기에 맞출 수 있어요" },
];

const MOBILITY_OPTIONS = [
  { value: "active", label: "active", description: "많이 걷거나 러닝도 가능" },
  { value: "moderate", label: "moderate", description: "적당히 걷고 택시/대중교통도 가능" },
  { value: "light", label: "light", description: "짧게 걷고 가까운 곳 위주" },
  { value: "nearby_only", label: "nearby only", description: "호텔/코타이 근처만" },
];

const AVOID_OPTIONS = ["긴 도보", "긴 대기", "멀리 이동", "실외 더위", "시끄러운 장소", "무리한 운동", "늦은 복귀", "예산이 크게 드는 코스"];

function createEmptyDraft(slots) {
  return {
    name: "",
    kakaoName: "",
    condition: "보통",
    slots: Object.fromEntries(slots.map(slot => [
      slot.id,
      {
        participation: "참여하고 싶어요",
        groups: [],
        details: [],
        mood: "social",
        mobility: "moderate",
        avoid: [],
        note: "",
      },
    ])),
  };
}

function mergeDraftWithDefaults(draft, slots) {
  const empty = createEmptyDraft(slots);
  return {
    ...empty,
    ...draft,
    slots: Object.fromEntries(slots.map(slot => [
      slot.id,
      {
        ...empty.slots[slot.id],
        ...(draft?.slots?.[slot.id] || {}),
      },
    ])),
  };
}

function toggleValue(values, value) {
  return values.includes(value) ? values.filter(item => item !== value) : [...values, value];
}

function getDraftParticipant(draft, slots) {
  const selectedSlots = slots.filter(slot => draft.slots[slot.id]?.participation !== "쉬거나 개인 일정 예정이에요");
  const selectedSlotStates = selectedSlots.map(slot => ({ slot, slotState: draft.slots[slot.id] }));
  const interests = Array.from(new Set(selectedSlotStates.flatMap(({ slot, slotState }) => {
    return slotState.groups.flatMap(groupLabel => {
      const config = SLOT_INPUT_CONFIG.find(item => item.id === slot.id);
      const group = config?.groups.find(item => item.label === groupLabel);
      return group?.tags || [groupLabel];
    });
  }))).filter(tag => tag !== "운영진 추천");

  return {
    id: "draft-participant",
    name: draft.name || "새 참가자",
    kakaoName: draft.kakaoName,
    availableSlots: selectedSlots.map(slot => slot.id),
    interests,
    activityLevel: selectedSlotStates[0]?.slotState.mobility || "moderate",
    mobilityPreference: selectedSlotStates[0]?.slotState.mobility || "moderate",
    contentGoal: selectedSlotStates.some(({ slotState }) => slotState.mood === "content") ? ["릴스", "사진"] : ["동행"],
    groupMood: MOOD_OPTIONS.find(option => option.value === selectedSlotStates[0]?.slotState.mood)?.label || "같이 즐기기형",
    budget: "moderate",
    avoid: Array.from(new Set(selectedSlotStates.flatMap(({ slotState }) => slotState.avoid))),
    note: selectedSlotStates.map(({ slotState }) => slotState.note).filter(Boolean).join(" / "),
    rawSlotPreferences: draft.slots,
  };
}

function getSelectedGroupCount(draft, slots) {
  return slots.reduce((sum, slot) => sum + (draft.slots[slot.id]?.groups.length || 0), 0);
}

function scoreGroupForDraft(group, slotDraft) {
  if (!slotDraft || slotDraft.participation === "쉬거나 개인 일정 예정이에요") return 0;
  const selected = [...slotDraft.groups, ...slotDraft.details];
  const searchable = [
    group.name,
    group.concept,
    ...group.tags,
    ...group.recommendedRoutes.map(route => route.title),
    ...group.recommendedRoutes.flatMap(route => route.bestFor || []),
  ].join(" ");

  return selected.reduce((score, value) => {
    const tokens = value.split(/[ ·/]+/).filter(token => token.length > 1);
    return score + tokens.filter(token => searchable.includes(token)).length;
  }, 0);
}

function MatcherTopBar() {
  return (
    <header className="matcher-topbar">
      <a href="../index.html" className="matcher-brand">
        <span>MACAU RUNFLUENCER</span>
        <b>2026</b>
      </a>
      <nav aria-label="페이지 이동">
        <a href="#input">참여 입력</a>
        <a href="#groups">추천 그룹</a>
      </nav>
    </header>
  );
}

function OptionToggle({ checked, title, description, onChange }) {
  return (
    <button type="button" className={`option-toggle ${checked ? "selected" : ""}`} aria-pressed={checked} onClick={onChange}>
      <b>{title}</b>
      {description && <span>{description}</span>}
    </button>
  );
}

function DirectInputPanel({ draft, setDraft, slots, groups, submitted, onSubmit }) {
  const [activeInputSlotId, setActiveInputSlotId] = useState(slots[0]?.id || "");
  const activeSlot = slots.find(slot => slot.id === activeInputSlotId) || slots[0];
  const activeConfig = SLOT_INPUT_CONFIG.find(config => config.id === activeInputSlotId);
  const activeSlotDraft = draft.slots[activeInputSlotId];
  const draftParticipant = useMemo(() => getDraftParticipant(draft, slots), [draft, slots]);
  const selectedGroupCount = useMemo(() => getSelectedGroupCount(draft, slots), [draft, slots]);
  const canSubmit = draft.name.trim().length > 0 && selectedGroupCount > 0;
  const suggestedGroups = useMemo(() => {
    return groups
      .filter(group => group.slotId === activeInputSlotId)
      .map(group => ({ group, score: scoreGroupForDraft(group, activeSlotDraft) }))
      .sort((a, b) => b.score - a.score || b.group.matchScore - a.group.matchScore)
      .slice(0, 2);
  }, [groups, activeInputSlotId, activeSlotDraft]);

  function updateDraft(patch) {
    setDraft(prev => ({ ...prev, ...patch }));
  }

  function updateSlot(slotId, patch) {
    setDraft(prev => ({
      ...prev,
      slots: {
        ...prev.slots,
        [slotId]: {
          ...prev.slots[slotId],
          ...patch,
        },
      },
    }));
  }

  if (!activeSlot || !activeConfig || !activeSlotDraft) return null;

  return (
    <section id="input" className="direct-input-section">
      <div className="section-title-row">
        <div>
          <span className="matcher-kicker">FREE TIME CHECK-IN</span>
          <h2>가고 싶은 일정만 체크</h2>
        </div>
        <p>{submitted ? "제출 완료" : `${selectedGroupCount}개 관심 그룹 선택됨`}</p>
      </div>

      <div className="direct-input-shell">
        <aside className="participant-basic">
          <label>
            <span>이름</span>
            <input value={draft.name} onChange={event => updateDraft({ name: event.target.value })} placeholder="참가자 이름" />
          </label>
          <label>
            <span>카톡 이름</span>
            <input value={draft.kakaoName} onChange={event => updateDraft({ kakaoName: event.target.value })} placeholder="운영진 확인용" />
          </label>
          <label>
            <span>전체 컨디션</span>
            <select value={draft.condition} onChange={event => updateDraft({ condition: event.target.value })}>
              <option>아주 좋음</option>
              <option>보통</option>
              <option>피로 예상</option>
              <option>회복 위주 희망</option>
            </select>
          </label>
          <div className="draft-summary">
            <b>{draftParticipant.availableSlots.length}</b>
            <span>참여 가능 시간</span>
          </div>
        </aside>

        <div className="slot-input-workspace">
          <div className="slot-tabs compact" role="tablist" aria-label="입력할 자유시간 선택">
            {slots.map(slot => (
              <button
                key={slot.id}
                type="button"
                role="tab"
                aria-selected={activeInputSlotId === slot.id}
                className={activeInputSlotId === slot.id ? "active" : ""}
                onClick={() => setActiveInputSlotId(slot.id)}
              >
                <b>{slot.label}</b>
                <span>{slot.title}</span>
                <em>{draft.slots[slot.id].groups.length}개 선택</em>
              </button>
            ))}
          </div>

          <div className="slot-input-panel">
            <div className="input-question-row">
              <div>
                <span className="matcher-kicker">STEP 1</span>
                <h3>{activeSlot.title}</h3>
                <p>{activeSlot.description}</p>
              </div>
              <select
                value={activeSlotDraft.participation}
                onChange={event => updateSlot(activeInputSlotId, { participation: event.target.value })}
                aria-label={`${activeSlot.title} 참여 여부`}
              >
                <option>참여하고 싶어요</option>
                <option>아직 미정이에요</option>
                <option>쉬거나 개인 일정 예정이에요</option>
              </select>
            </div>

            <div className="input-block">
              <h4>관심 그룹</h4>
              <div className="option-grid">
                {activeConfig.groups.map(group => (
                  <OptionToggle
                    key={group.label}
                    checked={activeSlotDraft.groups.includes(group.label)}
                    title={group.label}
                    description={group.description}
                    onChange={() => updateSlot(activeInputSlotId, { groups: toggleValue(activeSlotDraft.groups, group.label) })}
                  />
                ))}
              </div>
            </div>

            <div className="input-block">
              <h4>특히 끌리는 세부 후보</h4>
              <div className="chip-grid">
                {Array.from(new Set(activeConfig.groups.flatMap(group => group.details))).map(detail => (
                  <OptionToggle
                    key={detail}
                    checked={activeSlotDraft.details.includes(detail)}
                    title={detail}
                    onChange={() => updateSlot(activeInputSlotId, { details: toggleValue(activeSlotDraft.details, detail) })}
                  />
                ))}
              </div>
            </div>

            <div className="input-two-col">
              <div className="input-block">
                <h4>원하는 분위기</h4>
                <div className="chip-grid">
                  {MOOD_OPTIONS.map(option => (
                    <OptionToggle
                      key={option.value}
                      checked={activeSlotDraft.mood === option.value}
                      title={option.label}
                      description={option.description}
                      onChange={() => updateSlot(activeInputSlotId, { mood: option.value })}
                    />
                  ))}
                </div>
              </div>
              <div className="input-block">
                <h4>이동/활동 범위</h4>
                <div className="chip-grid">
                  {MOBILITY_OPTIONS.map(option => (
                    <OptionToggle
                      key={option.value}
                      checked={activeSlotDraft.mobility === option.value}
                      title={option.label}
                      description={option.description}
                      onChange={() => updateSlot(activeInputSlotId, { mobility: option.value })}
                    />
                  ))}
                </div>
              </div>
            </div>

            <div className="input-block">
              <h4>피하고 싶은 것</h4>
              <div className="chip-grid compact-chips">
                {AVOID_OPTIONS.map(option => (
                  <OptionToggle
                    key={option}
                    checked={activeSlotDraft.avoid.includes(option)}
                    title={option}
                    onChange={() => updateSlot(activeInputSlotId, { avoid: toggleValue(activeSlotDraft.avoid, option) })}
                  />
                ))}
              </div>
            </div>

            <label className="memo-field">
              <span>운영진에게 남길 메모</span>
              <textarea value={activeSlotDraft.note} onChange={event => updateSlot(activeInputSlotId, { note: event.target.value })} placeholder="같이 가고 싶은 사람, 꼭 가고 싶은 장소, 컨디션 등을 적어주세요." />
            </label>

            <div className="submit-interest-panel">
              <div>
                <b>{submitted ? "제출 완료" : "선택을 마쳤다면 제출해 주세요"}</b>
                <span>
                  {canSubmit
                    ? `${selectedGroupCount}개 관심 그룹이 선택되어 있어요.`
                    : "이름과 관심 그룹을 하나 이상 선택하면 제출할 수 있어요."}
                </span>
              </div>
              <button className="submit-interest-button" type="button" disabled={!canSubmit} onClick={onSubmit}>
                {submitted ? "제출 완료" : "내 관심 일정 제출"}
              </button>
            </div>
          </div>
        </div>

        <aside className="live-preview">
          <span className="matcher-kicker">{submitted ? "CHECK-IN COMPLETE" : "MY MATCH PREVIEW"}</span>
          <h3>{submitted ? "운영진이 반영할게요" : `${draft.name || "새 참가자"}님 취향`}</h3>
          {submitted && (
            <p className="submit-complete-text">
              선택한 관심 일정이 저장됐어요. 운영진이 비슷한 취향의 참가자와 함께 볼 수 있게 정리할게요.
            </p>
          )}
          <div className="preview-tags">
            {draftParticipant.interests.slice(0, 8).map(tag => <Pill key={tag} tone="hot">{tag}</Pill>)}
          </div>
          <div className="preview-groups">
            {suggestedGroups.map(({ group, score }) => (
              <div key={group.id} className="preview-group-card">
                <b>{group.name}</b>
                <span>{score > 0 ? `${score}개 키워드 매칭` : "운영진 확인 필요"}</span>
                <p>{group.concept}</p>
              </div>
            ))}
          </div>
        </aside>
      </div>
    </section>
  );
}

function Hero() {
  return (
    <section className="matcher-hero">
      <div className="matcher-hero-copy">
        <div className="matcher-kicker">MVP · AI FREE TIME MATCHER</div>
        <h1>AI 자유일정 매칭</h1>
        <p className="matcher-sub">
          운동 성향, 자유시간, 콘텐츠 취향을 바탕으로 마카오 자유일정 그룹과 코스를 추천해요.
        </p>
        <p className="matcher-note">
          추천 결과는 참고용이며, 참가자분들이 자유롭게 조정해서 이용할 수 있어요.
        </p>
      </div>
      <div className="matcher-hero-panel" aria-label="매칭 방식 요약">
        <span>3~5명 소그룹</span>
        <span>자유시간 3회차별 매칭</span>
        <span>코스 2개 추천</span>
        <span>카톡 공유 메시지</span>
      </div>
      <div className="hero-photo-strip" aria-hidden="true">
        <img src="https://images.unsplash.com/photo-1534008897995-27a23e859048?auto=format&fit=crop&w=700&q=80" alt="" />
        <img src="https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=700&q=80" alt="" />
        <img src="https://images.unsplash.com/photo-1502904550040-7534597429ae?auto=format&fit=crop&w=700&q=80" alt="" />
      </div>
    </section>
  );
}

function StatsSummary({ participants, groups }) {
  const stats = useMemo(() => {
    const interestCounts = new Map();
    groups.forEach(group => group.tags.forEach(tag => {
      interestCounts.set(tag, (interestCounts.get(tag) || 0) + 1);
    }));
    const topInterests = Array.from(interestCounts.entries())
      .sort((a, b) => b[1] - a[1])
      .slice(0, 3)
      .map(([tag]) => tag);
    const routeCount = groups.reduce((sum, group) => sum + group.recommendedRoutes.length, 0);

    return { topInterests, routeCount };
  }, [groups]);

  return (
    <section className="matcher-stats" aria-label="매칭 요약 통계">
      <div className="stat-card">
        <span>총 참가자</span>
        <b>{participants.length}</b>
      </div>
      <div className="stat-card">
        <span>생성 그룹</span>
        <b>{groups.length}</b>
      </div>
      <div className="stat-card">
        <span>추천 코스</span>
        <b>{stats.routeCount}</b>
      </div>
      <div className="stat-card wide">
        <span>주요 관심사 Top 3</span>
        <div className="stat-tags">
          {stats.topInterests.map(tag => <Pill key={tag} tone="hot">{tag}</Pill>)}
        </div>
      </div>
    </section>
  );
}

function RouteCard({ route }) {
  return (
    <article className="route-card">
      {route.imageUrl && (
        <div className="route-image">
          <img src={route.imageUrl} alt={`${route.title} 분위기 사진`} loading="lazy" />
        </div>
      )}
      <div className="route-top">
        <span>{route.area}</span>
        <b>{route.duration}</b>
      </div>
      <h4>{route.title}</h4>
      <p>{route.description}</p>
      <div className="route-meta-line">
        {route.bestTime && <span>{route.bestTime}</span>}
        {route.transitHint && <span>{route.transitHint}</span>}
      </div>
      <div className="route-spots">
        {route.spots.map(spot => <span key={spot}>{spot}</span>)}
      </div>
    </article>
  );
}

function MiniRouteMap({ routes }) {
  return (
    <aside className="mini-map" aria-label="추천 코스 위치 요약">
      <div className="mini-map-head">
        <span>Simple Macau Map</span>
        <b>API 없이 위치 감만 표시</b>
      </div>
      <div className="mini-map-canvas">
        <span className="map-zone peninsula">Macau Peninsula</span>
        <span className="map-zone taipa">Taipa</span>
        <span className="map-zone cotai">Cotai</span>
        <span className="map-zone coloane">Coloane</span>
        <span className="map-water">Pearl River Delta</span>
        {routes.map((route, index) => route.mapPoint && (
          <span
            key={route.id}
            className="map-pin"
            style={{ left: `${route.mapPoint.x}%`, top: `${route.mapPoint.y}%` }}
            title={route.title}
          >
            {index + 1}
          </span>
        ))}
      </div>
      <div className="mini-map-list">
        {routes.map((route, index) => (
          <div key={route.id}>
            <b>{index + 1}</b>
            <span>{route.title}</span>
          </div>
        ))}
      </div>
    </aside>
  );
}

function ParticipantTags({ members }) {
  const compact = members.flatMap(member => [
    member.activityLevel,
    member.mobilityPreference,
    ...member.contentGoal.slice(0, 1),
  ]);
  const unique = Array.from(new Set(compact)).slice(0, 6);
  return (
    <div className="member-tags" aria-label="참가자 선호 요약">
      {unique.map(tag => <Pill key={tag}>{tag}</Pill>)}
    </div>
  );
}

function GroupCard({ group }) {
  const slot = RUNFLUENCER_FREE_TIME_SLOTS.find(item => item.id === group.slotId);
  return (
    <article className="group-match-card">
      <div className="group-match-head">
        <div>
          <div className="group-match-score">{slot?.label || group.slotId} · MATCH {group.matchScore}%</div>
          <h3>{group.name}</h3>
          <p>{group.concept}</p>
        </div>
        <CopyButton text={group.kakaoMessage}>카톡 공유 복사</CopyButton>
      </div>

      <div className="group-members-line" aria-label={`${group.name} 멤버`}>
        {group.members.map(member => <span key={member.id}>{member.name}</span>)}
      </div>

      <ParticipantTags members={group.members} />

      <div className="group-tags">
        {group.tags.map(tag => <Pill key={tag} tone="hot">{tag}</Pill>)}
      </div>

      <div className="group-info-grid">
        <section>
          <h4>매칭 이유</h4>
          <ul>
            {group.matchReasons.map(reason => <li key={reason}>{reason}</li>)}
          </ul>
        </section>
        <section>
          <h4>운영 메모</h4>
          <p className="meeting">{group.meetingSuggestion}</p>
          <ul>
            {group.cautions.map(caution => <li key={caution}>{caution}</li>)}
          </ul>
        </section>
        <MiniRouteMap routes={group.recommendedRoutes} />
      </div>

      <div className="route-grid">
        {group.recommendedRoutes.map(route => <RouteCard key={route.id} route={route} />)}
      </div>
    </article>
  );
}

function RouteLibrary({ routes }) {
  return (
    <section className="route-library">
      <div className="section-title-row">
        <div>
          <span className="matcher-kicker">ROUTE LIBRARY</span>
          <h2>추천 코스 풀</h2>
        </div>
        <p>{routes.length}개 후보 코스</p>
      </div>
      <div className="route-library-grid">
        {routes.map(route => <RouteCard key={route.id} route={route} />)}
      </div>
    </section>
  );
}

function SlotTabs({ slots, activeSlotId, onChange, groups }) {
  return (
    <div className="slot-tabs" role="tablist" aria-label="자유시간 선택">
      {slots.map(slot => {
        const count = groups.filter(group => group.slotId === slot.id).length;
        return (
          <button
            key={slot.id}
            type="button"
            role="tab"
            aria-selected={activeSlotId === slot.id}
            className={activeSlotId === slot.id ? "active" : ""}
            onClick={() => onChange(slot.id)}
          >
            <b>{slot.label}</b>
            <span>{slot.title}</span>
            <em>{count} groups</em>
          </button>
        );
      })}
    </div>
  );
}

function SlotSummary({ slot, groups }) {
  const members = Array.from(new Set(groups.flatMap(group => group.members.map(member => member.name))));
  const routes = groups.reduce((sum, group) => sum + group.recommendedRoutes.length, 0);

  return (
    <div className="slot-summary">
      <div>
        <span className="matcher-kicker">SELECTED FREE TIME</span>
        <h3>{slot.title}</h3>
        <p>{slot.description}</p>
      </div>
      <div className="slot-summary-numbers">
        <span><b>{members.length}</b>명</span>
        <span><b>{groups.length}</b>그룹</span>
        <span><b>{routes}</b>코스</span>
      </div>
    </div>
  );
}

function FreeTimeMatcherPage() {
  const participants = RUNFLUENCER_PARTICIPANTS;
  const slots = RUNFLUENCER_FREE_TIME_SLOTS;
  const groups = RUNFLUENCER_MATCHED_GROUPS;
  const [draft, setDraft] = useState(() => {
    try {
      const stored = window.localStorage.getItem("runfluencer-direct-input");
      return stored ? mergeDraftWithDefaults(JSON.parse(stored), slots) : createEmptyDraft(slots);
    } catch (err) {
      return createEmptyDraft(slots);
    }
  });
  const [activeSlotId, setActiveSlotId] = useState(slots[0]?.id || "");
  const [submitted, setSubmitted] = useState(() => window.localStorage.getItem("runfluencer-direct-submitted") === "true");
  const activeSlot = slots.find(slot => slot.id === activeSlotId) || slots[0];
  const activeGroups = groups.filter(group => group.slotId === activeSlotId);
  const participantsForPrompt = useMemo(() => {
    const draftParticipant = getDraftParticipant(draft, slots);
    return draft.name.trim() ? [...participants, draftParticipant] : participants;
  }, [draft, participants, slots]);

  useEffect(() => {
    window.localStorage.setItem("runfluencer-direct-input", JSON.stringify(draft));
  }, [draft]);

  function handleSubmit() {
    window.localStorage.setItem("runfluencer-direct-submitted", "true");
    setSubmitted(true);
  }

  return (
    <React.Fragment>
      <MatcherTopBar />
      <main>
        <Hero />
        <StatsSummary participants={participantsForPrompt} groups={groups} />
        <DirectInputPanel draft={draft} setDraft={setDraft} slots={slots} groups={groups} submitted={submitted} onSubmit={handleSubmit} />

        <section id="groups" className="groups-section">
          <div className="section-title-row">
            <div>
              <span className="matcher-kicker">MATCHED GROUPS BY SLOT</span>
              <h2>자유시간별 추천 소그룹</h2>
            </div>
            <p>3개 자유시간 · {groups.length}개 그룹</p>
          </div>
          <SlotTabs slots={slots} activeSlotId={activeSlotId} onChange={setActiveSlotId} groups={groups} />
          {activeSlot && <SlotSummary slot={activeSlot} groups={activeGroups} />}
          <div className="groups-list">
            {activeGroups.map(group => <GroupCard key={group.id} group={group} />)}
          </div>
        </section>

        <RouteLibrary routes={RUNFLUENCER_ROUTE_LIBRARY} />
      </main>
    </React.Fragment>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<FreeTimeMatcherPage />);
