# 🚀 AI PPT Generator - HTML Version

## 완전한 웹 네이티브 PPT 생성기

Gamma.app 수준의 완성도를 목표로 한 HTML/JavaScript 기반 프레젠테이션 생성기입니다.

## ✨ 주요 기능

### 🎯 원클릭 완성
- 자연어 입력만으로 완벽한 PPT 생성
- AI 자동 주제 분석 및 템플릿 선택
- 실시간 프리뷰 및 편집

### 🎨 프로페셜널 디자인
- 4가지 카테고리별 자동 색상 테마
- Gamma.app 스타일 애니메이션
- 반응형 디자인 (모바일 지원)

### 🤖 스마트 AI 통합
- Claude API 기반 콘텐츠 생성
- 주제별 최적화된 구조 설계
- 대상 및 시간에 맞춤 조정

### ⚡ 클라이언트 사이드 실행
- PptxGenJS로 브라우저에서 직접 PPT 생성
- 서버 없이 완전 독립 실행
- 즉시 다운로드 (.pptx + JSON 백업)

## 🛠️ 기술 스택

- **Frontend**: Vanilla HTML/CSS/JavaScript
- **PPT 생성**: PptxGenJS
- **AI**: Claude API
- **스타일**: TailwindCSS + 커스텀 CSS
- **폰트**: Google Fonts (Inter)

## 🚀 실행 방법

### 로컬 실행
```bash
# 웹 서버 실행 (Python)
cd web
python -m http.server 8000

# 또는 Node.js
npx serve .

# 브라우저에서 접속
http://localhost:8000
```

### 온라인 배포
- **GitHub Pages**: 무료 호스팅
- **Vercel**: 원클릭 배포
- **Netlify**: 드래그 앤 드롭 배포

## 📂 파일 구조

```
web/
├── index.html          # 메인 HTML 파일
├── script.js           # JavaScript 로직
└── README.md           # 프로젝트 설명
```

## 🎯 사용 방법

1. **주제 입력**: 자연스럽게 원하는 PPT 설명
2. **옵션 선택**: 분량, 대상, 시간 선택
3. **AI 생성**: "AI 마법으로 PPT 완성하기!" 클릭
4. **미리보기**: 실시간으로 슬라이드 확인
5. **다운로드**: 완성된 PPT 파일 다운로드

## 🎨 디자인 특징

### 색상 테마 자동 선택
- **마케팅**: 오렌지-레드 그라데이션
- **기술**: 블루-퍼플 그라데이션  
- **교육**: 그린-블루 그라데이션
- **비즈니스**: 코퍼레이트 블루

### 애니메이션 효과
- 페이드인/슬라이드업 애니메이션
- 호버 효과 및 전환 애니메이션
- 로딩 상태 및 축하 효과

## 🔧 커스터마이징

### API 키 변경
```javascript
// script.js 파일에서 수정
const CLAUDE_API_KEY = 'your-api-key-here';
```

### 색상 테마 추가
```javascript
// script.js - colorSchemes 객체에 추가
const colorSchemes = {
    'custom': { 
        primary: '#your-color', 
        secondary: '#your-color', 
        bg: 'linear-gradient(135deg, #color1 0%, #color2 100%)' 
    }
};
```

## 🌟 향후 계획

- [ ] 차트 및 이미지 자동 삽입
- [ ] 템플릿 커스터마이징 UI
- [ ] 실시간 협업 기능
- [ ] 음성 입력 지원
- [ ] PWA (Progressive Web App) 변환

## 📞 문의

**제작자**: Kwak Dooil  
**버전**: v2.0  
**라이선스**: MIT

---

**Made with ❤️ for creating beautiful presentations effortlessly**