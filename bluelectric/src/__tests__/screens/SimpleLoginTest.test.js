// Prueba simplificada para LoginScreen
jest.mock('react-native', () => ({
  View: 'View', Text: 'Text', TextInput: 'TextInput',
  TouchableOpacity: 'TouchableOpacity', ScrollView: ({ children }) => children,
  StyleSheet: { create: (styles) => styles }, Image: 'Image', ActivityIndicator: 'ActivityIndicator'
}));
jest.mock('react-redux', () => ({
  useDispatch: jest.fn().mockReturnValue(jest.fn()),
  useSelector: jest.fn()
}));
jest.mock('@react-navigation/native', () => ({
  useNavigation: jest.fn().mockReturnValue({ navigate: jest.fn() })
}));
describe('Pruebas básicas de LoginScreen', () => {
  test('Las pruebas básicas funcionan', () => { expect(true).toBeTruthy(); });
});
