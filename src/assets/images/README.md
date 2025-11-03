# 이미지 사용 가이드

## 폴더 구조

프로젝트에는 두 가지 방식으로 이미지를 관리할 수 있습니다:

### 1. `src/assets/images/` - 컴포넌트에서 import하는 이미지
- Vite가 빌드 시 최적화하고 번들에 포함합니다
- 이미지 파일명을 해시로 변경하여 캐싱 최적화
- **사용법:**
```jsx
import profileImage from '@/assets/images/profile.jpg'

function Component() {
  return <img src={profileImage} alt="Profile" />
}
```

### 2. `public/images/` - 정적 이미지
- 빌드 시 그대로 복사되며, 루트 경로로 접근
- 파일명이 변경되지 않음
- **사용법:**
```jsx
function Component() {
  return <img src="/images/logo.png" alt="Logo" />
}
```

## 추천 사용법
- **컴포넌트에서 동적으로 사용하는 이미지**: `src/assets/images/`
- **고정된 경로의 정적 이미지**: `public/images/`

