import React, { useEffect } from 'react';
import { Provider, useSelector } from 'react-redux';
import { store } from './src/store';
import { NavigationContainer, LinkingOptions } from '@react-navigation/native';
import RootNavigator from './src/navigation/RootNavigator';
import { Linking, Alert } from 'react-native';
import { supabase } from './src/api/supabase';
import type { RootState } from './src/store';
import { AuthStackParamList } from './src/navigation/types';

function AppContent() {
  const userEmail = useSelector((state: RootState) => state.auth.user?.email);

  useEffect(() => {
    // Función para extraer el token de la URL
    const extractTokenFromUrl = (url: string) => {
      try {
        const regex = /[?&]token=([^&]+)/;
        const match = url.match(regex);
        return match ? match[1] : null;
      } catch (error) {
        console.error('Error extrayendo token:', error);
        return null;
      }
    };

    // Función para manejar la URL entrante
    const handleDeepLink = async (url: string) => {
      try {
        console.log('URL recibida:', url);
        const token = extractTokenFromUrl(url);
        
        if (token) {
          console.log('Token encontrado:', token);
          
          // Intentamos primero con el email del estado si existe
          if (userEmail) {
            const { error } = await supabase.auth.verifyOtp({
              email: userEmail,
              token,
              type: 'signup'
            });

            if (error) {
              console.error('Error al verificar email con email conocido:', error.message);
              // Si falla, intentamos con otro método
              handleTokenWithoutEmail(token);
            } else {
              console.log('Email verificado exitosamente');
              Alert.alert('¡Éxito!', 'Tu correo ha sido verificado correctamente. Ya puedes iniciar sesión.');
            }
          } else {
            // Si no tenemos email, usamos un método alternativo
            handleTokenWithoutEmail(token);
          }
        }
      } catch (error) {
        console.error('Error procesando deep link:', error);
      }
    };

    // Función para manejar el token sin conocer el email
    const handleTokenWithoutEmail = async (token: string) => {
      try {
        // Intentamos verificar el token directamente
        const { error: sessionError } = await supabase.auth.verifyOtp({
          token,
          type: 'signup'
        });

        if (sessionError) {
          console.error('Error verificando token sin email:', sessionError.message);
          Alert.alert(
            'Verificación pendiente', 
            'Por favor, inicia sesión con tu email y contraseña para completar la verificación.',
            [{ text: 'OK' }]
          );
        } else {
          console.log('Cuenta verificada exitosamente');
          Alert.alert('¡Éxito!', 'Tu cuenta ha sido verificada. Ya puedes iniciar sesión.');
        }
      } catch (error) {
        console.error('Error en verificación alternativa:', error);
      }
    };

    // Manejar la URL inicial si la app fue abierta desde el enlace
    const getInitialURL = async () => {
      try {
        const url = await Linking.getInitialURL();
        if (url) {
          console.log('URL inicial:', url);
          handleDeepLink(url);
        }
      } catch (error) {
        console.error('Error obteniendo URL inicial:', error);
      }
    };

    // Configurar el listener para URLs entrantes
    const subscription = Linking.addEventListener('url', (event: { url: string }) => {
      console.log('Nueva URL recibida:', event.url);
      handleDeepLink(event.url);
    });

    // Verificar URL inicial
    getInitialURL();

    // Limpiar el listener cuando el componente se desmonte
    return () => {
      subscription.remove();
    };
  }, [userEmail]);

  const linking: LinkingOptions<AuthStackParamList> = {
    prefixes: [
      'bluelectric://',
      'https://bluelectric.app',
      'https://izcuyqehwvnstcaqfmod.supabase.co'
    ],
    config: {
      screens: {
        Login: 'login',
        Register: 'register',
        ForgotPassword: 'forgot-password'
      }
    },
    getStateFromPath: (path: string) => {
      console.log('Path recibido:', path);
      try {
        if (path.includes('token')) {
          return {
            routes: [
              { name: 'Login' }
            ]
          };
        }
        return undefined;
      } catch (error) {
        console.error('Error al procesar path:', error);
        return undefined;
      }
    }
  };

  return (
    <NavigationContainer linking={linking}>
      <RootNavigator />
    </NavigationContainer>
  );
}

export default function App() {
  return (
    <Provider store={store}>
      <AppContent />
    </Provider>
  );
}