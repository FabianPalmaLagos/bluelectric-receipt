/**
 * Mocks para los componentes más comunes de React Native
 * Este archivo proporciona implementaciones simples de los componentes
 * que se utilizan frecuentemente en las pruebas.
 */

const React = require('react');

// Función para crear componentes mock
const createMockComponent = (name) => {
  const component = (props) => {
    const { children, style, testID, ...otherProps } = props;
    return React.createElement(
      'div',
      {
        style: { ...style },
        'data-testid': testID || `mock-${name.toLowerCase()}`,
        ...otherProps
      },
      children
    );
  };
  component.displayName = name;
  return component;
};

// Componentes básicos
const View = createMockComponent('View');
const Text = createMockComponent('Text');
const Image = createMockComponent('Image');
const TextInput = createMockComponent('TextInput');
const TouchableOpacity = createMockComponent('TouchableOpacity');
const TouchableHighlight = createMockComponent('TouchableHighlight');
const TouchableWithoutFeedback = createMockComponent('TouchableWithoutFeedback');
const ActivityIndicator = createMockComponent('ActivityIndicator');
const Button = createMockComponent('Button');
const FlatList = createMockComponent('FlatList');
const SectionList = createMockComponent('SectionList');
const ScrollView = createMockComponent('ScrollView');
const KeyboardAvoidingView = createMockComponent('KeyboardAvoidingView');
const Modal = createMockComponent('Modal');
const Pressable = createMockComponent('Pressable');
const SafeAreaView = createMockComponent('SafeAreaView');
const Switch = createMockComponent('Switch');

// Exportar todos los componentes mock
module.exports = {
  View,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
  TouchableHighlight,
  TouchableWithoutFeedback,
  ActivityIndicator,
  Button,
  FlatList,
  SectionList,
  ScrollView,
  KeyboardAvoidingView,
  Modal,
  Pressable,
  SafeAreaView,
  Switch
}; 