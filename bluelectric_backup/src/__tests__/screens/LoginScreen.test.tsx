import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import LoginScreen from '../../screens/auth/LoginScreen';
import { loginUser } from '../../store/slices/authSlice';

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
  loginUser: jest.fn(),
}));

// Configuración correcta de redux-mock-store
const middlewares = [];
const mockStore = configureStore(middlewares);

describe('LoginScreen', () => {
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
        <LoginScreen navigation={navigation} />
      </Provider>
    );

    // Verificar elementos clave en la pantalla
    expect(getByText('Iniciar sesión')).toBeTruthy();
    expect(getByPlaceholderText('Ingresa tu correo electrónico')).toBeTruthy();
    expect(getByPlaceholderText('Ingresa tu contraseña')).toBeTruthy();
    expect(getByText('¿Olvidaste tu contraseña?')).toBeTruthy();
    expect(getByText('¿No tienes una cuenta?')).toBeTruthy();
    expect(getByText('Regístrate')).toBeTruthy();
  });

  test('muestra mensaje de error cuando está presente en el estado', () => {
    const errorStore = mockStore({
      auth: {
        user: null,
        isAuthenticated: false,
        loading: false,
        error: 'Credenciales inválidas',
      },
    });

    const { getByText } = render(
      <Provider store={errorStore}>
        <LoginScreen navigation={navigation} />
      </Provider>
    );

    expect(getByText('Credenciales inválidas')).toBeTruthy();
  });

  test('muestra indicador de carga durante el proceso de login', () => {
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
        <LoginScreen navigation={navigation} />
      </Provider>
    );

    expect(getByTestId('loading-indicator')).toBeTruthy();
  });

  test('llama a la acción loginUser con las credenciales correctas', async () => {
    const { getByPlaceholderText, getByText } = render(
      <Provider store={store}>
        <LoginScreen navigation={navigation} />
      </Provider>
    );

    // Simular entrada de usuario
    fireEvent.changeText(
      getByPlaceholderText('Ingresa tu correo electrónico'),
      'usuario@ejemplo.com'
    );
    fireEvent.changeText(
      getByPlaceholderText('Ingresa tu contraseña'),
      'contraseña123'
    );

    // Simular clic en el botón de login
    fireEvent.press(getByText('Iniciar sesión'));

    // Verificar que se llamó a la acción con los parámetros correctos
    await waitFor(() => {
      expect(loginUser).toHaveBeenCalledWith({
        email: 'usuario@ejemplo.com',
        password: 'contraseña123',
      });
    });
  });

  test('no llama a loginUser si los campos están vacíos', async () => {
    const { getByText } = render(
      <Provider store={store}>
        <LoginScreen navigation={navigation} />
      </Provider>
    );

    // Simular clic en el botón de login sin completar campos
    fireEvent.press(getByText('Iniciar sesión'));

    // Verificar que no se llamó a la acción
    await waitFor(() => {
      expect(loginUser).not.toHaveBeenCalled();
    });
  });

  test('navega a ForgotPassword al hacer clic en el enlace correspondiente', () => {
    const { getByText } = render(
      <Provider store={store}>
        <LoginScreen navigation={navigation} />
      </Provider>
    );

    // Simular clic en el enlace de olvidé mi contraseña
    fireEvent.press(getByText('¿Olvidaste tu contraseña?'));

    // Verificar que se navegó a la pantalla correcta
    expect(navigation.navigate).toHaveBeenCalledWith('ForgotPassword');
  });

  test('navega a Register al hacer clic en el enlace de registro', () => {
    const { getByText } = render(
      <Provider store={store}>
        <LoginScreen navigation={navigation} />
      </Provider>
    );

    // Simular clic en el enlace de registro
    fireEvent.press(getByText('Regístrate'));

    // Verificar que se navegó a la pantalla correcta
    expect(navigation.navigate).toHaveBeenCalledWith('Register');
  });
}); 