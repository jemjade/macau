# AI 자유일정 매칭 Google Form 만들기

이 폴더의 `create-free-time-matcher-form.gs`를 Google Apps Script에서 실행하면 자유시간 3회차별 선호 설문이 자동 생성됩니다.

## 만드는 방법

1. https://script.google.com 접속
2. `새 프로젝트` 생성
3. `Code.gs` 내용을 지우고 `create-free-time-matcher-form.gs` 전체를 붙여넣기
4. 상단 함수 선택에서 `createFreeTimeMatcherForm` 선택
5. `실행` 클릭
6. 권한 승인
7. Apps Script의 `실행 로그`에서 아래 URL 확인
   - `Form edit URL`
   - `Form public URL`
   - `Response Sheet URL`

## 폼 구성

구글폼 대신 화면에서 바로 입력받고 싶다면 `free-time-matcher/index.html`을 사용하면 됩니다. 참가자는 `참여 입력` 섹션에서 이름과 시간대별 관심 그룹을 체크한 뒤 `내 관심 일정 제출`만 누르면 됩니다.

- 기본 정보
- Day 1 디너 후 야간 자유시간
- Day 2 트라이 세션 이후 오후 자유시간
- Day 3 체크아웃 전 오전 자유시간
- 제출 전 확인

각 자유시간 섹션은 참여 여부, 관심 그룹, 세부 후보 코스, 원하는 분위기, 이동/활동 가능 범위, 피하고 싶은 것, 운영진 메모를 받습니다.

핵심 그룹핑 기준은 `관심 그룹`입니다. 사용자가 각 시간대에서 끌리는 그룹을 복수 선택하면, 운영진은 같은 그룹 타입을 선택한 참가자를 먼저 묶고 세부 후보 코스와 제약조건으로 최종 조정하면 됩니다.

관심 그룹은 각 시간대에 맞게 선택지로 들어갑니다.

- Day 1: 야경 포토, 디저트 카페, 카지노 구경, 쇼핑 산책, 회복 휴식, 운영진 추천
- Day 2: 로컬 먹거리, 문화유산 포토, 러닝 워킹 콘텐츠, 회복 카페 마사지, 쇼핑, 해변 로컬워크, 운영진 추천
- Day 3: 브런치 카페, 마지막 디저트, 짧은 산책 포토, 기념품 쇼핑, 로컬워크, 회복 휴식, 운영진 추천

## 사이트와 연결할 때

응답 Sheet 원본을 바로 쓰기보다, 운영용 탭을 따로 만드는 것을 추천합니다.

- `FORM_RESPONSES`: 구글폼 원본 응답
- `PARTICIPANTS`: 참가자 기본 정보 정리
- `SLOT_PREFERENCES`: 참가자별/자유시간별 선호 정리
- `MATCHED_GROUPS`: 운영자가 확정한 그룹
- `GROUP_MEMBERS`: 그룹별 멤버
- `GROUP_ROUTES`: 그룹별 추천 코스

현재 사이트의 mock 데이터는 `free-time-matcher/matcher-data.js`에 있으므로, 나중에 Sheet 연동을 붙일 때는 이 파일의 `RUNFLUENCER_PARTICIPANTS`, `RUNFLUENCER_FREE_TIME_SLOTS`, `RUNFLUENCER_MATCHED_GROUPS`를 Sheet fetch 결과로 바꾸면 됩니다.
