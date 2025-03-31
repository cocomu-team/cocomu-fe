# COCOMU 프론트 팀 기술 문서

<hr style="height:1px; background:#ccc; border:none;" />

<br />

## 🗓️ 개발 기간

MVP 개발: 2025.02.24 ~ 2025.03.17

현재: 기능 확장 및 유지보수 진행 중

<br />

<br />

## 🛠️ Frontend Tech Stack

![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![TanStack Query](https://img.shields.io/badge/TanStack%20Query-FF4154?style=for-the-badge&logo=react-query&logoColor=white)
![Zustand](https://img.shields.io/badge/Zustand-8E44AD?style=for-the-badge)
![Emotion](https://img.shields.io/badge/Emotion-C764EB?style=for-the-badge)
![ESLint](https://img.shields.io/badge/ESLint-4B32C3?style=for-the-badge&logo=eslint&logoColor=white)
![Prettier](https://img.shields.io/badge/Prettier-F7B93E?style=for-the-badge&logo=prettier&logoColor=black)
![Axios](https://img.shields.io/badge/Axios-5A29E4?style=for-the-badge)
![Sentry](https://img.shields.io/badge/Sentry-362D59?style=for-the-badge&logo=sentry&logoColor=white)
![Storybook](https://img.shields.io/badge/Storybook-FF4785?style=for-the-badge&logo=storybook&logoColor=white)

<br />

<br />

## ✍️ 코코무 개발 이야기


### 📌 우리가 겪은 기술적 선택들

- [왜 우리는 TanStack Query와 Zustand를 선택했을까?](https://seio924.tistory.com/33)
- [Axios vs Fetch: 언제, 왜, 무엇을 선택할 것인가](https://seio924.tistory.com/34)
- [Styled-components vs Emotion vs Tailwind, 우리의 스타일 전쟁기](https://seio924.tistory.com/35)
- [컴포넌트 재사용성과 확장성, Atomic Design으로 해결하기](https://seio924.tistory.com/37)

### 🌱 도구와 문화, 그리고 성장기

- [왜 이제서야 Storybook을 도입했냐고요?](https://seio924.tistory.com/39)
- [우리 팀의 협업 도구 사용법, 진짜 솔직 후기](https://seio924.tistory.com/40)

### 🚀 퍼포먼스를 위한 발버둥

- [웹 폰트 최적화, 작지만 체감되는 속도 개선](https://seio924.tistory.com/36)
- [코드 스플리팅으로 사용자 경험 살리기](https://seio924.tistory.com/38)

<br />

<br />

## 🤝 협업 방식 & 컨벤션

### 📍 협업 흐름: GitHub Flow 기반

저희는 GitHub Flow를 기반으로 한 협업 전략을 사용하고 있습니다.

기본 브랜치인 main에서 각 기능(feature) 단위로 브랜치를 분리하고, PR(Pull Request)을 통해 코드 리뷰 후 병합하는 방식으로 협업을 진행합니다.

**브랜치 & 커밋 타입**

| 타입      | 설명                          |
|-----------|-------------------------------|
| feat      | 새로운 기능 추가              |
| fix       | 버그 수정                     |
| refactor  | 코드 리팩토링                 |
| style     | 스타일 관련 수정 (CSS 등)     |
| docs      | 문서 추가/수정                |

<br />

### MVP 개발 당시 (JIRA 연동)

MVP 개발 단계에서는 JIRA 이슈 트래킹 도구를 함께 사용했기 때문에,
브랜치와 커밋 메시지에 JIRA 이슈 번호를 포함해 작업을 추적했습니다.

- 브랜치 이름: jiraIssueType-type/#issueNumber
  [ 예: COC-101-feat/#1 ]

- 커밋 메시지: jiraIssueType-type(#issueNumber)
  [ 예: COC-101-feat(#1) ]

<br />

### 현재: JIRA 미사용 → 단순화된 네이밍으로 전환

현재는 JIRA를 더 이상 사용하지 않기 때문에,
더 간단하고 명확한 브랜치 및 커밋 규칙으로 전환했습니다.

- 브랜치 이름: type/#issueNumber
  [ 예: feat/#1 ]

- 커밋 메시지: type(#issueNumber)
  [ 예: feat(#1) ]

<br />

### 💅 코드 컨벤션

코드는 기본적으로 Airbnb JavaScript 스타일 가이드를 따르고 있으며,
ESLint + Prettier를 설정하여 일관된 스타일을 유지하고 있습니다.