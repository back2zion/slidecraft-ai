/**
 * Enhanced Template Engine for SlideCraft AI
 * Professional design templates with smart content fitting
 * Author: AI Enhanced Template System
 * Version: 2.0
 */

// ============================================================================
// CORE TEMPLATE ARCHITECTURE
// ============================================================================

class TemplateEngine {
    constructor() {
        this.templates = new Map();
        this.layouts = new Map();
        this.colorPalettes = new Map();
        this.typography = new TypographySystem();
        this.contentAnalyzer = new ContentAnalyzer();
        this.layoutEngine = new LayoutEngine();
        
        this.initializeTemplates();
        this.initializeLayouts();
        this.initializeColorPalettes();
    }
    
    /**
     * Generate a complete presentation with smart template selection
     */
    generatePresentation(slides, options = {}) {
        const template = this.selectOptimalTemplate(slides, options);
        const processedSlides = slides.map(slide => this.processSlide(slide, template, options));
        
        return {
            template,
            slides: processedSlides,
            metadata: {
                generatedAt: new Date().toISOString(),
                templateUsed: template.name,
                totalSlides: slides.length,
                processingOptions: options
            }
        };
    }
    
    /**
     * Intelligently select the best template based on content analysis
     */
    selectOptimalTemplate(slides, options = {}) {
        const contentProfile = this.contentAnalyzer.analyzePresentation(slides);
        const templateScore = new Map();
        
        for (const [name, template] of this.templates) {
            const score = this.calculateTemplateScore(template, contentProfile, options);
            templateScore.set(name, score);
        }
        
        const bestTemplate = [...templateScore.entries()]
            .sort((a, b) => b[1] - a[1])[0][0];
        
        return this.templates.get(bestTemplate);
    }
    
    /**
     * Process individual slide with template and smart fitting
     */
    processSlide(slide, template, options = {}) {
        const contentType = this.contentAnalyzer.detectContentType(slide);
        const layout = this.layouts.get(contentType) || this.layouts.get('default');
        
        return {
            ...slide,
            template: template.name,
            layout: layout.name,
            design: this.applyDesign(slide, template, layout),
            typography: this.typography.optimizeForContent(slide.content),
            metadata: {
                contentType,
                wordCount: this.contentAnalyzer.getWordCount(slide.content),
                complexity: this.contentAnalyzer.getComplexity(slide.content)
            }
        };
    }
    
    initializeTemplates() {
        // Professional Business Templates
        this.templates.set('corporate-modern', new CorporateModernTemplate());
        this.templates.set('corporate-minimal', new CorporateMinimalTemplate());
        this.templates.set('executive-premium', new ExecutivePremiumTemplate());
        
        // Creative & Marketing Templates
        this.templates.set('creative-bold', new CreativeBoldTemplate());
        this.templates.set('marketing-vibrant', new MarketingVibrantTemplate());
        this.templates.set('startup-dynamic', new StartupDynamicTemplate());
        
        // Technical & Educational Templates
        this.templates.set('tech-sleek', new TechSleekTemplate());
        this.templates.set('academic-clean', new AcademicCleanTemplate());
        this.templates.set('educational-friendly', new EducationalFriendlyTemplate());
        
        // Specialized Templates
        this.templates.set('data-focus', new DataFocusTemplate());
        this.templates.set('storytelling', new StorytellingTemplate());
        this.templates.set('pitch-deck', new PitchDeckTemplate());
    }
    
    initializeLayouts() {
        this.layouts.set('title', new TitleSlideLayout());
        this.layouts.set('content', new ContentSlideLayout());
        this.layouts.set('comparison', new ComparisonLayout());
        this.layouts.set('timeline', new TimelineLayout());
        this.layouts.set('process', new ProcessFlowLayout());
        this.layouts.set('data', new DataVisualizationLayout());
        this.layouts.set('quote', new QuoteLayout());
        this.layouts.set('conclusion', new ConclusionLayout());
        this.layouts.set('default', new DefaultLayout());
    }
    
    initializeColorPalettes() {
        // Professional Business Palettes
        this.colorPalettes.set('corporate-blue', new CorporateBluePalette());
        this.colorPalettes.set('executive-gray', new ExecutiveGrayPalette());
        this.colorPalettes.set('professional-navy', new ProfessionalNavyPalette());
        
        // Creative & Vibrant Palettes
        this.colorPalettes.set('creative-gradient', new CreativeGradientPalette());
        this.colorPalettes.set('startup-energy', new StartupEnergyPalette());
        this.colorPalettes.set('marketing-pop', new MarketingPopPalette());
        
        // Technical & Clean Palettes
        this.colorPalettes.set('tech-modern', new TechModernPalette());
        this.colorPalettes.set('minimal-mono', new MinimalMonoPalette());
        this.colorPalettes.set('academic-earth', new AcademicEarthPalette());
    }
    
    calculateTemplateScore(template, contentProfile, options) {
        let score = 0;
        
        // Content type matching
        if (template.suitableFor.includes(contentProfile.primaryType)) {
            score += 40;
        }
        
        // Complexity matching
        const complexityMatch = Math.abs(template.complexity - contentProfile.complexity);
        score += Math.max(0, 30 - complexityMatch * 10);
        
        // Audience matching
        if (options.targetAudience && template.targetAudience.includes(options.targetAudience)) {
            score += 20;
        }
        
        // Presentation time matching
        if (options.presentationTime) {
            const timeScore = this.calculateTimeScore(template, options.presentationTime);
            score += timeScore;
        }
        
        return score;
    }
    
    calculateTimeScore(template, presentationTime) {
        const timeMinutes = parseInt(presentationTime);
        if (timeMinutes <= 10 && template.pace === 'fast') return 10;
        if (timeMinutes <= 20 && template.pace === 'medium') return 10;
        if (timeMinutes > 20 && template.pace === 'slow') return 10;
        return 5;
    }
    
    applyDesign(slide, template, layout) {
        const colorPalette = this.colorPalettes.get(template.colorPalette);
        
        return {
            background: template.getBackground(colorPalette),
            titleStyle: template.getTitleStyle(colorPalette),
            contentStyle: template.getContentStyle(colorPalette),
            layout: layout.getConfiguration(),
            animations: template.getAnimations(),
            spacing: layout.getSpacing(slide.content)
        };
    }
}

// ============================================================================
// TEMPLATE BASE CLASS AND IMPLEMENTATIONS
// ============================================================================

class TemplateBase {
    constructor() {
        this.name = '';
        this.suitableFor = [];
        this.targetAudience = [];
        this.complexity = 1; // 1-5 scale
        this.pace = 'medium'; // fast, medium, slow
        this.colorPalette = 'default';
    }
    
    getBackground(colorPalette) {
        return {
            type: 'solid',
            color: colorPalette.background,
            gradient: null
        };
    }
    
    getTitleStyle(colorPalette) {
        return {
            fontFamily: 'Segoe UI',
            fontSize: 28,
            fontWeight: 'bold',
            color: colorPalette.primary,
            align: 'left'
        };
    }
    
    getContentStyle(colorPalette) {
        return {
            fontFamily: 'Segoe UI',
            fontSize: 16,
            fontWeight: 'normal',
            color: colorPalette.text,
            lineHeight: 1.5
        };
    }
    
    getAnimations() {
        return {
            entrance: 'fadeIn',
            transition: 'slide',
            duration: 0.5
        };
    }
}

// Professional Business Templates
class CorporateModernTemplate extends TemplateBase {
    constructor() {
        super();
        this.name = 'Corporate Modern';
        this.suitableFor = ['business', 'corporate', 'executive'];
        this.targetAudience = ['executives', 'clients', 'stakeholders'];
        this.complexity = 3;
        this.colorPalette = 'corporate-blue';
    }
    
    getBackground(colorPalette) {
        return {
            type: 'gradient',
            gradient: `linear-gradient(135deg, ${colorPalette.primary}15 0%, ${colorPalette.secondary}10 100%)`,
            overlay: true
        };
    }
    
    getTitleStyle(colorPalette) {
        return {
            ...super.getTitleStyle(colorPalette),
            fontSize: 32,
            fontWeight: '600',
            letterSpacing: '-0.5px'
        };
    }
}

class CorporateMinimalTemplate extends TemplateBase {
    constructor() {
        super();
        this.name = 'Corporate Minimal';
        this.suitableFor = ['business', 'professional', 'reports'];
        this.targetAudience = ['executives', 'board members'];
        this.complexity = 2;
        this.colorPalette = 'executive-gray';
    }
    
    getBackground(colorPalette) {
        return {
            type: 'solid',
            color: '#FFFFFF',
            accent: colorPalette.accent
        };
    }
    
    getTitleStyle(colorPalette) {
        return {
            ...super.getTitleStyle(colorPalette),
            fontSize: 30,
            fontWeight: '300',
            fontFamily: 'Helvetica Neue'
        };
    }
}

class ExecutivePremiumTemplate extends TemplateBase {
    constructor() {
        super();
        this.name = 'Executive Premium';
        this.suitableFor = ['executive', 'board', 'high-level'];
        this.targetAudience = ['c-suite', 'board members', 'investors'];
        this.complexity = 4;
        this.pace = 'slow';
        this.colorPalette = 'professional-navy';
    }
    
    getBackground(colorPalette) {
        return {
            type: 'textured',
            baseColor: colorPalette.background,
            texture: 'subtle-paper',
            accent: colorPalette.gold
        };
    }
    
    getTitleStyle(colorPalette) {
        return {
            ...super.getTitleStyle(colorPalette),
            fontSize: 34,
            fontFamily: 'Times New Roman',
            fontWeight: 'bold',
            color: colorPalette.primary
        };
    }
}

// Creative & Marketing Templates
class CreativeBoldTemplate extends TemplateBase {
    constructor() {
        super();
        this.name = 'Creative Bold';
        this.suitableFor = ['creative', 'marketing', 'design'];
        this.targetAudience = ['creatives', 'marketers', 'clients'];
        this.complexity = 4;
        this.pace = 'fast';
        this.colorPalette = 'creative-gradient';
    }
    
    getBackground(colorPalette) {
        return {
            type: 'dynamic-gradient',
            gradient: colorPalette.dynamicGradient,
            shapes: true,
            animation: 'subtle-flow'
        };
    }
    
    getTitleStyle(colorPalette) {
        return {
            ...super.getTitleStyle(colorPalette),
            fontSize: 36,
            fontFamily: 'Montserrat',
            fontWeight: '800',
            textTransform: 'uppercase',
            letterSpacing: '1px'
        };
    }
    
    getAnimations() {
        return {
            entrance: 'slideInFromLeft',
            transition: 'morphing',
            duration: 0.8,
            easing: 'elastic'
        };
    }
}

class MarketingVibrantTemplate extends TemplateBase {
    constructor() {
        super();
        this.name = 'Marketing Vibrant';
        this.suitableFor = ['marketing', 'sales', 'promotion'];
        this.targetAudience = ['customers', 'prospects', 'sales teams'];
        this.complexity = 3;
        this.pace = 'fast';
        this.colorPalette = 'marketing-pop';
    }
    
    getBackground(colorPalette) {
        return {
            type: 'vibrant-gradient',
            gradient: colorPalette.vibrantGradient,
            patterns: 'geometric',
            energy: 'high'
        };
    }
    
    getTitleStyle(colorPalette) {
        return {
            ...super.getTitleStyle(colorPalette),
            fontSize: 35,
            fontFamily: 'Open Sans',
            fontWeight: '700',
            color: colorPalette.contrast,
            shadow: '2px 2px 4px rgba(0,0,0,0.3)'
        };
    }
}

class StartupDynamicTemplate extends TemplateBase {
    constructor() {
        super();
        this.name = 'Startup Dynamic';
        this.suitableFor = ['startup', 'pitch', 'innovation'];
        this.targetAudience = ['investors', 'partners', 'team'];
        this.complexity = 4;
        this.pace = 'fast';
        this.colorPalette = 'startup-energy';
    }
    
    getBackground(colorPalette) {
        return {
            type: 'tech-gradient',
            gradient: colorPalette.techGradient,
            grid: 'subtle',
            innovation: true
        };
    }
    
    getTitleStyle(colorPalette) {
        return {
            ...super.getTitleStyle(colorPalette),
            fontSize: 33,
            fontFamily: 'Roboto',
            fontWeight: '500',
            color: colorPalette.electric,
            animation: 'pulse-glow'
        };
    }
}

// Technical & Educational Templates
class TechSleekTemplate extends TemplateBase {
    constructor() {
        super();
        this.name = 'Tech Sleek';
        this.suitableFor = ['technology', 'software', 'technical'];
        this.targetAudience = ['developers', 'engineers', 'tech teams'];
        this.complexity = 3;
        this.colorPalette = 'tech-modern';
    }
    
    getBackground(colorPalette) {
        return {
            type: 'code-inspired',
            baseColor: colorPalette.dark,
            codePattern: 'subtle',
            gridLines: true
        };
    }
    
    getTitleStyle(colorPalette) {
        return {
            ...super.getTitleStyle(colorPalette),
            fontSize: 30,
            fontFamily: 'Fira Code',
            fontWeight: '500',
            color: colorPalette.accent,
            monospace: true
        };
    }
}

class AcademicCleanTemplate extends TemplateBase {
    constructor() {
        super();
        this.name = 'Academic Clean';
        this.suitableFor = ['academic', 'research', 'scholarly'];
        this.targetAudience = ['academics', 'researchers', 'students'];
        this.complexity = 2;
        this.pace = 'medium';
        this.colorPalette = 'academic-earth';
    }
    
    getBackground(colorPalette) {
        return {
            type: 'paper',
            color: '#FFFEF9',
            texture: 'academic-paper',
            borders: colorPalette.accent
        };
    }
    
    getTitleStyle(colorPalette) {
        return {
            ...super.getTitleStyle(colorPalette),
            fontSize: 28,
            fontFamily: 'Georgia',
            fontWeight: 'bold',
            color: colorPalette.primary,
            serif: true
        };
    }
}

class EducationalFriendlyTemplate extends TemplateBase {
    constructor() {
        super();
        this.name = 'Educational Friendly';
        this.suitableFor = ['education', 'training', 'learning'];
        this.targetAudience = ['students', 'trainees', 'learners'];
        this.complexity = 2;
        this.pace = 'medium';
        this.colorPalette = 'educational-warm';
    }
    
    getBackground(colorPalette) {
        return {
            type: 'friendly-gradient',
            gradient: colorPalette.friendlyGradient,
            illustrations: 'subtle',
            warmth: 'high'
        };
    }
    
    getTitleStyle(colorPalette) {
        return {
            ...super.getTitleStyle(colorPalette),
            fontSize: 32,
            fontFamily: 'Comic Neue',
            fontWeight: '600',
            color: colorPalette.primary,
            friendly: true
        };
    }
}

// Specialized Templates
class DataFocusTemplate extends TemplateBase {
    constructor() {
        super();
        this.name = 'Data Focus';
        this.suitableFor = ['data', 'analytics', 'reports'];
        this.targetAudience = ['analysts', 'managers', 'data teams'];
        this.complexity = 3;
        this.colorPalette = 'data-viz';
    }
    
    getBackground(colorPalette) {
        return {
            type: 'data-grid',
            baseColor: colorPalette.background,
            grid: 'precise',
            charts: 'optimized'
        };
    }
    
    getTitleStyle(colorPalette) {
        return {
            ...super.getTitleStyle(colorPalette),
            fontSize: 26,
            fontFamily: 'IBM Plex Sans',
            fontWeight: '500',
            color: colorPalette.primary,
            analytical: true
        };
    }
}

class StorytellingTemplate extends TemplateBase {
    constructor() {
        super();
        this.name = 'Storytelling';
        this.suitableFor = ['narrative', 'story', 'journey'];
        this.targetAudience = ['general audience', 'stakeholders'];
        this.complexity = 4;
        this.pace = 'slow';
        this.colorPalette = 'story-warm';
    }
    
    getBackground(colorPalette) {
        return {
            type: 'narrative',
            gradient: colorPalette.storyGradient,
            chapters: true,
            flow: 'smooth'
        };
    }
    
    getTitleStyle(colorPalette) {
        return {
            ...super.getTitleStyle(colorPalette),
            fontSize: 34,
            fontFamily: 'Playfair Display',
            fontWeight: '600',
            color: colorPalette.primary,
            storytelling: true
        };
    }
}

class PitchDeckTemplate extends TemplateBase {
    constructor() {
        super();
        this.name = 'Pitch Deck';
        this.suitableFor = ['pitch', 'investment', 'funding'];
        this.targetAudience = ['investors', 'VCs', 'angels'];
        this.complexity = 5;
        this.pace = 'fast';
        this.colorPalette = 'pitch-professional';
    }
    
    getBackground(colorPalette) {
        return {
            type: 'investment-grade',
            gradient: colorPalette.professionalGradient,
            credibility: 'maximum',
            impact: 'high'
        };
    }
    
    getTitleStyle(colorPalette) {
        return {
            ...super.getTitleStyle(colorPalette),
            fontSize: 36,
            fontFamily: 'Helvetica Neue',
            fontWeight: 'bold',
            color: colorPalette.impact,
            confidence: true
        };
    }
}

// ============================================================================
// LAYOUT SYSTEM
// ============================================================================

class LayoutEngine {
    constructor() {
        this.layouts = new Map();
        this.contentFitter = new ContentFitter();
    }
    
    getOptimalLayout(content, contentType) {
        const layout = this.layouts.get(contentType) || this.layouts.get('default');
        return layout.optimize(content);
    }
}

class LayoutBase {
    constructor() {
        this.name = '';
        this.type = 'default';
        this.zones = {};
    }
    
    getConfiguration() {
        return {
            name: this.name,
            zones: this.zones,
            spacing: this.getSpacing(),
            alignment: this.getAlignment()
        };
    }
    
    getSpacing(content = '') {
        return {
            padding: { top: 40, right: 40, bottom: 40, left: 40 },
            margin: { title: 20, content: 15, bullet: 10 }
        };
    }
    
    getAlignment() {
        return {
            title: 'left',
            content: 'left',
            overall: 'center'
        };
    }
    
    optimize(content) {
        // Base optimization - can be overridden
        return this.getConfiguration();
    }
}

class TitleSlideLayout extends LayoutBase {
    constructor() {
        super();
        this.name = 'Title Slide';
        this.type = 'title';
        this.zones = {
            title: { x: 1, y: 2, w: 11, h: 2 },
            subtitle: { x: 1, y: 4, w: 11, h: 1 },
            author: { x: 1, y: 6, w: 11, h: 0.5 }
        };
    }
    
    getAlignment() {
        return {
            title: 'center',
            content: 'center',
            overall: 'center'
        };
    }
}

class ContentSlideLayout extends LayoutBase {
    constructor() {
        super();
        this.name = 'Content Slide';
        this.type = 'content';
        this.zones = {
            title: { x: 1, y: 1, w: 11, h: 1.2 },
            content: { x: 1, y: 2.5, w: 11, h: 4.5 },
            footer: { x: 1, y: 7, w: 11, h: 0.3 }
        };
    }
    
    optimize(content) {
        const config = this.getConfiguration();
        const lines = content.split('\n').filter(line => line.trim());
        
        // Adjust content area height based on content amount
        if (lines.length > 6) {
            config.zones.content.h = 5;
            config.zones.title.h = 1;
        } else if (lines.length < 3) {
            config.zones.content.h = 3;
            config.zones.content.y = 3;
        }
        
        return config;
    }
}

class ComparisonLayout extends LayoutBase {
    constructor() {
        super();
        this.name = 'Comparison';
        this.type = 'comparison';
        this.zones = {
            title: { x: 1, y: 1, w: 11, h: 1 },
            leftColumn: { x: 1, y: 2.5, w: 5, h: 4.5 },
            rightColumn: { x: 6.5, y: 2.5, w: 5, h: 4.5 },
            separator: { x: 6, y: 2.5, w: 0.5, h: 4.5 }
        };
    }
}

class TimelineLayout extends LayoutBase {
    constructor() {
        super();
        this.name = 'Timeline';
        this.type = 'timeline';
        this.zones = {
            title: { x: 1, y: 1, w: 11, h: 1 },
            timeline: { x: 1, y: 2.5, w: 11, h: 4.5 },
            axis: { x: 1, y: 4.5, w: 11, h: 0.1 }
        };
    }
}

class ProcessFlowLayout extends LayoutBase {
    constructor() {
        super();
        this.name = 'Process Flow';
        this.type = 'process';
        this.zones = {
            title: { x: 1, y: 1, w: 11, h: 1 },
            step1: { x: 1, y: 3, w: 2.5, h: 3 },
            step2: { x: 4, y: 3, w: 2.5, h: 3 },
            step3: { x: 7, y: 3, w: 2.5, h: 3 },
            step4: { x: 10, y: 3, w: 2.5, h: 3 },
            arrows: { flow: 'horizontal' }
        };
    }
}

class DataVisualizationLayout extends LayoutBase {
    constructor() {
        super();
        this.name = 'Data Visualization';
        this.type = 'data';
        this.zones = {
            title: { x: 1, y: 1, w: 11, h: 1 },
            chart: { x: 1, y: 2.5, w: 7, h: 4.5 },
            legend: { x: 8.5, y: 2.5, w: 3.5, h: 4.5 },
            insights: { x: 1, y: 7.2, w: 11, h: 0.5 }
        };
    }
}

class QuoteLayout extends LayoutBase {
    constructor() {
        super();
        this.name = 'Quote';
        this.type = 'quote';
        this.zones = {
            quote: { x: 2, y: 2, w: 9, h: 3 },
            author: { x: 2, y: 5.5, w: 9, h: 0.8 },
            quotationMarks: { x: 1, y: 1.5, w: 1, h: 1 }
        };
    }
    
    getAlignment() {
        return {
            title: 'center',
            content: 'center',
            overall: 'center'
        };
    }
}

class ConclusionLayout extends LayoutBase {
    constructor() {
        super();
        this.name = 'Conclusion';
        this.type = 'conclusion';
        this.zones = {
            title: { x: 1, y: 1.5, w: 11, h: 1.5 },
            keyPoints: { x: 1, y: 3.5, w: 11, h: 2.5 },
            callToAction: { x: 2, y: 6.5, w: 9, h: 1 }
        };
    }
}

class DefaultLayout extends LayoutBase {
    constructor() {
        super();
        this.name = 'Default';
        this.type = 'default';
        this.zones = {
            title: { x: 1, y: 1.2, w: 11, h: 1.2 },
            content: { x: 1, y: 2.8, w: 11, h: 4 },
            footer: { x: 1, y: 7.2, w: 11, h: 0.3 }
        };
    }
}

// ============================================================================
// COLOR PALETTE SYSTEM
// ============================================================================

class ColorPaletteBase {
    constructor() {
        this.name = '';
        this.primary = '#000000';
        this.secondary = '#666666';
        this.accent = '#999999';
        this.background = '#FFFFFF';
        this.text = '#333333';
    }
    
    getGradient() {
        return `linear-gradient(135deg, ${this.primary} 0%, ${this.secondary} 100%)`;
    }
    
    getContrastColor(bgColor) {
        // Simple contrast calculation
        const color = bgColor.replace('#', '');
        const r = parseInt(color.substr(0, 2), 16);
        const g = parseInt(color.substr(2, 2), 16);
        const b = parseInt(color.substr(4, 2), 16);
        const brightness = (r * 299 + g * 587 + b * 114) / 1000;
        return brightness > 128 ? '#000000' : '#FFFFFF';
    }
}

// Professional Business Palettes
class CorporateBluePalette extends ColorPaletteBase {
    constructor() {
        super();
        this.name = 'Corporate Blue';
        this.primary = '#1e40af';
        this.secondary = '#3b82f6';
        this.accent = '#60a5fa';
        this.background = '#f8fafc';
        this.text = '#1e293b';
        this.success = '#10b981';
        this.warning = '#f59e0b';
    }
}

class ExecutiveGrayPalette extends ColorPaletteBase {
    constructor() {
        super();
        this.name = 'Executive Gray';
        this.primary = '#374151';
        this.secondary = '#6b7280';
        this.accent = '#d1d5db';
        this.background = '#ffffff';
        this.text = '#111827';
        this.gold = '#f59e0b';
    }
}

class ProfessionalNavyPalette extends ColorPaletteBase {
    constructor() {
        super();
        this.name = 'Professional Navy';
        this.primary = '#1e3a8a';
        this.secondary = '#1e40af';
        this.accent = '#3b82f6';
        this.background = '#f1f5f9';
        this.text = '#0f172a';
        this.gold = '#d97706';
    }
}

// Creative & Vibrant Palettes
class CreativeGradientPalette extends ColorPaletteBase {
    constructor() {
        super();
        this.name = 'Creative Gradient';
        this.primary = '#8b5cf6';
        this.secondary = '#ec4899';
        this.accent = '#f59e0b';
        this.background = '#fafafa';
        this.text = '#1f2937';
        this.dynamicGradient = 'linear-gradient(135deg, #8b5cf6 0%, #ec4899 50%, #f59e0b 100%)';
    }
}

class StartupEnergyPalette extends ColorPaletteBase {
    constructor() {
        super();
        this.name = 'Startup Energy';
        this.primary = '#7c3aed';
        this.secondary = '#2563eb';
        this.accent = '#06b6d4';
        this.background = '#f8fafc';
        this.text = '#1e293b';
        this.electric = '#8b5cf6';
        this.techGradient = 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)';
    }
}

class MarketingPopPalette extends ColorPaletteBase {
    constructor() {
        super();
        this.name = 'Marketing Pop';
        this.primary = '#dc2626';
        this.secondary = '#ea580c';
        this.accent = '#f59e0b';
        this.background = '#fffbeb';
        this.text = '#1c1917';
        this.contrast = '#ffffff';
        this.vibrantGradient = 'linear-gradient(135deg, #ff6b6b 0%, #ffa726 100%)';
    }
}

// Technical & Clean Palettes
class TechModernPalette extends ColorPaletteBase {
    constructor() {
        super();
        this.name = 'Tech Modern';
        this.primary = '#0f172a';
        this.secondary = '#1e293b';
        this.accent = '#00d4aa';
        this.background = '#0f172a';
        this.text = '#e2e8f0';
        this.dark = '#020617';
    }
}

class MinimalMonoPalette extends ColorPaletteBase {
    constructor() {
        super();
        this.name = 'Minimal Mono';
        this.primary = '#000000';
        this.secondary = '#404040';
        this.accent = '#808080';
        this.background = '#ffffff';
        this.text = '#1a1a1a';
    }
}

class AcademicEarthPalette extends ColorPaletteBase {
    constructor() {
        super();
        this.name = 'Academic Earth';
        this.primary = '#92400e';
        this.secondary = '#b45309';
        this.accent = '#d97706';
        this.background = '#fffbeb';
        this.text = '#451a03';
    }
}

// ============================================================================
// TYPOGRAPHY SYSTEM
// ============================================================================

class TypographySystem {
    constructor() {
        this.fontPairs = new Map();
        this.initializeFontPairs();
    }
    
    initializeFontPairs() {
        this.fontPairs.set('professional', {
            heading: 'Helvetica Neue',
            body: 'Helvetica Neue',
            accent: 'Georgia'
        });
        
        this.fontPairs.set('modern', {
            heading: 'Montserrat',
            body: 'Open Sans',
            accent: 'Roboto'
        });
        
        this.fontPairs.set('creative', {
            heading: 'Playfair Display',
            body: 'Source Sans Pro',
            accent: 'Merriweather'
        });
        
        this.fontPairs.set('technical', {
            heading: 'IBM Plex Sans',
            body: 'IBM Plex Sans',
            accent: 'Fira Code'
        });
        
        this.fontPairs.set('friendly', {
            heading: 'Nunito',
            body: 'Nunito Sans',
            accent: 'Comic Neue'
        });
    }
    
    optimizeForContent(content) {
        const complexity = this.analyzeContentComplexity(content);
        const fontPair = this.selectOptimalFontPair(complexity);
        
        return {
            heading: {
                fontFamily: fontPair.heading,
                fontSize: this.calculateOptimalTitleSize(content),
                lineHeight: 1.2,
                fontWeight: this.getOptimalWeight(complexity)
            },
            body: {
                fontFamily: fontPair.body,
                fontSize: this.calculateOptimalBodySize(content),
                lineHeight: 1.5,
                fontWeight: 'normal'
            },
            accent: {
                fontFamily: fontPair.accent,
                fontStyle: 'italic'
            }
        };
    }
    
    analyzeContentComplexity(content) {
        const words = content.split(/\s+/).length;
        const sentences = content.split(/[.!?]+/).length;
        const avgWordsPerSentence = words / sentences;
        
        if (avgWordsPerSentence > 20) return 'complex';
        if (avgWordsPerSentence > 15) return 'moderate';
        return 'simple';
    }
    
    selectOptimalFontPair(complexity) {
        switch (complexity) {
            case 'complex': return this.fontPairs.get('professional');
            case 'moderate': return this.fontPairs.get('modern');
            default: return this.fontPairs.get('friendly');
        }
    }
    
    calculateOptimalTitleSize(content) {
        const titleLength = content.split('\n')[0]?.length || 0;
        if (titleLength > 50) return 24;
        if (titleLength > 30) return 28;
        if (titleLength > 15) return 32;
        return 36;
    }
    
    calculateOptimalBodySize(content) {
        const lines = content.split('\n').filter(line => line.trim()).length;
        if (lines > 8) return 14;
        if (lines > 5) return 16;
        return 18;
    }
    
    getOptimalWeight(complexity) {
        switch (complexity) {
            case 'complex': return '400';
            case 'moderate': return '500';
            default: return '600';
        }
    }
}

// ============================================================================
// CONTENT ANALYSIS SYSTEM
// ============================================================================

class ContentAnalyzer {
    constructor() {
        this.contentTypes = new Map();
        this.initializeContentTypes();
    }
    
    initializeContentTypes() {
        this.contentTypes.set('title', /^(introduction|intro|welcome|title|cover)/i);
        this.contentTypes.set('agenda', /^(agenda|outline|overview|contents|table of contents)/i);
        this.contentTypes.set('comparison', /(vs|versus|compare|comparison|against|differ)/i);
        this.contentTypes.set('timeline', /(timeline|schedule|roadmap|phases|milestones)/i);
        this.contentTypes.set('process', /(process|steps|workflow|procedure|method)/i);
        this.contentTypes.set('data', /(chart|graph|data|statistics|metrics|numbers)/i);
        this.contentTypes.set('quote', /(quote|testimonial|said|")/i);
        this.contentTypes.set('conclusion', /(conclusion|summary|wrap up|next steps|thank you)/i);
    }
    
    analyzePresentation(slides) {
        const contentTypes = slides.map(slide => this.detectContentType(slide));
        const totalComplexity = slides.reduce((sum, slide) => sum + this.getComplexity(slide.content), 0);
        
        return {
            primaryType: this.getMostCommonType(contentTypes),
            complexity: totalComplexity / slides.length,
            contentTypes: contentTypes,
            totalWords: slides.reduce((sum, slide) => sum + this.getWordCount(slide.content), 0),
            averageWordsPerSlide: slides.reduce((sum, slide) => sum + this.getWordCount(slide.content), 0) / slides.length
        };
    }
    
    detectContentType(slide) {
        const title = slide.title.toLowerCase();
        const content = slide.content.toLowerCase();
        const combined = title + ' ' + content;
        
        for (const [type, pattern] of this.contentTypes) {
            if (pattern.test(combined)) {
                return type;
            }
        }
        
        // Special cases
        if (slides.indexOf(slide) === 0) return 'title';
        if (slides.indexOf(slide) === slides.length - 1) return 'conclusion';
        
        return 'content';
    }
    
    getComplexity(content) {
        const words = content.split(/\s+/).length;
        const sentences = content.split(/[.!?]+/).length;
        const avgWordsPerSentence = words / sentences;
        
        let complexity = 1;
        if (avgWordsPerSentence > 15) complexity += 1;
        if (words > 100) complexity += 1;
        if (content.includes('•') || content.includes('-')) complexity += 0.5;
        
        return Math.min(complexity, 5);
    }
    
    getWordCount(content) {
        return content.split(/\s+/).filter(word => word.length > 0).length;
    }
    
    getMostCommonType(types) {
        const frequency = {};
        types.forEach(type => {
            frequency[type] = (frequency[type] || 0) + 1;
        });
        
        return Object.keys(frequency).reduce((a, b) => 
            frequency[a] > frequency[b] ? a : b
        );
    }
}

// ============================================================================
// SMART CONTENT FITTING
// ============================================================================

class ContentFitter {
    constructor() {
        this.maxTitleLength = 60;
        this.maxContentLines = 8;
        this.maxLineLength = 80;
    }
    
    fitContent(slide, layout) {
        return {
            title: this.fitTitle(slide.title),
            content: this.fitContentLines(slide.content, layout),
            overflow: this.detectOverflow(slide, layout)
        };
    }
    
    fitTitle(title) {
        if (title.length <= this.maxTitleLength) return title;
        
        // Smart truncation preserving meaning
        const words = title.split(' ');
        let fitted = '';
        
        for (const word of words) {
            if ((fitted + word).length > this.maxTitleLength - 3) break;
            fitted += (fitted ? ' ' : '') + word;
        }
        
        return fitted + '...';
    }
    
    fitContentLines(content, layout) {
        const lines = content.split('\n').filter(line => line.trim());
        const maxLines = this.calculateMaxLines(layout);
        
        if (lines.length <= maxLines) {
            return lines.map(line => this.fitLine(line)).join('\n');
        }
        
        // Smart line fitting with priority preservation
        const importantLines = this.identifyImportantLines(lines);
        const fitted = importantLines.slice(0, maxLines - 1);
        fitted.push('... and more');
        
        return fitted.map(line => this.fitLine(line)).join('\n');
    }
    
    fitLine(line) {
        if (line.length <= this.maxLineLength) return line;
        
        // Smart line breaking
        const words = line.split(' ');
        let fitted = '';
        
        for (const word of words) {
            if ((fitted + word).length > this.maxLineLength - 3) break;
            fitted += (fitted ? ' ' : '') + word;
        }
        
        return fitted + '...';
    }
    
    calculateMaxLines(layout) {
        const contentHeight = layout.zones?.content?.h || 4;
        return Math.floor(contentHeight * 2); // Approximate lines per height unit
    }
    
    identifyImportantLines(lines) {
        return lines.sort((a, b) => {
            // Prioritize lines with numbers, key terms, or starting positions
            const scoreA = this.getLineImportance(a);
            const scoreB = this.getLineImportance(b);
            return scoreB - scoreA;
        });
    }
    
    getLineImportance(line) {
        let score = 0;
        
        // Numbers and percentages are important
        if (/\d+%/.test(line)) score += 3;
        if (/\d+/.test(line)) score += 2;
        
        // Key business terms
        if (/(increase|decrease|improve|growth|revenue|profit)/i.test(line)) score += 2;
        
        // Question or action items
        if (/[?!]/.test(line)) score += 1;
        
        // Shorter lines are often key points
        if (line.length < 50) score += 1;
        
        return score;
    }
    
    detectOverflow(slide, layout) {
        const titleOverflow = slide.title.length > this.maxTitleLength;
        const contentLines = slide.content.split('\n').filter(line => line.trim());
        const contentOverflow = contentLines.length > this.calculateMaxLines(layout);
        
        return {
            title: titleOverflow,
            content: contentOverflow,
            severity: titleOverflow || contentOverflow ? 'warning' : 'none'
        };
    }
}

// ============================================================================
// ANIMATION SYSTEM
// ============================================================================

class AnimationSystem {
    constructor() {
        this.animations = new Map();
        this.initializeAnimations();
    }
    
    initializeAnimations() {
        this.animations.set('fadeIn', {
            type: 'entrance',
            duration: 0.5,
            easing: 'ease-out',
            css: 'opacity: 0; animation: fadeIn 0.5s ease-out forwards;'
        });
        
        this.animations.set('slideInFromLeft', {
            type: 'entrance',
            duration: 0.6,
            easing: 'ease-out',
            css: 'transform: translateX(-100%); animation: slideInFromLeft 0.6s ease-out forwards;'
        });
        
        this.animations.set('slideInFromBottom', {
            type: 'entrance',
            duration: 0.7,
            easing: 'ease-out',
            css: 'transform: translateY(100%); animation: slideInFromBottom 0.7s ease-out forwards;'
        });
        
        this.animations.set('scaleIn', {
            type: 'entrance',
            duration: 0.5,
            easing: 'ease-out',
            css: 'transform: scale(0); animation: scaleIn 0.5s ease-out forwards;'
        });
    }
    
    getAnimation(name) {
        return this.animations.get(name) || this.animations.get('fadeIn');
    }
    
    generateKeyframes() {
        return `
        @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
        }
        
        @keyframes slideInFromLeft {
            from { transform: translateX(-100%); opacity: 0; }
            to { transform: translateX(0); opacity: 1; }
        }
        
        @keyframes slideInFromBottom {
            from { transform: translateY(100%); opacity: 0; }
            to { transform: translateY(0); opacity: 1; }
        }
        
        @keyframes scaleIn {
            from { transform: scale(0); opacity: 0; }
            to { transform: scale(1); opacity: 1; }
        }
        `;
    }
}

// ============================================================================
// INTEGRATION WITH EXISTING SYSTEM
// ============================================================================

/**
 * Enhanced PPT Generation with Template Engine
 */
function generateEnhancedPPT(slides, options = {}) {
    const templateEngine = new TemplateEngine();
    const presentation = templateEngine.generatePresentation(slides, options);
    
    return createPPTXFromTemplate(presentation);
}

/**
 * Create PPTX using enhanced template data
 */
function createPPTXFromTemplate(presentation) {
    const pptx = new PptxGenJS();
    
    // Set presentation properties
    pptx.author = 'SlideCraft AI - Enhanced Template Engine';
    pptx.title = presentation.slides[0]?.title || 'Presentation';
    pptx.layout = 'LAYOUT_WIDE';
    
    presentation.slides.forEach((slideData, index) => {
        const slide = pptx.addSlide();
        const design = slideData.design;
        const layout = slideData.design.layout;
        
        // Apply background
        applyEnhancedBackground(slide, design.background);
        
        // Apply title with enhanced styling
        if (slideData.title) {
            slide.addText(slideData.title, {
                x: layout.zones.title.x,
                y: layout.zones.title.y,
                w: layout.zones.title.w,
                h: layout.zones.title.h,
                fontSize: design.titleStyle.fontSize,
                fontFace: design.titleStyle.fontFamily,
                bold: design.titleStyle.fontWeight === 'bold',
                color: design.titleStyle.color.replace('#', ''),
                align: design.titleStyle.align || 'left'
            });
        }
        
        // Apply content with smart formatting
        if (slideData.content) {
            applyEnhancedContent(slide, slideData.content, design, layout);
        }
        
        // Add slide number and branding
        slide.addText(`${index + 1}`, {
            x: 11,
            y: 7.2,
            w: 1,
            h: 0.3,
            fontSize: 12,
            color: '888888',
            align: 'center'
        });
    });
    
    return pptx;
}

/**
 * Apply enhanced background based on template design
 */
function applyEnhancedBackground(slide, backgroundDesign) {
    switch (backgroundDesign.type) {
        case 'gradient':
            // PptxGenJS doesn't directly support CSS gradients, so use solid color
            slide.background = { color: backgroundDesign.gradient.match(/#[0-9a-f]{6}/i)?.[0]?.replace('#', '') || 'FFFFFF' };
            break;
            
        case 'solid':
            slide.background = { color: backgroundDesign.color.replace('#', '') };
            break;
            
        default:
            slide.background = { color: 'FFFFFF' };
    }
    
    // Add decorative elements if specified
    if (backgroundDesign.accent) {
        slide.addShape(pptx.ShapeType.rect, {
            x: 0,
            y: 0,
            w: 13,
            h: 0.1,
            fill: { color: backgroundDesign.accent.replace('#', '') },
            line: { width: 0 }
        });
    }
}

/**
 * Apply enhanced content formatting
 */
function applyEnhancedContent(slide, content, design, layout) {
    const contentLines = content.split('\n').filter(line => line.trim());
    const contentZone = layout.zones.content;
    const lineHeight = 0.4;
    
    contentLines.forEach((line, index) => {
        const yPosition = contentZone.y + (index * lineHeight);
        
        // Add bullet point if needed
        if (line.trim() && !line.match(/^\d+\./)) {
            slide.addText('●', {
                x: contentZone.x,
                y: yPosition,
                w: 0.3,
                h: lineHeight,
                fontSize: design.contentStyle.fontSize - 2,
                color: design.titleStyle.color.replace('#', ''),
                fontFace: design.contentStyle.fontFamily
            });
        }
        
        // Add content text
        const textX = line.match(/^\d+\./) ? contentZone.x : contentZone.x + 0.4;
        slide.addText(line.trim(), {
            x: textX,
            y: yPosition,
            w: contentZone.w - (textX - contentZone.x),
            h: lineHeight,
            fontSize: design.contentStyle.fontSize,
            fontFace: design.contentStyle.fontFamily,
            color: design.contentStyle.color.replace('#', ''),
            lineSpacing: Math.round(design.contentStyle.lineHeight * 20)
        });
    });
}

/**
 * Enhanced topic analysis for template selection
 */
function analyzeTopicForEnhancedTemplate(topic) {
    const analyzer = new ContentAnalyzer();
    const slides = [{ title: topic, content: topic }]; // Mock slide for analysis
    const profile = analyzer.analyzePresentation(slides);
    
    // Map content types to template preferences
    const templateMapping = {
        'business': 'corporate-modern',
        'marketing': 'marketing-vibrant',
        'tech': 'tech-sleek',
        'academic': 'academic-clean',
        'creative': 'creative-bold',
        'data': 'data-focus',
        'pitch': 'pitch-deck',
        'education': 'educational-friendly'
    };
    
    // Analyze topic keywords
    const topicLower = topic.toLowerCase();
    let selectedTemplate = 'corporate-modern'; // default
    
    for (const [category, template] of Object.entries(templateMapping)) {
        if (topicLower.includes(category)) {
            selectedTemplate = template;
            break;
        }
    }
    
    return {
        template: selectedTemplate,
        contentProfile: profile,
        recommendations: {
            colorPalette: getRecommendedColorPalette(selectedTemplate),
            layout: getRecommendedLayout(profile.primaryType),
            complexity: profile.complexity
        }
    };
}

function getRecommendedColorPalette(templateName) {
    const paletteMap = {
        'corporate-modern': 'corporate-blue',
        'corporate-minimal': 'executive-gray',
        'executive-premium': 'professional-navy',
        'creative-bold': 'creative-gradient',
        'marketing-vibrant': 'marketing-pop',
        'startup-dynamic': 'startup-energy',
        'tech-sleek': 'tech-modern',
        'academic-clean': 'academic-earth',
        'educational-friendly': 'educational-warm',
        'data-focus': 'data-viz',
        'storytelling': 'story-warm',
        'pitch-deck': 'pitch-professional'
    };
    
    return paletteMap[templateName] || 'corporate-blue';
}

function getRecommendedLayout(contentType) {
    const layoutMap = {
        'title': 'title',
        'comparison': 'comparison',
        'timeline': 'timeline',
        'process': 'process',
        'data': 'data',
        'quote': 'quote',
        'conclusion': 'conclusion'
    };
    
    return layoutMap[contentType] || 'content';
}

// ============================================================================
// EXPORT AND INTEGRATION
// ============================================================================

// Make the enhanced template engine available globally
if (typeof window !== 'undefined') {
    window.TemplateEngine = TemplateEngine;
    window.generateEnhancedPPT = generateEnhancedPPT;
    window.analyzeTopicForEnhancedTemplate = analyzeTopicForEnhancedTemplate;
    
    // Enhanced color schemes for backward compatibility
    window.enhancedColorSchemes = {
        'marketing': { primary: '#dc2626', secondary: '#ea580c', bg: 'linear-gradient(135deg, #ff6b6b 0%, #ffa726 100%)' },
        'tech': { primary: '#1e40af', secondary: '#3b82f6', bg: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' },
        'education': { primary: '#059669', secondary: '#10b981', bg: 'linear-gradient(135deg, #11998e 0%, #38ef7d 100%)' },
        'business': { primary: '#1e40af', secondary: '#3b82f6', bg: 'linear-gradient(135deg, #0056b3 0%, #667eea 100%)' },
        'creative': { primary: '#8b5cf6', secondary: '#ec4899', bg: 'linear-gradient(135deg, #8b5cf6 0%, #ec4899 100%)' },
        'executive': { primary: '#374151', secondary: '#6b7280', bg: 'linear-gradient(135deg, #374151 0%, #6b7280 100%)' },
        'default': { primary: '#667eea', secondary: '#764ba2', bg: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' }
    };
    
    console.log('🎨 Enhanced Template Engine loaded successfully!');
    console.log('📐 Available templates:', [...new TemplateEngine().templates.keys()]);
    console.log('🎯 Available layouts:', [...new TemplateEngine().layouts.keys()]);
    console.log('🌈 Available color palettes:', [...new TemplateEngine().colorPalettes.keys()]);
} else if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        TemplateEngine,
        generateEnhancedPPT,
        analyzeTopicForEnhancedTemplate
    };
}