import { db } from '../index';
import { SQLResultSet } from '../types';

export abstract class BaseRepository<T> {
  protected tableName: string;

  constructor(tableName: string) {
    this.tableName = tableName;
  }

  async findById(id: number): Promise<T | null> {
    const results = await db.query(
      `SELECT * FROM ${this.tableName} WHERE id = ?`,
      [id]
    );
    return results.length > 0 ? results[0] : null;
  }

  async findAll(): Promise<T[]> {
    return await db.query(`SELECT * FROM ${this.tableName}`);
  }

  async create(data: Partial<T>): Promise<number> {
    // Agregar timestamps
    const dataWithTimestamps = {
      ...data,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    };
    return await db.insert(this.tableName, dataWithTimestamps);
  }

  async update(id: number, data: Partial<T>): Promise<boolean> {
    // Agregar timestamp de actualización
    const dataWithTimestamp = {
      ...data,
      updated_at: new Date().toISOString()
    };
    const result = await db.update(this.tableName, id, dataWithTimestamp);
    return result > 0;
  }

  async delete(id: number): Promise<boolean> {
    const result = await db.delete(this.tableName, id);
    return result > 0;
  }

  protected async findByField(field: string, value: any): Promise<T[]> {
    return await db.query(
      `SELECT * FROM ${this.tableName} WHERE ${field} = ?`,
      [value]
    );
  }

  protected async findOneByField(field: string, value: any): Promise<T | null> {
    const results = await this.findByField(field, value);
    return results.length > 0 ? results[0] : null;
  }

  protected async executeQuery(sql: string, params: any[] = []): Promise<SQLResultSet> {
    return await db.executeQuery(sql, params);
  }

  protected async rawQuery(sql: string, params: any[] = []): Promise<any[]> {
    return await db.query(sql, params);
  }
}