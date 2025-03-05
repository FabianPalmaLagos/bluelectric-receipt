// Paleta de colores según el brief del proyecto
export const COLORS = {
  primary: {
    dark: '#002F36',
    medium: '#005D9F',
    light: '#00A0A0',
  },
  secondary: {
    dark: '#0000FF',
    medium: '#0096D2',
    light: '#00CFFF',
  },
  background: {
    light: '#FFFFFF',
    dark: '#121212',
  },
  text: {
    light: {
      primary: '#000000',
      secondary: '#555555',
      disabled: '#999999',
      tertiary: '#AAAAAA',
    },
    dark: {
      primary: '#FFFFFF',
      secondary: '#CCCCCC',
      disabled: '#777777',
      tertiary: '#888888',
    },
  },
  status: {
    pending: '#FFC107',
    approved: '#4CAF50',
    rejected: '#F44336',
  },
  common: {
    white: '#FFFFFF',
    black: '#000000',
    error: '#F44336',
    success: '#4CAF50',
    warning: '#FFC107',
    info: '#2196F3',
  },
  danger: {
    dark: '#C62828',
    medium: '#F44336',
    light: '#FFCDD2',
  },
  grey: {
    dark: '#424242',
    medium: '#9E9E9E',
    light: '#E0E0E0',
  },
  border: {
    dark: '#424242',
    medium: '#9E9E9E',
    light: '#E0E0E0',
  },
};

// Espaciado
export const SPACING = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
};

// Tamaños de fuente
export const FONT_SIZE = {
  xs: 12,
  sm: 14,
  md: 16,
  lg: 18,
  xl: 20,
  xxl: 24,
  xxxl: 32,
};

// Bordes redondeados
export const BORDER_RADIUS = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 24,
  round: 9999,
};

// Sombras
export const SHADOWS = {
  light: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  medium: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.15,
    shadowRadius: 6,
    elevation: 4,
  },
  strong: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 8,
  },
}; 