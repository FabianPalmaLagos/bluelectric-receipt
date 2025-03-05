import { BaseRepository } from './BaseRepository';
import { Category } from '../types';

interface CategoryWithStats {
  id: number;
  nombre: string;
  total_recibos: number;
  monto_total: number;
  ultimo_uso: string | null;
}

interface CategoryUsage {
  categoria_id: number;
  categoria_nombre: string;
  cantidad_uso: number;
  porcentaje_uso: number;
}

export class CategoryRepository extends BaseRepository<Category> {
  constructor() {
    super('categories');
  }

  async createCategory(category: Omit<Category, 'id'>): Promise<number> {
    // Verificar si ya existe una categoría con el mismo nombre
    const existing = await this.findByName(category.nombre);
    if (existing) {
      throw new Error(`Ya existe una categoría con el nombre "${category.nombre}"`);
    }
    return await this.create(category);
  }

  async findByName(name: string): Promise<Category | null> {
    return await this.findOneByField('nombre', name);
  }

  async getCategoryWithStats(id: number): Promise<CategoryWithStats | null> {
    const categories = await this.rawQuery(
      `SELECT 
        c.*,
        COUNT(r.id) as total_recibos,
        COALESCE(SUM(r.monto), 0) as monto_total,
        MAX(r.fecha) as ultimo_uso
      FROM categories c
      LEFT JOIN receipts r ON c.id = r.categoria_id
      WHERE c.id = ?
      GROUP BY c.id`,
      [id]
    );
    return categories.length > 0 ? categories[0] : null;
  }

  async getAllCategoriesWithStats(): Promise<CategoryWithStats[]> {
    return await this.rawQuery(
      `SELECT 
        c.*,
        COUNT(r.id) as total_recibos,
        COALESCE(SUM(r.monto), 0) as monto_total,
        MAX(r.fecha) as ultimo_uso
      FROM categories c
      LEFT JOIN receipts r ON c.id = r.categoria_id
      GROUP BY c.id
      ORDER BY total_recibos DESC`
    );
  }

  async getCategoryUsageStats(
    startDate?: string,
    endDate?: string
  ): Promise<CategoryUsage[]> {
    let sql = `
      WITH TotalRecibos AS (
        SELECT COUNT(*) as total
        FROM receipts
        WHERE 1=1
    `;
    const params: any[] = [];

    if (startDate) {
      sql += ' AND fecha >= ?';
      params.push(startDate);
    }
    if (endDate) {
      sql += ' AND fecha <= ?';
      params.push(endDate);
    }

    sql += `
      )
      SELECT 
        c.id as categoria_id,
        c.nombre as categoria_nombre,
        COUNT(r.id) as cantidad_uso,
        ROUND(CAST(COUNT(r.id) AS FLOAT) * 100 / MAX(t.total), 2) as porcentaje_uso
      FROM categories c
      LEFT JOIN receipts r ON c.id = r.categoria_id
      CROSS JOIN TotalRecibos t
    `;

    if (startDate || endDate) {
      sql += ' WHERE 1=1';
      if (startDate) {
        sql += ' AND r.fecha >= ?';
        params.push(startDate);
      }
      if (endDate) {
        sql += ' AND r.fecha <= ?';
        params.push(endDate);
      }
    }

    sql += `
      GROUP BY c.id, c.nombre
      ORDER BY cantidad_uso DESC
    `;

    return await this.rawQuery(sql, params);
  }

  async getUnusedCategories(daysThreshold: number = 30): Promise<Category[]> {
    const date = new Date();
    date.setDate(date.getDate() - daysThreshold);

    return await this.rawQuery(
      `SELECT c.* 
       FROM categories c
       LEFT JOIN receipts r ON c.id = r.categoria_id
       GROUP BY c.id
       HAVING MAX(r.fecha) < ? OR MAX(r.fecha) IS NULL`,
      [date.toISOString()]
    );
  }

  async getMostUsedCategories(limit: number = 5): Promise<CategoryWithStats[]> {
    return await this.rawQuery(
      `SELECT 
        c.*,
        COUNT(r.id) as total_recibos,
        COALESCE(SUM(r.monto), 0) as monto_total,
        MAX(r.fecha) as ultimo_uso
      FROM categories c
      LEFT JOIN receipts r ON c.id = r.categoria_id
      GROUP BY c.id
      ORDER BY total_recibos DESC
      LIMIT ?`,
      [limit]
    );
  }

  async searchCategories(query: string): Promise<Category[]> {
    return await this.rawQuery(
      `SELECT * FROM categories 
       WHERE nombre LIKE ?
       ORDER BY nombre`,
      [`%${query}%`]
    );
  }
}