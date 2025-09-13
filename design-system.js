/**
 * SlideCraft AI Design System
 * A comprehensive design system for consistent UI components and theming
 * Version: 1.0.0
 */

// ===================================================================
// 1. CORE DESIGN TOKENS
// ===================================================================

const DesignTokens = {
  // Color System
  colors: {
    // Primary Brand Colors
    primary: {
      50: '#f0f9ff',
      100: '#e0f2fe',
      200: '#bae6fd',
      300: '#7dd3fc',
      400: '#38bdf8',
      500: '#0ea5e9',  // Main primary
      600: '#0284c7',
      700: '#0369a1',
      800: '#075985',
      900: '#0c4a6e',
      950: '#082f49'
    },
    
    // Secondary Colors
    secondary: {
      50: '#fafafa',
      100: '#f4f4f5',
      200: '#e4e4e7',
      300: '#d4d4d8',
      400: '#a1a1aa',
      500: '#71717a',  // Main secondary
      600: '#52525b',
      700: '#3f3f46',
      800: '#27272a',
      900: '#18181b',
      950: '#09090b'
    },
    
    // Semantic Colors
    semantic: {
      success: {
        50: '#f0fdf4',
        500: '#10b981',
        600: '#059669',
        700: '#047857'
      },
      warning: {
        50: '#fffbeb',
        500: '#f59e0b',
        600: '#d97706',
        700: '#b45309'
      },
      error: {
        50: '#fef2f2',
        500: '#ef4444',
        600: '#dc2626',
        700: '#b91c1c'
      },
      info: {
        50: '#eff6ff',
        500: '#3b82f6',
        600: '#2563eb',
        700: '#1d4ed8'
      }
    },
    
    // Background Colors
    background: {
      primary: '#ffffff',
      secondary: '#f8fafc',
      tertiary: '#f1f5f9',
      overlay: 'rgba(0, 0, 0, 0.5)',
      glass: 'rgba(255, 255, 255, 0.1)'
    },
    
    // Text Colors
    text: {
      primary: '#0f172a',
      secondary: '#475569',
      tertiary: '#64748b',
      inverse: '#ffffff',
      disabled: '#94a3b8'
    }
  },
  
  // Typography Scale
  typography: {
    fontFamily: {
      sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
      mono: ['JetBrains Mono', 'Consolas', 'monospace'],
      display: ['Cal Sans', 'Inter', 'sans-serif']
    },
    
    fontSize: {
      xs: ['0.75rem', { lineHeight: '1rem' }],
      sm: ['0.875rem', { lineHeight: '1.25rem' }],
      base: ['1rem', { lineHeight: '1.5rem' }],
      lg: ['1.125rem', { lineHeight: '1.75rem' }],
      xl: ['1.25rem', { lineHeight: '1.75rem' }],
      '2xl': ['1.5rem', { lineHeight: '2rem' }],
      '3xl': ['1.875rem', { lineHeight: '2.25rem' }],
      '4xl': ['2.25rem', { lineHeight: '2.5rem' }],
      '5xl': ['3rem', { lineHeight: '1' }],
      '6xl': ['3.75rem', { lineHeight: '1' }],
      '7xl': ['4.5rem', { lineHeight: '1' }],
      '8xl': ['6rem', { lineHeight: '1' }],
      '9xl': ['8rem', { lineHeight: '1' }]
    },
    
    fontWeight: {
      thin: 100,
      extralight: 200,
      light: 300,
      normal: 400,
      medium: 500,
      semibold: 600,
      bold: 700,
      extrabold: 800,
      black: 900
    }
  },
  
  // Spacing System (8px base unit)
  spacing: {
    0: '0px',
    0.5: '2px',
    1: '4px',
    1.5: '6px',
    2: '8px',
    2.5: '10px',
    3: '12px',
    3.5: '14px',
    4: '16px',
    5: '20px',
    6: '24px',
    7: '28px',
    8: '32px',
    9: '36px',
    10: '40px',
    11: '44px',
    12: '48px',
    14: '56px',
    16: '64px',
    20: '80px',
    24: '96px',
    28: '112px',
    32: '128px',
    36: '144px',
    40: '160px',
    44: '176px',
    48: '192px',
    52: '208px',
    56: '224px',
    60: '240px',
    64: '256px',
    72: '288px',
    80: '320px',
    96: '384px'
  },
  
  // Border Radius
  borderRadius: {
    none: '0px',
    sm: '2px',
    base: '4px',
    md: '6px',
    lg: '8px',
    xl: '12px',
    '2xl': '16px',
    '3xl': '24px',
    full: '9999px'
  },
  
  // Shadows
  boxShadow: {
    sm: '0 1px 2px 0 rgb(0 0 0 / 0.05)',
    base: '0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)',
    md: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
    lg: '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)',
    xl: '0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)',
    '2xl': '0 25px 50px -12px rgb(0 0 0 / 0.25)',
    inner: 'inset 0 2px 4px 0 rgb(0 0 0 / 0.05)',
    none: 'none'
  },
  
  // Transitions
  transition: {
    fast: '150ms cubic-bezier(0.4, 0, 0.2, 1)',
    base: '250ms cubic-bezier(0.4, 0, 0.2, 1)',
    slow: '350ms cubic-bezier(0.4, 0, 0.2, 1)',
    bounce: '250ms cubic-bezier(0.68, -0.55, 0.265, 1.55)'
  },
  
  // Breakpoints
  breakpoints: {
    sm: '640px',
    md: '768px',
    lg: '1024px',
    xl: '1280px',
    '2xl': '1536px'
  },
  
  // Z-Index Scale
  zIndex: {
    hide: -1,
    auto: 'auto',
    base: 0,
    docked: 10,
    dropdown: 1000,
    sticky: 1100,
    banner: 1200,
    overlay: 1300,
    modal: 1400,
    popover: 1500,
    skipLink: 1600,
    toast: 1700,
    tooltip: 1800
  }
};

// ===================================================================
// 2. THEME MANAGEMENT SYSTEM
// ===================================================================

class ThemeManager {
  constructor() {
    this.currentTheme = 'light';
    this.themes = {
      light: {
        ...DesignTokens.colors,
        background: {
          primary: '#ffffff',
          secondary: '#f8fafc',
          tertiary: '#f1f5f9',
          overlay: 'rgba(0, 0, 0, 0.5)',
          glass: 'rgba(255, 255, 255, 0.1)'
        },
        text: {
          primary: '#0f172a',
          secondary: '#475569',
          tertiary: '#64748b',
          inverse: '#ffffff',
          disabled: '#94a3b8'
        }
      },
      dark: {
        ...DesignTokens.colors,
        background: {
          primary: '#0f172a',
          secondary: '#1e293b',
          tertiary: '#334155',
          overlay: 'rgba(0, 0, 0, 0.75)',
          glass: 'rgba(0, 0, 0, 0.2)'
        },
        text: {
          primary: '#f8fafc',
          secondary: '#cbd5e1',
          tertiary: '#94a3b8',
          inverse: '#0f172a',
          disabled: '#64748b'
        }
      }
    };
    
    this.init();
  }
  
  init() {
    // Check for saved theme preference
    const savedTheme = localStorage.getItem('slidecraft-theme');
    if (savedTheme && this.themes[savedTheme]) {
      this.currentTheme = savedTheme;
    } else {
      // Check system preference
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      this.currentTheme = prefersDark ? 'dark' : 'light';
    }
    
    this.applyTheme(this.currentTheme);
    this.setupSystemThemeListener();
  }
  
  applyTheme(themeName) {
    const theme = this.themes[themeName];
    if (!theme) return;
    
    const root = document.documentElement;
    
    // Apply CSS custom properties
    Object.entries(theme).forEach(([category, values]) => {
      if (typeof values === 'object') {
        Object.entries(values).forEach(([key, value]) => {
          if (typeof value === 'object') {
            Object.entries(value).forEach(([shade, color]) => {
              root.style.setProperty(`--color-${category}-${key}-${shade}`, color);
            });
          } else {
            root.style.setProperty(`--color-${category}-${key}`, value);
          }
        });
      }
    });
    
    // Apply design tokens as CSS variables
    Object.entries(DesignTokens).forEach(([category, values]) => {
      if (category === 'colors') return; // Already handled above
      
      Object.entries(values).forEach(([key, value]) => {
        if (typeof value === 'object') {
          Object.entries(value).forEach(([subKey, subValue]) => {
            if (Array.isArray(subValue)) {
              root.style.setProperty(`--${category}-${key}-${subKey}`, subValue[0]);
              if (subValue[1]?.lineHeight) {
                root.style.setProperty(`--${category}-${key}-${subKey}-line-height`, subValue[1].lineHeight);
              }
            } else {
              root.style.setProperty(`--${category}-${key}-${subKey}`, subValue);
            }
          });
        } else {
          root.style.setProperty(`--${category}-${key}`, value);
        }
      });
    });
    
    // Update body class
    document.body.className = document.body.className.replace(/theme-\w+/, '') + ` theme-${themeName}`;
    this.currentTheme = themeName;
    localStorage.setItem('slidecraft-theme', themeName);
    
    // Dispatch theme change event
    window.dispatchEvent(new CustomEvent('themechange', { detail: { theme: themeName } }));
  }
  
  toggleTheme() {
    const newTheme = this.currentTheme === 'light' ? 'dark' : 'light';
    this.applyTheme(newTheme);
  }
  
  setupSystemThemeListener() {
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
      if (!localStorage.getItem('slidecraft-theme')) {
        this.applyTheme(e.matches ? 'dark' : 'light');
      }
    });
  }
}

// ===================================================================
// 3. COMPONENT LIBRARY
// ===================================================================

class ComponentLibrary {
  static createButton(options = {}) {
    const {
      variant = 'primary',
      size = 'md',
      disabled = false,
      loading = false,
      icon = null,
      iconPosition = 'left',
      className = '',
      ...props
    } = options;
    
    const button = document.createElement('button');
    
    // Base classes
    let classes = ['ds-button', `ds-button--${variant}`, `ds-button--${size}`];
    
    if (disabled || loading) classes.push('ds-button--disabled');
    if (loading) classes.push('ds-button--loading');
    if (icon) classes.push(`ds-button--icon-${iconPosition}`);
    if (className) classes.push(className);
    
    button.className = classes.join(' ');
    button.disabled = disabled || loading;
    
    // Apply additional properties
    Object.entries(props).forEach(([key, value]) => {
      if (key === 'onClick') {
        button.addEventListener('click', value);
      } else {
        button.setAttribute(key, value);
      }
    });
    
    return button;
  }
  
  static createInput(options = {}) {
    const {
      type = 'text',
      state = 'default',
      size = 'md',
      label = '',
      placeholder = '',
      helperText = '',
      icon = null,
      iconPosition = 'left',
      className = '',
      ...props
    } = options;
    
    const container = document.createElement('div');
    container.className = 'ds-input-container';
    
    // Label
    if (label) {
      const labelEl = document.createElement('label');
      labelEl.className = 'ds-input-label';
      labelEl.textContent = label;
      container.appendChild(labelEl);
    }
    
    // Input wrapper
    const wrapper = document.createElement('div');
    let wrapperClasses = ['ds-input-wrapper', `ds-input-wrapper--${state}`, `ds-input-wrapper--${size}`];
    if (icon) wrapperClasses.push(`ds-input-wrapper--icon-${iconPosition}`);
    wrapper.className = wrapperClasses.join(' ');
    
    // Icon
    if (icon) {
      const iconEl = document.createElement('span');
      iconEl.className = `ds-input-icon ds-input-icon--${iconPosition}`;
      iconEl.innerHTML = icon;
      wrapper.appendChild(iconEl);
    }
    
    // Input
    const input = document.createElement('input');
    let inputClasses = ['ds-input', `ds-input--${state}`, `ds-input--${size}`];
    if (className) inputClasses.push(className);
    
    input.className = inputClasses.join(' ');
    input.type = type;
    input.placeholder = placeholder;
    
    // Apply additional properties
    Object.entries(props).forEach(([key, value]) => {
      input.setAttribute(key, value);
    });
    
    wrapper.appendChild(input);
    container.appendChild(wrapper);
    
    // Helper text
    if (helperText) {
      const helperEl = document.createElement('span');
      helperEl.className = `ds-input-helper ds-input-helper--${state}`;
      helperEl.textContent = helperText;
      container.appendChild(helperEl);
    }
    
    return container;
  }
  
  static createCard(options = {}) {
    const {
      variant = 'default',
      padding = 'md',
      shadow = 'md',
      hover = false,
      className = '',
      children = [],
      ...props
    } = options;
    
    const card = document.createElement('div');
    let classes = ['ds-card', `ds-card--${variant}`, `ds-card--padding-${padding}`, `ds-card--shadow-${shadow}`];
    
    if (hover) classes.push('ds-card--hover');
    if (className) classes.push(className);
    
    card.className = classes.join(' ');
    
    // Apply additional properties
    Object.entries(props).forEach(([key, value]) => {
      card.setAttribute(key, value);
    });
    
    // Add children
    children.forEach(child => {
      if (typeof child === 'string') {
        card.innerHTML += child;
      } else {
        card.appendChild(child);
      }
    });
    
    return card;
  }
  
  static createModal(options = {}) {
    const {
      title = '',
      size = 'md',
      closable = true,
      backdrop = true,
      className = '',
      onClose = () => {},
      children = []
    } = options;
    
    // Modal overlay
    const overlay = document.createElement('div');
    overlay.className = 'ds-modal-overlay';
    
    // Modal container
    const modal = document.createElement('div');
    let classes = ['ds-modal', `ds-modal--${size}`];
    if (className) classes.push(className);
    modal.className = classes.join(' ');
    
    // Modal header
    if (title || closable) {
      const header = document.createElement('div');
      header.className = 'ds-modal-header';
      
      if (title) {
        const titleEl = document.createElement('h3');
        titleEl.className = 'ds-modal-title';
        titleEl.textContent = title;
        header.appendChild(titleEl);
      }
      
      if (closable) {
        const closeBtn = document.createElement('button');
        closeBtn.className = 'ds-modal-close';
        closeBtn.innerHTML = '×';
        closeBtn.addEventListener('click', () => {
          overlay.remove();
          onClose();
        });
        header.appendChild(closeBtn);
      }
      
      modal.appendChild(header);
    }
    
    // Modal body
    const body = document.createElement('div');
    body.className = 'ds-modal-body';
    
    children.forEach(child => {
      if (typeof child === 'string') {
        body.innerHTML += child;
      } else {
        body.appendChild(child);
      }
    });
    
    modal.appendChild(body);
    overlay.appendChild(modal);
    
    // Backdrop click to close
    if (backdrop && closable) {
      overlay.addEventListener('click', (e) => {
        if (e.target === overlay) {
          overlay.remove();
          onClose();
        }
      });
    }
    
    return overlay;
  }
  
  static createToast(options = {}) {
    const {
      type = 'info',
      title = '',
      message = '',
      duration = 5000,
      closable = true,
      position = 'top-right'
    } = options;
    
    // Create toast container if it doesn't exist
    let container = document.querySelector('.ds-toast-container');
    if (!container) {
      container = document.createElement('div');
      container.className = `ds-toast-container ds-toast-container--${position}`;
      document.body.appendChild(container);
    }
    
    // Create toast
    const toast = document.createElement('div');
    toast.className = `ds-toast ds-toast--${type}`;
    
    // Toast content
    const content = document.createElement('div');
    content.className = 'ds-toast-content';
    
    if (title) {
      const titleEl = document.createElement('div');
      titleEl.className = 'ds-toast-title';
      titleEl.textContent = title;
      content.appendChild(titleEl);
    }
    
    if (message) {
      const messageEl = document.createElement('div');
      messageEl.className = 'ds-toast-message';
      messageEl.textContent = message;
      content.appendChild(messageEl);
    }
    
    toast.appendChild(content);
    
    // Close button
    if (closable) {
      const closeBtn = document.createElement('button');
      closeBtn.className = 'ds-toast-close';
      closeBtn.innerHTML = '×';
      closeBtn.addEventListener('click', () => {
        toast.remove();
      });
      toast.appendChild(closeBtn);
    }
    
    // Add to container
    container.appendChild(toast);
    
    // Auto remove
    if (duration > 0) {
      setTimeout(() => {
        if (toast.parentNode) {
          toast.remove();
        }
      }, duration);
    }
    
    return toast;
  }
  
  static createLoader(options = {}) {
    const {
      type = 'spinner',
      size = 'md',
      color = 'primary',
      text = '',
      className = ''
    } = options;
    
    const loader = document.createElement('div');
    let classes = ['ds-loader', `ds-loader--${type}`, `ds-loader--${size}`, `ds-loader--${color}`];
    if (className) classes.push(className);
    loader.className = classes.join(' ');
    
    // Add spinner elements based on type
    if (type === 'spinner') {
      loader.innerHTML = '<div class="ds-spinner"></div>';
    } else if (type === 'dots') {
      loader.innerHTML = '<div class="ds-dots"><span></span><span></span><span></span></div>';
    } else if (type === 'pulse') {
      loader.innerHTML = '<div class="ds-pulse"></div>';
    }
    
    // Add text if provided
    if (text) {
      const textEl = document.createElement('div');
      textEl.className = 'ds-loader-text';
      textEl.textContent = text;
      loader.appendChild(textEl);
    }
    
    return loader;
  }
}

// ===================================================================
// 4. LAYOUT SYSTEM
// ===================================================================

class LayoutSystem {
  static createGrid(options = {}) {
    const {
      columns = 12,
      gap = '6',
      responsive = true,
      className = '',
      children = []
    } = options;
    
    const grid = document.createElement('div');
    let classes = ['ds-grid'];
    
    if (responsive) {
      classes.push('ds-grid--responsive');
    }
    
    if (className) classes.push(className);
    grid.className = classes.join(' ');
    
    // Set CSS custom properties
    grid.style.setProperty('--grid-columns', columns);
    grid.style.setProperty('--grid-gap', `var(--spacing-${gap})`);
    
    // Add children
    children.forEach(child => {
      if (typeof child === 'string') {
        grid.innerHTML += child;
      } else {
        grid.appendChild(child);
      }
    });
    
    return grid;
  }
  
  static createContainer(options = {}) {
    const {
      maxWidth = 'xl',
      padding = '6',
      centered = true,
      className = '',
      children = []
    } = options;
    
    const container = document.createElement('div');
    let classes = ['ds-container', `ds-container--${maxWidth}`];
    
    if (centered) classes.push('ds-container--centered');
    if (className) classes.push(className);
    
    container.className = classes.join(' ');
    container.style.setProperty('--container-padding', `var(--spacing-${padding})`);
    
    // Add children
    children.forEach(child => {
      if (typeof child === 'string') {
        container.innerHTML += child;
      } else {
        container.appendChild(child);
      }
    });
    
    return container;
  }
  
  static createFlex(options = {}) {
    const {
      direction = 'row',
      justify = 'start',
      align = 'start',
      gap = '4',
      wrap = false,
      className = '',
      children = []
    } = options;
    
    const flex = document.createElement('div');
    let classes = [
      'ds-flex',
      `ds-flex--${direction}`,
      `ds-flex--justify-${justify}`,
      `ds-flex--align-${align}`
    ];
    
    if (wrap) classes.push('ds-flex--wrap');
    if (className) classes.push(className);
    
    flex.className = classes.join(' ');
    flex.style.setProperty('--flex-gap', `var(--spacing-${gap})`);
    
    // Add children
    children.forEach(child => {
      if (typeof child === 'string') {
        flex.innerHTML += child;
      } else {
        flex.appendChild(child);
      }
    });
    
    return flex;
  }
}

// ===================================================================
// 5. ANIMATION LIBRARY
// ===================================================================

class AnimationLibrary {
  static fadeIn(element, duration = 250) {
    element.style.opacity = '0';
    element.style.transition = `opacity ${duration}ms var(--transition-base)`;
    
    requestAnimationFrame(() => {
      element.style.opacity = '1';
    });
    
    return new Promise(resolve => {
      setTimeout(resolve, duration);
    });
  }
  
  static fadeOut(element, duration = 250) {
    element.style.transition = `opacity ${duration}ms var(--transition-base)`;
    element.style.opacity = '0';
    
    return new Promise(resolve => {
      setTimeout(() => {
        element.style.display = 'none';
        resolve();
      }, duration);
    });
  }
  
  static slideDown(element, duration = 250) {
    const height = element.scrollHeight;
    element.style.height = '0';
    element.style.overflow = 'hidden';
    element.style.transition = `height ${duration}ms var(--transition-base)`;
    
    requestAnimationFrame(() => {
      element.style.height = `${height}px`;
    });
    
    return new Promise(resolve => {
      setTimeout(() => {
        element.style.height = '';
        element.style.overflow = '';
        resolve();
      }, duration);
    });
  }
  
  static slideUp(element, duration = 250) {
    const height = element.scrollHeight;
    element.style.height = `${height}px`;
    element.style.overflow = 'hidden';
    element.style.transition = `height ${duration}ms var(--transition-base)`;
    
    requestAnimationFrame(() => {
      element.style.height = '0';
    });
    
    return new Promise(resolve => {
      setTimeout(() => {
        element.style.display = 'none';
        resolve();
      }, duration);
    });
  }
  
  static bounce(element, duration = 600) {
    element.style.animation = `ds-bounce ${duration}ms var(--transition-bounce)`;
    
    return new Promise(resolve => {
      setTimeout(() => {
        element.style.animation = '';
        resolve();
      }, duration);
    });
  }
  
  static shake(element, duration = 600) {
    element.style.animation = `ds-shake ${duration}ms var(--transition-base)`;
    
    return new Promise(resolve => {
      setTimeout(() => {
        element.style.animation = '';
        resolve();
      }, duration);
    });
  }
  
  static pulse(element, duration = 1000) {
    element.style.animation = `ds-pulse ${duration}ms infinite`;
    return element;
  }
  
  static stopPulse(element) {
    element.style.animation = '';
  }
  
  static createPageTransition(fromElement, toElement, type = 'fade', duration = 300) {
    switch (type) {
      case 'slide':
        return this.slideTransition(fromElement, toElement, duration);
      case 'scale':
        return this.scaleTransition(fromElement, toElement, duration);
      default:
        return this.fadeTransition(fromElement, toElement, duration);
    }
  }
  
  static fadeTransition(fromElement, toElement, duration = 300) {
    return Promise.all([
      this.fadeOut(fromElement, duration / 2),
      new Promise(resolve => {
        setTimeout(() => {
          toElement.style.display = 'block';
          this.fadeIn(toElement, duration / 2).then(resolve);
        }, duration / 2);
      })
    ]);
  }
  
  static slideTransition(fromElement, toElement, duration = 300) {
    fromElement.style.transform = 'translateX(0)';
    fromElement.style.transition = `transform ${duration}ms var(--transition-base)`;
    
    toElement.style.transform = 'translateX(100%)';
    toElement.style.display = 'block';
    toElement.style.transition = `transform ${duration}ms var(--transition-base)`;
    
    requestAnimationFrame(() => {
      fromElement.style.transform = 'translateX(-100%)';
      toElement.style.transform = 'translateX(0)';
    });
    
    return new Promise(resolve => {
      setTimeout(() => {
        fromElement.style.display = 'none';
        fromElement.style.transform = '';
        toElement.style.transform = '';
        resolve();
      }, duration);
    });
  }
  
  static scaleTransition(fromElement, toElement, duration = 300) {
    fromElement.style.transform = 'scale(1)';
    fromElement.style.transition = `transform ${duration / 2}ms var(--transition-base)`;
    
    requestAnimationFrame(() => {
      fromElement.style.transform = 'scale(0.8)';
      fromElement.style.opacity = '0';
    });
    
    return new Promise(resolve => {
      setTimeout(() => {
        fromElement.style.display = 'none';
        toElement.style.display = 'block';
        toElement.style.transform = 'scale(0.8)';
        toElement.style.opacity = '0';
        toElement.style.transition = `transform ${duration / 2}ms var(--transition-base), opacity ${duration / 2}ms var(--transition-base)`;
        
        requestAnimationFrame(() => {
          toElement.style.transform = 'scale(1)';
          toElement.style.opacity = '1';
        });
        
        setTimeout(() => {
          fromElement.style.transform = '';
          fromElement.style.opacity = '';
          toElement.style.transform = '';
          toElement.style.opacity = '';
          resolve();
        }, duration / 2);
      }, duration / 2);
    });
  }
}

// ===================================================================
// 6. CSS STYLES INJECTION
// ===================================================================

const DesignSystemCSS = `
/* SlideCraft AI Design System Styles */

/* Base Reset and Typography */
.ds-button,
.ds-input,
.ds-card,
.ds-modal,
.ds-toast {
  box-sizing: border-box;
}

/* Button Styles */
.ds-button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  border: none;
  border-radius: var(--borderRadius-md);
  font-family: inherit;
  font-weight: var(--typography-fontWeight-medium);
  text-decoration: none;
  cursor: pointer;
  transition: all var(--transition-base);
  position: relative;
  overflow: hidden;
}

.ds-button--primary {
  background-color: var(--color-primary-500);
  color: white;
}

.ds-button--primary:hover:not(:disabled) {
  background-color: var(--color-primary-600);
  transform: translateY(-1px);
  box-shadow: var(--boxShadow-lg);
}

.ds-button--secondary {
  background-color: var(--color-secondary-100);
  color: var(--color-text-primary);
  border: 1px solid var(--color-secondary-200);
}

.ds-button--secondary:hover:not(:disabled) {
  background-color: var(--color-secondary-200);
  transform: translateY(-1px);
}

.ds-button--ghost {
  background-color: transparent;
  color: var(--color-primary-600);
}

.ds-button--ghost:hover:not(:disabled) {
  background-color: var(--color-primary-50);
}

.ds-button--sm {
  padding: var(--spacing-2) var(--spacing-3);
  font-size: var(--typography-fontSize-sm);
}

.ds-button--md {
  padding: var(--spacing-3) var(--spacing-4);
  font-size: var(--typography-fontSize-base);
}

.ds-button--lg {
  padding: var(--spacing-4) var(--spacing-6);
  font-size: var(--typography-fontSize-lg);
}

.ds-button--disabled {
  opacity: 0.5;
  cursor: not-allowed;
  transform: none !important;
}

.ds-button--loading::after {
  content: '';
  position: absolute;
  width: 16px;
  height: 16px;
  border: 2px solid transparent;
  border-top: 2px solid currentColor;
  border-radius: 50%;
  animation: ds-spin 1s linear infinite;
}

/* Input Styles */
.ds-input-container {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-1);
}

.ds-input-label {
  font-size: var(--typography-fontSize-sm);
  font-weight: var(--typography-fontWeight-medium);
  color: var(--color-text-primary);
}

.ds-input-wrapper {
  position: relative;
  display: flex;
  align-items: center;
}

.ds-input {
  width: 100%;
  border: 1px solid var(--color-secondary-300);
  border-radius: var(--borderRadius-md);
  background-color: var(--color-background-primary);
  color: var(--color-text-primary);
  transition: all var(--transition-base);
}

.ds-input:focus {
  outline: none;
  border-color: var(--color-primary-500);
  box-shadow: 0 0 0 3px var(--color-primary-100);
}

.ds-input--sm {
  padding: var(--spacing-2);
  font-size: var(--typography-fontSize-sm);
}

.ds-input--md {
  padding: var(--spacing-3);
  font-size: var(--typography-fontSize-base);
}

.ds-input--lg {
  padding: var(--spacing-4);
  font-size: var(--typography-fontSize-lg);
}

.ds-input--error {
  border-color: var(--color-semantic-error-500);
}

.ds-input--error:focus {
  box-shadow: 0 0 0 3px var(--color-semantic-error-100);
}

.ds-input--success {
  border-color: var(--color-semantic-success-500);
}

.ds-input--success:focus {
  box-shadow: 0 0 0 3px var(--color-semantic-success-100);
}

.ds-input-icon {
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--color-text-tertiary);
  pointer-events: none;
}

.ds-input-icon--left {
  left: var(--spacing-3);
}

.ds-input-icon--right {
  right: var(--spacing-3);
}

.ds-input-wrapper--icon-left .ds-input {
  padding-left: var(--spacing-10);
}

.ds-input-wrapper--icon-right .ds-input {
  padding-right: var(--spacing-10);
}

.ds-input-helper {
  font-size: var(--typography-fontSize-sm);
  color: var(--color-text-tertiary);
}

.ds-input-helper--error {
  color: var(--color-semantic-error-600);
}

.ds-input-helper--success {
  color: var(--color-semantic-success-600);
}

/* Card Styles */
.ds-card {
  background-color: var(--color-background-primary);
  border-radius: var(--borderRadius-lg);
  transition: all var(--transition-base);
}

.ds-card--default {
  border: 1px solid var(--color-secondary-200);
}

.ds-card--elevated {
  border: none;
}

.ds-card--padding-sm {
  padding: var(--spacing-4);
}

.ds-card--padding-md {
  padding: var(--spacing-6);
}

.ds-card--padding-lg {
  padding: var(--spacing-8);
}

.ds-card--shadow-sm {
  box-shadow: var(--boxShadow-sm);
}

.ds-card--shadow-md {
  box-shadow: var(--boxShadow-md);
}

.ds-card--shadow-lg {
  box-shadow: var(--boxShadow-lg);
}

.ds-card--hover:hover {
  transform: translateY(-2px);
  box-shadow: var(--boxShadow-xl);
}

/* Modal Styles */
.ds-modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: var(--color-background-overlay);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: var(--zIndex-modal);
  backdrop-filter: blur(4px);
  animation: ds-fade-in 0.15s ease-out;
}

.ds-modal {
  background-color: var(--color-background-primary);
  border-radius: var(--borderRadius-xl);
  box-shadow: var(--boxShadow-2xl);
  max-height: 90vh;
  overflow: hidden;
  animation: ds-scale-in 0.15s ease-out;
}

.ds-modal--sm {
  width: 90%;
  max-width: 400px;
}

.ds-modal--md {
  width: 90%;
  max-width: 500px;
}

.ds-modal--lg {
  width: 90%;
  max-width: 800px;
}

.ds-modal--xl {
  width: 95%;
  max-width: 1200px;
}

.ds-modal-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: var(--spacing-6);
  border-bottom: 1px solid var(--color-secondary-200);
}

.ds-modal-title {
  font-size: var(--typography-fontSize-lg);
  font-weight: var(--typography-fontWeight-semibold);
  color: var(--color-text-primary);
  margin: 0;
}

.ds-modal-close {
  background: none;
  border: none;
  font-size: 24px;
  cursor: pointer;
  color: var(--color-text-tertiary);
  padding: var(--spacing-1);
  border-radius: var(--borderRadius-base);
  transition: all var(--transition-fast);
}

.ds-modal-close:hover {
  color: var(--color-text-primary);
  background-color: var(--color-secondary-100);
}

.ds-modal-body {
  padding: var(--spacing-6);
  overflow-y: auto;
  max-height: calc(90vh - 120px);
}

/* Toast Styles */
.ds-toast-container {
  position: fixed;
  z-index: var(--zIndex-toast);
  pointer-events: none;
  display: flex;
  flex-direction: column;
  gap: var(--spacing-2);
}

.ds-toast-container--top-right {
  top: var(--spacing-6);
  right: var(--spacing-6);
}

.ds-toast-container--top-left {
  top: var(--spacing-6);
  left: var(--spacing-6);
}

.ds-toast-container--bottom-right {
  bottom: var(--spacing-6);
  right: var(--spacing-6);
}

.ds-toast-container--bottom-left {
  bottom: var(--spacing-6);
  left: var(--spacing-6);
}

.ds-toast {
  pointer-events: auto;
  background-color: var(--color-background-primary);
  border-radius: var(--borderRadius-lg);
  box-shadow: var(--boxShadow-lg);
  padding: var(--spacing-4);
  display: flex;
  align-items: flex-start;
  gap: var(--spacing-3);
  min-width: 300px;
  max-width: 400px;
  animation: ds-slide-in-right 0.3s ease-out;
  border-left: 4px solid;
}

.ds-toast--info {
  border-left-color: var(--color-semantic-info-500);
}

.ds-toast--success {
  border-left-color: var(--color-semantic-success-500);
}

.ds-toast--warning {
  border-left-color: var(--color-semantic-warning-500);
}

.ds-toast--error {
  border-left-color: var(--color-semantic-error-500);
}

.ds-toast-content {
  flex: 1;
}

.ds-toast-title {
  font-weight: var(--typography-fontWeight-semibold);
  color: var(--color-text-primary);
  margin-bottom: var(--spacing-1);
}

.ds-toast-message {
  color: var(--color-text-secondary);
  font-size: var(--typography-fontSize-sm);
}

.ds-toast-close {
  background: none;
  border: none;
  cursor: pointer;
  color: var(--color-text-tertiary);
  font-size: 18px;
  padding: 0;
  transition: color var(--transition-fast);
}

.ds-toast-close:hover {
  color: var(--color-text-primary);
}

/* Loader Styles */
.ds-loader {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--spacing-2);
}

.ds-spinner {
  width: 20px;
  height: 20px;
  border: 2px solid var(--color-secondary-200);
  border-top: 2px solid var(--color-primary-500);
  border-radius: 50%;
  animation: ds-spin 1s linear infinite;
}

.ds-loader--sm .ds-spinner {
  width: 16px;
  height: 16px;
}

.ds-loader--lg .ds-spinner {
  width: 24px;
  height: 24px;
}

.ds-dots {
  display: flex;
  gap: var(--spacing-1);
}

.ds-dots span {
  width: 8px;
  height: 8px;
  background-color: var(--color-primary-500);
  border-radius: 50%;
  animation: ds-bounce-dot 1.4s ease-in-out infinite both;
}

.ds-dots span:nth-child(1) {
  animation-delay: -0.32s;
}

.ds-dots span:nth-child(2) {
  animation-delay: -0.16s;
}

.ds-pulse {
  width: 40px;
  height: 40px;
  background-color: var(--color-primary-500);
  border-radius: 50%;
  animation: ds-pulse-scale 1s ease-in-out infinite;
}

.ds-loader-text {
  color: var(--color-text-secondary);
  font-size: var(--typography-fontSize-sm);
}

/* Layout System */
.ds-grid {
  display: grid;
  grid-template-columns: repeat(var(--grid-columns, 12), minmax(0, 1fr));
  gap: var(--grid-gap, var(--spacing-6));
}

.ds-container {
  width: 100%;
  padding-left: var(--container-padding, var(--spacing-6));
  padding-right: var(--container-padding, var(--spacing-6));
}

.ds-container--centered {
  margin-left: auto;
  margin-right: auto;
}

.ds-container--sm {
  max-width: 640px;
}

.ds-container--md {
  max-width: 768px;
}

.ds-container--lg {
  max-width: 1024px;
}

.ds-container--xl {
  max-width: 1280px;
}

.ds-container--2xl {
  max-width: 1536px;
}

.ds-flex {
  display: flex;
  gap: var(--flex-gap, var(--spacing-4));
}

.ds-flex--row {
  flex-direction: row;
}

.ds-flex--column {
  flex-direction: column;
}

.ds-flex--wrap {
  flex-wrap: wrap;
}

.ds-flex--justify-start {
  justify-content: flex-start;
}

.ds-flex--justify-center {
  justify-content: center;
}

.ds-flex--justify-end {
  justify-content: flex-end;
}

.ds-flex--justify-between {
  justify-content: space-between;
}

.ds-flex--justify-around {
  justify-content: space-around;
}

.ds-flex--align-start {
  align-items: flex-start;
}

.ds-flex--align-center {
  align-items: center;
}

.ds-flex--align-end {
  align-items: flex-end;
}

.ds-flex--align-stretch {
  align-items: stretch;
}

/* Animations */
@keyframes ds-spin {
  to {
    transform: rotate(360deg);
  }
}

@keyframes ds-bounce {
  0%, 20%, 53%, 80%, 100% {
    transform: translate3d(0, 0, 0);
  }
  40%, 43% {
    transform: translate3d(0, -30px, 0);
  }
  70% {
    transform: translate3d(0, -15px, 0);
  }
  90% {
    transform: translate3d(0, -4px, 0);
  }
}

@keyframes ds-shake {
  10%, 90% {
    transform: translate3d(-1px, 0, 0);
  }
  20%, 80% {
    transform: translate3d(2px, 0, 0);
  }
  30%, 50%, 70% {
    transform: translate3d(-4px, 0, 0);
  }
  40%, 60% {
    transform: translate3d(4px, 0, 0);
  }
}

@keyframes ds-pulse {
  0% {
    opacity: 1;
  }
  50% {
    opacity: 0.5;
  }
  100% {
    opacity: 1;
  }
}

@keyframes ds-pulse-scale {
  0% {
    transform: scale(0);
  }
  100% {
    transform: scale(1);
    opacity: 0;
  }
}

@keyframes ds-bounce-dot {
  0%, 80%, 100% {
    transform: scale(0);
  }
  40% {
    transform: scale(1);
  }
}

@keyframes ds-fade-in {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

@keyframes ds-scale-in {
  from {
    opacity: 0;
    transform: scale(0.95);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}

@keyframes ds-slide-in-right {
  from {
    opacity: 0;
    transform: translateX(100%);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

/* Dark Theme Overrides */
.theme-dark {
  color-scheme: dark;
}

/* Responsive Design */
@media (max-width: 640px) {
  .ds-grid--responsive {
    grid-template-columns: 1fr;
  }
  
  .ds-modal {
    margin: var(--spacing-4);
  }
  
  .ds-toast {
    min-width: auto;
    max-width: calc(100vw - 2rem);
  }
}

/* Focus Styles for Accessibility */
.ds-button:focus-visible,
.ds-input:focus-visible {
  outline: 2px solid var(--color-primary-500);
  outline-offset: 2px;
}

/* Reduced Motion Support */
@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
}

/* High Contrast Support */
@media (prefers-contrast: high) {
  .ds-button {
    border: 2px solid currentColor;
  }
  
  .ds-input {
    border-width: 2px;
  }
  
  .ds-card--default {
    border-width: 2px;
  }
}
`;

// ===================================================================
// 7. MAIN DESIGN SYSTEM CLASS
// ===================================================================

class SlideCraftDesignSystem {
  constructor(options = {}) {
    this.options = {
      autoInit: true,
      injectCSS: true,
      theme: 'light',
      ...options
    };
    
    this.themeManager = null;
    this.components = ComponentLibrary;
    this.layout = LayoutSystem;
    this.animations = AnimationLibrary;
    this.tokens = DesignTokens;
    
    if (this.options.autoInit) {
      this.init();
    }
  }
  
  init() {
    // Inject CSS styles
    if (this.options.injectCSS) {
      this.injectCSS();
    }
    
    // Initialize theme manager
    this.themeManager = new ThemeManager();
    
    // Set initial theme if specified
    if (this.options.theme !== 'light') {
      this.themeManager.applyTheme(this.options.theme);
    }
    
    // Add design system to global scope
    window.SlideCraftDS = this;
    
    // Dispatch ready event
    window.dispatchEvent(new CustomEvent('slidecraftdsready', { detail: { designSystem: this } }));
    
    console.log('🎨 SlideCraft AI Design System initialized');
  }
  
  injectCSS() {
    const existingStyle = document.getElementById('slidecraft-design-system');
    if (existingStyle) {
      existingStyle.remove();
    }
    
    const style = document.createElement('style');
    style.id = 'slidecraft-design-system';
    style.textContent = DesignSystemCSS;
    document.head.appendChild(style);
  }
  
  // Utility methods for easy access
  createButton(options) {
    return this.components.createButton(options);
  }
  
  createInput(options) {
    return this.components.createInput(options);
  }
  
  createCard(options) {
    return this.components.createCard(options);
  }
  
  createModal(options) {
    return this.components.createModal(options);
  }
  
  showToast(options) {
    return this.components.createToast(options);
  }
  
  createLoader(options) {
    return this.components.createLoader(options);
  }
  
  createGrid(options) {
    return this.layout.createGrid(options);
  }
  
  createContainer(options) {
    return this.layout.createContainer(options);
  }
  
  createFlex(options) {
    return this.layout.createFlex(options);
  }
  
  toggleTheme() {
    if (this.themeManager) {
      this.themeManager.toggleTheme();
    }
  }
  
  setTheme(theme) {
    if (this.themeManager) {
      this.themeManager.applyTheme(theme);
    }
  }
  
  // Animation shortcuts
  fadeIn(element, duration) {
    return this.animations.fadeIn(element, duration);
  }
  
  fadeOut(element, duration) {
    return this.animations.fadeOut(element, duration);
  }
  
  slideDown(element, duration) {
    return this.animations.slideDown(element, duration);
  }
  
  slideUp(element, duration) {
    return this.animations.slideUp(element, duration);
  }
  
  bounce(element, duration) {
    return this.animations.bounce(element, duration);
  }
  
  shake(element, duration) {
    return this.animations.shake(element, duration);
  }
}

// ===================================================================
// 8. USAGE EXAMPLES AND DOCUMENTATION
// ===================================================================

/**
 * USAGE EXAMPLES:
 * 
 * // Initialize Design System
 * const ds = new SlideCraftDesignSystem({
 *   theme: 'light',
 *   autoInit: true
 * });
 * 
 * // Create Components
 * const primaryButton = ds.createButton({
 *   variant: 'primary',
 *   size: 'md',
 *   onClick: () => console.log('Clicked!')
 * });
 * primaryButton.textContent = 'Click Me';
 * document.body.appendChild(primaryButton);
 * 
 * const emailInput = ds.createInput({
 *   type: 'email',
 *   label: 'Email Address',
 *   placeholder: 'Enter your email',
 *   state: 'default'
 * });
 * document.body.appendChild(emailInput);
 * 
 * const card = ds.createCard({
 *   variant: 'elevated',
 *   padding: 'lg',
 *   shadow: 'md',
 *   hover: true,
 *   children: ['<h3>Card Title</h3><p>Card content goes here.</p>']
 * });
 * document.body.appendChild(card);
 * 
 * // Show Toast
 * ds.showToast({
 *   type: 'success',
 *   title: 'Success!',
 *   message: 'Operation completed successfully.',
 *   duration: 5000
 * });
 * 
 * // Create Modal
 * const modal = ds.createModal({
 *   title: 'Confirm Action',
 *   size: 'md',
 *   children: ['<p>Are you sure you want to continue?</p>'],
 *   onClose: () => console.log('Modal closed')
 * });
 * document.body.appendChild(modal);
 * 
 * // Layout Components
 * const container = ds.createContainer({
 *   maxWidth: 'xl',
 *   centered: true,
 *   children: [
 *     ds.createGrid({
 *       columns: 12,
 *       gap: '6',
 *       children: ['<div>Grid Item 1</div>', '<div>Grid Item 2</div>']
 *     })
 *   ]
 * });
 * document.body.appendChild(container);
 * 
 * // Animations
 * ds.fadeIn(element, 300);
 * ds.bounce(button, 600);
 * 
 * // Theme Management
 * ds.setTheme('dark');
 * ds.toggleTheme();
 * 
 * // Listen to theme changes
 * window.addEventListener('themechange', (e) => {
 *   console.log('Theme changed to:', e.detail.theme);
 * });
 */

// Auto-initialize if not in module environment
if (typeof module === 'undefined' && typeof window !== 'undefined') {
  window.SlideCraftDesignSystem = SlideCraftDesignSystem;
  
  // Auto-initialize on DOM ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
      new SlideCraftDesignSystem();
    });
  } else {
    new SlideCraftDesignSystem();
  }
}

// Export for module environments
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    SlideCraftDesignSystem,
    DesignTokens,
    ComponentLibrary,
    LayoutSystem,
    AnimationLibrary,
    ThemeManager
  };
}