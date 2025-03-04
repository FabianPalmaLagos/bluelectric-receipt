// Configuración global para Jest
import '@testing-library/jest-native/extend-expect';
import 'react-native-gesture-handler/jestSetup';

// Mock para @react-navigation/native
jest.mock('@react-navigation/native', () => {
  return {
    useNavigation: jest.fn().mockReturnValue({
      navigate: jest.fn(),
      goBack: jest.fn(),
    }),
    useRoute: jest.fn().mockReturnValue({
      params: {},
    }),
    useIsFocused: jest.fn().mockReturnValue(true),
  };
});

// Mock para react-redux
jest.mock('react-redux', () => {
  const actualReactRedux = jest.requireActual('react-redux');
  return {
    ...actualReactRedux,
    useDispatch: jest.fn().mockReturnValue(jest.fn()),
    useSelector: jest.fn().mockImplementation(selector => {
      return selector({
        auth: {
          isLoading: false,
          error: null,
          user: null,
        },
      });
    }),
  };
});

// Mock para assets
jest.mock('../assets/images/logo.png', () => 'logo-mock');

// Configuración global
global.React = require('react');

// Suprimir advertencias de consola durante las pruebas
console.error = jest.fn();
console.warn = jest.fn();

// Verificación de que el archivo de configuración se carga correctamente
describe('Setup', () => {
  it('setup file is loaded', () => {
    expect(true).toBe(true);
  });
}); 