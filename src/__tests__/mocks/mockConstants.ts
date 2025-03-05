// Mock de constantes para pruebas

export const COLORS = {
  primary: {
    light: '#a8d8ff',
    medium: '#4a90e2',
    dark: '#2c5282',
  },
  secondary: {
    light: '#ffd8a8',
    medium: '#f6ad55',
    dark: '#c05621',
  },
  text: {
    light: {
      primary: '#1a202c',
      secondary: '#4a5568',
      tertiary: '#a0aec0',
    },
    dark: {
      primary: '#f7fafc',
      secondary: '#e2e8f0',
      tertiary: '#a0aec0',
    },
  },
  background: {
    light: '#f7fafc',
    dark: '#1a202c',
  },
  common: {
    white: '#ffffff',
    black: '#000000',
    transparent: 'transparent',
  },
  status: {
    success: '#48bb78',
    warning: '#ed8936',
    error: '#f56565',
    info: '#4299e1',
    pending: '#805ad5',
  },
  grey: {
    veryLight: '#f7fafc',
    light: '#e2e8f0',
    medium: '#a0aec0',
    dark: '#4a5568',
    veryDark: '#1a202c',
  },
  border: {
    light: '#e2e8f0',
    dark: '#4a5568',
  },
};

export const SPACING = {
  xs: 4,
  small: 8,
  sm: 8,
  medium: 16,
  md: 16,
  large: 24,
  lg: 24,
  xl: 32,
  xxl: 48,
};

export const FONT_SIZE = {
  xs: 12,
  small: 14,
  sm: 14,
  medium: 16,
  md: 16,
  large: 18,
  lg: 18,
  xl: 20,
  xxl: 24,
  xxxl: 32,
};

export const BORDER_RADIUS = {
  small: 4,
  sm: 4,
  medium: 8,
  md: 8,
  large: 12,
  lg: 12,
  xl: 16,
  round: 999,
};

export const SHADOWS = {
  none: {
    shadowColor: 'transparent',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0,
    shadowRadius: 0,
    elevation: 0,
  },
  light: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.18,
    shadowRadius: 1.0,
    elevation: 1,
  },
  medium: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 4,
  },
  heavy: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    elevation: 8,
  },
};

// Añadimos un test dummy para que Jest no se queje
describe('Constants Mock', () => {
  it('should export constants correctly', () => {
    expect(COLORS).toBeDefined();
    expect(SPACING).toBeDefined();
    expect(FONT_SIZE).toBeDefined();
    expect(BORDER_RADIUS).toBeDefined();
    expect(SHADOWS).toBeDefined();
  });
}); 