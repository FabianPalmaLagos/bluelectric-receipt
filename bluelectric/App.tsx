import React, { useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from './src/store';
import RootNavigator from './src/navigation/RootNavigator';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from './src/store';
import { getCurrentUser } from './src/store/slices/authSlice';
import { setOfflineStatus } from './src/store/slices/uiSlice';
import NetInfo from '@react-native-community/netinfo';

// Componente para manejar la lógica de la aplicación
const AppContent = () => {
  const dispatch = useDispatch();
  const { theme } = useSelector((state: RootState) => state.ui);

  useEffect(() => {
    // Verificar si hay un usuario autenticado al iniciar la aplicación
    // @ts-ignore - Ignoramos el error de tipado por ahora
    dispatch(getCurrentUser());

    // Configurar el listener para el estado de la conexión
    const unsubscribe = NetInfo.addEventListener(state => {
      // @ts-ignore - Ignoramos el error de tipado por ahora
      dispatch(setOfflineStatus(!state.isConnected));
    });

    return () => {
      // Limpiar el listener cuando el componente se desmonte
      unsubscribe();
    };
  }, [dispatch]);

  return (
    <SafeAreaProvider>
      <StatusBar style={theme === 'dark' ? 'light' : 'dark'} />
      <RootNavigator />
    </SafeAreaProvider>
  );
};

// Componente principal de la aplicación
export default function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <AppContent />
      </PersistGate>
    </Provider>
  );
} 