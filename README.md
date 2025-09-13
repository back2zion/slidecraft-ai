# 🚀 AI PPT Generator

> **간단한 설명만으로 완벽한 프레젠테이션을 만들어주는 AI 기반 PPT 생성기**

Claude AI를 활용하여 자연어 입력만으로 전문적인 PowerPoint 프레젠테이션을 자동 생성합니다.

## ✨ 주요 기능

### 🎯 원클릭 완성
- 자연어 입력만으로 완벽한 PPT 생성
- AI 자동 주제 분석 및 템플릿 선택  
- 실시간 프리뷰 및 편집

### 🎨 프로페셔널 디자인
- 4가지 카테고리별 자동 색상 테마
- 현대적인 레이아웃과 타이포그래피
- 반응형 웹 인터페이스

### 🤖 스마트 AI 통합
- Claude API 기반 콘텐츠 생성
- 주제별 최적화된 구조 설계
- 대상 및 시간에 맞춤 조정

### ⚡ 클라이언트 사이드 실행
- PptxGenJS로 브라우저에서 직접 PPT 생성
- 서버 없이 완전 독립 실행
- 즉시 다운로드 (.pptx 파일)

## 🛠️ 기술 스택

- **Frontend**: Vanilla HTML/CSS/JavaScript
- **PPT 생성**: PptxGenJS
- **AI**: Claude API (Anthropic)
- **스타일**: 커스텀 CSS

## 🚀 사용 방법

### 온라인 사용 (권장)
GitHub Pages에서 바로 사용하세요: **[SlideCraft AI 🔗](https://back2zion.github.io/slidecraft-ai/)**

### 로컬 실행
```bash
git clone https://github.com/back2zion/slidecraft-ai.git
cd slidecraft-ai
python -m http.server 8000
# 브라우저에서 http://localhost:8000 접속
```

## 📝 사용 가이드

1. **API 키 설정**: Claude API 키를 [console.anthropic.com](https://console.anthropic.com/)에서 발급받아 입력
2. **주제 입력**: 자연스럽게 원하는 PPT 설명을 입력
3. **옵션 선택**: 분량, 대상, 시간 선택
4. **AI 생성**: "AI 마법으로 PPT 완성하기!" 클릭
5. **미리보기**: 실시간으로 슬라이드 확인
6. **다운로드**: 완성된 PPT 파일 다운로드

## 🎨 색상 테마

- **마케팅**: 오렌지-레드 그라데이션
- **기술**: 블루-퍼플 그라데이션  
- **교육**: 그린-블루 그라데이션
- **비즈니스**: 코퍼레이트 블루

## 🔧 개발 정보

### 프로젝트 구조
```
web/
├── index.html          # 메인 HTML 파일
├── script.js           # JavaScript 로직
├── server.py           # 프록시 서버 (CORS 해결)
└── README.md           # 프로젝트 설명
```

### API 키 보안
- API 키는 localStorage에만 저장
- GitHub에는 업로드되지 않음
- 클라이언트 사이드에서만 사용

## 🌟 특징

- ✅ 완전 무료 오픈소스
- ✅ 서버 설치 불필요
- ✅ 모던 브라우저 지원
- ✅ 모바일 반응형
- ✅ 실시간 프리뷰
- ✅ 다중 다운로드 옵션

## 🤝 기여하기

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 라이선스

MIT License - 자세한 내용은 `LICENSE` 파일을 참조하세요.

## 👨‍💻 제작자

**Kwak Dooil**
- Email: [babel.ai.dub@gmail.com](mailto:babel.ai.dub@gmail.com)

## 🙏 감사의 말

- [Claude AI](https://claude.ai) - 강력한 AI 모델 제공
- [PptxGenJS](https://gitbrent.github.io/PptxGenJS/) - PPT 생성 라이브러리
- [GitHub Pages](https://pages.github.com/) - 무료 호스팅

---

**Made with ❤️ for creating beautiful presentations effortlessly**