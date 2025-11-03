# 자기소개 홈페이지

React + Vite로 만든 귀여운 디자인의 자기소개 포트폴리오 웹사이트입니다.

## 🚀 기술 스택

- **React** 18.2.0
- **Vite** 5.0.8 (빌드 도구)
- **React Router** 6.20.0 (라우팅)

## 📦 설치 및 실행

### 1. 의존성 설치
```bash
npm install
```

### 2. 개발 서버 실행
```bash
npm run dev
```

### 3. 프로덕션 빌드
```bash
npm run build
```

### 4. 빌드 미리보기
```bash
npm run preview
```

## 📁 프로젝트 구조

```
src/
├── components/        # 재사용 가능한 컴포넌트
│   ├── Layout.jsx   # 레이아웃 컴포넌트 (헤더, 푸터)
│   └── Layout.css
├── pages/           # 페이지 컴포넌트
│   ├── Home.jsx     # 홈 페이지
│   ├── About.jsx    # 자기소개 페이지
│   ├── Skills.jsx   # 스킬 페이지
│   ├── Projects.jsx # 프로젝트 페이지
│   └── Contact.jsx  # 연락처 페이지
├── App.jsx          # 메인 앱 컴포넌트
└── main.jsx         # 진입점
```

## 🎨 특징

- ✨ 귀여운 디자인 (핑크 계열 그라데이션)
- 📱 완전 반응형 레이아웃
- 🎯 부드러운 스크롤 애니메이션
- 🚀 빠른 개발 서버 (Vite)
- 🎨 현대적인 UI/UX

## 📝 커스터마이징

각 페이지의 정보를 수정하려면 `src/pages/` 폴더의 해당 파일을 편집하세요:

- **About.jsx**: 이름, 이메일, 위치 등 개인 정보
- **Skills.jsx**: 보유 스킬과 레벨
- **Projects.jsx**: 프로젝트 목록
- **Contact.jsx**: 연락처 정보

## 🌐 배포

GitHub Pages에 배포하려면:

1. `vite.config.js`에서 `base: './'`로 설정되어 있는지 확인
2. 빌드: `npm run build`
3. `dist` 폴더의 내용을 GitHub Pages에 업로드

## 📄 라이선스

MIT License
