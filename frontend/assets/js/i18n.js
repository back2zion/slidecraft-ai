/**
 * SlideCraft AI Internationalization System
 * Supports Korean and English with automatic browser language detection
 */

// Language translations
const translations = {
    ko: {
        // Navigation & Header
        'nav.features': '기능',
        'nav.demo': '데모',
        'nav.pricing': '가격',
        'nav.launch': '앱 실행',
        
        // Main App Interface
        'app.title': 'SlideCraft Pro',
        'app.subtitle': '프로페셔널 프레젠테이션 생성',
        'app.description': '아이디어를 전문적인 프레젠테이션으로 변환하는 AI 도구',
        
        // Form Labels & Inputs
        'form.topic.label': '프레젠테이션 주제',
        'form.topic.placeholder': `자연스럽게 말하듯이 입력하세요!

예시:
• '우리 팀 2025년 마케팅 전략을 경영진에게 발표해야 해'
• '2024년 4분기 매출 성과 보고서'
• '신제품 출시 전략 프레젠테이션'
• '디지털 트랜스포메이션 추진 계획'`,
        'form.slides.label': '슬라이드 수',
        'form.audience.label': '대상 청중',
        'form.duration.label': '발표 시간',
        'form.template.label': '템플릿 선택',
        
        // Audience Options
        'audience.executives': '경영진',
        'audience.team': '팀/동료',
        'audience.clients': '고객/클라이언트',
        'audience.general': '일반 청중',
        
        // Duration Options
        'duration.5min': '5분',
        'duration.10min': '10분',
        'duration.15min': '15분',
        'duration.30min': '30분',
        'duration.custom': '사용자 정의',
        
        // Template Options
        'template.auto': '자동 선택 (추천)',
        'template.business': '비즈니스',
        'template.creative': '크리에이티브',
        'template.minimal': '미니멀',
        'template.dark': '다크',
        'template.corporate': '기업용',
        
        // Buttons
        'btn.generate': '📈 프로페셔널 프레젠테이션 생성',
        'btn.download': '다운로드',
        'btn.preview': '미리보기',
        'btn.prev': '이전',
        'btn.next': '다음',
        'btn.save': '저장',
        
        // API Configuration
        'api.title': 'AI 모델 설정',
        'api.claude.label': 'Claude API 키',
        'api.openai.label': 'OpenAI API 키',
        'api.gemini.label': 'Gemini API 키',
        'api.provider.label': 'AI 제공자 선택',
        'api.help': 'API 키는 브라우저에 안전하게 저장됩니다',
        
        // Analysis Results
        'analysis.title': '분석 결과:',
        'analysis.loading': '주제를 분석하고 있습니다...',
        'analysis.type': '프레젠테이션 유형',
        'analysis.template': '추천 템플릿',
        'analysis.color': '색상 테마',
        
        // Preview
        'preview.title': '미리보기',
        'preview.slide': '슬라이드',
        'preview.of': '/',
        'preview.placeholder.title': '제목을 입력하세요',
        'preview.placeholder.content': '• 내용을 입력하세요\n• 최적의 구조와 디자인이 자동으로 선택됩니다\n• 전문가급 프레젠테이션을 경험해보세요',
        
        // Status Messages
        'status.generating': '🤖 AI가 완벽한 PPT를 생성하고 있습니다...',
        'status.success': '🎉 완벽한 PPT가 완성되었습니다!',
        'status.error': '오류가 발생했습니다. 다시 시도해주세요.',
        'status.apikey.required': 'API 키를 입력해주세요.',
        'status.topic.required': '주제를 입력해주세요.',
        'status.beta': 'Beta',
        
        // Help & Instructions
        'help.title': '사용 방법',
        'help.steps': [
            '• 내용을 입력하세요',
            '• 최적의 구조와 디자인이 자동으로 선택됩니다',
            '• 전문가급 프레젠테이션을 경험해보세요'
        ],
        
        // Waitlist CTA
        'waitlist.title': '💎 프리미엄 기능 출시 예정',
        'waitlist.description': '고급 템플릿, 다중 AI 모델, 브랜드 커스터마이징',
        'waitlist.button': '📧 출시 알림 받기',
        
        // Footer
        'footer.title': 'SlideCraft Pro | Professional Presentation Builder',
        'footer.subtitle': 'Crafted with care for professionals',
        
        // Language Switcher
        'lang.korean': '한국어',
        'lang.english': 'English'
    },
    
    en: {
        // Navigation & Header
        'nav.features': 'Features',
        'nav.demo': 'Demo',
        'nav.pricing': 'Pricing', 
        'nav.launch': 'Launch App',
        
        // Main App Interface
        'app.title': 'SlideCraft Pro',
        'app.subtitle': 'Professional Presentation Builder',
        'app.description': 'AI-powered tool to transform your ideas into professional presentations',
        
        // Form Labels & Inputs
        'form.topic.label': 'Presentation Topic',
        'form.topic.placeholder': `Describe naturally what you want to create!

Examples:
• 'Our team needs a 2025 marketing strategy presentation for executives'
• 'Q4 2024 sales performance report'
• 'New product launch strategy presentation'
• 'Digital transformation initiative plan'`,
        'form.slides.label': 'Number of Slides',
        'form.audience.label': 'Target Audience',
        'form.duration.label': 'Presentation Duration',
        'form.template.label': 'Template Selection',
        
        // Audience Options
        'audience.executives': 'Executives',
        'audience.team': 'Team/Colleagues',
        'audience.clients': 'Clients/Customers',
        'audience.general': 'General Audience',
        
        // Duration Options
        'duration.5min': '5 minutes',
        'duration.10min': '10 minutes',
        'duration.15min': '15 minutes',
        'duration.30min': '30 minutes',
        'duration.custom': 'Custom',
        
        // Template Options
        'template.auto': 'Auto-select (Recommended)',
        'template.business': 'Business',
        'template.creative': 'Creative',
        'template.minimal': 'Minimal',
        'template.dark': 'Dark',
        'template.corporate': 'Corporate',
        
        // Buttons
        'btn.generate': '📈 Generate Professional Presentation',
        'btn.download': 'Download',
        'btn.preview': 'Preview',
        'btn.prev': 'Previous',
        'btn.next': 'Next',
        'btn.save': 'Save',
        
        // API Configuration
        'api.title': 'AI Model Configuration',
        'api.claude.label': 'Claude API Key',
        'api.openai.label': 'OpenAI API Key',
        'api.gemini.label': 'Gemini API Key',
        'api.provider.label': 'Select AI Provider',
        'api.help': 'API keys are stored securely in your browser',
        
        // Analysis Results
        'analysis.title': 'Analysis Results:',
        'analysis.loading': 'Analyzing your topic...',
        'analysis.type': 'Presentation Type',
        'analysis.template': 'Recommended Template',
        'analysis.color': 'Color Theme',
        
        // Preview
        'preview.title': 'Preview',
        'preview.slide': 'Slide',
        'preview.of': 'of',
        'preview.placeholder.title': 'Enter your title here',
        'preview.placeholder.content': '• Enter your content here\n• Optimal structure and design will be automatically selected\n• Experience professional-grade presentations',
        
        // Status Messages
        'status.generating': '🤖 AI is creating your perfect presentation...',
        'status.success': '🎉 Perfect presentation completed!',
        'status.error': 'An error occurred. Please try again.',
        'status.apikey.required': 'Please enter your API key.',
        'status.topic.required': 'Please enter a topic.',
        'status.beta': 'Beta',
        
        // Help & Instructions
        'help.title': 'How to Use',
        'help.steps': [
            '• Enter your content',
            '• Optimal structure and design will be automatically selected',
            '• Experience professional-grade presentations'
        ],
        
        // Waitlist CTA
        'waitlist.title': '💎 Premium Features Coming Soon',
        'waitlist.description': 'Advanced templates, multi-AI models, brand customization',
        'waitlist.button': '📧 Get Launch Updates',
        
        // Footer
        'footer.title': 'SlideCraft Pro | Professional Presentation Builder',
        'footer.subtitle': 'Crafted with care for professionals',
        
        // Language Switcher
        'lang.korean': '한국어',
        'lang.english': 'English'
    }
};

// I18n System Class
class I18nSystem {
    constructor() {
        this.currentLanguage = null; // Will be set by detectLanguage
        this.translations = translations;
        this.init();
    }
    
    init() {
        // Check saved preference first
        const savedLang = localStorage.getItem('slidecraft_language');
        
        if (savedLang && this.translations[savedLang]) {
            // User has explicitly chosen a language before
            this.currentLanguage = savedLang;
            console.log(`🔖 Using saved language preference: ${this.currentLanguage}`);
        } else {
            // Auto-detect browser language for first-time users
            this.detectLanguage();
            console.log(`🌍 Auto-detected browser language: ${this.currentLanguage}`);
        }
        
        // Set HTML lang attribute
        document.documentElement.lang = this.currentLanguage;
        
        // Apply initial translations
        this.applyTranslations();
        this.setupLanguageSwitcher();
        
        // Show welcome message in detected language
        const welcomeMsg = this.currentLanguage === 'ko' 
            ? `🇰🇷 한국어로 자동 설정되었습니다` 
            : `🇺🇸 Automatically set to English`;
        console.log(welcomeMsg);
        console.log(`🌐 I18n initialized with language: ${this.currentLanguage}`);
    }
    
    detectLanguage() {
        // Get browser language with multiple fallbacks
        const browserLang = navigator.language || navigator.userLanguage || 'en';
        console.log(`🔍 Browser reported language: ${browserLang}`);
        
        // Get all browser languages if available
        const languages = navigator.languages || [browserLang];
        console.log(`📋 All browser languages: ${languages.join(', ')}`);
        
        // Check for Korean in any of the language preferences
        const hasKorean = languages.some(lang => 
            lang.toLowerCase().startsWith('ko') || 
            lang.toLowerCase().includes('kr')
        );
        
        if (hasKorean) {
            this.currentLanguage = 'ko';
        } else {
            // Default to English for all other languages
            this.currentLanguage = 'en';
        }
        
        // Also check browser's Accept-Language header indirectly via timezone
        try {
            const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
            if (timezone && timezone.includes('Seoul')) {
                console.log(`🕐 Korean timezone detected: ${timezone}`);
                this.currentLanguage = 'ko';
            }
        } catch (e) {
            console.log('Timezone detection not available');
        }
        
        console.log(`✅ Final detected language: ${this.currentLanguage}`);
    }
    
    translate(key) {
        const keys = key.split('.');
        let translation = this.translations[this.currentLanguage];
        
        for (const k of keys) {
            if (translation && typeof translation === 'object') {
                translation = translation[k];
            } else {
                break;
            }
        }
        
        // Fallback to English if translation not found
        if (!translation && this.currentLanguage !== 'en') {
            let fallback = this.translations.en;
            for (const k of keys) {
                if (fallback && typeof fallback === 'object') {
                    fallback = fallback[k];
                } else {
                    break;
                }
            }
            translation = fallback;
        }
        
        return translation || key;
    }
    
    setLanguage(lang) {
        if (this.translations[lang]) {
            this.currentLanguage = lang;
            localStorage.setItem('slidecraft_language', lang);
            this.applyTranslations();
            this.updateLanguageSwitcher();
            
            // Update page language attribute
            document.documentElement.lang = lang === 'ko' ? 'ko' : 'en';
            
            console.log(`🌐 Language changed to: ${lang}`);
        }
    }
    
    applyTranslations() {
        // Find all elements with data-i18n attribute
        const elements = document.querySelectorAll('[data-i18n]');
        
        elements.forEach(element => {
            const key = element.getAttribute('data-i18n');
            const translation = this.translate(key);
            
            // Handle different element types
            if (element.tagName === 'INPUT' && element.type === 'text') {
                element.placeholder = translation;
            } else if (element.tagName === 'TEXTAREA') {
                element.placeholder = translation;
            } else if (element.tagName === 'OPTION') {
                element.textContent = translation;
            } else {
                element.textContent = translation;
            }
        });
        
        // Update page title
        const titleKey = document.querySelector('title')?.getAttribute('data-i18n');
        if (titleKey) {
            document.title = this.translate(titleKey);
        }
    }
    
    setupLanguageSwitcher() {
        // Create language switcher if it doesn't exist
        if (!document.getElementById('language-switcher')) {
            const switcher = document.createElement('div');
            switcher.id = 'language-switcher';
            switcher.style.cssText = `
                position: fixed;
                top: 20px;
                right: 20px;
                z-index: 1000;
                display: flex;
                gap: 5px;
                background: rgba(255, 255, 255, 0.9);
                backdrop-filter: blur(10px);
                border-radius: 20px;
                padding: 5px;
                box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
            `;
            
            // Korean button
            const koBtn = document.createElement('button');
            koBtn.textContent = '🇰🇷';
            koBtn.title = '한국어';
            koBtn.style.cssText = `
                border: none;
                background: ${this.currentLanguage === 'ko' ? '#3b82f6' : 'transparent'};
                color: ${this.currentLanguage === 'ko' ? 'white' : '#6b7280'};
                padding: 8px 12px;
                border-radius: 15px;
                cursor: pointer;
                font-size: 14px;
                transition: all 0.3s ease;
            `;
            koBtn.onclick = () => this.setLanguage('ko');
            
            // English button
            const enBtn = document.createElement('button');
            enBtn.textContent = '🇺🇸';
            enBtn.title = 'English';
            enBtn.style.cssText = `
                border: none;
                background: ${this.currentLanguage === 'en' ? '#3b82f6' : 'transparent'};
                color: ${this.currentLanguage === 'en' ? 'white' : '#6b7280'};
                padding: 8px 12px;
                border-radius: 15px;
                cursor: pointer;
                font-size: 14px;
                transition: all 0.3s ease;
            `;
            enBtn.onclick = () => this.setLanguage('en');
            
            switcher.appendChild(koBtn);
            switcher.appendChild(enBtn);
            document.body.appendChild(switcher);
        }
    }
    
    updateLanguageSwitcher() {
        const switcher = document.getElementById('language-switcher');
        if (switcher) {
            const buttons = switcher.querySelectorAll('button');
            buttons.forEach((btn, index) => {
                const isActive = (index === 0 && this.currentLanguage === 'ko') || 
                                (index === 1 && this.currentLanguage === 'en');
                btn.style.background = isActive ? '#3b82f6' : 'transparent';
                btn.style.color = isActive ? 'white' : '#6b7280';
            });
        }
    }
    
    getCurrentLanguage() {
        return this.currentLanguage;
    }
    
    // Helper method for dynamic content
    t(key) {
        return this.translate(key);
    }
}

// Global instance
let i18n;

// Initialize when DOM is loaded
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        i18n = new I18nSystem();
    });
} else {
    i18n = new I18nSystem();
}

// Export for use in other scripts
if (typeof window !== 'undefined') {
    window.i18n = i18n;
    window.I18nSystem = I18nSystem;
}