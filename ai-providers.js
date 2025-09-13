// AI Provider Architecture for Multi-LLM Support
// Supports Claude, OpenAI, Gemini, and more

class AIProviderBase {
    constructor(apiKey, config = {}) {
        this.apiKey = apiKey;
        this.config = config;
        this.name = this.constructor.name;
    }

    async generateContent(prompt, options = {}) {
        throw new Error('generateContent must be implemented by subclass');
    }

    formatPrompt(topic, slideCount, analysis) {
        // Base prompt formatting - can be overridden
        return `
        You are a professional presentation designer. Create a perfect presentation with this information:

        📋 Project Details:
        ${topic}
        
        📐 Presentation Structure Guide:
        - Slide 1: Title + Compelling subtitle
        - Slide 2: Agenda/Overview (show overall flow)
        - Middle slides: Core content (logical order)
        - Last slide: Conclusion/Call to action

        🎯 Content Creation Principles:
        1. Each slide focuses on one core message
        2. Titles are impactful and clear (under 10 words recommended)
        3. Content consists of 3-5 key points
        4. Professional yet easy to understand
        5. Include specific actionable content

        ⚡ Essential Rules:
        - NO bullet point symbols (•, -, *, ○ etc.)
        - Separate each point with line breaks (\\n) only
        - Use numbers, statistics, and specific examples

        📊 Return in JSON format:
        [
            {
                "title": "Compelling slide title",
                "content": "First key point\\nSecond key point\\nThird key point"
            }
        ]
        
        Generate ${slideCount} perfect slides.
        `;
    }

    extractSlidesFromResponse(responseText) {
        // Try to extract JSON from response
        const jsonMatch = responseText.match(/\[[\s\S]*\]/);
        if (jsonMatch) {
            try {
                return JSON.parse(jsonMatch[0]);
            } catch (e) {
                console.warn('JSON parsing failed, using fallback');
            }
        }
        
        // Fallback to text parsing
        return this.parseTextToSlides(responseText);
    }

    parseTextToSlides(text) {
        const lines = text.split('\n');
        const slides = [];
        let currentSlide = null;
        
        for (const line of lines) {
            const trimmedLine = line.trim();
            if (!trimmedLine) continue;
            
            // Detect slide boundaries
            if (trimmedLine.match(/^(Slide\s+\d+|Title:|##\s+)/i) || 
                trimmedLine.match(/^\d+\.\s+/) ||
                (!currentSlide && slides.length < 10)) {
                
                if (currentSlide) slides.push(currentSlide);
                currentSlide = {
                    title: trimmedLine.replace(/^(Slide\s+\d+[:\.]?\s*|Title:\s*|##\s+|\d+\.\s*)/i, ''),
                    content: ''
                };
            } else if (currentSlide) {
                if (currentSlide.content) currentSlide.content += '\n';
                currentSlide.content += trimmedLine;
            }
        }
        
        if (currentSlide) slides.push(currentSlide);
        return slides;
    }
}

class ClaudeProvider extends AIProviderBase {
    constructor(apiKey) {
        super(apiKey, {
            model: 'claude-3-5-sonnet-20241022',
            maxTokens: 4000,
            temperature: 0.7,
            apiUrl: '/api/claude'
        });
    }

    async generateContent(prompt, options = {}) {
        try {
            const response = await fetch(this.config.apiUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    model: this.config.model,
                    max_tokens: this.config.maxTokens,
                    temperature: this.config.temperature,
                    system: 'You are a professional presentation content creator.',
                    messages: [
                        {
                            role: 'user',
                            content: prompt
                        }
                    ],
                    api_key: this.apiKey
                })
            });

            if (!response.ok) {
                throw new Error(`Claude API error: ${response.status}`);
            }

            const data = await response.json();
            return {
                success: true,
                content: data.content[0].text,
                provider: 'claude',
                model: this.config.model,
                tokens: data.usage || {}
            };
        } catch (error) {
            return {
                success: false,
                error: error.message,
                provider: 'claude'
            };
        }
    }
}

class OpenAIProvider extends AIProviderBase {
    constructor(apiKey) {
        super(apiKey, {
            model: 'gpt-4-turbo-preview',
            maxTokens: 4000,
            temperature: 0.7,
            apiUrl: 'https://api.openai.com/v1/chat/completions'
        });
    }

    async generateContent(prompt, options = {}) {
        try {
            const response = await fetch(this.config.apiUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${this.apiKey}`
                },
                body: JSON.stringify({
                    model: this.config.model,
                    messages: [
                        {
                            role: 'system',
                            content: 'You are a professional presentation content creator.'
                        },
                        {
                            role: 'user',
                            content: prompt
                        }
                    ],
                    max_tokens: this.config.maxTokens,
                    temperature: this.config.temperature
                })
            });

            if (!response.ok) {
                throw new Error(`OpenAI API error: ${response.status}`);
            }

            const data = await response.json();
            return {
                success: true,
                content: data.choices[0].message.content,
                provider: 'openai',
                model: this.config.model,
                tokens: data.usage || {}
            };
        } catch (error) {
            return {
                success: false,
                error: error.message,
                provider: 'openai'
            };
        }
    }
}

class GeminiProvider extends AIProviderBase {
    constructor(apiKey) {
        super(apiKey, {
            model: 'gemini-pro',
            maxTokens: 4000,
            temperature: 0.7,
            apiUrl: 'https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent'
        });
    }

    async generateContent(prompt, options = {}) {
        try {
            const response = await fetch(`${this.config.apiUrl}?key=${this.apiKey}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    contents: [{
                        parts: [{
                            text: prompt
                        }]
                    }],
                    generationConfig: {
                        temperature: this.config.temperature,
                        maxOutputTokens: this.config.maxTokens
                    }
                })
            });

            if (!response.ok) {
                throw new Error(`Gemini API error: ${response.status}`);
            }

            const data = await response.json();
            return {
                success: true,
                content: data.candidates[0].content.parts[0].text,
                provider: 'gemini',
                model: this.config.model,
                tokens: {}
            };
        } catch (error) {
            return {
                success: false,
                error: error.message,
                provider: 'gemini'
            };
        }
    }
}

// Main AI Provider Manager
class AIProviderManager {
    constructor() {
        this.providers = new Map();
        this.defaultProvider = 'claude';
        this.qualityScorer = new ContentQualityScorer();
    }

    registerProvider(name, provider) {
        this.providers.set(name, provider);
    }

    getProvider(name) {
        return this.providers.get(name);
    }

    async generateWithProvider(providerName, prompt, options = {}) {
        const provider = this.getProvider(providerName);
        if (!provider) {
            throw new Error(`Provider ${providerName} not found`);
        }

        const result = await provider.generateContent(prompt, options);
        if (result.success) {
            result.slides = provider.extractSlidesFromResponse(result.content);
        }
        return result;
    }

    async generateBestContent(prompt, options = {}) {
        const enabledProviders = options.providers || [this.defaultProvider];
        const results = [];

        // Generate content with all enabled providers
        for (const providerName of enabledProviders) {
            try {
                const result = await this.generateWithProvider(providerName, prompt, options);
                if (result.success) {
                    result.qualityScore = this.qualityScorer.score(result.slides);
                    results.push(result);
                }
            } catch (error) {
                console.warn(`Provider ${providerName} failed:`, error);
            }
        }

        if (results.length === 0) {
            throw new Error('All providers failed to generate content');
        }

        // Return the best result based on quality score
        return results.reduce((best, current) => 
            current.qualityScore > best.qualityScore ? current : best
        );
    }
}

// Content Quality Scoring System
class ContentQualityScorer {
    score(slides) {
        if (!slides || slides.length === 0) return 0;

        let totalScore = 0;
        const weights = {
            titleQuality: 0.3,
            contentQuality: 0.4,
            structureQuality: 0.2,
            lengthBalance: 0.1
        };

        for (const slide of slides) {
            const slideScore = 
                weights.titleQuality * this.scoreTitleQuality(slide.title) +
                weights.contentQuality * this.scoreContentQuality(slide.content) +
                weights.structureQuality * this.scoreStructureQuality(slide) +
                weights.lengthBalance * this.scoreLengthBalance(slide);
            
            totalScore += slideScore;
        }

        return totalScore / slides.length;
    }

    scoreTitleQuality(title) {
        if (!title) return 0;
        
        const length = title.length;
        const hasNumbers = /\d/.test(title);
        const hasAction = /\b(how|why|what|create|build|improve|optimize)\b/i.test(title);
        
        let score = 0.5; // Base score
        
        // Optimal length (5-50 characters)
        if (length >= 5 && length <= 50) score += 0.3;
        else if (length > 50) score -= 0.2;
        
        // Bonus for engagement elements
        if (hasNumbers) score += 0.1;
        if (hasAction) score += 0.1;
        
        return Math.min(score, 1.0);
    }

    scoreContentQuality(content) {
        if (!content) return 0;
        
        const lines = content.split('\n').filter(line => line.trim());
        const avgLineLength = lines.reduce((sum, line) => sum + line.length, 0) / lines.length;
        
        let score = 0.5; // Base score
        
        // Optimal number of points (3-6)
        if (lines.length >= 3 && lines.length <= 6) score += 0.3;
        else if (lines.length > 6) score -= 0.1;
        
        // Optimal line length (20-100 characters)
        if (avgLineLength >= 20 && avgLineLength <= 100) score += 0.2;
        
        return Math.min(score, 1.0);
    }

    scoreStructureQuality(slide) {
        // Check for consistent structure patterns
        const hasTitle = slide.title && slide.title.length > 0;
        const hasContent = slide.content && slide.content.length > 0;
        
        if (hasTitle && hasContent) return 1.0;
        if (hasTitle || hasContent) return 0.5;
        return 0;
    }

    scoreLengthBalance(slide) {
        const titleLength = slide.title ? slide.title.length : 0;
        const contentLength = slide.content ? slide.content.length : 0;
        
        // Ideal ratio: title should be 10-30% of total content
        const totalLength = titleLength + contentLength;
        if (totalLength === 0) return 0;
        
        const titleRatio = titleLength / totalLength;
        if (titleRatio >= 0.1 && titleRatio <= 0.3) return 1.0;
        return Math.max(0, 1 - Math.abs(titleRatio - 0.2) * 5);
    }
}

// Export for use in main application
window.AIProviderManager = AIProviderManager;
window.ClaudeProvider = ClaudeProvider;
window.OpenAIProvider = OpenAIProvider;
window.GeminiProvider = GeminiProvider;