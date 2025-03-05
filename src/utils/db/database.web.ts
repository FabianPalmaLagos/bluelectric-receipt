/**
 * Implementación web de la base de datos
 * Esta es una versión simulada para desarrollo web que usa localStorage
 */

import { SQLResultSet } from './types';

class WebDatabase {
  private static instance: WebDatabase;
  private _initialized: boolean = false;

  private constructor() {}

  static getInstance(): WebDatabase {
    if (!WebDatabase.instance) {
      WebDatabase.instance = new WebDatabase();
    }
    return WebDatabase.instance;
  }

  async init(): Promise<void> {
    try {
      if (this._initialized) return;

      console.log('Inicializando almacenamiento web...');
      
      // Inicializar estructuras básicas en localStorage si no existen
      if (!localStorage.getItem('categories')) {
        localStorage.setItem('categories', JSON.stringify([]));
      }
      if (!localStorage.getItem('users')) {
        localStorage.setItem('users', JSON.stringify([]));
      }
      if (!localStorage.getItem('projects')) {
        localStorage.setItem('projects', JSON.stringify([]));
      }

      this._initialized = true;
      console.log('Almacenamiento web inicializado correctamente');
    } catch (error) {
      console.error('Error al inicializar almacenamiento web:', error);
      throw error;
    }
  }

  async query(sql: string, params: any[] = []): Promise<any[]> {
    // Simulación básica de consultas
    if (sql.includes('COUNT(*) as count FROM categories')) {
      const categories = JSON.parse(localStorage.getItem('categories') || '[]');
      return [{ count: categories.length }];
    }
    if (sql.includes('COUNT(*) as count FROM projects')) {
      const projects = JSON.parse(localStorage.getItem('projects') || '[]');
      return [{ count: projects.length }];
    }
    if (sql.includes('COUNT(*) as count FROM users')) {
      const users = JSON.parse(localStorage.getItem('users') || '[]');
      return [{ count: users.length }];
    }
    return [];
  }

  async insert(table: string, data: Record<string, any>): Promise<number> {
    const items = JSON.parse(localStorage.getItem(table) || '[]');
    const newItem = { id: items.length + 1, ...data };
    items.push(newItem);
    localStorage.setItem(table, JSON.stringify(items));
    return newItem.id;
  }

  async update(table: string, id: number, data: Record<string, any>): Promise<number> {
    const items = JSON.parse(localStorage.getItem(table) || '[]');
    const index = items.findIndex((item: any) => item.id === id);
    if (index >= 0) {
      items[index] = { ...items[index], ...data };
      localStorage.setItem(table, JSON.stringify(items));
      return 1;
    }
    return 0;
  }

  async delete(table: string, id: number): Promise<number> {
    const items = JSON.parse(localStorage.getItem(table) || '[]');
    const filteredItems = items.filter((item: any) => item.id !== id);
    localStorage.setItem(table, JSON.stringify(filteredItems));
    return items.length - filteredItems.length;
  }

  async executeQuery(sql: string, params: any[] = []): Promise<SQLResultSet> {
    return {
      insertId: 0,
      rowsAffected: 0,
      rows: {
        _array: [],
        length: 0
      }
    };
  }

  async cleanDatabase(): Promise<void> {
    localStorage.clear();
    await this.init();
  }
}

export const db = WebDatabase.getInstance();