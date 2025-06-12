const theme = {
  colors: {
    // Cores principais baseadas na cereja azul e cabo amarelo
    primary: '#4A90E2', // Azul cereja
    primaryDark: '#357ABD', // Azul cereja mais escuro
    secondary: '#FFD700', // Amarelo cabo
    secondaryDark: '#FFC107', // Amarelo cabo mais escuro
    
    // Cores do tema escuro
    background: {
      main: '#121212', // Fundo principal
      card: '#1E1E1E', // Fundo dos cards
      elevated: '#2D2D2D', // Fundo elevado
    },
    text: {
      primary: '#FFFFFF',
      secondary: '#B3B3B3',
      disabled: '#757575',
    },
    border: '#333333',
    error: '#FF4444', // Vermelho mais vibrante para alerta
    success: '#4CAF50',
    warning: '#FFC107',
    info: '#2196F3',
  },
  fonts: {
    body: "'Inter', system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
    heading: "'Inter', system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
  },
  fontSizes: {
    xs: '0.75rem',
    sm: '0.875rem',
    md: '1rem',
    lg: '1.125rem',
    xl: '1.25rem',
    '2xl': '1.5rem',
    '3xl': '1.875rem',
    '4xl': '2.25rem',
    '5xl': '3rem',
  },
  spacing: {
    xs: '0.25rem',
    sm: '0.5rem',
    md: '1rem',
    lg: '1.5rem',
    xl: '2rem',
    '2xl': '3rem',
    '3xl': '4rem',
  },
  shadows: {
    sm: '0 2px 4px rgba(0, 0, 0, 0.3)',
    md: '0 4px 8px rgba(0, 0, 0, 0.4)',
    lg: '0 8px 16px rgba(0, 0, 0, 0.5)',
  },
  borderRadius: {
    sm: '0.125rem',
    md: '0.375rem',
    lg: '0.5rem',
    full: '9999px',
  },
  breakpoints: {
    small: '480px',
    mobile: '320px',
    tablet: '768px',
    desktop: '1024px',
    wide: '1280px',
  },
  mediaQueries: {
    small: `@media (max-width: 479px)`,
    mobile: `@media (max-width: 767px)`,
    tablet: `@media (min-width: 768px) and (max-width: 1023px)`,
    desktop: `@media (min-width: 1024px)`,
  },
};

export default theme; 