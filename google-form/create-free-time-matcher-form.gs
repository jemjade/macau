/**
 * Macau Runfluencer 2026 자유일정 매칭 Google Form 생성 스크립트.
 *
 * 사용법:
 * 1. https://script.google.com 에서 새 프로젝트 생성
 * 2. 이 파일 내용을 Code.gs에 붙여넣기
 * 3. createFreeTimeMatcherForm() 실행
 * 4. 권한 승인 후 로그에 출력되는 Form URL / Sheet URL 확인
 */
function createFreeTimeMatcherForm() {
  const form = FormApp.create('마카오 런플루언서 2026 · AI 자유일정 매칭 설문');
  form.setDescription(
    [
      '자유시간 3회차별 선호를 바탕으로 3~5명 소그룹과 추천 코스를 만들기 위한 설문입니다.',
      '추천 결과는 참고용이며, 현장에서 자유롭게 조정할 수 있어요.',
      '응답은 운영진의 자유일정 매칭과 카톡 공유 메시지 작성에만 사용됩니다.',
    ].join('\n')
  );
  form.setCollectEmail(false);
  form.setLimitOneResponsePerUser(false);
  form.setAllowResponseEdits(true);
  form.setShowLinkToRespondAgain(false);
  form.setConfirmationMessage('제출 완료! 운영진이 자유시간별 그룹 추천에 반영할게요.');

  addBasicSection(form);
  addSlotSection(form, {
    id: 'd1-night',
    title: 'DAY 1 · 디너 후 야간 자유시간',
    time: '6월 26일 금요일 21:30 이후',
    examples: ['야경/포토', '디저트/카페', '카지노 구경', '가벼운 쇼핑', '호텔 휴식'],
    groupChoices: [
      '야경 포토 그룹 · Cotai 야경 산책 / Wynn Palace 분수',
      '디저트 카페 그룹 · Taipa 디저트 워크 / 호텔 라운지',
      '카지노 구경 그룹 · 짧게 둘러보고 분위기 보기',
      '쇼핑 산책 그룹 · Cotai Gallery 짧은 쇼핑 루프',
      '회복 휴식 그룹 · 호텔 근처에서 조용히 쉬기',
      '운영진 추천 그룹 · 아직 모르겠고 잘 맞는 쪽으로',
    ],
    routeChoices: [
      'Cotai 야경 산책',
      'Wynn Palace 분수 포토 스팟',
      'Taipa 디저트 워크',
      '호텔 근처 카페/라운지',
      '카지노 구경',
      'Cotai Gallery 짧은 쇼핑 루프',
      '호텔 휴식',
    ],
  });
  addSlotSection(form, {
    id: 'd2-pm',
    title: 'DAY 2 · 트라이 세션 이후 오후 자유시간',
    time: '6월 27일 토요일 11:30 이후',
    examples: ['로컬 먹거리', '문화유산/포토', '러닝 콘텐츠', '카페/마사지 회복', '쇼핑'],
    groupChoices: [
      '로컬 먹거리 그룹 · Taipa Village / 디저트 / 먹방 콘텐츠',
      '문화유산 포토 그룹 · Senado Square / 성 바울 성당',
      '러닝 워킹 콘텐츠 그룹 · Taipa Waterfront / Cotai 워크',
      '회복 카페 마사지 그룹 · 리조트 카페 / 스파 / 마사지',
      '쇼핑 그룹 · Cotai Gallery / 기념품 / 리조트 쇼핑',
      '해변 로컬워크 그룹 · Hac Sa Beach / Coloane Village',
      '운영진 추천 그룹 · 아직 모르겠고 잘 맞는 쪽으로',
    ],
    routeChoices: [
      'Taipa Village 먹거리 코스',
      'Senado Square / 성 바울 성당 포토 워크',
      'Taipa Waterfront 러닝 콘텐츠 루트',
      'Cotai morning walk / 워킹 콘텐츠',
      '리조트 카페 휴식',
      '가벼운 스파·마사지',
      '쇼핑 · 코타이 갤러리',
      'Hac Sa Beach 쿨다운',
      'Coloane Village 로컬 워크',
      'Wynn Palace 분수 포토 스팟',
    ],
  });
  addSlotSection(form, {
    id: 'd3-am',
    title: 'DAY 3 · 체크아웃 전 오전 자유시간',
    time: '6월 28일 일요일 09:00~11:30',
    examples: ['브런치/카페', '마지막 디저트', '짧은 산책', '기념품 쇼핑', '호텔 휴식'],
    groupChoices: [
      '브런치 카페 그룹 · 호텔 근처 카페 / 가벼운 아침',
      '마지막 디저트 그룹 · Taipa 디저트 워크',
      '짧은 산책 포토 그룹 · 코타이 산책 / 마지막 사진',
      '기념품 쇼핑 그룹 · Cotai Gallery / 마지막 쇼핑',
      '로컬워크 그룹 · Coloane Village 짧은 로컬 산책',
      '회복 휴식 그룹 · 체크아웃 전 호텔에서 쉬기',
      '운영진 추천 그룹 · 아직 모르겠고 잘 맞는 쪽으로',
    ],
    routeChoices: [
      '호텔 근처 카페',
      'Taipa 마지막 디저트 워크',
      '짧은 코타이 산책',
      '기념품/마지막 쇼핑',
      'Coloane Village 로컬 워크',
      'Cotai Gallery 쇼핑 루프',
      '호텔 휴식',
    ],
  });
  addConsentSection(form);

  const sheet = SpreadsheetApp.create('마카오 런플루언서 2026 · 자유일정 매칭 응답');
  form.setDestination(FormApp.DestinationType.SPREADSHEET, sheet.getId());

  Logger.log('Form edit URL: ' + form.getEditUrl());
  Logger.log('Form public URL: ' + form.getPublishedUrl());
  Logger.log('Response Sheet URL: ' + sheet.getUrl());

  return {
    editUrl: form.getEditUrl(),
    publicUrl: form.getPublishedUrl(),
    sheetUrl: sheet.getUrl(),
  };
}

function addBasicSection(form) {
  form.addSectionHeaderItem()
    .setTitle('기본 정보')
    .setHelpText('참가자 식별과 전체 성향 파악을 위한 문항입니다.');

  form.addTextItem()
    .setTitle('이름')
    .setRequired(true);

  form.addTextItem()
    .setTitle('인스타그램 ID')
    .setHelpText('@ 없이 입력해 주세요. 예: l.eauhyun')
    .setRequired(false);

  form.addTextItem()
    .setTitle('카톡에서 확인 가능한 이름')
    .setHelpText('운영진이 그룹별 카톡 공유 메시지를 만들 때 참고합니다.')
    .setRequired(false);

  form.addMultipleChoiceItem()
    .setTitle('전체 컨디션')
    .setChoiceValues(['아주 좋음', '보통', '피로 예상', '회복 위주 희망'])
    .setRequired(true);

  form.addCheckboxItem()
    .setTitle('전체적으로 피하고 싶은 것')
    .setChoiceValues([
      '긴 도보',
      '긴 택시 이동',
      '복잡한 환승',
      '너무 늦은 귀가',
      '웨이팅 긴 맛집',
      '강한 운동',
      '너무 시끄러운 장소',
      '강한 햇빛',
    ])
    .showOtherOption(true)
    .setRequired(false);
}

function addSlotSection(form, slot) {
  form.addPageBreakItem()
    .setTitle(slot.title)
    .setHelpText(slot.time + '\n예시: ' + slot.examples.join(' / '));

  form.addMultipleChoiceItem()
    .setTitle(slot.title + ' · 참여 여부')
    .setChoiceValues(['참여하고 싶어요', '아직 미정이에요', '쉬거나 개인 일정 예정이에요'])
    .setRequired(true);

  form.addCheckboxItem()
    .setTitle(slot.title + ' · 관심 그룹')
    .setHelpText('끌리는 그룹을 모두 체크해 주세요. 운영진은 이 응답을 1차 그룹핑 기준으로 봅니다.')
    .setChoiceValues(slot.groupChoices)
    .showOtherOption(true)
    .setRequired(true);

  form.addCheckboxItem()
    .setTitle(slot.title + ' · 특히 끌리는 세부 후보')
    .setHelpText('그룹 안에서 코스를 고를 때 참고합니다. 없어도 괜찮아요.')
    .setChoiceValues(slot.routeChoices)
    .showOtherOption(true)
    .setRequired(false);

  form.addMultipleChoiceItem()
    .setTitle(slot.title + ' · 원하는 분위기')
    .setChoiceValues([
      '콘텐츠 적극형 · 사진/릴스/브이로그를 같이 만들고 싶어요',
      '같이 즐기기형 · 콘텐츠보다 동행과 경험이 중요해요',
      '조용한 회복형 · 피로를 줄이고 여유 있게 움직이고 싶어요',
      '유연한 추천형 · 그룹 분위기에 맞출 수 있어요',
    ])
    .setRequired(true);

  form.addMultipleChoiceItem()
    .setTitle(slot.title + ' · 이동/활동 가능 범위')
    .setChoiceValues([
      'active · 많이 걷거나 러닝도 가능',
      'moderate · 적당히 걷고 택시/대중교통도 가능',
      'light · 짧게 걷고 가까운 곳 위주',
      'nearby_only · 호텔/코타이 근처만',
    ])
    .setRequired(true);

  form.addCheckboxItem()
    .setTitle(slot.title + ' · 이 시간대에 피하고 싶은 것')
    .setChoiceValues([
      '긴 도보',
      '긴 대기',
      '멀리 이동',
      '실외 더위',
      '시끄러운 장소',
      '무리한 운동',
      '늦은 복귀',
      '예산이 크게 드는 코스',
    ])
    .showOtherOption(true)
    .setRequired(false);

  form.addParagraphTextItem()
    .setTitle(slot.title + ' · 운영진에게 남길 메모')
    .setHelpText('같이 가고 싶은 사람, 컨디션, 꼭 가고 싶은 장소 등이 있으면 적어주세요.')
    .setRequired(false);
}

function addConsentSection(form) {
  form.addPageBreakItem()
    .setTitle('제출 전 확인')
    .setHelpText('자유일정 매칭은 추천용이며, 최종 선택은 참가자끼리 자유롭게 조정할 수 있습니다.');

  form.addCheckboxItem()
    .setTitle('확인 및 동의')
    .setChoiceValues([
      '내 응답이 자유일정 그룹 추천과 운영진 안내 메시지 작성에 활용되는 것에 동의합니다.',
    ])
    .setRequired(true);
}
