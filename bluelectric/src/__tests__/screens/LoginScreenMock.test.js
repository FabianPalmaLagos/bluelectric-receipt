import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';

// Mock del componente LoginScreen
const LoginScreenMock = ({ navigation }) => {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [error, setError] = React.useState(null);
  const [loading, setLoading] = React.useState(false);

  const handleLogin = () => {
    if (!email || !password) {
      setError('Por favor completa todos los campos');
      return;
    }
    
    setError(null);
    setLoading(true);
    
    // Simulamos una llamada a la API
    setTimeout(() => {
      if (email === 'usuario@ejemplo.com' && password === 'contraseña123') {
        setLoading(false);
        // Simular navegación a la pantalla principal
        navigation.navigate('Main');
      } else {
        setLoading(false);
        setError('Credenciales inválidas');
      }
    }, 500);
  };

  const navigateToForgotPassword = () => {
    navigation.navigate('ForgotPassword');
  };

  const navigateToRegister = () => {
    navigation.navigate('Register');
  };

  return (
    <View testID="login-screen">
      <Text testID="screen-title">Iniciar sesión</Text>
      
      {error && <Text testID="error-message">{error}</Text>}
      
      {loading ? (
        <Text testID="loading-indicator">Cargando...</Text>
      ) : (
        <View>
          <TextInput
            placeholder="Ingresa tu correo electrónico"
            value={email}
            onChangeText={setEmail}
            testID="email-input"
          />
          
          <TextInput
            placeholder="Ingresa tu contraseña"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
            testID="password-input"
          />
          
          <TouchableOpacity onPress={handleLogin} testID="login-button">
            <Text>Iniciar sesión</Text>
          </TouchableOpacity>
          
          <TouchableOpacity onPress={navigateToForgotPassword} testID="forgot-password-link">
            <Text>¿Olvidaste tu contraseña?</Text>
          </TouchableOpacity>
          
          <View>
            <Text>¿No tienes una cuenta?</Text>
            <TouchableOpacity onPress={navigateToRegister} testID="register-link">
              <Text>Regístrate</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
    </View>
  );
};

describe('LoginScreenMock', () => {
  let navigation;

  beforeEach(() => {
    // Mock de la navegación
    navigation = {
      navigate: jest.fn(),
    };

    // Resetear los mocks entre pruebas
    jest.clearAllMocks();
  });

  test('renderiza correctamente', () => {
    const { getByTestId, getByPlaceholderText, getByText } = render(
      <LoginScreenMock navigation={navigation} />
    );

    // Verificar elementos clave en la pantalla
    expect(getByTestId('screen-title')).toBeTruthy();
    expect(getByPlaceholderText('Ingresa tu correo electrónico')).toBeTruthy();
    expect(getByPlaceholderText('Ingresa tu contraseña')).toBeTruthy();
    expect(getByText('¿Olvidaste tu contraseña?')).toBeTruthy();
    expect(getByText('¿No tienes una cuenta?')).toBeTruthy();
    expect(getByText('Regístrate')).toBeTruthy();
  });

  test('muestra mensaje de error cuando los campos están vacíos', async () => {
    const { getByTestId, findByTestId } = render(
      <LoginScreenMock navigation={navigation} />
    );

    // Simular clic en el botón de login sin completar campos
    fireEvent.press(getByTestId('login-button'));

    // Verificar que se muestra el mensaje de error
    const errorMessage = await findByTestId('error-message');
    expect(errorMessage).toBeTruthy();
    expect(errorMessage.props.children).toBe('Por favor completa todos los campos');
  });

  test('navega a ForgotPassword al hacer clic en el enlace correspondiente', () => {
    const { getByTestId } = render(
      <LoginScreenMock navigation={navigation} />
    );

    // Simular clic en el enlace de olvidé mi contraseña
    fireEvent.press(getByTestId('forgot-password-link'));

    // Verificar que se navegó a la pantalla correcta
    expect(navigation.navigate).toHaveBeenCalledWith('ForgotPassword');
  });

  test('navega a Register al hacer clic en el enlace de registro', () => {
    const { getByTestId } = render(
      <LoginScreenMock navigation={navigation} />
    );

    // Simular clic en el enlace de registro
    fireEvent.press(getByTestId('register-link'));

    // Verificar que se navegó a la pantalla correcta
    expect(navigation.navigate).toHaveBeenCalledWith('Register');
  });

  test('intenta iniciar sesión con credenciales válidas', async () => {
    const { getByPlaceholderText, getByTestId } = render(
      <LoginScreenMock navigation={navigation} />
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
    fireEvent.press(getByTestId('login-button'));

    // Esperar a que se complete el proceso de login simulado
    await waitFor(() => {
      expect(navigation.navigate).toHaveBeenCalledWith('Main');
    }, { timeout: 1000 });
  });
}); 