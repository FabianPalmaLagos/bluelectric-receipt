import { BaseRepository } from './BaseRepository';
import { Project } from '../types';

interface ProjectWithStats {
  id: number;
  nombre: string;
  descripcion: string;
  fecha_creacion: string;
  total_recibos: number;
  monto_total: number;
  recibos_pendientes: number;
  recibos_aprobados: number;
  recibos_rechazados: number;
}

export class ProjectRepository extends BaseRepository<Project> {
  constructor() {
    super('projects');
  }

  async createProject(project: Omit<Project, 'id'>): Promise<number> {
    // Asegurar que fecha_creacion esté presente
    const projectData = {
      ...project,
      fecha_creacion: project.fecha_creacion || new Date().toISOString()
    };
    return await this.create(projectData);
  }

  async getProjectWithStats(id: number): Promise<ProjectWithStats | null> {
    const projects = await this.rawQuery(
      `SELECT 
        p.*,
        COUNT(r.id) as total_recibos,
        COALESCE(SUM(r.monto), 0) as monto_total,
        SUM(CASE WHEN r.estado = 'pendiente' THEN 1 ELSE 0 END) as recibos_pendientes,
        SUM(CASE WHEN r.estado = 'aprobado' THEN 1 ELSE 0 END) as recibos_aprobados,
        SUM(CASE WHEN r.estado = 'rechazado' THEN 1 ELSE 0 END) as recibos_rechazados
      FROM projects p
      LEFT JOIN receipts r ON p.id = r.proyecto_id
      WHERE p.id = ?
      GROUP BY p.id`,
      [id]
    );
    return projects.length > 0 ? projects[0] : null;
  }

  async getAllProjectsWithStats(): Promise<ProjectWithStats[]> {
    return await this.rawQuery(
      `SELECT 
        p.*,
        COUNT(r.id) as total_recibos,
        COALESCE(SUM(r.monto), 0) as monto_total,
        SUM(CASE WHEN r.estado = 'pendiente' THEN 1 ELSE 0 END) as recibos_pendientes,
        SUM(CASE WHEN r.estado = 'aprobado' THEN 1 ELSE 0 END) as recibos_aprobados,
        SUM(CASE WHEN r.estado = 'rechazado' THEN 1 ELSE 0 END) as recibos_rechazados
      FROM projects p
      LEFT JOIN receipts r ON p.id = r.proyecto_id
      GROUP BY p.id
      ORDER BY p.fecha_creacion DESC`
    );
  }

  async searchProjects(query: string): Promise<Project[]> {
    return await this.rawQuery(
      `SELECT * FROM projects 
       WHERE nombre LIKE ? OR descripcion LIKE ?
       ORDER BY fecha_creacion DESC`,
      [`%${query}%`, `%${query}%`]
    );
  }

  async getProjectsByDateRange(startDate: string, endDate: string): Promise<Project[]> {
    return await this.rawQuery(
      `SELECT * FROM projects 
       WHERE fecha_creacion BETWEEN ? AND ?
       ORDER BY fecha_creacion DESC`,
      [startDate, endDate]
    );
  }

  async getActiveProjects(): Promise<Project[]> {
    // Considera un proyecto activo si tiene recibos en los últimos 30 días
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

    return await this.rawQuery(
      `SELECT DISTINCT p.* 
       FROM projects p
       LEFT JOIN receipts r ON p.id = r.proyecto_id
       WHERE r.fecha >= ?
       ORDER BY p.fecha_creacion DESC`,
      [thirtyDaysAgo.toISOString()]
    );
  }

  async getProjectMetrics(id: number): Promise<{
    gastos_por_categoria: Array<{ categoria: string; total: number }>;
    gastos_por_mes: Array<{ mes: string; total: number }>;
  }> {
    const gastosPorCategoria = await this.rawQuery(
      `SELECT 
        c.nombre as categoria,
        COALESCE(SUM(r.monto), 0) as total
      FROM categories c
      LEFT JOIN receipts r ON c.id = r.categoria_id
      WHERE r.proyecto_id = ?
      GROUP BY c.id, c.nombre
      ORDER BY total DESC`,
      [id]
    );

    const gastosPorMes = await this.rawQuery(
      `SELECT 
        strftime('%Y-%m', r.fecha) as mes,
        COALESCE(SUM(r.monto), 0) as total
      FROM receipts r
      WHERE r.proyecto_id = ?
      GROUP BY mes
      ORDER BY mes DESC`,
      [id]
    );

    return {
      gastos_por_categoria: gastosPorCategoria,
      gastos_por_mes: gastosPorMes
    };
  }
}