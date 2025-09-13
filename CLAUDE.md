# SlideCraft AI - Claude Code 작업 기록

## 프로젝트 개요
AI 기반 프레젠테이션 생성 플랫폼 개발

## 커밋 메시지 가이드라인
- 간결하고 명확한 제목 (50자 이하)
- 필요시 본문에 상세 설명
- 🤖 Generated with [Claude Code](https://claude.ai/code) 서명 제거
- Co-Authored-By: Claude <noreply@anthropic.com> 서명 제거

## 주요 기술 스택
- Frontend: HTML5, CSS3, Vanilla JavaScript
- Backend: Python Flask/FastAPI (예정)
- Design System: Custom CSS Variables
- Responsive Design: Mobile-first approach

## 최근 작업 내용

### CSS 아키텍처 정리 (2025-01-13)
- index.html의 모든 인라인 CSS를 main.css로 이동
- 중복된 스타일 정의 제거 및 CSS 규칙 통합
- 논리적 섹션별 스타일 조직화 및 주석 추가
- 반응형 디자인 및 모바일 최적화 강화
- HTML 구조와 스타일링 간의 코드 분리 개선
- 적절한 캐스케이딩 및 특이도를 가진 CSS 조직화

### 폴더 구조 리팩토링
- frontend/backend 분리 구조로 전환
- assets/css, assets/js 디렉토리 구성
- 깔끔한 프로젝트 아키텍처 구축

### 텍스트 가시성 최적화
- Hero 섹션 텍스트 가독성 문제 해결
- 강력한 텍스트 그림자 및 대비 적용
- 모바일 반응형 텍스트 크기 조정

## 개발 환경 설정
- Git 저장소: https://github.com/back2zion/slidecraft-ai
- 로컬 개발 서버: Live Server 또는 Python http.server
- 브라우저 테스트: Chrome, Firefox, Safari (모바일 포함)

## 코드 품질 관리 규칙

### 3번 점검 원칙 ⚠️
**모든 코드 작성/수정 후 반드시 3번 점검하고 테스트할 것**

1. **첫 번째 점검**: 코드 작성 직후 기본 동작 확인
2. **두 번째 점검**: 실제 브라우저에서 UI/UX 테스트 
3. **세 번째 점검**: 모바일 기기 및 다양한 환경에서 검증

### 점검해야 할 주요 항목들
- 📱 모바일 반응형 디자인 동작
- 🎨 CSS 스타일링 정상 적용
- 🌐 i18n 번역 시스템 작동
- 🔗 링크 및 버튼 기능성
- 🎯 사용자 경험 흐름
- 🚀 페이지 로딩 속도
- ♿ 접근성 및 사용성

### 문제 발생시 체크리스트
- [ ] CSS 우선순위 및 특이성 확인
- [ ] JavaScript 로딩 순서 점검
- [ ] 브라우저 캐시 클리어 후 재테스트
- [ ] 개발자 도구 콘솔 에러 확인
- [ ] 다른 브라우저에서 크로스 체크

## 테스트 체크리스트
- [ ] 데스크탑 브라우저에서 텍스트 가독성
- [ ] 모바일 기기에서 반응형 동작
- [ ] 네비게이션 메뉴 동작
- [ ] CTA 버튼 호버 효과
- [ ] 폼 제출 기능
- [ ] i18n 번역 시스템 정상 작동
- [ ] Hero 섹션 텍스트 가시성