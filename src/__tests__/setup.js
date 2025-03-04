// Configuración global para pruebas
const mockImagePicker = require('./mocks/mockImagePicker').default;

// Mock para módulos nativos
jest.mock('react-native/Libraries/Animated/NativeAnimatedHelper');

// Mock para expo-image-picker
jest.mock('expo-image-picker', () => mockImagePicker);

// Mock para iconos
jest.mock('@expo/vector-icons', () => {
  return {
    Ionicons: (props) => {
      return {
        type: 'Ionicons',
        props: { ...props, testID: `icon-${props.name}` }
      };
    },
  };
});

// Mock para DateTimePicker
jest.mock('@react-native-community/datetimepicker', () => {
  return {
    __esModule: true,
    default: (props) => {
      return {
        type: 'DateTimePicker',
        props
      };
    }
  };
});

// Mock para Modal
jest.mock('react-native', () => {
  const reactNative = jest.requireActual('react-native');
  
  return {
    ...reactNative,
    Modal: (props) => {
      const { visible, children, ...otherProps } = props;
      return visible ? { type: 'Modal', props: otherProps, children } : null;
    },
    View: (props) => {
      return {
        type: 'View',
        props
      };
    },
    Text: (props) => {
      return {
        type: 'Text',
        props
      };
    },
    TouchableOpacity: (props) => {
      return {
        type: 'TouchableOpacity',
        props
      };
    }
  };
});

// Suprimir advertencias y errores de consola durante las pruebas
global.console = {
  ...console,
  warn: jest.fn(),
  error: jest.fn(),
  log: jest.fn(),
}; 