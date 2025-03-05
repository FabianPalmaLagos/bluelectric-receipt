import { BaseRepository } from './BaseRepository';
import { Receipt } from '../types';

interface ReceiptWithDetails extends Receipt {
  usuario_nombre: string;
  proyecto_nombre: string;
  categoria_nombre: string;
}

interface ReceiptStats {
  total_recibos: number;
  monto_total: number;
  pendientes: number;
  aprobados: number;
  rechazados: number;
}

interface ReceiptFilters {
  estado?: 'pendiente' | 'aprobado' | 'rechazado';
  usuario_id?: number;
  proyecto_id?: number;
  categoria_id?: number;
  fecha_inicio?: string;
  fecha_fin?: string;
  monto_minimo?: number;
  monto_maximo?: number;
}

export class ReceiptRepository extends BaseRepository<Receipt> {
  constructor() {
    super('receipts');
  }

  async createReceipt(receipt: Omit<Receipt, 'id' | 'created_at' | 'updated_at'>): Promise<number> {
    return await this.create(receipt);
  }

  async getReceiptWithDetails(id: number): Promise<ReceiptWithDetails | null> {
    const receipts = await this.rawQuery(
      `SELECT 
        r.*,
        u.nombre as usuario_nombre,
        p.nombre as proyecto_nombre,
        c.nombre as categoria_nombre
      FROM receipts r
      LEFT JOIN users u ON r.usuario_id = u.id
      LEFT JOIN projects p ON r.proyecto_id = p.id
      LEFT JOIN categories c ON r.categoria_id = c.id
      WHERE r.id = ?`,
      [id]
    );
    return receipts.length > 0 ? receipts[0] : null;
  }

  async updateReceiptStatus(
    id: number, 
    estado: 'pendiente' | 'aprobado' | 'rechazado',
    motivo_rechazo?: string
  ): Promise<boolean> {
    const updateData: Partial<Receipt> = { estado };
    if (estado === 'rechazado' && motivo_rechazo) {
      updateData.motivo_rechazo = motivo_rechazo;
    } else {
      updateData.motivo_rechazo = undefined;
    }
    return await this.update(id, updateData);
  }

  async findByFilters(filters: ReceiptFilters): Promise<ReceiptWithDetails[]> {
    let sql = `
      SELECT 
        r.*,
        u.nombre as usuario_nombre,
        p.nombre as proyecto_nombre,
        c.nombre as categoria_nombre
      FROM receipts r
      LEFT JOIN users u ON r.usuario_id = u.id
      LEFT JOIN projects p ON r.proyecto_id = p.id
      LEFT JOIN categories c ON r.categoria_id = c.id
      WHERE 1=1
    `;
    const params: any[] = [];

    if (filters.estado) {
      sql += ' AND r.estado = ?';
      params.push(filters.estado);
    }
    if (filters.usuario_id) {
      sql += ' AND r.usuario_id = ?';
      params.push(filters.usuario_id);
    }
    if (filters.proyecto_id) {
      sql += ' AND r.proyecto_id = ?';
      params.push(filters.proyecto_id);
    }
    if (filters.categoria_id) {
      sql += ' AND r.categoria_id = ?';
      params.push(filters.categoria_id);
    }
    if (filters.fecha_inicio) {
      sql += ' AND r.fecha >= ?';
      params.push(filters.fecha_inicio);
    }
    if (filters.fecha_fin) {
      sql += ' AND r.fecha <= ?';
      params.push(filters.fecha_fin);
    }
    if (filters.monto_minimo !== undefined) {
      sql += ' AND r.monto >= ?';
      params.push(filters.monto_minimo);
    }
    if (filters.monto_maximo !== undefined) {
      sql += ' AND r.monto <= ?';
      params.push(filters.monto_maximo);
    }

    sql += ' ORDER BY r.fecha DESC';
    return await this.rawQuery(sql, params);
  }

  async getStats(filters: Partial<ReceiptFilters> = {}): Promise<ReceiptStats> {
    let sql = `
      SELECT 
        COUNT(*) as total_recibos,
        COALESCE(SUM(monto), 0) as monto_total,
        SUM(CASE WHEN estado = 'pendiente' THEN 1 ELSE 0 END) as pendientes,
        SUM(CASE WHEN estado = 'aprobado' THEN 1 ELSE 0 END) as aprobados,
        SUM(CASE WHEN estado = 'rechazado' THEN 1 ELSE 0 END) as rechazados
      FROM receipts
      WHERE 1=1
    `;
    const params: any[] = [];

    // Aplicar los mismos filtros que en findByFilters
    if (filters.usuario_id) {
      sql += ' AND usuario_id = ?';
      params.push(filters.usuario_id);
    }
    if (filters.proyecto_id) {
      sql += ' AND proyecto_id = ?';
      params.push(filters.proyecto_id);
    }
    if (filters.categoria_id) {
      sql += ' AND categoria_id = ?';
      params.push(filters.categoria_id);
    }
    if (filters.fecha_inicio) {
      sql += ' AND fecha >= ?';
      params.push(filters.fecha_inicio);
    }
    if (filters.fecha_fin) {
      sql += ' AND fecha <= ?';
      params.push(filters.fecha_fin);
    }

    const stats = await this.rawQuery(sql, params);
    return stats[0];
  }

  async getReceiptsByUser(userId: number): Promise<Receipt[]> {
    return await this.findByField('usuario_id', userId);
  }

  async getReceiptsByProject(projectId: number): Promise<Receipt[]> {
    return await this.findByField('proyecto_id', projectId);
  }

  async getReceiptsByCategory(categoryId: number): Promise<Receipt[]> {
    return await this.findByField('categoria_id', categoryId);
  }
}