/**
 * Mock completo para React Native
 * Este archivo proporciona mocks para los componentes y APIs de React Native
 * que se utilizan en las pruebas.
 */

const React = require('react');

// Función para crear componentes mock
const createMockComponent = (name) => {
  const component = (props) => ({
    $$typeof: Symbol.for('react.element'),
    type: name,
    props: { ...props, testID: props.testID || `mock-${name}` },
    _owner: null,
    _store: {}
  });
  component.displayName = name;
  return component;
};

// Lista de componentes básicos de React Native
const components = [
  'ActivityIndicator', 'Button', 'FlatList', 'Image', 'KeyboardAvoidingView',
  'Modal', 'Pressable', 'SafeAreaView', 'ScrollView', 'SectionList',
  'Switch', 'Text', 'TextInput', 'TouchableHighlight', 'TouchableOpacity',
  'TouchableWithoutFeedback', 'View'
];

// Crear mocks para cada componente
const mockedComponents = components.reduce((acc, name) => {
  acc[name] = createMockComponent(name);
  return acc;
}, {});

// Mock para Alert
const Alert = {
  alert: jest.fn(),
  prompt: jest.fn()
};

// Mock para Platform
const Platform = {
  OS: 'ios',
  select: jest.fn(obj => obj.ios || obj.default),
  Version: 13,
  isPad: false,
  isTV: false
};

// Mock para Animated
const Animated = {
  View: createMockComponent('Animated.View'),
  Text: createMockComponent('Animated.Text'),
  Image: createMockComponent('Animated.Image'),
  ScrollView: createMockComponent('Animated.ScrollView'),
  createAnimatedComponent: jest.fn(component => component),
  timing: jest.fn(() => ({
    start: jest.fn(callback => callback && callback({ finished: true }))
  })),
  spring: jest.fn(() => ({
    start: jest.fn(callback => callback && callback({ finished: true }))
  })),
  parallel: jest.fn(() => ({
    start: jest.fn(callback => callback && callback({ finished: true }))
  })),
  sequence: jest.fn(() => ({
    start: jest.fn(callback => callback && callback({ finished: true }))
  })),
  Value: jest.fn(() => ({
    setValue: jest.fn(),
    interpolate: jest.fn(() => ({
      __getValue: jest.fn(() => 0)
    })),
    __getValue: jest.fn(() => 0)
  }))
};

// Mock para Dimensions
const Dimensions = {
  get: jest.fn(() => ({ width: 375, height: 667 })),
  set: jest.fn(),
  addEventListener: jest.fn(),
  removeEventListener: jest.fn()
};

// Mock para StyleSheet
const StyleSheet = {
  create: styles => styles,
  flatten: jest.fn(style => style),
  hairlineWidth: 1,
  absoluteFill: { position: 'absolute', left: 0, right: 0, top: 0, bottom: 0 }
};

// Exportar el mock completo
module.exports = {
  ...mockedComponents,
  Alert,
  Platform,
  Animated,
  Dimensions,
  StyleSheet,
  // Otros APIs comunes
  AppState: {
    currentState: 'active',
    addEventListener: jest.fn(),
    removeEventListener: jest.fn()
  },
  Linking: {
    openURL: jest.fn(() => Promise.resolve()),
    canOpenURL: jest.fn(() => Promise.resolve(true)),
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    getInitialURL: jest.fn(() => Promise.resolve(null))
  },
  PixelRatio: {
    get: jest.fn(() => 2),
    getFontScale: jest.fn(() => 1),
    getPixelSizeForLayoutSize: jest.fn(size => size * 2),
    roundToNearestPixel: jest.fn(size => size)
  }
}; 