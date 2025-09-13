# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with the SlideCraft AI repository.

## Project Overview

**SlideCraft AI** is a comprehensive AI-powered presentation generator that transforms ideas into professional PowerPoint presentations in minutes. The project has evolved from a simple PPT generator to a full-stack web application with advanced features.

## Development Environment - UV Package Manager

**⚡ This project uses UV (Ultra-fast Python package manager) for dependency management.**

### Package Management Commands

```bash
# Install all dependencies
uv sync

# Install waitlist server dependencies
uv sync --group waitlist

# Install development dependencies  
uv sync --group dev

# Install testing dependencies
uv sync --group testing

# Add new dependency
uv add package-name

# Add to specific group
uv add --group waitlist flask-mail

# Run Python with UV environment
uv run python script.py

# Run servers with UV
uv run server.py
uv run --group waitlist waitlist-server.py
```

### Why UV?
- **10-100x faster** than pip/poetry
- **Automatic virtual environment** management
- **Lockfile-based** dependency resolution
- **Cross-platform** compatibility
- **Modern Python** project standard

## Application Architecture

### Core Components

1. **Frontend (Static Files)**:
   - `frontend/pages/index.html` - Landing page
   - `frontend/pages/app.html` - Main AI PPT generator application  
   - `frontend/admin/admin.html` - Waitlist management dashboard
   - `frontend/assets/js/script.js` - Main application logic
   - `frontend/assets/js/ai-providers.js` - Multi-LLM integration
   - `frontend/assets/js/template-engine.js` - Advanced template system
   - `frontend/assets/js/design-system.js` - Component library
   - `frontend/assets/js/i18n.js` - Internationalization system

2. **Backend Servers**:
   - `backend/api/server.py` - Main app CORS proxy server (port 8000)
   - `backend/api/waitlist-server.py` - Waitlist API with email (port 5001)

3. **AI Integration**:
   - Multi-LLM support (Claude, OpenAI, Gemini)
   - Content quality scoring system
   - Smart template selection

4. **Email System**:
   - `backend/config/email-config.py` - SMTP email sending
   - Welcome emails for waitlist signups
   - Admin notifications
   - HTML email templates

### Technology Stack

- **Frontend**: Vanilla HTML/CSS/JavaScript
- **Backend**: Python Flask
- **Package Manager**: UV (uv)
- **AI APIs**: Claude, OpenAI, Gemini
- **PPT Generation**: PptxGenJS (client-side)
- **Database**: SQLite (waitlist)
- **Email**: SMTP with secure-smtplib
- **Styling**: Custom design system

## Quick Start Commands

### Development Setup
```bash
# Clone and setup
git clone https://github.com/back2zion/slidecraft-ai.git
cd slidecraft-ai

# Install dependencies with UV
uv sync --group waitlist

# Start both servers
uv run backend/scripts/start-servers.py
# OR manually:
uv run backend/api/server.py                                    # Main app (port 8000)
uv run --group waitlist backend/api/waitlist-server.py         # Waitlist API (port 5001)
```

### Access Points
- **Main App**: http://localhost:8000/frontend/pages/
- **Landing Page**: http://localhost:8000/frontend/pages/index.html  
- **App**: http://localhost:8000/frontend/pages/app.html
- **Admin Dashboard**: http://localhost:8000/frontend/admin/admin.html
- **Health Check**: http://localhost:5001/health

### Email Configuration
```bash
# Create .env file for email functionality
cp .env.email.example .env

# Edit .env with your Gmail credentials:
SENDER_EMAIL=your-email@gmail.com
SENDER_PASSWORD=your-app-password
SENDER_NAME=SlideCraft AI Team
```

## Development Guidelines

### Code Organization
- **Multi-LLM Architecture**: `ai-providers.js` contains provider abstractions
- **Template System**: `template-engine.js` handles 12 professional templates
- **Design System**: `design-system.js` provides consistent UI components
- **Internationalization**: `i18n.js` provides Korean/English language support
- **Email Templates**: `email-config.py` contains HTML email designs

### Testing
```bash
# Install testing dependencies
uv sync --group testing

# Run tests (when implemented)
uv run pytest

# Test email functionality
curl -X POST http://localhost:5001/api/test-email \
     -H "Content-Type: application/json" \
     -d '{"email": "test@example.com"}'
```

### Adding Dependencies

```bash
# Core dependencies (always available)
uv add requests

# Waitlist-specific dependencies
uv add --group waitlist flask-mail

# Development dependencies
uv add --group dev black ruff

# Testing dependencies  
uv add --group testing pytest pytest-cov
```

## Key Features

### 1. Multi-LLM Support
- **Claude**: Primary AI provider for content generation
- **OpenAI**: GPT-4 integration for alternative content
- **Gemini**: Google's AI for content diversity
- **Quality Scoring**: Automatic content evaluation and selection

### 2. Advanced Template Engine
- **12 Professional Templates**: Business, Creative, Technical themes
- **9 Layout Types**: Title, content, comparison, timeline, process, data
- **Smart Content Fitting**: Auto-adjusts fonts, spacing, layout
- **Content-Aware Formatting**: Detects and optimizes different content types

### 3. Email Marketing System
- **Welcome Emails**: Automated HTML emails for new signups
- **Admin Notifications**: Real-time alerts for new waitlist members
- **Template System**: Professional, mobile-responsive designs
- **SMTP Security**: App passwords, TLS encryption

### 4. Design System
- **Component Library**: Buttons, inputs, cards, modals, toasts
- **Theme Support**: Light/dark mode with CSS custom properties
- **Animation Library**: Micro-interactions and transitions
- **Accessibility**: ARIA compliance, keyboard navigation

### 5. Internationalization (i18n)
- **Multilingual Support**: Korean and English language switching
- **Browser Detection**: Automatic language detection using navigator.language
- **Persistent Storage**: Language preference saved in localStorage
- **Dynamic Translation**: Real-time UI translation with data-i18n attributes
- **Fallback System**: English fallback if Korean translation missing

## Environment Variables

### Required for Email Functionality
```bash
SMTP_SERVER=smtp.gmail.com
SMTP_PORT=587
SENDER_EMAIL=your-email@gmail.com
SENDER_PASSWORD=your-app-password
SENDER_NAME=SlideCraft AI Team
ADMIN_EMAIL=admin@your-domain.com
```

### Optional for Enhanced Features
```bash
CLAUDE_API_KEY=your-claude-key
OPENAI_API_KEY=your-openai-key
GEMINI_API_KEY=your-gemini-key
```

## Deployment

### GitHub Pages (Static Frontend)
- **Live URL**: https://back2zion.github.io/slidecraft-ai/
- **Auto-deploy**: Pushes to main branch trigger deployment
- **Static Files**: index.html, landing.html, all JS/CSS

### Local Development
```bash
# Start development servers
uv run start-servers.py

# Access applications
open http://localhost:8000/landing.html    # Marketing page
open http://localhost:8000/                # Main app
open http://localhost:8000/admin.html      # Admin dashboard
```

## Troubleshooting

### UV Installation Issues
```bash
# Install UV if not available
curl -LsSf https://astral.sh/uv/install.sh | sh

# Verify installation
uv --version
```

### Email Configuration Issues
```bash
# Test email configuration
uv run python -c "from email_config import email_sender; print(email_sender.test_connection())"

# Check environment variables
uv run python -c "import os; print('SENDER_EMAIL:', os.getenv('SENDER_EMAIL'))"
```

### Server Startup Issues
```bash
# Check port availability
netstat -an | grep :8000
netstat -an | grep :5001

# Start servers individually
uv run server.py
uv run --group waitlist waitlist-server.py
```

## Performance Optimizations

### UV Benefits
- **Faster installs**: 10-100x faster than pip
- **Better caching**: Shared cache across projects
- **Automatic venv**: No manual virtual environment management
- **Lock file**: Reproducible dependencies

### Frontend Optimizations
- **Client-side PPT generation**: No server round-trips
- **Modular JS**: Components loaded on demand
- **CSS optimization**: Minimal, well-organized stylesheets
- **Image optimization**: Optimized assets for fast loading

## Contributing

### Development Workflow
1. **Setup**: `uv sync --group dev`
2. **Create branch**: `git checkout -b feature/new-feature`
3. **Develop**: Use UV for all Python operations
4. **Test**: `uv run pytest` (when tests available)
5. **Commit**: Follow conventional commit format
6. **Push**: `git push origin feature/new-feature`

### Commit Message Guidelines
- Use clear, descriptive commit messages
- DO NOT include "Generated with [Claude Code]" or "Co-Authored-By: Claude" attributions
- Focus on what was implemented and why
- Example: "Add internationalization support with Korean/English switching"

### Code Standards
- **Python**: Follow PEP 8, use UV for dependency management
- **JavaScript**: ES6+, modular architecture
- **CSS**: Custom properties, mobile-first
- **Documentation**: Update CLAUDE.md for significant changes

### 3-Round Testing Protocol ⚠️
**모든 코드 작성/수정 후 반드시 3번 점검하고 테스트할 것**

1. **첫 번째 점검**: 코드 작성 직후 기본 동작 확인
2. **두 번째 점검**: 실제 브라우저에서 UI/UX 테스트 
3. **세 번째 점검**: 모바일 기기 및 다양한 환경에서 검증

#### 점검해야 할 주요 항목들
- 📱 모바일 반응형 디자인 동작
- 🎨 CSS 스타일링 정상 적용
- 🌐 i18n 번역 시스템 작동
- 🔗 링크 및 버튼 기능성
- 🎯 사용자 경험 흐름
- 🚀 페이지 로딩 속도
- ♿ 접근성 및 사용성

#### 문제 발생시 체크리스트
- [ ] CSS 우선순위 및 특이성 확인
- [ ] JavaScript 로딩 순서 점검
- [ ] 브라우저 캐시 클리어 후 재테스트
- [ ] 개발자 도구 콘솔 에러 확인
- [ ] 다른 브라우저에서 크로스 체크

## Project Evolution

This project has evolved significantly:
1. **v0.1**: Simple Python PPT generator
2. **v0.2**: Streamlit web interface  
3. **v0.3**: HTML/JavaScript web app
4. **v0.4**: Multi-LLM support + Template engine
5. **v0.5**: Design system + Email marketing
6. **v0.6**: Internationalization (Korean/English) (Current)

The codebase now represents a complete, production-ready AI-powered presentation platform with enterprise-grade features.