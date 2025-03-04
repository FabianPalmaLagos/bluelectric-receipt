import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import RegisterScreen from '../../screens/auth/RegisterScreen';
import { registerUser } from '../../store/slices/authSlice';
import { UserRole } from '../../types';
import { Alert } from 'react-native';

// Mock de react-navigation
jest.mock('@react-navigation/native', () => {
  return {
    ...jest.requireActual('@react-navigation/native'),
    useNavigation: () => ({
      navigate: jest.fn(),
    }),
  };
});

// Mock de las acciones de Redux
jest.mock('../../store/slices/authSlice', () => ({
  registerUser: jest.fn(),
}));

// Mock de Alert
jest.spyOn(Alert, 'alert').mockImplementation(() => {});

// Mock de Picker
jest.mock('@react-native-picker/picker', () => {
  const React = require('react');
  const { View, Text } = require('react-native');
  
  const Picker = ({ children, selectedValue, onValueChange }) => (
    <View testID="picker">
      {React.Children.map(children, child => {
        if (child.props.value === selectedValue) {
          return React.cloneElement(child, { testID: 'selected' });
        }
        return child;
      })}
    </View>
  );
  
  Picker.Item = ({ label, value }) => <Text testID={`picker-item-${value}`}>{label}</Text>;
  
  return {
    Picker,
  };
});

// Configuración correcta de redux-mock-store
const middlewares = [];
const mockStore = configureStore(middlewares);

describe('RegisterScreen', () => {
  let store;
  let navigation;

  beforeEach(() => {
    // Configuración del store con estado inicial
    store = mockStore({
      auth: {
        user: null,
        isAuthenticated: false,
        loading: false,
        error: null,
      },
    });

    // Mock de la navegación
    navigation = {
      navigate: jest.fn(),
    };

    // Resetear los mocks entre pruebas
    jest.clearAllMocks();
  });

  test('renderiza correctamente', () => {
    const { getByText, getByPlaceholderText } = render(
      <Provider store={store}>
        <RegisterScreen navigation={navigation} />
      </Provider>
    );

    // Verificar elementos clave en la pantalla
    expect(getByText('Crear Cuenta')).toBeTruthy();
    expect(getByPlaceholderText('Ingresa tu nombre')).toBeTruthy();
    expect(getByPlaceholderText('Ingresa tu apellido')).toBeTruthy();
    expect(getByPlaceholderText('Ingresa tu correo electrónico')).toBeTruthy();
    expect(getByPlaceholderText('Ingresa tu contraseña')).toBeTruthy();
    expect(getByPlaceholderText('Confirma tu contraseña')).toBeTruthy();
    expect(getByText('Registrarse')).toBeTruthy();
    expect(getByText('¿Ya tienes una cuenta?')).toBeTruthy();
    expect(getByText('Iniciar sesión')).toBeTruthy();
  });

  test('muestra mensaje de error cuando está presente en el estado', () => {
    const errorStore = mockStore({
      auth: {
        user: null,
        isAuthenticated: false,
        loading: false,
        error: 'Error en el registro',
      },
    });

    const { getByText } = render(
      <Provider store={errorStore}>
        <RegisterScreen navigation={navigation} />
      </Provider>
    );

    expect(getByText('Error en el registro')).toBeTruthy();
  });

  test('muestra indicador de carga durante el proceso de registro', () => {
    const loadingStore = mockStore({
      auth: {
        user: null,
        isAuthenticated: false,
        loading: true,
        error: null,
      },
    });

    const { getByTestId } = render(
      <Provider store={loadingStore}>
        <RegisterScreen navigation={navigation} />
      </Provider>
    );

    expect(getByTestId('loading-indicator')).toBeTruthy();
  });

  test('muestra alerta si los campos están vacíos', async () => {
    const { getByText } = render(
      <Provider store={store}>
        <RegisterScreen navigation={navigation} />
      </Provider>
    );

    // Simular clic en el botón de registro sin completar campos
    fireEvent.press(getByText('Registrarse'));

    // Verificar que se mostró la alerta correcta
    await waitFor(() => {
      expect(Alert.alert).toHaveBeenCalledWith('Error', 'Por favor, completa todos los campos');
    });

    // Verificar que no se llamó a la acción de registro
    expect(registerUser).not.toHaveBeenCalled();
  });

  test('muestra alerta si el email es inválido', async () => {
    const { getByText, getByPlaceholderText } = render(
      <Provider store={store}>
        <RegisterScreen navigation={navigation} />
      </Provider>
    );

    // Completar campos con email inválido
    fireEvent.changeText(getByPlaceholderText('Ingresa tu nombre'), 'Juan');
    fireEvent.changeText(getByPlaceholderText('Ingresa tu apellido'), 'Pérez');
    fireEvent.changeText(getByPlaceholderText('Ingresa tu correo electrónico'), 'email-invalido');
    fireEvent.changeText(getByPlaceholderText('Ingresa tu contraseña'), 'password123');
    fireEvent.changeText(getByPlaceholderText('Confirma tu contraseña'), 'password123');

    // Simular clic en el botón de registro
    fireEvent.press(getByText('Registrarse'));

    // Verificar que se mostró la alerta correcta
    await waitFor(() => {
      expect(Alert.alert).toHaveBeenCalledWith('Error', 'Por favor, ingresa un correo electrónico válido');
    });

    // Verificar que no se llamó a la acción de registro
    expect(registerUser).not.toHaveBeenCalled();
  });

  test('muestra alerta si la contraseña es muy corta', async () => {
    const { getByText, getByPlaceholderText } = render(
      <Provider store={store}>
        <RegisterScreen navigation={navigation} />
      </Provider>
    );

    // Completar campos con contraseña corta
    fireEvent.changeText(getByPlaceholderText('Ingresa tu nombre'), 'Juan');
    fireEvent.changeText(getByPlaceholderText('Ingresa tu apellido'), 'Pérez');
    fireEvent.changeText(getByPlaceholderText('Ingresa tu correo electrónico'), 'juan@ejemplo.com');
    fireEvent.changeText(getByPlaceholderText('Ingresa tu contraseña'), '12345');
    fireEvent.changeText(getByPlaceholderText('Confirma tu contraseña'), '12345');

    // Simular clic en el botón de registro
    fireEvent.press(getByText('Registrarse'));

    // Verificar que se mostró la alerta correcta
    await waitFor(() => {
      expect(Alert.alert).toHaveBeenCalledWith('Error', 'La contraseña debe tener al menos 6 caracteres');
    });

    // Verificar que no se llamó a la acción de registro
    expect(registerUser).not.toHaveBeenCalled();
  });

  test('muestra alerta si las contraseñas no coinciden', async () => {
    const { getByText, getByPlaceholderText } = render(
      <Provider store={store}>
        <RegisterScreen navigation={navigation} />
      </Provider>
    );

    // Completar campos con contraseñas que no coinciden
    fireEvent.changeText(getByPlaceholderText('Ingresa tu nombre'), 'Juan');
    fireEvent.changeText(getByPlaceholderText('Ingresa tu apellido'), 'Pérez');
    fireEvent.changeText(getByPlaceholderText('Ingresa tu correo electrónico'), 'juan@ejemplo.com');
    fireEvent.changeText(getByPlaceholderText('Ingresa tu contraseña'), 'password123');
    fireEvent.changeText(getByPlaceholderText('Confirma tu contraseña'), 'password456');

    // Simular clic en el botón de registro
    fireEvent.press(getByText('Registrarse'));

    // Verificar que se mostró la alerta correcta
    await waitFor(() => {
      expect(Alert.alert).toHaveBeenCalledWith('Error', 'Las contraseñas no coinciden');
    });

    // Verificar que no se llamó a la acción de registro
    expect(registerUser).not.toHaveBeenCalled();
  });

  test('llama a la acción registerUser con los datos correctos', async () => {
    const { getByText, getByPlaceholderText } = render(
      <Provider store={store}>
        <RegisterScreen navigation={navigation} />
      </Provider>
    );

    // Completar todos los campos correctamente
    fireEvent.changeText(getByPlaceholderText('Ingresa tu nombre'), 'Juan');
    fireEvent.changeText(getByPlaceholderText('Ingresa tu apellido'), 'Pérez');
    fireEvent.changeText(getByPlaceholderText('Ingresa tu correo electrónico'), 'juan@ejemplo.com');
    fireEvent.changeText(getByPlaceholderText('Ingresa tu contraseña'), 'password123');
    fireEvent.changeText(getByPlaceholderText('Confirma tu contraseña'), 'password123');

    // Simular clic en el botón de registro
    fireEvent.press(getByText('Registrarse'));

    // Verificar que se llamó a la acción con los parámetros correctos
    await waitFor(() => {
      expect(registerUser).toHaveBeenCalledWith({
        email: 'juan@ejemplo.com',
        password: 'password123',
        firstName: 'Juan',
        lastName: 'Pérez',
        role: UserRole.WORKER, // Valor por defecto
      });
    });
  });

  test('navega a Login al hacer clic en el enlace de inicio de sesión', () => {
    const { getByText } = render(
      <Provider store={store}>
        <RegisterScreen navigation={navigation} />
      </Provider>
    );

    // Simular clic en el enlace de inicio de sesión
    fireEvent.press(getByText('Iniciar sesión'));

    // Verificar que se navegó a la pantalla correcta
    expect(navigation.navigate).toHaveBeenCalledWith('Login');
  });
}); 