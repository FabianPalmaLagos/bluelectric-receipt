const React = require('react');

// Mock de componentes básicos
const mockComponent = (name) => {
  return function({ children, ...props }) {
    return React.createElement(name, props, children);
  };
};

// Crear mocks para todos los componentes de React Native que usamos
const ReactNative = {
  Platform: {
    OS: 'ios',
    select: jest.fn(obj => obj.ios)
  },
  StyleSheet: {
    create: jest.fn(styles => styles),
    flatten: jest.fn(styles => styles),
  },
  View: mockComponent('View'),
  Text: mockComponent('Text'),
  TextInput: mockComponent('TextInput'),
  TouchableOpacity: mockComponent('TouchableOpacity'),
  Image: mockComponent('Image'),
  ActivityIndicator: mockComponent('ActivityIndicator'),
  ScrollView: mockComponent('ScrollView'),
  KeyboardAvoidingView: mockComponent('KeyboardAvoidingView'),
  Alert: {
    alert: jest.fn(),
  },
  Dimensions: {
    get: jest.fn().mockReturnValue({ width: 375, height: 812 }),
  },
  Animated: {
    View: mockComponent('Animated.View'),
    createAnimatedComponent: jest.fn(component => component),
    timing: jest.fn().mockReturnValue({
      start: jest.fn(callback => callback && callback()),
    }),
    Value: jest.fn(() => ({
      setValue: jest.fn(),
      interpolate: jest.fn(),
    })),
  },
};

module.exports = ReactNative; 