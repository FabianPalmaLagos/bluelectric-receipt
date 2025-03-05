// Mock para React Native
const React = require('react');

// Crear un componente mock genérico
const createMockComponent = (name) => {
  return function MockComponent(props) {
    return React.createElement(name, {
      ...props,
      testID: props.testID || name,
    }, props.children);
  };
};

// Lista de componentes a mockear
const components = [
  'ActivityIndicator',
  'ScrollView',
  'FlatList',
  'SectionList',
  'TextInput',
  'TouchableOpacity',
  'TouchableHighlight',
  'TouchableWithoutFeedback',
  'TouchableNativeFeedback',
  'View',
  'Text',
  'Image',
  'Button',
  'Switch',
];

// Crear un objeto con todos los componentes mockeados
const mockedComponents = components.reduce((acc, name) => {
  acc[name] = createMockComponent(name);
  return acc;
}, {});

// Exportar los componentes mockeados
module.exports = {
  ...mockedComponents,
  // Agregar cualquier otra funcionalidad necesaria
  Platform: {
    OS: 'ios',
    select: jest.fn(obj => obj.ios),
  },
  StyleSheet: {
    create: jest.fn(styles => styles),
    flatten: jest.fn(styles => styles),
  },
  Alert: {
    alert: jest.fn(),
  },
  Dimensions: {
    get: jest.fn(() => ({ width: 375, height: 667 })),
  },
  // Añadir useColorScheme
  useColorScheme: jest.fn(() => 'light'),
}; 