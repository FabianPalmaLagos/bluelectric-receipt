import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import ForgotPasswordScreen from '../../screens/auth/ForgotPasswordScreen';
import { Alert } from 'react-native';
import { supabase } from '../../api/supabase';

// Mock de supabase
jest.mock('../../api/supabase', () => ({
  supabase: {
    auth: {
      resetPasswordForEmail: jest.fn(),
    },
  },
}));

// Mock de Alert
jest.spyOn(Alert, 'alert').mockImplementation(() => {});

describe('ForgotPasswordScreen', () => {
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
    const { getByText, getByPlaceholderText } = render(
      <ForgotPasswordScreen navigation={navigation} />
    );

    // Verificar elementos clave en la pantalla
    expect(getByText('Recuperar Contraseña')).toBeTruthy();
    expect(getByPlaceholderText('Ingresa tu correo electrónico')).toBeTruthy();
    expect(getByText('Enviar Enlace')).toBeTruthy();
    expect(getByText('Volver a Iniciar Sesión')).toBeTruthy();
  });

  test('muestra alerta si el campo de email está vacío', async () => {
    const { getByText } = render(
      <ForgotPasswordScreen navigation={navigation} />
    );

    // Simular clic en el botón sin completar el email
    fireEvent.press(getByText('Enviar Enlace'));

    // Verificar que se mostró la alerta correcta
    await waitFor(() => {
      expect(Alert.alert).toHaveBeenCalledWith('Error', 'Por favor, ingresa tu correo electrónico');
    });

    // Verificar que no se llamó a la API de Supabase
    expect(supabase.auth.resetPasswordForEmail).not.toHaveBeenCalled();
  });

  test('muestra alerta si el email es inválido', async () => {
    const { getByText, getByPlaceholderText } = render(
      <ForgotPasswordScreen navigation={navigation} />
    );

    // Ingresar un email inválido
    fireEvent.changeText(
      getByPlaceholderText('Ingresa tu correo electrónico'),
      'email-invalido'
    );

    // Simular clic en el botón
    fireEvent.press(getByText('Enviar Enlace'));

    // Verificar que se mostró la alerta correcta
    await waitFor(() => {
      expect(Alert.alert).toHaveBeenCalledWith('Error', 'Por favor, ingresa un correo electrónico válido');
    });

    // Verificar que no se llamó a la API de Supabase
    expect(supabase.auth.resetPasswordForEmail).not.toHaveBeenCalled();
  });

  test('muestra indicador de carga durante el proceso de recuperación', async () => {
    // Configurar mock para que la promesa no se resuelva inmediatamente
    (supabase.auth.resetPasswordForEmail as jest.Mock).mockImplementation(
      () => new Promise(() => {})
    );

    const { getByText, getByPlaceholderText, getByTestId } = render(
      <ForgotPasswordScreen navigation={navigation} />
    );

    // Ingresar un email válido
    fireEvent.changeText(
      getByPlaceholderText('Ingresa tu correo electrónico'),
      'usuario@ejemplo.com'
    );

    // Simular clic en el botón
    fireEvent.press(getByText('Enviar Enlace'));

    // Verificar que se muestra el indicador de carga
    expect(getByTestId('loading-indicator')).toBeTruthy();
  });

  test('muestra mensaje de éxito cuando se envía el enlace correctamente', async () => {
    // Configurar mock para que devuelva éxito
    (supabase.auth.resetPasswordForEmail as jest.Mock).mockResolvedValue({
      error: null,
    });

    const { getByText, getByPlaceholderText, findByText } = render(
      <ForgotPasswordScreen navigation={navigation} />
    );

    // Ingresar un email válido
    fireEvent.changeText(
      getByPlaceholderText('Ingresa tu correo electrónico'),
      'usuario@ejemplo.com'
    );

    // Simular clic en el botón
    fireEvent.press(getByText('Enviar Enlace'));

    // Verificar que se muestra el mensaje de éxito
    const successMessage = await findByText(
      'Se ha enviado un enlace de recuperación a tu correo electrónico'
    );
    expect(successMessage).toBeTruthy();

    // Verificar que se llamó a la API de Supabase con los parámetros correctos
    expect(supabase.auth.resetPasswordForEmail).toHaveBeenCalledWith(
      'usuario@ejemplo.com',
      {
        redirectTo: 'bluelectricreceipt://reset-password',
      }
    );
  });

  test('muestra mensaje de error cuando falla el envío del enlace', async () => {
    // Configurar mock para que devuelva error
    const errorMessage = 'Error al enviar el enlace';
    (supabase.auth.resetPasswordForEmail as jest.Mock).mockResolvedValue({
      error: { message: errorMessage },
    });

    const { getByText, getByPlaceholderText, findByText } = render(
      <ForgotPasswordScreen navigation={navigation} />
    );

    // Ingresar un email válido
    fireEvent.changeText(
      getByPlaceholderText('Ingresa tu correo electrónico'),
      'usuario@ejemplo.com'
    );

    // Simular clic en el botón
    fireEvent.press(getByText('Enviar Enlace'));

    // Verificar que se muestra el mensaje de error
    const errorElement = await findByText(errorMessage);
    expect(errorElement).toBeTruthy();
  });

  test('navega a Login al hacer clic en el botón de volver', () => {
    const { getByText } = render(
      <ForgotPasswordScreen navigation={navigation} />
    );

    // Simular clic en el botón de volver
    fireEvent.press(getByText('Volver a Iniciar Sesión'));

    // Verificar que se navegó a la pantalla correcta
    expect(navigation.navigate).toHaveBeenCalledWith('Login');
  });
}); 