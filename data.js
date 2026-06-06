// Schedule + meta data. Hardcoded for now; replace any of these with
// fetch('https://docs.google.com/spreadsheets/d/.../gviz/tq?tqx=out:json') later.
// v2.0 · 2026.06

window.TRIP = {
  title: "MACAU RUNFLUENCER 2026",
  dates: { start: "2026-06-26", end: "2026-06-28" },
  hotel: "StudioCity MACAO",
  flight: "Jeju Air 7C",
};

window.SCHEDULE = [
  {
    day: 1,
    date: "2026-06-26",
    label: "FRI",
    title: "DEPARTURE · COTAI CITY RUN",
    items: [
      { time: "07:00", end: null, title: "공항 집결", sub: "Incheon T1 · Jeju Air counter", icon: "📍", desc: "참가자 전원 인천국제공항 제1여객터미널 H 카운터 부근 집결. 보딩패스 및 위탁수하물 처리.", location: "ICN T1" },
      { time: "09:50", end: "12:50", title: "ICN → MFM", sub: "Jeju Air 7C2701 · 3h 부근", icon: "✈️", desc: "인천 → 마카오 국제공항 (MFM). 비행시간 약 3시간 50분. 시차 -1시간(KST → MST).", location: "Flight 7C2701" },
      { time: "13:30", end: "15:00", title: "숙소 이동 / 체크인", sub: "Bus → StudioCity MACAO", icon: "🚌", desc: "전세버스로 코타이 지구 StudioCity MACAO 호텔 이동. 로비에서 단체 체크인 후 객실 배정.", location: "StudioCity MACAO" },
      { time: "15:00", end: "17:00", title: "개인정비 / 자유시간", sub: "Free · 짐 풀기, 러닝 복장 준비", icon: "💤", desc: "오후 본 행사 전 개인 정비 시간. 러닝 복장으로 환복 권장. 게어 체크.", location: "Hotel" },
      { time: "17:00", end: "18:30", title: "COTAI CITY RUN", sub: "Hero session · 6.5km", icon: "🏃", desc: "코타이 지구 야경 라이트 러닝. 6.5km · 평지 코스. 단체 사진 촬영 포함. 헤드라이트 또는 발광 액세서리 권장.", location: "Cotai Strip", hero: true, rsvp: false },
      { time: "18:30", end: "19:30", title: "개인정비", sub: "Free · 샤워 / 환복", icon: "🚿", desc: "객실 복귀 후 정비. 디너 드레스코드 스마트 캐주얼.", location: "Hotel" },
      { time: "19:30", end: "21:30", title: "네트워킹 디너", sub: "북방관 · BeiFangGuan", icon: "🍽️", desc: "북방관(베이팡관) 단체 디너. 마카오관광청 / 뉴발란스 인사말 및 참가자 자기소개 라운드.", location: "북방관", hero: true, rsvp: false },
      { time: "21:30", end: null, title: "자유시간", sub: "Free · Optional 야시장 / 카지노 / 산책", icon: "✨", desc: "자유시간. 코타이 베니션, 갤럭시, 윈 팔라스 등 야경 산책 추천. 자유시간 활동에 RSVP 체크해주세요.", location: "Free", rsvp: true, options: ["베니션 야경 산책", "코타이 야시장", "스튜디오시티 자체 라운지"] }
    ]
  },
  {
    day: 2,
    date: "2026-06-27",
    label: "SAT",
    title: "TRY TRI MACAO",
    items: [
      { time: "08:00", end: "08:45", title: "조식", sub: "Hotel breakfast · 객실당 1인 포함", icon: "🥐", desc: "호텔 조식. 2일차 조식만 제공됩니다.", location: "StudioCity Buffet" },
      { time: "08:45", end: null, title: "참가자 집결", sub: "★ 뉴발란스 필착", icon: "📍", desc: "로비 집결. 뉴발란스 협찬 의류 / 슈즈 필착. 단체 워밍업 후 트라이 세션 시작.", location: "Hotel Lobby", hero: true },
      { time: "09:00", end: "11:30", title: "TRY TRI MACAO", sub: "🚴 BIKE → 🏃 RUN → 🏊 SWIM", icon: "🏆", desc: "사이클링 → 러닝 → 수영 미니 트라이애슬론 체험. 코스 거리: 자전거 8km / 러닝 3km / 수영 400m. 안전요원 동행.", location: "Cotai Sports Zone", hero: true, rsvp: false },
      { time: "11:30", end: null, title: "자유시간", sub: "Free · 마카오 자유 일정", icon: "🌴", desc: "오후/저녁 자유 일정. 추천: 세나도 광장, 성 바울 성당, 타이파 빌리지, 마카오 타워, 카지노 투어 등. RSVP로 같이 갈 사람 찾아보세요!", location: "Free", rsvp: true, options: ["세나도 광장 + 성 바울 성당", "타이파 빌리지 푸드 투어", "마카오 타워 번지점프", "베니션 곤돌라", "수영장 / 호텔 라운지"] }
    ]
  },
  {
    day: 3,
    date: "2026-06-28",
    label: "SUN",
    title: "TAIPA HERITAGE RUN · 귀국",
    items: [
      { time: "07:15", end: null, title: "참가자 집결", sub: "Lobby · 러닝 복장", icon: "📍", desc: "로비 집결. 러닝 복장. 가벼운 워밍업 후 출발.", location: "Hotel Lobby" },
      { time: "07:30", end: "09:00", title: "TAIPA HERITAGE RUN", sub: "5km · 헤리티지 코스", icon: "🏃‍♀️", desc: "타이파 빌리지 헤리티지 러닝 코스. 5km · 포르투갈식 골목과 광장을 통과하는 관광 러닝. 사진 스팟 다수.", location: "Taipa Village", hero: true, rsvp: false },
      { time: "09:00", end: "11:30", title: "자유시간 / 체크아웃", sub: "개별 체크아웃 · 짐 호텔 보관", icon: "🧳", desc: "객실 개별 체크아웃 진행. 짐은 호텔 컨시어지에 보관. 아침 식사 / 마지막 쇼핑 자유.", location: "Hotel" },
      { time: "11:30", end: "11:50", title: "로비 집결 / 공항 이동", sub: "전세버스 · MFM 공항", icon: "🚌", desc: "로비 집결 후 전세버스로 마카오 국제공항 이동.", location: "Hotel → MFM" },
      { time: "13:50", end: "18:40", title: "MFM → ICN", sub: "Jeju Air 7C2702 · 귀국", icon: "✈️", desc: "마카오 → 인천 귀국. 비행시간 약 3시간 50분.", location: "Flight 7C2702" },
      { time: "19:00", end: null, title: "인천 도착 / 해산", sub: "Incheon T1 · 해산", icon: "🏁", desc: "인천국제공항 도착. 짐 찾고 자유 해산. 다음 만남까지 ──", location: "ICN T1", hero: true }
    ]
  }
];

window.PEOPLE = [
  // 운영진
  { bib: "CAP", name: "대장", ig: "goodbear_jang", role: "Captain · 대장", lead: true },
  { bib: "PHOTO", name: "부대장", ig: "runningphotograph", role: "Photographer · 작가님", lead: true },
  // 런플루언서 6기
  { bib: "001", name: "박수현", ig: "l.eauhyun", role: "Runfluencer 6th" },
  { bib: "002", name: "철민", ig: "c_m0119", role: "Runfluencer 6th" },
  { bib: "003", name: "으닝", ig: "euuuun._.ing", role: "Runfluencer 6th" },
  { bib: "004", name: "정채린", ig: "chaeee_525", role: "Runfluencer 6th" },
  { bib: "005", name: "체리핏", ig: "cherry_fit_25", role: "Runfluencer 6th" },
  { bib: "006", name: "김신", ig: "kimshin_daily", role: "Runfluencer 6th" },
  { bib: "007", name: "최윤경", ig: "c__yoooong", role: "Runfluencer 6th" },
  { bib: "008", name: "박소영", ig: "ps.psy_", role: "Runfluencer 6th" },
  { bib: "009", name: "심새날", ig: "senalworkout", role: "Runfluencer 6th" },
  { bib: "010", name: "미나", ig: "_ji_mina", role: "Runfluencer 6th" },
  { bib: "011", name: "정다영", ig: "santa._.dikey", role: "Runfluencer 6th" },
  { bib: "012", name: "김슬기", ig: "s.eulk_", role: "Runfluencer 6th" },
  { bib: "013", name: "김예솔", ig: "yeni_3color", role: "Runfluencer 6th" },
  { bib: "014", name: "백경수", ig: "runner_g100", role: "Runfluencer 6th" },
  { bib: "015", name: "추경식", ig: "sik__running", role: "Runfluencer 6th" },
  { bib: "016", name: "홍지우", ig: "jiwooo_x", role: "Runfluencer 6th" },
  { bib: "017", name: "유지선", ig: "z__sun_", role: "Runfluencer 6th" },
  { bib: "018", name: "원예진", ig: "bobagrrrl", role: "Runfluencer 6th" },
  { bib: "019", name: "김효희", ig: "joyyourtype", role: "Runfluencer 6th" },
  { bib: "020", name: "김은비", ig: "_eunvitamin_", role: "Runfluencer 6th" }
];

// Place photos use picsum.photos with stable seeds (replace with real curated images later).
// Each seed → deterministic stock photo. Easy to swap with a real Macau photo URL.
window.PLACES = [
  {
    type: "Stay",
    name: "STUDIOCITY MACAO",
    desc: "코타이 지구 5성급 호텔. 2일차 조식 포함. 8자형 관람차로 유명.",
    stats: [["코타이", "구역"], ["2박", "Days"], ["Day 2", "조식"]],
    img: "https://picsum.photos/seed/macau-hotel/800/500",
    lat: 22.1463, lng: 113.5709
  },
  {
    type: "Run · Day 1",
    name: "COTAI CITY RUN",
    desc: "코타이 스트립 야경 라이트 런. 평지 위주의 도시형 러닝 코스.",
    stats: [["6.5", "km"], ["FLAT", "코스"], ["17:00", "출발"]],
    img: "https://picsum.photos/seed/cotai-night/800/500",
    lat: 22.1481, lng: 113.5616
  },
  {
    type: "Sports · Day 2",
    name: "TRY TRI MACAO",
    desc: "Bike + Run + Swim 미니 트라이애슬론 체험 세션. 안전 인솔.",
    stats: [["11.4", "km"], ["3", "종목"], ["09:00", "출발"]],
    img: "https://picsum.photos/seed/macau-tri/800/500",
    lat: 22.1455, lng: 113.5605
  },
  {
    type: "Run · Day 3",
    name: "TAIPA HERITAGE RUN",
    desc: "포르투갈식 골목과 광장을 통과하는 헤리티지 러닝. 사진 스팟 다수.",
    stats: [["5.0", "km"], ["HILLY", "지형"], ["07:30", "출발"]],
    img: "https://picsum.photos/seed/taipa-village/800/500",
    lat: 22.1556, lng: 113.5550
  },
  {
    type: "Dinner · Day 1",
    name: "BEIFANG GUAN 北方館",
    desc: "북방식 만두 / 면 요리 전문점. 네트워킹 디너 장소.",
    stats: [["19:30", "시작"], ["2h", "예상"], ["22", "PAX"]],
    img: "https://picsum.photos/seed/beifang-dumpling/800/500",
    lat: 22.1493, lng: 113.5645
  },
  {
    type: "Free Time",
    name: "TAIPA VILLAGE",
    desc: "타이파 헤리티지 지구. 푸드 투어 / 카페 / 포토 스팟 추천 구역.",
    stats: [["FREE", ""], ["3km", "from hotel"], ["★★★", "추천"]],
    img: "https://picsum.photos/seed/taipa-portuguese/800/500",
    lat: 22.1556, lng: 113.5550
  }
];

window.CHECKLIST = {
  "RUN GEAR": [
    "뉴발란스 러닝 셔츠 (필착)",
    "뉴발란스 러닝화",
    "러닝 양말 2-3족",
    "트라이슈트 또는 수영복",
    "수경 / 수영모",
    "헤드라이트 또는 발광 액세서리 (Day 1 야간)",
    "선글라스 · 모자",
    "땀밴드 / 암밴드 / 스포츠워치"
  ],
  "TRAVEL": [
    "여권 (유효기간 6개월 이상)",
    "보딩패스 / 전자티켓",
    "여행자보험 증서",
    "환전 (MOP/HKD) 또는 트래블카드",
    "전원 어댑터 (UK 3핀)",
    "유심 또는 로밍",
    "휴대용 충전기",
    "캐리어 명찰"
  ],
  "PERSONAL": [
    "여름 옷 (2박3일)",
    "디너용 스마트 캐주얼 1셋",
    "수영복 / 비치 슬리퍼",
    "선크림 SPF 50+",
    "근육이완제 · 진통제",
    "전해질 / 에너지젤",
    "물병 / 텀블러",
    "선글라스 케이스"
  ]
};

window.ANNOUNCEMENTS = [
  { date: "MAY 18", pin: true, title: "뉴발란스 협찬 의류 발송", desc: "Day 2 'TRY TRI MACAO' 필착. 사이즈 미수령 인원 운영진 DM 부탁드려요." },
  { date: "MAY 12", pin: false, title: "여권 만료일 확인 요청", desc: "출국 기준 6개월 이상 유효기간 필수입니다. 미확인 인원 5/20까지 회신 주세요." },
  { date: "MAY 03", pin: false, title: "참가자 단톡 오픈", desc: "운영진이 카카오톡 오픈채팅 링크 개별 발송했습니다. 미수령 인원 알려주세요." },
  { date: "APR 28", pin: false, title: "런플루언서 2026 모집 마감", desc: "최종 20인 확정. 환영합니다 🎉" }
];

window.WEATHER_FORECAST = [
  { date: "06.26", label: "FRI", high: 31, low: 26, cond: "흐림 후 비", precip: 70 },
  { date: "06.27", label: "SAT", high: 32, low: 27, cond: "구름 많음", precip: 40 },
  { date: "06.28", label: "SUN", high: 30, low: 26, cond: "맑음", precip: 20 }
];

// ─── PERSONAL SCHEDULE ─────────────────────────────────────────
// 각자 자유시간에 뭐 할지. 같은 activity = 같이 가는 그룹.
// 시트 PERSONAL 탭에서 채워서 동기화. 데모용 샘플 데이터.

// 자유시간 슬롯 정의 (그룹뷰에서 슬롯별로 묶임)
window.FREE_SLOTS = [
  { id: "d1-night", day: 1, date: "2026-06-26", label: "DAY 1 · 21:30 ~", title: "FRI NIGHT FREE", desc: "디너 후 자유 야간 활동" },
  { id: "d2-pm",    day: 2, date: "2026-06-27", label: "DAY 2 · 11:30 ~", title: "SAT AFTERNOON FREE", desc: "트라이 세션 이후 오후·저녁 자유" },
  { id: "d3-am",    day: 3, date: "2026-06-28", label: "DAY 3 · 09:00 ~", title: "SUN MORNING FREE", desc: "헤리티지 런 이후 자유시간" }
];

// 각 활동에 이모지 매핑
window.ACTIVITY_META = {
  "베니션 야경 산책": { emoji: "🌃", color: "#e15a3a" },
  "코타이 야시장": { emoji: "🏮", color: "#c84a32" },
  "카지노 투어 · 갤럭시": { emoji: "🎰", color: "#9c5acc" },
  "호텔 라운지 · 휴식": { emoji: "🛌", color: "#6b6760" },
  "세나도 광장 + 성 바울 성당": { emoji: "⛪", color: "#2a6fdb" },
  "타이파 빌리지 푸드 투어": { emoji: "🥢", color: "#d99a3a" },
  "마카오 타워 번지점프": { emoji: "🪂", color: "#e15a3a" },
  "베니션 곤돌라": { emoji: "🚣", color: "#1f8a5b" },
  "수영장 · 호텔": { emoji: "🏊", color: "#2a8cd9" },
  "쇼핑 · 코타이 갤러리": { emoji: "🛍️", color: "#c84a8a" },
  "마지막 쇼핑 / 카페": { emoji: "☕", color: "#8b5a3a" },
  "타이파 빌리지 재방문": { emoji: "📷", color: "#5a8b3a" },
  "호텔 휴식": { emoji: "💤", color: "#6b6760" },
};

// 개인 일정 — 슬롯별로 각자 어디 가는지
// name, slot, activity, note
window.PERSONAL = [
  // ── D1 NIGHT (21:30~) ──
  { name: "박수현", slot: "d1-night", activity: "베니션 야경 산책", note: "21:30 로비" },
  { name: "철민", slot: "d1-night", activity: "베니션 야경 산책", note: "21:30 로비" },
  { name: "으닝", slot: "d1-night", activity: "베니션 야경 산책", note: "21:30 로비" },
  { name: "정채린", slot: "d1-night", activity: "베니션 야경 산책", note: "" },
  { name: "최윤경", slot: "d1-night", activity: "베니션 야경 산책", note: "" },
  { name: "김슬기", slot: "d1-night", activity: "베니션 야경 산책", note: "" },

  { name: "김신", slot: "d1-night", activity: "코타이 야시장", note: "택시 share" },
  { name: "박소영", slot: "d1-night", activity: "코타이 야시장", note: "" },
  { name: "심새날", slot: "d1-night", activity: "코타이 야시장", note: "" },

  { name: "정다영", slot: "d1-night", activity: "카지노 투어 · 갤럭시", note: "ID 필수" },
  { name: "백경수", slot: "d1-night", activity: "카지노 투어 · 갤럭시", note: "" },
  { name: "추경식", slot: "d1-night", activity: "카지노 투어 · 갤럭시", note: "" },
  { name: "원예진", slot: "d1-night", activity: "카지노 투어 · 갤럭시", note: "" },

  { name: "체리핏", slot: "d1-night", activity: "호텔 라운지 · 휴식", note: "" },
  { name: "미나", slot: "d1-night", activity: "호텔 라운지 · 휴식", note: "" },
  { name: "김예솔", slot: "d1-night", activity: "호텔 라운지 · 휴식", note: "내일 트라이 컨디션 챙김" },
  { name: "홍지우", slot: "d1-night", activity: "호텔 라운지 · 휴식", note: "" },
  { name: "유지선", slot: "d1-night", activity: "호텔 라운지 · 휴식", note: "" },
  { name: "김효희", slot: "d1-night", activity: "호텔 라운지 · 휴식", note: "" },
  { name: "김은비", slot: "d1-night", activity: "호텔 라운지 · 휴식", note: "" },
  { name: "대장", slot: "d1-night", activity: "호텔 라운지 · 휴식", note: "운영팀 회의" },
  { name: "부대장", slot: "d1-night", activity: "호텔 라운지 · 휴식", note: "사진 편집" },

  // ── D2 PM (11:30~) ──
  { name: "박수현", slot: "d2-pm", activity: "세나도 광장 + 성 바울 성당", note: "12:30 로비" },
  { name: "철민", slot: "d2-pm", activity: "세나도 광장 + 성 바울 성당", note: "" },
  { name: "정채린", slot: "d2-pm", activity: "세나도 광장 + 성 바울 성당", note: "" },
  { name: "최윤경", slot: "d2-pm", activity: "세나도 광장 + 성 바울 성당", note: "" },
  { name: "김슬기", slot: "d2-pm", activity: "세나도 광장 + 성 바울 성당", note: "" },
  { name: "유지선", slot: "d2-pm", activity: "세나도 광장 + 성 바울 성당", note: "" },

  { name: "으닝", slot: "d2-pm", activity: "타이파 빌리지 푸드 투어", note: "에그타르트 ★" },
  { name: "김신", slot: "d2-pm", activity: "타이파 빌리지 푸드 투어", note: "" },
  { name: "박소영", slot: "d2-pm", activity: "타이파 빌리지 푸드 투어", note: "" },
  { name: "김예솔", slot: "d2-pm", activity: "타이파 빌리지 푸드 투어", note: "" },
  { name: "원예진", slot: "d2-pm", activity: "타이파 빌리지 푸드 투어", note: "" },
  { name: "김효희", slot: "d2-pm", activity: "타이파 빌리지 푸드 투어", note: "" },

  { name: "추경식", slot: "d2-pm", activity: "마카오 타워 번지점프", note: "체중 60kg+ 가능" },
  { name: "백경수", slot: "d2-pm", activity: "마카오 타워 번지점프", note: "" },
  { name: "홍지우", slot: "d2-pm", activity: "마카오 타워 번지점프", note: "" },

  { name: "정다영", slot: "d2-pm", activity: "베니션 곤돌라", note: "예약 필요" },
  { name: "체리핏", slot: "d2-pm", activity: "베니션 곤돌라", note: "" },
  { name: "미나", slot: "d2-pm", activity: "베니션 곤돌라", note: "" },

  { name: "심새날", slot: "d2-pm", activity: "수영장 · 호텔", note: "" },
  { name: "김은비", slot: "d2-pm", activity: "수영장 · 호텔", note: "" },

  { name: "부대장", slot: "d2-pm", activity: "쇼핑 · 코타이 갤러리", note: "촬영 동행 가능" },
  { name: "대장", slot: "d2-pm", activity: "쇼핑 · 코타이 갤러리", note: "" },

  // ── D3 AM (09:00~) ──
  { name: "박수현", slot: "d3-am", activity: "마지막 쇼핑 / 카페", note: "" },
  { name: "철민", slot: "d3-am", activity: "마지막 쇼핑 / 카페", note: "" },
  { name: "정채린", slot: "d3-am", activity: "마지막 쇼핑 / 카페", note: "" },
  { name: "최윤경", slot: "d3-am", activity: "마지막 쇼핑 / 카페", note: "" },
  { name: "박소영", slot: "d3-am", activity: "마지막 쇼핑 / 카페", note: "" },

  { name: "으닝", slot: "d3-am", activity: "타이파 빌리지 재방문", note: "사진 spot 재방문" },
  { name: "김슬기", slot: "d3-am", activity: "타이파 빌리지 재방문", note: "" },
  { name: "김예솔", slot: "d3-am", activity: "타이파 빌리지 재방문", note: "" },
  { name: "유지선", slot: "d3-am", activity: "타이파 빌리지 재방문", note: "" },
  { name: "원예진", slot: "d3-am", activity: "타이파 빌리지 재방문", note: "" },
  { name: "부대장", slot: "d3-am", activity: "타이파 빌리지 재방문", note: "단체 사진" },

  { name: "김신", slot: "d3-am", activity: "호텔 휴식", note: "" },
  { name: "심새날", slot: "d3-am", activity: "호텔 휴식", note: "" },
  { name: "체리핏", slot: "d3-am", activity: "호텔 휴식", note: "" },
  { name: "미나", slot: "d3-am", activity: "호텔 휴식", note: "" },
  { name: "정다영", slot: "d3-am", activity: "호텔 휴식", note: "" },
  { name: "백경수", slot: "d3-am", activity: "호텔 휴식", note: "" },
  { name: "추경식", slot: "d3-am", activity: "호텔 휴식", note: "" },
  { name: "홍지우", slot: "d3-am", activity: "호텔 휴식", note: "" },
  { name: "김효희", slot: "d3-am", activity: "호텔 휴식", note: "" },
  { name: "김은비", slot: "d3-am", activity: "호텔 휴식", note: "" },
  { name: "대장", slot: "d3-am", activity: "호텔 휴식", note: "체크아웃 컨트롤" }
];


// ─── PROFILE PHOTOS · 수동 매핑 ─────────────────────────────────
// 설문 시트("설문지응답시트1")엔 [타임스탬프, 프로필 사진] 두 컬럼뿐이고
// 사진 셀엔 Drive URL만 있어요 (파일명/이름이 GViz로 안 넘어옴).
// 그래서 "누구 사진인지"는 자동으로 알 수 없습니다 → 아래에서 직접 1줄씩 연결.

window.PHOTO_POOL = [
  "1iJEqJ8iZQzQPFxV84D1XJBaEGpfypt5A",
  "1T1OWI4Kx33y8I803yqeESJzMVAid_LZV",
  "1_jhG7eUS6VNi-lh00Mh0kp4X44NA8U9R",
  "1ULaiqdEB7ELcld11SmXzhJ-nHh_lEri4",
  "1dJGWO00mL52BxeY5UDDvsI3Mu5unVy6M",
  "1Ah1RZJ5ovBB5L8n9-UW32ZRfdta2HtjB",
  "1CcSraPApIOoATjweVe9cX5xppC-uyLKV",
  "1KkbpyAQ6GDMpEUG--76Y-EhLD_OwNIgm",
  "1OORxXam9rCrED7GXsDEbRTL1Pt4_czK2",
  "1qeKIVaGPIP3mGs9C0VZaV4FJkYczw-mx",
  "1C9plokpz11_o14TFrguP_gx9Bf6mmgPs",
  "1K7qAVGY-TTp8mxCldP8EZq-XVpxs1T2y",
  "1xEZjGQT9so8D6MtJ-s-VB7EDx0_XW9CF",
];

window.PHOTO_MAP = {
  "대장": "1iJEqJ8iZQzQPFxV84D1XJBaEGpfypt5A",
  "심새날": "1T1OWI4Kx33y8I803yqeESJzMVAid_LZV",
  "정채린": "1_jhG7eUS6VNi-lh00Mh0kp4X44NA8U9R",
  "박소영": "1ULaiqdEB7ELcld11SmXzhJ-nHh_lEri4",
  "정다영": "1dJGWO00mL52BxeY5UDDvsI3Mu5unVy6M",
  "백경수": "1CcSraPApIOoATjweVe9cX5xppC-uyLKV",
  "철민": "1KkbpyAQ6GDMpEUG--76Y-EhLD_OwNIgm",
  "김예솔": "1OORxXam9rCrED7GXsDEbRTL1Pt4_czK2",
  "원예진": "1qeKIVaGPIP3mGs9C0VZaV4FJkYczw-mx",
  "김신": "1C9plokpz11_o14TFrguP_gx9Bf6mmgPs",
  "김효희": "1K7qAVGY-TTp8mxCldP8EZq-XVpxs1T2y",
  "추경식": "1xEZjGQT9so8D6MtJ-s-VB7EDx0_XW9CF",
};

window.PHOTO_SHEET_ID = "1PewbIs_k_9FwtclNF6ofNpr9vqcwlFcqNPV3Tb7boVA";
window.PHOTO_NAME_ALIASES = {
  "비홍방": "대장",
  "민철": "철민",
};

function driveThumb(value) {
  if (!value) return "";
  const raw = String(value).trim();
  if (/^(uploads\/|\.\/|\/|https?:\/\/(?!drive\.google\.com\/))/i.test(raw)) return raw;

  const id =
    (raw.match(/\/file\/d\/([^/]+)/) || [])[1] ||
    (raw.match(/[?&]id=([^&]+)/) || [])[1] ||
    (/^[A-Za-z0-9_-]{20,}$/.test(raw) ? raw : "");

  return id ? "https://drive.google.com/thumbnail?id=" + id + "&sz=w600" : raw;
}

function applyPhotoMap(map) {
  let n = 0;
  window.PEOPLE = window.PEOPLE.map(p => {
    const photo = driveThumb(map[p.name]);
    if (photo) { n++; return Object.assign({}, p, { photo }); }
    return p;
  });
  if (n) { window.dispatchEvent(new Event('sheet-loaded')); }
  return n;
}

function cellText(row, index) {
  const cell = row && row.c && row.c[index];
  return cell ? String(cell.v || cell.f || "").trim() : "";
}

function labelIndex(cols, label, fallback) {
  const i = (cols || []).findIndex(col => String(col.label || "").trim() === label);
  return i >= 0 ? i : fallback;
}

function applyPhotoSheet(response) {
  const table = response && response.table;
  if (!table || !Array.isArray(table.rows)) return 0;

  const nameIndex = labelIndex(table.cols, "이름", 1);
  const photoIndex = labelIndex(table.cols, "프로필 사진", 2);
  const aliases = window.PHOTO_NAME_ALIASES || {};
  const map = {};

  table.rows.forEach(row => {
    const rawName = cellText(row, nameIndex);
    const photo = cellText(row, photoIndex);
    const name = aliases[rawName] || rawName;
    if (name && photo) map[name] = photo;
  });

  return applyPhotoMap(map);
}

function loadPhotoSheet() {
  const id = window.PHOTO_SHEET_ID;
  if (!id || !document.head) return;

  const previousGoogle = window.google;
  const previousSetResponse = previousGoogle &&
    previousGoogle.visualization &&
    previousGoogle.visualization.Query &&
    previousGoogle.visualization.Query.setResponse;

  window.google = window.google || {};
  window.google.visualization = window.google.visualization || {};
  window.google.visualization.Query = window.google.visualization.Query || {};

  const script = document.createElement("script");
  const cleanup = () => {
    if (previousSetResponse) {
      window.google.visualization.Query.setResponse = previousSetResponse;
    }
    if (script.parentNode) script.parentNode.removeChild(script);
  };

  window.google.visualization.Query.setResponse = response => {
    applyPhotoSheet(response);
    cleanup();
  };

  script.onerror = cleanup;
  script.src = "https://docs.google.com/spreadsheets/d/" + id + "/gviz/tq?tqx=out:json&headers=1";
  document.head.appendChild(script);
}

(function applyPhotos() {
  applyPhotoMap(window.PHOTO_MAP || {});
  loadPhotoSheet();
})();
