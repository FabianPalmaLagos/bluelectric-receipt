// Configuración global para pruebas

// Mock para @react-native-community/datetimepicker
jest.mock('@react-native-community/datetimepicker', () => {
  const React = require('react');
  return {
    __esModule: true,
    default: jest.fn().mockImplementation(({ value, onChange }) => {
      return React.createElement('DateTimePicker', {
        testID: 'dateTimePicker',
        value: value || new Date(),
        onChange: onChange || (() => {}),
      });
    }),
  };
});

// Mock para @react-native-async-storage/async-storage
jest.mock('@react-native-async-storage/async-storage', () => ({
  setItem: jest.fn(() => Promise.resolve()),
  getItem: jest.fn(() => Promise.resolve(null)),
  removeItem: jest.fn(() => Promise.resolve()),
  clear: jest.fn(() => Promise.resolve()),
  getAllKeys: jest.fn(() => Promise.resolve([])),
  multiGet: jest.fn(() => Promise.resolve([])),
  multiSet: jest.fn(() => Promise.resolve()),
  multiRemove: jest.fn(() => Promise.resolve()),
}));

// Mock para @expo/vector-icons
jest.mock('@expo/vector-icons', () => {
  const React = require('react');
  return {
    Ionicons: jest.fn().mockImplementation(props => {
      return React.createElement('Ionicons', props, props.children);
    }),
  };
});

// Suprimir advertencias de consola durante las pruebas
const originalConsoleError = console.error;
const originalConsoleWarn = console.warn;

console.error = (...args) => {
  // Permitir errores específicos para depuración
  if (args[0] && typeof args[0] === 'string' && args[0].includes('Error en el procesamiento de la imagen:')) {
    originalConsoleError(...args);
    return;
  }
  
  // Suprimir otros errores
  return;
};

console.warn = (...args) => {
  // Suprimir advertencias
  return;
};

// Test dummy para evitar el error "Your test suite must contain at least one test"
describe('Setup', () => {
  test('setup file is loaded', () => {
    expect(true).toBe(true);
  });
});
