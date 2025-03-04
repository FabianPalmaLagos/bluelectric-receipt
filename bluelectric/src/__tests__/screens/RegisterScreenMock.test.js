import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';

// Mock del componente RegisterScreen
const RegisterScreenMock = ({ navigation }) => {
  const [name, setName] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [confirmPassword, setConfirmPassword] = React.useState('');
  const [error, setError] = React.useState(null);
  const [loading, setLoading] = React.useState(false);

  const handleRegister = () => {
    if (!name || !email || !password || !confirmPassword) {
      setError('Por favor completa todos los campos');
      return;
    }
    
    if (password !== confirmPassword) {
      setError('Las contraseñas no coinciden');
      return;
    }
    
    setError(null);
    setLoading(true);
    
    // Simulamos una llamada a la API
    setTimeout(() => {
      setLoading(false);
      // Simular navegación a la pantalla principal
      navigation.navigate('Main');
    }, 500);
  };

  const navigateToLogin = () => {
    navigation.navigate('Login');
  };

  return (
    <View testID="register-screen">
      <Text testID="screen-title">Crear cuenta</Text>
      
      {error && <Text testID="error-message">{error}</Text>}
      
      {loading ? (
        <Text testID="loading-indicator">Cargando...</Text>
      ) : (
        <View>
          <TextInput
            placeholder="Nombre completo"
            value={name}
            onChangeText={setName}
            testID="name-input"
          />
          
          <TextInput
            placeholder="Correo electrónico"
            value={email}
            onChangeText={setEmail}
            testID="email-input"
          />
          
          <TextInput
            placeholder="Contraseña"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
            testID="password-input"
          />
          
          <TextInput
            placeholder="Confirmar contraseña"
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            secureTextEntry
            testID="confirm-password-input"
          />
          
          <TouchableOpacity onPress={handleRegister} testID="register-button">
            <Text>Registrarse</Text>
          </TouchableOpacity>
          
          <View>
            <Text>¿Ya tienes una cuenta?</Text>
            <TouchableOpacity onPress={navigateToLogin} testID="login-link">
              <Text>Iniciar sesión</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
    </View>
  );
};

describe('RegisterScreenMock', () => {
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
      <RegisterScreenMock navigation={navigation} />
    );

    // Verificar elementos clave en la pantalla
    expect(getByTestId('screen-title')).toBeTruthy();
    expect(getByPlaceholderText('Nombre completo')).toBeTruthy();
    expect(getByPlaceholderText('Correo electrónico')).toBeTruthy();
    expect(getByPlaceholderText('Contraseña')).toBeTruthy();
    expect(getByPlaceholderText('Confirmar contraseña')).toBeTruthy();
    expect(getByText('¿Ya tienes una cuenta?')).toBeTruthy();
    expect(getByText('Iniciar sesión')).toBeTruthy();
  });

  test('muestra mensaje de error cuando los campos están vacíos', async () => {
    const { getByTestId, findByTestId } = render(
      <RegisterScreenMock navigation={navigation} />
    );

    // Simular clic en el botón de registro sin completar campos
    fireEvent.press(getByTestId('register-button'));

    // Verificar que se muestra el mensaje de error
    const errorMessage = await findByTestId('error-message');
    expect(errorMessage).toBeTruthy();
    expect(errorMessage.props.children).toBe('Por favor completa todos los campos');
  });

  test('muestra mensaje de error cuando las contraseñas no coinciden', async () => {
    const { getByTestId, getByPlaceholderText, findByTestId } = render(
      <RegisterScreenMock navigation={navigation} />
    );

    // Completar los campos con contraseñas diferentes
    fireEvent.changeText(getByPlaceholderText('Nombre completo'), 'Usuario Prueba');
    fireEvent.changeText(getByPlaceholderText('Correo electrónico'), 'usuario@ejemplo.com');
    fireEvent.changeText(getByPlaceholderText('Contraseña'), 'contraseña123');
    fireEvent.changeText(getByPlaceholderText('Confirmar contraseña'), 'contraseña456');

    // Simular clic en el botón de registro
    fireEvent.press(getByTestId('register-button'));

    // Verificar que se muestra el mensaje de error
    const errorMessage = await findByTestId('error-message');
    expect(errorMessage).toBeTruthy();
    expect(errorMessage.props.children).toBe('Las contraseñas no coinciden');
  });

  test('navega a Login al hacer clic en el enlace correspondiente', () => {
    const { getByTestId } = render(
      <RegisterScreenMock navigation={navigation} />
    );

    // Simular clic en el enlace de iniciar sesión
    fireEvent.press(getByTestId('login-link'));

    // Verificar que se navegó a la pantalla correcta
    expect(navigation.navigate).toHaveBeenCalledWith('Login');
  });

  test('intenta registrarse con datos válidos', async () => {
    const { getByPlaceholderText, getByTestId } = render(
      <RegisterScreenMock navigation={navigation} />
    );

    // Completar los campos con datos válidos
    fireEvent.changeText(getByPlaceholderText('Nombre completo'), 'Usuario Prueba');
    fireEvent.changeText(getByPlaceholderText('Correo electrónico'), 'usuario@ejemplo.com');
    fireEvent.changeText(getByPlaceholderText('Contraseña'), 'contraseña123');
    fireEvent.changeText(getByPlaceholderText('Confirmar contraseña'), 'contraseña123');

    // Simular clic en el botón de registro
    fireEvent.press(getByTestId('register-button'));

    // Esperar a que se complete el proceso de registro simulado
    await waitFor(() => {
      expect(navigation.navigate).toHaveBeenCalledWith('Main');
    }, { timeout: 1000 });
  });
}); 