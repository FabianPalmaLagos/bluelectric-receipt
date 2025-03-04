import React, { useEffect } from 'react';
import { Provider, useSelector } from 'react-redux';
import { store } from './src/store';
import { NavigationContainer, LinkingOptions } from '@react-navigation/native';
import RootNavigator from './src/navigation/RootNavigator';
import { Linking } from 'react-native';
import { supabase } from './src/api/supabase';
import type { RootState } from './src/store';
import { AuthStackParamList } from './src/navigation/types';

function AppContent() {
  const userEmail = useSelector((state: RootState) => state.auth.user?.email);

  useEffect(() => {
    // Función para extraer el token de la URL
    const extractTokenFromUrl = (url: string) => {
      try {
        const regex = /[?&]access_token=([^&]+)/;
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
          const { error } = await supabase.auth.verifyOtp({
            email: userEmail || '',
            token,
            type: 'email'
          });

          if (error) {
            console.error('Error al verificar email:', error.message);
          } else {
            console.log('Email verificado exitosamente');
          }
        }
      } catch (error) {
        console.error('Error procesando deep link:', error);
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
    prefixes: ['bluelectric://', 'https://bluelectric.app'],
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
        if (path.includes('access_token')) {
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