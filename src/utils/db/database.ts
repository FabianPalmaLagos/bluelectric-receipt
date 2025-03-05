import * as SQLite from 'expo-sqlite';
import { SQLResultSet, DatabaseConnection } from './types';

// Configuración de la base de datos
const DATABASE_NAME = "bluelectric.db";

export class Database implements DatabaseConnection {
  private static instance: Database;
  private _db: SQLite.SQLiteDatabase | null = null;
  private _initialized: boolean = false;

  private constructor() {}

  static getInstance(): Database {
    if (!Database.instance) {
      Database.instance = new Database();
    }
    return Database.instance;
  }

  private async ensureConnection() {
    try {
      if (!this._db) {
        console.log('Inicializando base de datos SQLite...');
        this._db = SQLite.openDatabaseSync(DATABASE_NAME);
        
        if (!this._db) {
          throw new Error('No se pudo crear la conexión a la base de datos');
        }

        console.log('Conexión a la base de datos establecida correctamente');
      }
      return this._db;
    } catch (error) {
      console.error('Error al obtener la conexión:', error);
      throw error;
    }
  }

  async init(): Promise<void> {
    try {
      if (this._initialized) {
        return;
      }

      const db = await this.ensureConnection();

      // Crear tablas en orden para respetar las relaciones
      await db.execAsync(`
        CREATE TABLE IF NOT EXISTS users (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          nombre TEXT NOT NULL,
          email TEXT NOT NULL UNIQUE,
          rol TEXT NOT NULL CHECK (rol IN ('ADMINISTRADOR', 'TRABAJADOR')) COLLATE NOCASE,
          foto_perfil TEXT,
          fecha_alta TEXT NOT NULL,
          created_at TEXT DEFAULT CURRENT_TIMESTAMP,
          updated_at TEXT DEFAULT CURRENT_TIMESTAMP
        )
      `);

      await db.execAsync(`
        CREATE TABLE IF NOT EXISTS projects (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          nombre TEXT NOT NULL,
          descripcion TEXT,
          fecha_creacion TEXT NOT NULL,
          created_at TEXT DEFAULT CURRENT_TIMESTAMP,
          updated_at TEXT DEFAULT CURRENT_TIMESTAMP
        )
      `);

      await db.execAsync(`
        CREATE TABLE IF NOT EXISTS categories (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          nombre TEXT NOT NULL UNIQUE,
          created_at TEXT DEFAULT CURRENT_TIMESTAMP,
          updated_at TEXT DEFAULT CURRENT_TIMESTAMP
        )
      `);

      await db.execAsync(`
        CREATE TABLE IF NOT EXISTS receipts (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          monto REAL NOT NULL,
          fecha TEXT NOT NULL,
          comercio TEXT NOT NULL,
          imagenUri TEXT NOT NULL,
          estado TEXT NOT NULL CHECK (estado IN ('pendiente', 'aprobado', 'rechazado')) COLLATE NOCASE,
          motivo_rechazo TEXT,
          usuario_id INTEGER NOT NULL,
          proyecto_id INTEGER NOT NULL,
          categoria_id INTEGER NOT NULL,
          created_at TEXT DEFAULT CURRENT_TIMESTAMP,
          updated_at TEXT DEFAULT CURRENT_TIMESTAMP,
          FOREIGN KEY (usuario_id) REFERENCES users (id) ON DELETE CASCADE,
          FOREIGN KEY (proyecto_id) REFERENCES projects (id) ON DELETE CASCADE,
          FOREIGN KEY (categoria_id) REFERENCES categories (id) ON DELETE CASCADE
        )
      `);

      await db.execAsync(`
        CREATE TABLE IF NOT EXISTS comments (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          texto TEXT NOT NULL,
          fecha TEXT NOT NULL,
          recibo_id INTEGER NOT NULL,
          usuario_id INTEGER NOT NULL,
          created_at TEXT DEFAULT CURRENT_TIMESTAMP,
          updated_at TEXT DEFAULT CURRENT_TIMESTAMP,
          FOREIGN KEY (recibo_id) REFERENCES receipts (id) ON DELETE CASCADE,
          FOREIGN KEY (usuario_id) REFERENCES users (id) ON DELETE CASCADE
        )
      `);

      this._initialized = true;
      console.log('Base de datos inicializada correctamente');
    } catch (error) {
      console.error('Error al inicializar la base de datos:', error);
      throw error;
    }
  }

  private async executeSql(sql: string, params: any[] = []): Promise<SQLResultSet> {
    const db = await this.ensureConnection();
    try {
      const result = await db.runAsync(sql, params);
      return {
        insertId: result.lastInsertRowId || 0,
        rowsAffected: result.changes,
        rows: {
          _array: await this.getRows(sql, params),
          length: await this.getRowCount(sql, params)
        }
      };
    } catch (error) {
      console.error('Error al ejecutar SQL:', sql, error);
      throw error;
    }
  }

  private async getRows(sql: string, params: any[] = []): Promise<any[]> {
    const db = await this.ensureConnection();
    const result = await db.getAllAsync(sql, params);
    return result || [];
  }

  private async getRowCount(sql: string, params: any[] = []): Promise<number> {
    const rows = await this.getRows(sql, params);
    return rows.length;
  }

  async query(sql: string, params: any[] = []): Promise<any[]> {
    const db = await this.ensureConnection();
    return db.getAllAsync(sql, params);
  }

  async insert(table: string, data: Record<string, any>): Promise<number> {
    // Asegurarse de que el rol esté en mayúsculas si es la tabla users
    if (table === 'users' && data.rol) {
      // Asegurar que el rol es uno de los valores permitidos
      const rolUpper = data.rol.toUpperCase();
      
      if (rolUpper === 'ADMINISTRADOR' || rolUpper === 'ADMIN' || rolUpper === 'ADMINISTRATOR') {
        data.rol = 'ADMINISTRADOR';
      } else if (rolUpper === 'TRABAJADOR' || rolUpper === 'WORKER') {
        data.rol = 'TRABAJADOR';
      } else {
        throw new Error(`Rol no válido: ${data.rol}. Debe ser 'ADMINISTRADOR' o 'TRABAJADOR'`);
      }
    }

    const cleanData = Object.fromEntries(
      Object.entries(data).filter(([_, value]) => value != null)
    );
    
    const keys = Object.keys(cleanData);
    const values = Object.values(cleanData);
    const placeholders = keys.map(() => '?').join(',');
    
    const sql = `INSERT INTO ${table} (${keys.join(',')}) VALUES (${placeholders})`;
    const result = await this.executeSql(sql, values);
    
    return result.insertId;
  }

  async update(table: string, id: number, data: Record<string, any>): Promise<number> {
    // Asegurarse de que el rol esté en mayúsculas si es la tabla users
    if (table === 'users' && data.rol) {
      data.rol = data.rol.toUpperCase();
    }

    const cleanData = Object.fromEntries(
      Object.entries(data).filter(([_, value]) => value != null)
    );
    
    const keys = Object.keys(cleanData);
    const values = Object.values(cleanData);
    const setClause = keys.map(key => `${key} = ?`).join(',');
    
    const sql = `UPDATE ${table} SET ${setClause} WHERE id = ?`;
    const result = await this.executeSql(sql, [...values, id]);
    
    return result.rowsAffected;
  }

  async delete(table: string, id: number): Promise<number> {
    const sql = `DELETE FROM ${table} WHERE id = ?`;
    const result = await this.executeSql(sql, [id]);
    return result.rowsAffected;
  }

  async cleanDatabase(): Promise<void> {
    try {
      const db = await this.ensureConnection();
      await db.execAsync('PRAGMA foreign_keys = OFF');

      const tables = ['comments', 'receipts', 'categories', 'projects', 'users'];
      for (const table of tables) {
        await db.execAsync(`DROP TABLE IF EXISTS ${table}`);
      }

      await db.execAsync('PRAGMA foreign_keys = ON');
      await this.init();
      
      console.log('Base de datos limpiada y reinicializada correctamente');
    } catch (error) {
      console.error('Error al limpiar la base de datos:', error);
      throw error;
    }
  }

  async executeQuery(sql: string, params: any[] = []): Promise<SQLResultSet> {
    return this.executeSql(sql, params);
  }
}