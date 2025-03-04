// Importar extensiones de Jest para React Native
import '@testing-library/jest-native/extend-expect';

// Importar el mock de ScrollView
import ScrollViewMock from './mocks/ScrollViewMock';

// Configuración global para React
global.React = require('react');

// Mock para componentes básicos de React Native
jest.mock('react-native', () => {
  const rn = jest.requireActual('react-native');
  
  // Crear mocks para los componentes básicos
  const mockComponent = (name) => {
    return ({ children, ...props }) => {
      return {
        type: name,
        props: { ...props, children },
        $$typeof: Symbol.for('react.element'),
      };
    };
  };
  
  // Reemplazar componentes problemáticos con mocks simples
  return {
    ...rn,
    View: mockComponent('View'),
    Text: mockComponent('Text'),
    TextInput: mockComponent('TextInput'),
    TouchableOpacity: mockComponent('TouchableOpacity'),
    TouchableWithoutFeedback: mockComponent('TouchableWithoutFeedback'),
    ScrollView: mockComponent('ScrollView'),
    FlatList: mockComponent('FlatList'),
    Image: mockComponent('Image'),
    ActivityIndicator: mockComponent('ActivityIndicator'),
    Switch: mockComponent('Switch'),
    Button: mockComponent('Button'),
    Modal: mockComponent('Modal'),
    Alert: {
      alert: jest.fn(),
    },
    Platform: {
      OS: 'ios',
      select: jest.fn(obj => obj.ios),
    },
    Dimensions: {
      get: jest.fn(() => ({ width: 375, height: 812 })),
    },
    StyleSheet: {
      ...rn.StyleSheet,
      create: obj => obj,
    },
  };
});

// Mock para react-navigation
jest.mock('@react-navigation/native', () => {
  return {
    useNavigation: () => ({
      navigate: jest.fn(),
      goBack: jest.fn(),
      setOptions: jest.fn(),
    }),
    useRoute: () => ({
      params: {},
    }),
    useIsFocused: () => true,
  };
});

// Mock para react-redux
jest.mock('react-redux', () => {
  return {
    useDispatch: () => jest.fn(),
    useSelector: jest.fn(selector => {
      // Estado mock por defecto
      const state = {
        auth: {
          user: null,
          loading: false,
          error: null,
        },
        receipts: {
          receipts: [],
          loading: false,
          error: null,
        },
      };
      return selector(state);
    }),
  };
});

// Mock para imágenes estáticas
jest.mock('../assets/images/logo.png', () => 'logo-mock');

// Suprimir advertencias de consola durante las pruebas
const originalConsoleError = console.error;
const originalConsoleWarn = console.warn;

console.error = (...args) => {
  if (
    /Warning:/.test(args[0]) ||
    /React does not recognize the/.test(args[0]) ||
    /The above error occurred in the/.test(args[0])
  ) {
    return;
  }
  originalConsoleError(...args);
};

console.warn = (...args) => {
  if (
    /Warning:/.test(args[0]) ||
    /componentWillReceiveProps has been renamed/.test(args[0]) ||
    /componentWillMount has been renamed/.test(args[0])
  ) {
    return;
  }
  originalConsoleWarn(...args);
};

// Configuración adicional para Jest
jest.setTimeout(10000);

// Añadir una prueba básica para verificar que el archivo de configuración se carga correctamente
describe('Setup', () => {
  test('setup file is loaded', () => {
    expect(true).toBeTruthy();
  });
}); 