// Prueba paso a paso para LoginScreen - Paso 1

// Mock de react-native para evitar problemas con ESM
jest.mock('react-native', () => ({
  View: 'View',
  Text: 'Text',
  TextInput: 'TextInput',
  TouchableOpacity: 'TouchableOpacity',
  ScrollView: ({ children }) => children,
  StyleSheet: {
    create: (styles) => styles,
  },
  Image: 'Image',
  ActivityIndicator: 'ActivityIndicator',
}));

// Importamos React para poder usar React.createElement
const React = require('react');

describe('Pruebas paso a paso de LoginScreen - Paso 1', () => {
  test('Las pruebas básicas funcionan', () => {
    expect(true).toBeTruthy();
  });

  test('React está disponible', () => {
    expect(React).toBeDefined();
    expect(React.useState).toBeDefined();
  });
}); 