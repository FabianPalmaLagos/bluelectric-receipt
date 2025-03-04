import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import RegisterScreen from '../../screens/auth/RegisterScreen';
import { registerUser } from '../../features/auth/authSlice';
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

// Mock de la acción registerUser
jest.mock('../../features/auth/authSlice', () => ({
  registerUser: jest.fn(),
}));

// Mock de Alert
jest.mock('react-native', () => {
  const reactNative = jest.requireActual('react-native');
  return {
    ...reactNative,
    Alert: {
      ...reactNative.Alert,
      alert: jest.fn(),
    },
  };
});

// Mock del componente Picker
jest.mock('@react-native-picker/picker', () => {
  const Picker = ({ children, selectedValue, onValueChange }) => (
    <select
      value={selectedValue}
      onChange={(e) => onValueChange(e.target.value)}
      data-testid="picker"
    >
      {children}
    </select>
  );
  
  Picker.Item = ({ label, value }) => (
    <option value={value}>{label}</option>
  );
  
  return { Picker };
});

// Configuración del mock store
const mockStore = configureStore([]);

describe('RegisterScreen', () => {
  let store;
  
  beforeEach(() => {
    store = mockStore({
      auth: {
        user: null,
        isAuthenticated: false,
        loading: false,
        error: null,
      },
    });
    
    // Limpiar todos los mocks antes de cada prueba
    jest.clearAllMocks();
  });
  
  // Prueba: Mostrar alerta si los campos están vacíos
  test('muestra alerta si los campos están vacíos', async () => {
    // Renderizar el componente con el store
    const { getByTestId } = render(
      <Provider store={store}>
        <RegisterScreen />
      </Provider>
    );
    
    // Simular clic en el botón de registro sin llenar campos
    fireEvent.press(getByTestId('register-button'));
    
    // Verificar que se muestra la alerta
    await waitFor(() => {
      expect(Alert.alert).toHaveBeenCalledWith(
        'Error',
        'Todos los campos son obligatorios'
      );
    });
  });
  
  // Prueba: Mostrar alerta si el email es inválido
  test('muestra alerta si el email es inválido', async () => {
    // Renderizar el componente con el store
    const { getByTestId } = render(
      <Provider store={store}>
        <RegisterScreen />
      </Provider>
    );
    
    // Llenar campos con email inválido
    fireEvent.changeText(getByTestId('name-input'), 'Test User');
    fireEvent.changeText(getByTestId('email-input'), 'invalid-email');
    fireEvent.changeText(getByTestId('password-input'), 'password123');
    fireEvent.changeText(getByTestId('confirm-password-input'), 'password123');
    
    // Simular clic en el botón de registro
    fireEvent.press(getByTestId('register-button'));
    
    // Verificar que se muestra la alerta de email inválido
    await waitFor(() => {
      expect(Alert.alert).toHaveBeenCalledWith(
        'Error',
        'Por favor ingresa un email válido'
      );
    });
  });
  
  // Prueba: Mostrar alerta si la contraseña es muy corta
  test('muestra alerta si la contraseña es muy corta', async () => {
    // Renderizar el componente con el store
    const { getByTestId } = render(
      <Provider store={store}>
        <RegisterScreen />
      </Provider>
    );
    
    // Llenar campos con contraseña corta
    fireEvent.changeText(getByTestId('name-input'), 'Test User');
    fireEvent.changeText(getByTestId('email-input'), 'test@example.com');
    fireEvent.changeText(getByTestId('password-input'), '123');
    fireEvent.changeText(getByTestId('confirm-password-input'), '123');
    
    // Simular clic en el botón de registro
    fireEvent.press(getByTestId('register-button'));
    
    // Verificar que se muestra la alerta de contraseña corta
    await waitFor(() => {
      expect(Alert.alert).toHaveBeenCalledWith(
        'Error',
        'La contraseña debe tener al menos 6 caracteres'
      );
    });
  });
  
  // Prueba: Mostrar alerta si las contraseñas no coinciden
  test('muestra alerta si las contraseñas no coinciden', async () => {
    // Renderizar el componente con el store
    const { getByTestId } = render(
      <Provider store={store}>
        <RegisterScreen />
      </Provider>
    );
    
    // Llenar campos con contraseñas que no coinciden
    fireEvent.changeText(getByTestId('name-input'), 'Test User');
    fireEvent.changeText(getByTestId('email-input'), 'test@example.com');
    fireEvent.changeText(getByTestId('password-input'), 'password123');
    fireEvent.changeText(getByTestId('confirm-password-input'), 'different');
    
    // Simular clic en el botón de registro
    fireEvent.press(getByTestId('register-button'));
    
    // Verificar que se muestra la alerta de contraseñas que no coinciden
    await waitFor(() => {
      expect(Alert.alert).toHaveBeenCalledWith(
        'Error',
        'Las contraseñas no coinciden'
      );
    });
  });
  
  // Prueba: Llamar a la acción registerUser con los datos correctos
  test('llama a la acción registerUser con los datos correctos', async () => {
    // Renderizar el componente con el store
    const { getByTestId } = render(
      <Provider store={store}>
        <RegisterScreen />
      </Provider>
    );
    
    // Llenar todos los campos correctamente
    fireEvent.changeText(getByTestId('name-input'), 'Test User');
    fireEvent.changeText(getByTestId('email-input'), 'test@example.com');
    fireEvent.changeText(getByTestId('password-input'), 'password123');
    fireEvent.changeText(getByTestId('confirm-password-input'), 'password123');
    
    // Simular clic en el botón de registro
    fireEvent.press(getByTestId('register-button'));
    
    // Verificar que se llama a la acción registerUser con los datos correctos
    await waitFor(() => {
      expect(registerUser).toHaveBeenCalledWith({
        name: 'Test User',
        email: 'test@example.com',
        password: 'password123',
        role: 'cliente', // Valor por defecto
      });
    });
  });
  
  // Prueba: Navegar a Login al hacer clic en el enlace
  test('navega a Login al hacer clic en el enlace de inicio de sesión', () => {
    // Obtener el mock de navigate
    const mockNavigate = require('@react-navigation/native').useNavigation().navigate;
    
    // Renderizar el componente con el store
    const { getByTestId } = render(
      <Provider store={store}>
        <RegisterScreen />
      </Provider>
    );
    
    // Simular clic en el enlace de inicio de sesión
    fireEvent.press(getByTestId('login-link'));
    
    // Verificar que se navega a la pantalla de Login
    expect(mockNavigate).toHaveBeenCalledWith('Login');
  });
}); 