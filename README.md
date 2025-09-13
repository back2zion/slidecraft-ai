# 🚀 SlideCraft AI

> **Transform ideas into stunning presentations with AI - One-click PowerPoint generation using Claude AI**

Create professional PowerPoint presentations automatically from natural language descriptions using Claude AI.

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
Use directly on GitHub Pages: **[SlideCraft AI 🔗](https://back2zion.github.io/slidecraft-ai/)**

### Local Development

#### 🚀 Using UV (Recommended - Fast & Modern)
```bash
# 1. Clone the repository
git clone https://github.com/back2zion/slidecraft-ai.git
cd slidecraft-ai

# 2. Setup environment with UV (auto-installs Python)
uv sync

# 3. Run proxy server (for CORS resolution)
uv run python server.py

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

1. **API Setup**: Get your Claude API key from [console.anthropic.com](https://console.anthropic.com/) and enter it
2. **Input Topic**: Naturally describe the presentation you want to create
3. **Select Options**: Choose slide count, target audience, and presentation duration
4. **AI Generation**: Click "Generate PPT with AI Magic!"
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
├── index.html          # 🎨 Main web application
├── script.js           # ⚡ JavaScript logic & AI integration
├── server.py           # 🔧 CORS proxy server (optional)
├── pyproject.toml      # 🚀 UV project configuration
├── uv.lock            # 🔒 Dependency lock file
├── .env.example       # 🔑 Environment variables example
├── README.md          # 📖 Project documentation
└── .venv/             # 🐍 Virtual environment (auto-created by UV)
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