// AI PPT Generator - JavaScript Logic
// Powered by Kwak Dooil

// Global Variables
let currentSlides = [];
let currentSlideIndex = 0;
let CLAUDE_API_KEY = localStorage.getItem('claude_api_key') || '';
let OPENAI_API_KEY = localStorage.getItem('openai_api_key') || '';
let GEMINI_API_KEY = localStorage.getItem('gemini_api_key') || '';

// Initialize AI Provider Manager
let aiManager = null;

// Color Schemes for Different Topics
const colorSchemes = {
    'marketing': { primary: '#ff6b6b', secondary: '#ffa726', bg: 'linear-gradient(135deg, #ff6b6b 0%, #ffa726 100%)' },
    'tech': { primary: '#667eea', secondary: '#764ba2', bg: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' },
    'education': { primary: '#11998e', secondary: '#38ef7d', bg: 'linear-gradient(135deg, #11998e 0%, #38ef7d 100%)' },
    'business': { primary: '#0056b3', secondary: '#667eea', bg: 'linear-gradient(135deg, #0056b3 0%, #667eea 100%)' },
    'default': { primary: '#667eea', secondary: '#764ba2', bg: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' }
};

// Topic Analysis Function
function analyzeTopicAndSuggestTemplate(topic) {
    const topicLower = topic.toLowerCase();
    
    if (['마케팅', '판매', '브랜딩', '광고', '홍보'].some(word => topicLower.includes(word))) {
        return { template: 'modern', color: 'marketing', type: '마케팅' };
    } else if (['기술', '개발', 'ai', '인공지능', 'it', '프로그래밍'].some(word => topicLower.includes(word))) {
        return { template: 'dark', color: 'tech', type: '기술' };
    } else if (['교육', '학습', '강의', '연수', '교수법'].some(word => topicLower.includes(word))) {
        return { template: 'minimal', color: 'education', type: '교육' };
    } else if (['회사', '기업', '비즈니스', '전략', '경영'].some(word => topicLower.includes(word))) {
        return { template: 'corporate', color: 'business', type: '비즈니스' };
    } else {
        return { template: 'modern', color: 'default', type: '일반' };
    }
}

// Real-time Preview Update
function updatePreview() {
    const topic = document.getElementById('topicInput').value;
    
    if (topic.trim()) {
        const analysis = analyzeTopicAndSuggestTemplate(topic);
        
        // Update AI Analysis
        const aiAnalysis = document.getElementById('aiAnalysis');
        const analysisText = document.getElementById('analysisText');
        
        aiAnalysis.classList.remove('hidden');
        analysisText.textContent = `${analysis.type} 카테고리로 분류되어 ${analysis.template} 템플릿과 ${analysis.color} 색상을 자동 선택했습니다!`;
        
        // Update Preview Card Color
        const previewCard = document.querySelector('.preview-card');
        const scheme = colorSchemes[analysis.color];
        previewCard.style.background = scheme.bg;
        
        // Extract potential title from topic
        const potentialTitle = extractTitleFromTopic(topic);
        document.getElementById('previewTitle').textContent = potentialTitle;
        
        // Update preview content
        document.getElementById('previewContent').innerHTML = `
            <p>• ${analysis.type} 전문 콘텐츠로 구성</p>
            <p>• 대상: ${document.getElementById('targetAudience').value}</p>
            <p>• 발표시간: ${document.getElementById('presentationTime').value}</p>
            <p>• AI가 최적화된 ${document.getElementById('slideCount').value}장 슬라이드 생성</p>
        `;
    } else {
        // Reset to default
        document.getElementById('aiAnalysis').classList.add('hidden');
        document.getElementById('previewTitle').textContent = '제목을 입력하세요';
        document.getElementById('previewContent').innerHTML = `
            <p>• 내용을 입력하세요</p>
            <p>• AI가 자동으로 최적의 구조와 디자인을 선택합니다</p>
            <p>• 전문가급 프레젠테이션을 경험해보세요</p>
        `;
    }
}

// Extract Title from Topic
function extractTitleFromTopic(topic) {
    // Simple title extraction logic
    const lines = topic.split('\n');
    const firstLine = lines[0].trim();
    
    if (firstLine.length > 50) {
        return firstLine.substring(0, 50) + '...';
    }
    
    // Try to find a concise title
    if (firstLine.includes('PPT') || firstLine.includes('프레젠테이션')) {
        return firstLine.replace(/PPT|프레젠테이션|만들어|필요|부탁/g, '').trim();
    }
    
    return firstLine || '프레젠테이션';
}

// Generate Presentation with Claude AI
async function generatePresentation() {
    const topic = document.getElementById('topicInput').value.trim();
    
    if (!topic) {
        alert('⚠️ 먼저 어떤 프레젠테이션을 만들고 싶은지 알려주세요!');
        return;
    }
    
    if (!checkApiKey()) {
        alert('🔑 먼저 Claude API 키를 입력해주세요!');
        return;
    }
    
    // Show loading
    showLoading();
    
    try {
        // Get form data
        const slideCount = document.getElementById('slideCount').value;
        const targetAudience = document.getElementById('targetAudience').value;
        const presentationTime = document.getElementById('presentationTime').value;
        
        // Analyze topic
        const analysis = analyzeTopicAndSuggestTemplate(topic);
        
        // Update loading messages
        await updateLoadingMessage('🔍 주제 분석 중...', 500);
        await updateLoadingMessage('🎨 최적 디자인 템플릿 선택 중...', 500);
        await updateLoadingMessage('📝 전문가급 콘텐츠 생성 중...', 500);
        
        // Prepare enhanced prompt
        const enhancedPrompt = `
        주제: ${topic}
        대상: ${targetAudience}
        발표시간: ${presentationTime}
        슬라이드수: ${slideCount}장
        카테고리: ${analysis.type}
        
        위 정보를 종합하여 완벽한 프레젠테이션을 만들어주세요.
        `;
        
        // Generate slides with selected AI provider
        const slides = await generateSlidesWithAI(enhancedPrompt, slideCount, analysis);
        
        await updateLoadingMessage('🎯 최종 검토 및 완성 중...', 300);
        
        // Hide loading
        hideLoading();
        
        if (slides && slides.length > 0) {
            currentSlides = slides;
            currentSlideIndex = 0;
            
            // Show success
            showSuccessStats(slides.length, analysis.template, presentationTime);
            
            // Update preview with first slide
            updateSlidePreview();
            
            // Show slide navigation
            document.getElementById('slideNavigation').classList.remove('hidden');
            
            // Add celebration effect
            createCelebrationEffect();
            
        } else {
            alert('😔 잠시 문제가 발생했습니다. 주제를 더 구체적으로 입력하고 다시 시도해주세요.');
        }
        
    } catch (error) {
        console.error('Generation error:', error);
        hideLoading();
        alert('🚨 생성 중 오류가 발생했습니다: ' + error.message);
    }
}

// Generate Slides with AI (Multi-provider support)
async function generateSlidesWithAI(topic, slideCount, analysis) {
    if (!aiManager) {
        initializeAIProviders();
    }
    
    const selectedProvider = getSelectedProvider();
    const enableComparison = document.getElementById('enableComparison').checked;
    
    try {
        let result;
        
        if (enableComparison) {
            // Use multiple providers and select best result
            const availableProviders = [];
            if (CLAUDE_API_KEY) availableProviders.push('claude');
            if (OPENAI_API_KEY) availableProviders.push('openai');
            if (GEMINI_API_KEY) availableProviders.push('gemini');
            
            const prompt = aiManager.getProvider(selectedProvider).formatPrompt(topic, slideCount, analysis);
            result = await aiManager.generateBestContent(prompt, { providers: availableProviders });
            
            // Show quality comparison info
            console.log(`🏆 Best result from: ${result.provider} (Quality Score: ${result.qualityScore.toFixed(2)})`);
            
        } else {
            // Use single selected provider
            const provider = aiManager.getProvider(selectedProvider);
            if (!provider) {
                throw new Error(`Provider ${selectedProvider} not available. Please check API key.`);
            }
            
            const prompt = provider.formatPrompt(topic, slideCount, analysis);
            result = await aiManager.generateWithProvider(selectedProvider, prompt);
        }
        
        if (result.success && result.slides) {
            // Add metadata to slides
            result.slides.forEach((slide, index) => {
                slide.metadata = {
                    provider: result.provider,
                    qualityScore: result.qualityScore || 0,
                    generatedAt: new Date().toISOString(),
                    index: index
                };
            });
            
            return result.slides;
        } else {
            throw new Error(result.error || 'Failed to generate content');
        }
        
    } catch (error) {
        console.error('AI Generation Error:', error);
        
        // Fallback to original Claude function if available
        if (CLAUDE_API_KEY && selectedProvider === 'claude') {
            console.log('Falling back to original Claude implementation...');
            return await generateSlidesWithClaude(topic, slideCount, analysis);
        }
        
        // Final fallback to dummy slides
        return generateFallbackSlides(topic, slideCount);
    }
}

// Keep original Claude function as fallback
async function generateSlidesWithClaude(topic, slideCount, analysis) {
    const prompt = `
    당신은 전문 프레젠테이션 디자이너입니다. 다음 정보로 완벽한 프레젠테이션을 만들어주세요:

    📋 프로젝트 정보:
    ${topic}
    
    📐 프레젠테이션 구조 가이드:
    - 1번 슬라이드: 타이틀 + 매력적인 부제목
    - 2번 슬라이드: 목차/개요 (전체 흐름 제시)
    - 중간 슬라이드들: 핵심 내용 (논리적 순서)
    - 마지막 슬라이드: 결론/행동 촉구

    🎯 내용 작성 원칙:
    1. 각 슬라이드는 하나의 핵심 메시지에 집중
    2. 제목은 임팩트 있고 명확하게 (10자 이내 권장)
    3. 내용은 3-5개 핵심 포인트로 구성
    4. 전문적이면서도 이해하기 쉽게
    5. 실행 가능한 구체적 내용 포함

    ⚡ 필수 규칙:
    - bullet point 기호(•, -, *, ○ 등) 절대 사용 금지
    - 각 포인트는 줄바꿈(\\n)으로만 구분
    - 숫자, 통계, 구체적 예시 적극 활용

    📊 JSON 형식으로 반환:
    [
        {
            "title": "매력적인 슬라이드 제목",
            "content": "첫 번째 핵심 내용\\n두 번째 핵심 내용\\n세 번째 핵심 내용"
        }
    ]
    
    ${slideCount}개의 완벽한 슬라이드를 생성해주세요.
    `;

    try {
        // Use local proxy server to avoid CORS issues
        const response = await fetch('/api/claude', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                model: 'claude-3-5-sonnet-20241022',
                max_tokens: 4000,
                temperature: 0.7,
                system: '당신은 전문적인 프레젠테이션 콘텐츠 작성자입니다.',
                messages: [
                    {
                        role: 'user',
                        content: prompt
                    }
                ],
                api_key: CLAUDE_API_KEY  // Send API key in request body
            })
        });

        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(`Claude API 오류: ${response.status} - ${errorText}`);
        }

        const data = await response.json();
        const responseText = data.content[0].text;
        
        // Extract JSON from response
        const jsonMatch = responseText.match(/\[[\s\S]*\]/);
        if (jsonMatch) {
            const slides = JSON.parse(jsonMatch[0]);
            return slides;
        } else {
            // Fallback: parse text manually
            return parseTextToSlides(responseText, slideCount);
        }
        
    } catch (error) {
        console.error('Claude API Error:', error);
        
        // Show user-friendly error message
        if (error.message.includes('401')) {
            alert('🔑 API 키가 올바르지 않습니다. script.js 파일에서 CLAUDE_API_KEY를 확인해주세요.');
        } else if (error.message.includes('429')) {
            alert('⏰ API 사용량 한도에 도달했습니다. 잠시 후 다시 시도해주세요.');
        } else {
            alert('🌐 네트워크 문제가 발생했습니다. 인터넷 연결을 확인하고 다시 시도해주세요.');
        }
        
        // Fallback: Generate dummy slides
        return generateFallbackSlides(topic, slideCount);
    }
}

// Parse Text to Slides (Fallback)
function parseTextToSlides(text, slideCount) {
    const lines = text.split('\n');
    const slides = [];
    let currentSlide = null;
    
    for (const line of lines) {
        const trimmedLine = line.trim();
        if (!trimmedLine) continue;
        
        if (trimmedLine.match(/^\d+\./) || trimmedLine.includes('슬라이드') || (!currentSlide && slides.length < slideCount)) {
            if (currentSlide) slides.push(currentSlide);
            currentSlide = {
                title: trimmedLine.replace(/^\d+\.\s*/, ''),
                content: ''
            };
        } else if (currentSlide) {
            if (currentSlide.content) currentSlide.content += '\n';
            currentSlide.content += trimmedLine;
        }
    }
    
    if (currentSlide) slides.push(currentSlide);
    
    // Fill up to slideCount
    while (slides.length < slideCount) {
        slides.push({
            title: `슬라이드 ${slides.length + 1}`,
            content: '내용을 추가해주세요'
        });
    }
    
    return slides.slice(0, slideCount);
}

// Generate Fallback Slides
function generateFallbackSlides(topic, slideCount) {
    const title = extractTitleFromTopic(topic);
    
    const slides = [
        { title: title, content: '프레젠테이션 개요\n핵심 목표 설명\n발표 구성 소개' },
        { title: '목차', content: '주요 내용 1\n주요 내용 2\n주요 내용 3\n결론 및 정리' }
    ];
    
    // Add content slides
    for (let i = 2; i < slideCount - 1; i++) {
        slides.push({
            title: `핵심 내용 ${i - 1}`,
            content: `중요한 포인트 ${i - 1}\n구체적인 설명\n실제 활용 방안`
        });
    }
    
    // Add conclusion slide
    slides.push({
        title: '결론 및 다음 단계',
        content: '핵심 요약\n실행 계획\n질의응답'
    });
    
    return slides.slice(0, slideCount);
}

// Update Slide Preview
function updateSlidePreview() {
    if (currentSlides.length === 0) return;
    
    const slide = currentSlides[currentSlideIndex];
    document.getElementById('previewTitle').textContent = slide.title;
    
    // Format content with bullet points
    const content = slide.content.split('\n')
        .filter(line => line.trim())
        .map(line => `• ${line.trim()}`)
        .join('<br>');
    
    document.getElementById('previewContent').innerHTML = content;
    
    // Update slide counter
    document.getElementById('slideCounter').textContent = `${currentSlideIndex + 1} / ${currentSlides.length}`;
}

// Slide Navigation
document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('prevSlide').addEventListener('click', function() {
        if (currentSlideIndex > 0) {
            currentSlideIndex--;
            updateSlidePreview();
        }
    });
    
    document.getElementById('nextSlide').addEventListener('click', function() {
        if (currentSlideIndex < currentSlides.length - 1) {
            currentSlideIndex++;
            updateSlidePreview();
        }
    });
});

// Download PPT
document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('downloadPPT').addEventListener('click', generateAndDownloadPPT);
    document.getElementById('downloadSimplePPT').addEventListener('click', generateSimplePPT);
    document.getElementById('forceDownloadPPT').addEventListener('click', forceDownloadPPT);
    document.getElementById('downloadJSON').addEventListener('click', downloadJSON);
    document.getElementById('saveApiKey').addEventListener('click', saveApiKey);
    document.getElementById('saveOpenAIKey').addEventListener('click', saveOpenAIKey);
    document.getElementById('saveGeminiKey').addEventListener('click', saveGeminiKey);
    
    // AI Provider selection event listeners
    document.getElementsByName('aiProvider').forEach(radio => {
        radio.addEventListener('change', function() {
            checkApiKey();
        });
    });
    
    document.getElementById('enableComparison').addEventListener('change', function() {
        checkApiKey();
    });
    
    document.getElementById('showMultipleKeys').addEventListener('click', function() {
        const multipleKeys = document.getElementById('multipleApiKeys');
        multipleKeys.classList.toggle('hidden');
    });
});

// Generate and Download PPT using PptxGenJS
function generateAndDownloadPPT() {
    if (currentSlides.length === 0) {
        alert('⚠️ 먼저 PPT를 생성해주세요!');
        return;
    }
    
    try {
        // Create new presentation
        const pptx = new PptxGenJS();
        
        // Set presentation properties
        pptx.author = 'AI PPT Generator';
        pptx.company = 'Powered by Kwak Dooil';
        pptx.title = currentSlides[0].title;
        pptx.layout = 'LAYOUT_WIDE';
        
        // Get current color scheme
        const topic = document.getElementById('topicInput').value;
        const analysis = analyzeTopicAndSuggestTemplate(topic);
        const colorScheme = colorSchemes[analysis.color];
        
        // Add slides with professional design
        currentSlides.forEach((slideData, index) => {
            const slide = pptx.addSlide();
            
            // Add solid background (more compatible than gradient)
            slide.background = { color: colorScheme.primary.replace('#', '') };
            
            // Add white content area (simplified)
            slide.addShape(pptx.ShapeType.rect, {
                x: 0.5,
                y: 0.8,
                w: 12.5,
                h: 6.5,
                fill: { color: 'FFFFFF' },
                line: { width: 1, color: 'DDDDDD' }
            });
            
            // Add title with modern styling
            slide.addText(slideData.title, {
                x: 1,
                y: 1.2,
                w: 11.5,
                h: 1.2,
                fontSize: index === 0 ? 36 : 28,
                bold: true,
                color: colorScheme.primary.replace('#', ''),
                align: 'center',
                fontFace: 'Segoe UI'
            });
            
            // Add decorative line under title
            slide.addShape(pptx.ShapeType.line, {
                x: 2,
                y: 2.5,
                w: 9.5,
                h: 0,
                line: { 
                    color: colorScheme.secondary.replace('#', ''), 
                    width: 4 
                }
            });
            
            // Process and add content with better formatting
            const contentLines = slideData.content.split('\n')
                .filter(line => line.trim())
                .map(line => line.trim());
            
            // Add content with bullet points and better spacing
            contentLines.forEach((line, lineIndex) => {
                // Add bullet point
                slide.addText('●', {
                    x: 1.5,
                    y: 3.2 + (lineIndex * 0.6),
                    w: 0.3,
                    h: 0.5,
                    fontSize: 14,
                    color: colorScheme.primary.replace('#', ''),
                    fontFace: 'Segoe UI'
                });
                
                // Add content text
                slide.addText(line, {
                    x: 2,
                    y: 3.2 + (lineIndex * 0.6),
                    w: 10,
                    h: 0.5,
                    fontSize: 16,
                    color: '333333',
                    fontFace: 'Segoe UI',
                    lineSpacing: 24
                });
            });
            
            // Add footer with slide number and branding
            slide.addText(`${index + 1}`, {
                x: 11.5,
                y: 7,
                w: 1,
                h: 0.4,
                fontSize: 12,
                color: '888888',
                align: 'center',
                fontFace: 'Segoe UI'
            });
            
            // Add subtle logo/branding
            slide.addText('AI PPT Generator', {
                x: 0.5,
                y: 7,
                w: 3,
                h: 0.4,
                fontSize: 10,
                color: '888888',
                fontFace: 'Segoe UI'
            });
            
            // Add simple accent shape
            slide.addShape(pptx.ShapeType.rect, {
                x: 0.2,
                y: 0.2,
                w: 0.3,
                h: 0.3,
                fill: { color: colorScheme.secondary.replace('#', '') },
                line: { width: 0 }
            });
        });
        
        // Generate filename
        const timestamp = new Date().toISOString().slice(0, 10);
        const filename = `${currentSlides[0].title.replace(/[^\w\s-]/g, '').slice(0, 20)}_${timestamp}.pptx`;
        
        // Download with promise handling
        pptx.writeFile({ fileName: filename }).then(() => {
            alert('🎉 전문적인 디자인의 PPT 파일이 다운로드되었습니다!');
        }).catch((downloadError) => {
            console.error('Download failed:', downloadError);
            alert('🚨 파일 다운로드에 실패했습니다. 브라우저의 다운로드 차단을 확인해주세요.');
        });
        
    } catch (error) {
        console.error('PPT Generation Error:', error);
        console.log('Error details:', error);
        
        // Fallback: Create simple PPT without advanced features
        try {
            console.log('Attempting fallback PPT generation...');
            const simplePptx = new PptxGenJS();
            
            // Basic properties only
            simplePptx.author = 'AI PPT Generator';
            simplePptx.title = currentSlides[0].title;
            
            // Add simple slides
            currentSlides.forEach((slideData, index) => {
                const slide = simplePptx.addSlide();
                
                // Simple title
                slide.addText(slideData.title, {
                    x: 1,
                    y: 1,
                    w: 8,
                    h: 1,
                    fontSize: 24,
                    bold: true,
                    color: '333333',
                    align: 'center'
                });
                
                // Simple content
                const contentLines = slideData.content.split('\n')
                    .filter(line => line.trim())
                    .map(line => line.trim());
                
                contentLines.forEach((line, lineIndex) => {
                    slide.addText(`• ${line}`, {
                        x: 1,
                        y: 2.5 + (lineIndex * 0.5),
                        w: 8,
                        h: 0.5,
                        fontSize: 14,
                        color: '444444'
                    });
                });
            });
            
            // Generate simple filename
            const timestamp = new Date().toISOString().slice(0, 10);
            const filename = `PPT_${timestamp}.pptx`;
            
            // Download
            simplePptx.writeFile({ fileName: filename }).then(() => {
                alert('📥 기본 디자인 PPT가 다운로드되었습니다! (호환성 모드)');
            }).catch((downloadError) => {
                console.error('Fallback download failed:', downloadError);
                alert('🚨 폴백 다운로드도 실패했습니다. 브라우저의 팝업/다운로드 차단을 해제해주세요.');
            });
            
        } catch (fallbackError) {
            console.error('Fallback PPT Error:', fallbackError);
            alert('🚨 PPT 생성 중 오류가 발생했습니다. 브라우저 콘솔을 확인해주세요.\n\n원본 오류: ' + error.message + '\n폴백 오류: ' + fallbackError.message);
        }
    }
}

// Generate Simple PPT (Compatibility Mode)
function generateSimplePPT() {
    if (currentSlides.length === 0) {
        alert('⚠️ 먼저 PPT를 생성해주세요!');
        return;
    }
    
    try {
        console.log('Generating simple PPT...');
        const pptx = new PptxGenJS();
        
        // Basic properties
        pptx.author = 'AI PPT Generator';
        pptx.title = currentSlides[0].title;
        
        currentSlides.forEach((slideData, index) => {
            const slide = pptx.addSlide();
            
            // Simple title
            slide.addText(slideData.title, {
                x: 1,
                y: 0.5,
                w: 8,
                h: 1,
                fontSize: 28,
                bold: true,
                color: '2563eb',
                align: 'center'
            });
            
            // Simple content lines
            const contentLines = slideData.content.split('\n')
                .filter(line => line.trim())
                .map(line => line.trim());
            
            contentLines.forEach((line, lineIndex) => {
                slide.addText(`• ${line}`, {
                    x: 1,
                    y: 2 + (lineIndex * 0.6),
                    w: 8,
                    h: 0.5,
                    fontSize: 16,
                    color: '374151'
                });
            });
            
            // Simple footer
            slide.addText(`${index + 1}`, {
                x: 9,
                y: 6.5,
                w: 0.5,
                h: 0.3,
                fontSize: 12,
                color: '9ca3af',
                align: 'center'
            });
        });
        
        // Generate filename
        const timestamp = new Date().toISOString().slice(0, 10);
        const filename = `Simple_PPT_${timestamp}.pptx`;
        
        // Download with promise handling
        pptx.writeFile({ fileName: filename }).then(() => {
            alert('✅ 단순 PPT가 다운로드되었습니다! (호환성 모드)');
        }).catch((downloadError) => {
            console.error('Simple download failed:', downloadError);
            alert('🚨 단순 PPT 다운로드에 실패했습니다. 브라우저 설정을 확인해주세요.');
        });
        
    } catch (error) {
        console.error('Simple PPT Error:', error);
        alert('🚨 단순 PPT 생성 실패: ' + error.message);
    }
}

// Alternative Download Method using Blob
function forceDownloadPPT() {
    if (currentSlides.length === 0) {
        alert('⚠️ 먼저 PPT를 생성해주세요!');
        return;
    }
    
    try {
        console.log('Attempting force download...');
        const pptx = new PptxGenJS();
        
        // Basic properties
        pptx.author = 'AI PPT Generator';
        pptx.title = currentSlides[0].title;
        
        currentSlides.forEach((slideData, index) => {
            const slide = pptx.addSlide();
            
            // Basic title
            slide.addText(slideData.title, {
                x: 1,
                y: 1,
                w: 8,
                h: 1,
                fontSize: 24,
                bold: true,
                color: '2563eb',
                align: 'center'
            });
            
            // Basic content
            const contentLines = slideData.content.split('\n')
                .filter(line => line.trim())
                .map(line => line.trim());
            
            contentLines.forEach((line, lineIndex) => {
                slide.addText(`• ${line}`, {
                    x: 1,
                    y: 2.5 + (lineIndex * 0.5),
                    w: 8,
                    h: 0.4,
                    fontSize: 14,
                    color: '374151'
                });
            });
        });
        
        // Generate and force download using different method
        pptx.write('blob').then((blob) => {
            console.log('Blob created, size:', blob.size);
            
            // Create download link
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = `Force_PPT_${new Date().toISOString().slice(0, 10)}.pptx`;
            
            // Trigger download
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            
            // Cleanup
            setTimeout(() => URL.revokeObjectURL(url), 1000);
            
            alert('💪 강제 다운로드 완료! 다운로드 폴더를 확인하세요.');
            
        }).catch((blobError) => {
            console.error('Blob creation failed:', blobError);
            alert('🚨 강제 다운로드도 실패했습니다: ' + blobError.message);
        });
        
    } catch (error) {
        console.error('Force download error:', error);
        alert('🚨 강제 다운로드 오류: ' + error.message);
    }
}

// Download JSON
function downloadJSON() {
    if (currentSlides.length === 0) {
        alert('⚠️ 먼저 PPT를 생성해주세요!');
        return;
    }
    
    const jsonData = JSON.stringify(currentSlides, null, 2);
    const blob = new Blob([jsonData], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    
    const a = document.createElement('a');
    a.href = url;
    a.download = `slides_backup_${new Date().toISOString().slice(0, 10)}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
}

// Loading Functions
function showLoading() {
    document.getElementById('loadingOverlay').style.display = 'flex';
}

function hideLoading() {
    document.getElementById('loadingOverlay').style.display = 'none';
}

async function updateLoadingMessage(message, delay = 0) {
    document.getElementById('loadingText').textContent = message;
    if (delay > 0) {
        await new Promise(resolve => setTimeout(resolve, delay));
    }
}

// Show Success Stats
function showSuccessStats(slideCount, template, time) {
    const successStats = document.getElementById('successStats');
    const statsText = document.getElementById('statsText');
    
    successStats.classList.remove('hidden');
    statsText.textContent = `📊 ${slideCount}장 슬라이드 | 🎨 ${template.charAt(0).toUpperCase() + template.slice(1)} 템플릿 | ⏱️ ${time} 발표용`;
    
    // Auto hide after 5 seconds
    setTimeout(() => {
        successStats.classList.add('hidden');
    }, 5000);
}

// Celebration Effect
function createCelebrationEffect() {
    // Simple confetti-like effect
    for (let i = 0; i < 50; i++) {
        setTimeout(() => {
            const confetti = document.createElement('div');
            confetti.innerHTML = ['🎉', '✨', '🎊', '⭐'][Math.floor(Math.random() * 4)];
            confetti.style.position = 'fixed';
            confetti.style.left = Math.random() * window.innerWidth + 'px';
            confetti.style.top = '0px';
            confetti.style.fontSize = '20px';
            confetti.style.pointerEvents = 'none';
            confetti.style.zIndex = '9999';
            confetti.style.animation = 'fall 3s linear forwards';
            
            document.body.appendChild(confetti);
            
            setTimeout(() => {
                confetti.remove();
            }, 3000);
        }, i * 100);
    }
}

// Add CSS for confetti animation
const style = document.createElement('style');
style.textContent = `
    @keyframes fall {
        to {
            transform: translateY(100vh) rotate(360deg);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// AI Provider Management
function initializeAIProviders() {
    aiManager = new AIProviderManager();
    
    // Register providers
    if (CLAUDE_API_KEY) {
        aiManager.registerProvider('claude', new ClaudeProvider(CLAUDE_API_KEY));
    }
    if (OPENAI_API_KEY) {
        aiManager.registerProvider('openai', new OpenAIProvider(OPENAI_API_KEY));
    }
    if (GEMINI_API_KEY) {
        aiManager.registerProvider('gemini', new GeminiProvider(GEMINI_API_KEY));
    }
}

function getSelectedProvider() {
    const radios = document.getElementsByName('aiProvider');
    for (const radio of radios) {
        if (radio.checked) {
            return radio.value;
        }
    }
    return 'claude';
}

function checkApiKey() {
    const selectedProvider = getSelectedProvider();
    const enableComparison = document.getElementById('enableComparison').checked;
    
    if (enableComparison) {
        // Check if at least 2 providers have API keys
        const availableProviders = [];
        if (CLAUDE_API_KEY) availableProviders.push('claude');
        if (OPENAI_API_KEY) availableProviders.push('openai');
        if (GEMINI_API_KEY) availableProviders.push('gemini');
        
        if (availableProviders.length < 2) {
            document.getElementById('apiKeySection').classList.remove('hidden');
            document.getElementById('multipleApiKeys').classList.remove('hidden');
            updateApiKeyUI('multiple');
            return false;
        }
    } else {
        // Check selected provider
        const hasKey = {
            'claude': CLAUDE_API_KEY,
            'openai': OPENAI_API_KEY,
            'gemini': GEMINI_API_KEY
        }[selectedProvider];
        
        if (!hasKey) {
            document.getElementById('apiKeySection').classList.remove('hidden');
            updateApiKeyUI(selectedProvider);
            return false;
        }
    }
    
    return true;
}

function updateApiKeyUI(provider) {
    const providerName = document.getElementById('providerName');
    const apiKeyLinks = document.getElementById('apiKeyLinks');
    
    const providerInfo = {
        'claude': {
            name: 'Claude',
            url: 'https://console.anthropic.com/',
            placeholder: 'sk-ant-api03-...'
        },
        'openai': {
            name: 'OpenAI',
            url: 'https://platform.openai.com/api-keys',
            placeholder: 'sk-...'
        },
        'gemini': {
            name: 'Gemini',
            url: 'https://aistudio.google.com/app/apikey',
            placeholder: 'AI...'
        },
        'multiple': {
            name: 'Multiple Providers',
            url: '',
            placeholder: 'Configure all providers below'
        }
    };
    
    const info = providerInfo[provider];
    providerName.textContent = info.name;
    document.getElementById('apiKeyInput').placeholder = info.placeholder;
    
    if (provider === 'multiple') {
        apiKeyLinks.innerHTML = `
            <a href="https://console.anthropic.com/" target="_blank" class="text-purple-600 underline">Claude</a> | 
            <a href="https://platform.openai.com/api-keys" target="_blank" class="text-green-600 underline">OpenAI</a> | 
            <a href="https://aistudio.google.com/app/apikey" target="_blank" class="text-blue-600 underline">Gemini</a>
        `;
    } else {
        apiKeyLinks.innerHTML = `<a href="${info.url}" target="_blank" class="text-purple-600 underline">Get ${info.name} API</a>`;
    }
}

function saveApiKey() {
    const selectedProvider = getSelectedProvider();
    const apiKey = document.getElementById('apiKeyInput').value.trim();
    
    if (apiKey) {
        if (selectedProvider === 'claude') {
            CLAUDE_API_KEY = apiKey;
            localStorage.setItem('claude_api_key', apiKey);
        } else if (selectedProvider === 'openai') {
            OPENAI_API_KEY = apiKey;
            localStorage.setItem('openai_api_key', apiKey);
        } else if (selectedProvider === 'gemini') {
            GEMINI_API_KEY = apiKey;
            localStorage.setItem('gemini_api_key', apiKey);
        }
        
        // Reinitialize providers
        initializeAIProviders();
        
        document.getElementById('apiKeySection').classList.add('hidden');
        alert(`✅ ${selectedProvider.toUpperCase()} API key saved!`);
    } else {
        alert('⚠️ Please enter a valid API key.');
    }
}

function saveOpenAIKey() {
    const apiKey = document.getElementById('openaiKeyInput').value.trim();
    if (apiKey) {
        OPENAI_API_KEY = apiKey;
        localStorage.setItem('openai_api_key', apiKey);
        initializeAIProviders();
        alert('✅ OpenAI API key saved!');
    }
}

function saveGeminiKey() {
    const apiKey = document.getElementById('geminiKeyInput').value.trim();
    if (apiKey) {
        GEMINI_API_KEY = apiKey;
        localStorage.setItem('gemini_api_key', apiKey);
        initializeAIProviders();
        alert('✅ Gemini API key saved!');
    }
}

// Initialize
document.addEventListener('DOMContentLoaded', function() {
    console.log('🚀 SlideCraft AI - Multi-LLM Version Initialized');
    
    // Initialize AI providers
    initializeAIProviders();
    
    // Check API key on load
    checkApiKey();
    
    // Get textarea element
    const topicInput = document.getElementById('topicInput');
    
    if (topicInput) {
        // Add multiple event listeners for better compatibility
        topicInput.addEventListener('input', updatePreview);
        topicInput.addEventListener('keyup', updatePreview);
        topicInput.addEventListener('paste', function() {
            setTimeout(updatePreview, 100); // Delay for paste event
        });
        
        // Test click event
        topicInput.addEventListener('click', function() {
            console.log('💬 텍스트 영역 클릭됨');
        });
        
        // Focus test
        topicInput.addEventListener('focus', function() {
            console.log('🎯 텍스트 영역 포커스됨');
        });
        
        console.log('✅ 텍스트 영역 이벤트 리스너 등록 완료');
    } else {
        console.error('❌ topicInput 요소를 찾을 수 없습니다');
    }
    
    // Add option change listeners
    ['slideCount', 'targetAudience', 'presentationTime'].forEach(id => {
        const element = document.getElementById(id);
        if (element) {
            element.addEventListener('change', updatePreview);
        }
    });
});