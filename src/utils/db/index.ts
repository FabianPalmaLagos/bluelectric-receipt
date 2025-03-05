import { Platform } from 'react-native';
import { DatabaseConnection } from './types';
import { Database } from './database';
import * as WebDB from './database.web';

let dbInstance: DatabaseConnection;

if (Platform.OS === 'web') {
  console.log('Usando implementación web de la base de datos');
  dbInstance = WebDB.db;
} else {
  console.log('Usando implementación nativa de la base de datos');
  dbInstance = Database.getInstance();
}

// Asegurarnos de que tenemos una instancia válida
if (!dbInstance) {
  throw new Error('No se pudo inicializar la base de datos');
}

// Re-exportar la instancia de base de datos
export const db = dbInstance;

// Exportar los tipos
export * from './types';

// Re-exportar las funciones de migración
export * from './migration';