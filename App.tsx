import React, { useEffect, useState } from 'react';
import { Provider, useSelector } from 'react-redux';
import { store } from './src/store';
import { NavigationContainer, LinkingOptions } from '@react-navigation/native';
import RootNavigator from './src/navigation/RootNavigator';
import { Alert, Text, View, ActivityIndicator, StyleSheet, Button } from 'react-native';
import type { RootState } from './src/store';
import { AuthStackParamList } from './src/navigation/types';
import { db, runMigration, checkMigrationStatus } from './src/utils/db/exports';
import NetInfo from '@react-native-community/netinfo';

function AppContent() {
  const isAuthenticated = useSelector((state: RootState) => state.auth.user !== null);
  const [isDbReady, setIsDbReady] = useState(false);
  const [dbError, setDbError] = useState<string | null>(null);
  const [networkError, setNetworkError] = useState<string | null>(null);
  const [isOffline, setIsOffline] = useState(false);
  const [initializationAttempted, setInitializationAttempted] = useState(false);

  // Verificar conectividad
  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener(state => {
      setIsOffline(!state.isConnected);
    });

    // Verificar estado inicial
    NetInfo.fetch().then(state => {
      setIsOffline(!state.isConnected);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  // Inicialización de la base de datos
  useEffect(() => {
    const setupDatabase = async () => {
      if (initializationAttempted || isDbReady) {
        return; // Evitar reintentos si ya se intentó o ya está lista
      }

      setInitializationAttempted(true);

      try {
        console.log('Inicializando base de datos SQLite...');
        await db.init();
        console.log('Base de datos inicializada correctamente');

        // Verificar si ya hay datos
        const status = await checkMigrationStatus();
        console.log('Estado de la migración:', status);

        if (status.categoriesCount > 0) {
          // Si ya hay datos, la base de datos está lista
          console.log('La base de datos ya está inicializada y lista para usar');
          setIsDbReady(true);
          return;
        }

        // Si no hay datos, ejecutar la migración
        try {
          await runMigration();
          setIsDbReady(true);
        } catch (migrationError) {
          if (migrationError instanceof Error && 
              migrationError.message.includes('UNIQUE constraint failed')) {
            // Si el error es por duplicados, verificamos que realmente hay datos
            const verifyStatus = await checkMigrationStatus();
            if (verifyStatus.categoriesCount > 0) {
              setIsDbReady(true);
              return;
            }
          }
          throw migrationError;
        }
      } catch (error) {
        console.error('Error al inicializar la base de datos:', error);
        
        if (error instanceof Error &&
            (error.message.includes('Network') || 
             error.message.includes('network') || 
             error.message.includes('offline'))) {
          setNetworkError(error.message);
        } else {
          setDbError(error instanceof Error ? error.message : 'Error desconocido');
        }
        
        // Si la base de datos está inicializada pero hay error de red,
        // permitimos continuar en modo offline
        if (await checkMigrationStatus().catch(() => null)) {
          continueOffline();
        }
      }
    };

    setupDatabase();
  }, [initializationAttempted, isDbReady]);

  const retryInitialization = () => {
    if (isDbReady) return; // No reintentar si ya está lista
    setDbError(null);
    setNetworkError(null);
    setInitializationAttempted(false); // Permitir un nuevo intento
  };

  const continueOffline = async () => {
    try {
      const status = await checkMigrationStatus();
      if (status && status.categoriesCount > 0) {
        setNetworkError(null);
        setIsDbReady(true);
        console.log('Continuando en modo offline con base de datos existente');
      }
    } catch (error) {
      console.error('Error al continuar offline:', error);
      setDbError('No se pudo acceder a la base de datos en modo offline');
    }
  };

  const linking: LinkingOptions<AuthStackParamList> = {
    prefixes: [
      'bluelectric://'
    ],
    config: {
      screens: {
        Login: 'login',
        Register: 'register',
        ForgotPassword: 'forgot-password'
      }
    }
  };

  // Pantalla de carga mientras se inicializa la base de datos
  if (!isDbReady && !dbError && !networkError) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0096D2" />
        <Text style={styles.loadingText}>Inicializando base de datos...</Text>
      </View>
    );
  }

  // Pantalla de error si hay un problema con la red
  if (networkError) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorTitle}>Error de conexión</Text>
        <Text style={styles.errorText}>
          No se pudo establecer conexión con el servidor. 
          {isOffline ? ' Parece que estás sin conexión a internet.' : ''}
        </Text>
        <Text style={styles.errorDetail}>{networkError}</Text>
        <View style={styles.buttonContainer}>
          <Button 
            title="Reintentar" 
            onPress={retryInitialization} 
            color="#0096D2"
          />
          <Button 
            title="Continuar sin conexión" 
            onPress={continueOffline}
            color="#005D9F"
          />
        </View>
      </View>
    );
  }

  // Pantalla de error si falla la inicialización de la base de datos
  if (dbError) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorTitle}>Error en la base de datos</Text>
        <Text style={styles.errorText}>No se pudo inicializar la base de datos.</Text>
        <Text style={styles.errorDetail}>{dbError}</Text>
        <Button 
          title="Reintentar" 
          onPress={retryInitialization}
          color="#0096D2"
        />
      </View>
    );
  }

  return (
    <NavigationContainer linking={linking}>
      {isOffline && (
        <View style={styles.offlineBanner}>
          <Text style={styles.offlineText}>Modo sin conexión</Text>
        </View>
      )}
      <RootNavigator />
    </NavigationContainer>
  );
}

// Estilos para las pantallas de carga y error
const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5F5F5',
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: '#333',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5F5F5',
    padding: 20,
  },
  errorTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#D32F2F',
    marginBottom: 10,
  },
  errorText: {
    fontSize: 16,
    color: '#333',
    marginBottom: 20,
    textAlign: 'center',
  },
  errorDetail: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    padding: 10,
    backgroundColor: '#EEEEEE',
    borderRadius: 4,
    width: '100%',
    marginBottom: 20,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    marginTop: 10,
  },
  offlineBanner: {
    backgroundColor: '#FF9800',
    padding: 5,
    alignItems: 'center',
  },
  offlineText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default function App() {
  return (
    <Provider store={store}>
      <AppContent />
    </Provider>
  );
}