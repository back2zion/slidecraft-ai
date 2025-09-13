# 📧 이메일 전송 설정 가이드

SlideCraft AI 웨이트리스트에서 실제 이메일을 보내려면 SMTP 설정이 필요합니다.

## 🚀 빠른 설정 (Gmail 사용)

### 1. Gmail 앱 비밀번호 생성
1. [Google 계정 관리](https://myaccount.google.com/)로 이동
2. **보안** → **2단계 인증** 활성화 (필수)
3. **앱 비밀번호** 생성: https://myaccount.google.com/apppasswords
4. "SlideCraft AI" 앱 선택 후 비밀번호 생성
5. 생성된 16자리 비밀번호 복사

### 2. 환경 변수 설정
프로젝트 폴더에 `.env` 파일 생성:

```bash
# .env 파일 내용
SENDER_EMAIL=your-email@gmail.com
SENDER_PASSWORD=abcd efgh ijkl mnop
SENDER_NAME=SlideCraft AI Team
ADMIN_EMAIL=admin@your-domain.com
```

### 3. 서버 재시작
```bash
python start-servers.py
```

## 📋 상세 설정 옵션

### 환경 변수 전체 목록
```bash
# SMTP 서버 설정
SMTP_SERVER=smtp.gmail.com          # Gmail SMTP 서버
SMTP_PORT=587                       # TLS 포트

# 발신자 정보
SENDER_EMAIL=your-email@gmail.com   # 발신 이메일 주소
SENDER_PASSWORD=your-app-password   # Gmail 앱 비밀번호
SENDER_NAME=SlideCraft AI Team      # 발신자 이름

# 관리자 알림
ADMIN_EMAIL=admin@your-domain.com   # 관리자 이메일 (선택사항)
```

### 다른 이메일 서비스 사용

#### Outlook/Hotmail
```bash
SMTP_SERVER=smtp-mail.outlook.com
SMTP_PORT=587
SENDER_EMAIL=your-email@outlook.com
SENDER_PASSWORD=your-password
```

#### 사용자 정의 SMTP
```bash
SMTP_SERVER=mail.your-domain.com
SMTP_PORT=587
SENDER_EMAIL=noreply@your-domain.com
SENDER_PASSWORD=your-smtp-password
```

## 🧪 이메일 테스트

### 1. 웹 인터페이스로 테스트
1. http://localhost:8000/admin.html 접속
2. 관리자 로그인
3. "Test Email" 버튼 클릭

### 2. API로 직접 테스트
```bash
curl -X POST http://localhost:5001/api/test-email \
     -H "Content-Type: application/json" \
     -d '{"email": "test@example.com"}'
```

## 📧 이메일 기능

### 자동 발송 이메일
1. **환영 이메일**: 웨이트리스트 가입시 자동 발송
   - 세련된 HTML 디자인
   - 개인화된 내용
   - 주요 링크 포함

2. **관리자 알림**: 새 가입자가 있을 때 관리자에게 알림
   - 가입자 정보 요약
   - IP 주소 및 사용자 에이전트
   - 관리 대시보드 링크

### 이메일 템플릿 특징
- 📱 모바일 반응형 디자인
- 🎨 브랜드 일관성 유지
- 🔗 주요 CTA 버튼 포함
- 📊 YouTube 데모 비디오 링크

## 🛠️ 문제 해결

### 이메일이 안 보내질 때
1. **환경 변수 확인**:
   ```bash
   python -c "import os; print('SENDER_EMAIL:', os.getenv('SENDER_EMAIL'))"
   ```

2. **Gmail 2단계 인증 확인**:
   - Google 계정에서 2단계 인증이 활성화되어 있는지 확인
   - 앱 비밀번호가 올바른지 확인

3. **네트워크 연결 확인**:
   - 방화벽에서 포트 587 허용 확인
   - SMTP 서버 연결 가능 여부 확인

4. **로그 확인**:
   ```bash
   # 서버 실행시 콘솔에서 이메일 로그 확인
   ✅ Welcome email sent to user@example.com
   📧 Admin notification sent for user@example.com
   ```

### 일반적인 오류

#### "Authentication failed"
- Gmail 앱 비밀번호 재생성
- 2단계 인증 활성화 확인

#### "Connection refused"
- SMTP 서버 주소 확인
- 포트 번호 확인 (Gmail: 587)

#### "Mail not sent"
- 환경 변수 설정 확인
- 네트워크 연결 상태 확인

## 🔒 보안 주의사항

1. **환경 변수 사용**: 이메일 비밀번호를 코드에 하드코딩하지 마세요
2. **Git 제외**: `.env` 파일을 `.gitignore`에 추가하세요
3. **앱 비밀번호**: Gmail 일반 비밀번호 대신 앱 비밀번호 사용
4. **정기 교체**: 보안을 위해 앱 비밀번호를 정기적으로 교체하세요

## 📞 지원

이메일 설정에 문제가 있으면:
- GitHub Issues에 문의
- 서버 로그 확인
- 환경 변수 설정 재확인