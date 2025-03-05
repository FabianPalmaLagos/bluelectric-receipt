/**
 * Este archivo centraliza todas las exportaciones para evitar ciclos de dependencia
 */

import { db } from './index';
import { runMigration, checkMigrationStatus } from './migration';
import * as types from './types';

// Re-exportar todo
export {
  db,
  runMigration,
  checkMigrationStatus,
  types
};

// Re-exportar tipos comunes
export type { 
  User, 
  Project, 
  Category, 
  Receipt, 
  Comment,
  DatabaseConnection,
  SQLResultSet
} from './types';

// Utilidades para conversión de IDs
export const numberToStringId = (id: number): string => String(id);
export const stringToNumberId = (id: string): number => Number(id); 