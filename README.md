# 🚀 SlideCraft AI

> **Transform ideas into stunning presentations with AI - One-click PowerPoint generation using Claude AI**

A complete SaaS platform for creating professional PowerPoint presentations using AI. Features a full website with landing page, product information, and a powerful presentation generator supporting multiple AI models.

## 🎬 Demo Video
[![SlideCraft AI Demo](https://img.youtube.com/vi/pBW2L7jmffw/0.jpg)](https://youtu.be/pBW2L7jmffw?si=BnozBR-e7pAHQjBK)
> Click to watch the demo video on YouTube

## ✨ Key Features

### 🎯 One-Click Creation
- Generate perfect presentations from natural language input
- AI-powered topic analysis and template selection  
- Real-time preview and editing capabilities

### 🎨 Professional Design
- 4 category-based automatic color themes
- Modern layouts and typography
- Responsive web interface

### 🤖 Smart AI Integration
- Claude API-powered content generation
- Topic-optimized structure design
- Customized for target audience and duration

### ⚡ Client-Side Execution
- Direct PPT generation in browser with PptxGenJS
- Completely independent - no server required
- Instant download (.pptx files)

## 🛠️ Tech Stack

- **Frontend**: Vanilla HTML/CSS/JavaScript
- **PPT Generation**: PptxGenJS
- **AI**: Claude API (Anthropic)
- **Styling**: Custom CSS
- **Package Manager**: UV (Python Package Manager)
- **Server**: Python HTTP Server (CORS Proxy)

## 🚀 Getting Started

### Online Usage (Recommended)
**🌐 Website**: **[SlideCraft AI 🔗](https://back2zion.github.io/slidecraft-ai/)** - Complete website with features, demo, and pricing
**🚀 Direct App**: **[Launch App 🔗](https://back2zion.github.io/slidecraft-ai/frontend/pages/app.html)** - Jump straight to the presentation generator

### Local Development

#### 🚀 Using UV (Recommended - Fast & Modern)
```bash
# 1. Clone the repository
git clone https://github.com/back2zion/slidecraft-ai.git
cd slidecraft-ai

# 2. Setup environment with UV (auto-installs Python)
uv sync

# 3. Run proxy server (for CORS resolution)
uv run python backend/api/server.py

# 4. Or simple file server
python -m http.server 8000
```

#### 📦 Traditional Method
```bash
git clone https://github.com/back2zion/slidecraft-ai.git
cd slidecraft-ai
python -m http.server 8000
# Open browser at http://localhost:8000
```

## 📝 How to Use

### 🌐 Via Website (Easiest)
1. **Visit**: Go to [SlideCraft AI website](https://back2zion.github.io/slidecraft-ai/)
2. **Explore**: Check out features, watch demo, view pricing
3. **Launch**: Click "Launch App" to start creating
4. **Create**: Enter your AI API key and generate presentations

### 🖥️ Via Direct App Link
1. **API Setup**: Get your AI API key (Claude, OpenAI, or Gemini) and enter it
2. **Input Topic**: Naturally describe the presentation you want to create
3. **Select Options**: Choose slide count, templates, and customization
4. **AI Generation**: Click "Generate Professional Presentation!"
5. **Preview**: View slides in real-time with navigation
6. **Download**: Get your completed PPT file

## 🎨 Color Themes

- **Marketing**: Orange-Red gradient
- **Technology**: Blue-Purple gradient  
- **Education**: Green-Blue gradient
- **Business**: Corporate Blue

## 🔧 Development

### Project Structure
```
slidecraft-ai/
├── 📁 frontend/                    # Frontend (GitHub Pages)
│   ├── 📁 pages/                   # HTML pages
│   │   ├── index.html              # 🎨 Landing page  
│   │   ├── app.html               # 🚀 Main application
│   │   ├── features.html
│   │   ├── pricing.html
│   │   └── demo.html
│   ├── 📁 assets/js/               # JavaScript files
│   │   ├── script.js              # ⚡ Main application logic
│   │   ├── ai-providers.js        # 🤖 Multi-LLM integration
│   │   ├── template-engine.js     # 🎨 Template system
│   │   ├── design-system.js       # 🎨 Component library
│   │   └── i18n.js               # 🌐 Internationalization
│   └── 📁 admin/                   # Admin dashboard
├── 📁 backend/                     # Backend services
│   ├── 📁 api/                     # API servers
│   │   ├── server.py              # 🔧 CORS proxy server
│   │   └── waitlist-server.py     # 📧 Waitlist API
│   ├── 📁 config/                  # Configuration
│   │   └── email-config.py        # 📧 Email settings
│   └── 📁 database/                # Data storage
├── 📁 config/                      # Project configuration
│   ├── pyproject.toml             # 🚀 UV configuration
│   └── uv.lock                    # 🔒 Dependency lock
├── 📁 docs/                        # Documentation
│   ├── CLAUDE.md                  # 🤖 Development guide
│   └── EMAIL_SETUP.md             # 📧 Email setup
└── README.md                       # 📖 Main documentation
```

### API Key Security
- API keys stored in localStorage only
- Never uploaded to GitHub
- Client-side only usage

## 🌟 Features

- ✅ Completely free and open source
- ✅ No server installation required
- ✅ Modern browser support
- ✅ Mobile responsive design
- ✅ Real-time preview
- ✅ Multiple download options
- ⚡ UV-powered fast development environment
- 🔒 Secure local API key storage

## 🤝 Contributing

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

MIT License - see the `LICENSE` file for details.

## 👨‍💻 Author

**Kwak Dooil**
- Email: [babel.ai.dub@gmail.com](mailto:babel.ai.dub@gmail.com)

## 🙏 Acknowledgments

- [Claude AI](https://claude.ai) - Powerful AI model
- [PptxGenJS](https://gitbrent.github.io/PptxGenJS/) - PPT generation library
- [GitHub Pages](https://pages.github.com/) - Free hosting

---

**Made with ❤️ for creating beautiful presentations effortlessly**