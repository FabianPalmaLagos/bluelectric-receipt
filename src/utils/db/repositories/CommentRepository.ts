import { BaseRepository } from './BaseRepository';
import { Comment } from '../types';

interface CommentWithUser {
  id: number;
  texto: string;
  fecha: string;
  recibo_id: number;
  usuario_id: number;
  usuario_nombre: string;
  created_at: string;
  updated_at: string;
}

export class CommentRepository extends BaseRepository<Comment> {
  constructor() {
    super('comments');
  }

  async createComment(comment: Omit<Comment, 'id'>): Promise<number> {
    // Asegurar que la fecha esté presente
    const commentData = {
      ...comment,
      fecha: comment.fecha || new Date().toISOString()
    };
    return await this.create(commentData);
  }

  async getCommentWithUser(id: number): Promise<CommentWithUser | null> {
    const comments = await this.rawQuery(
      `SELECT 
        c.*,
        u.nombre as usuario_nombre
      FROM comments c
      LEFT JOIN users u ON c.usuario_id = u.id
      WHERE c.id = ?`,
      [id]
    );
    return comments.length > 0 ? comments[0] : null;
  }

  async getCommentsForReceipt(receiptId: number): Promise<CommentWithUser[]> {
    return await this.rawQuery(
      `SELECT 
        c.*,
        u.nombre as usuario_nombre
      FROM comments c
      LEFT JOIN users u ON c.usuario_id = u.id
      WHERE c.recibo_id = ?
      ORDER BY c.fecha DESC`,
      [receiptId]
    );
  }

  async getRecentComments(
    limit: number = 10,
    userId?: number
  ): Promise<CommentWithUser[]> {
    let sql = `
      SELECT 
        c.*,
        u.nombre as usuario_nombre
      FROM comments c
      LEFT JOIN users u ON c.usuario_id = u.id
    `;
    const params: any[] = [];

    if (userId) {
      sql += ' WHERE c.usuario_id = ?';
      params.push(userId);
    }

    sql += ` ORDER BY c.fecha DESC LIMIT ?`;
    params.push(limit);

    return await this.rawQuery(sql, params);
  }

  async getCommentsByUser(userId: number): Promise<CommentWithUser[]> {
    return await this.rawQuery(
      `SELECT 
        c.*,
        u.nombre as usuario_nombre
      FROM comments c
      LEFT JOIN users u ON c.usuario_id = u.id
      WHERE c.usuario_id = ?
      ORDER BY c.fecha DESC`,
      [userId]
    );
  }

  async searchComments(
    query: string,
    options: {
      receiptId?: number;
      userId?: number;
      startDate?: string;
      endDate?: string;
    } = {}
  ): Promise<CommentWithUser[]> {
    let sql = `
      SELECT 
        c.*,
        u.nombre as usuario_nombre
      FROM comments c
      LEFT JOIN users u ON c.usuario_id = u.id
      WHERE c.texto LIKE ?
    `;
    const params: any[] = [`%${query}%`];

    if (options.receiptId) {
      sql += ' AND c.recibo_id = ?';
      params.push(options.receiptId);
    }
    if (options.userId) {
      sql += ' AND c.usuario_id = ?';
      params.push(options.userId);
    }
    if (options.startDate) {
      sql += ' AND c.fecha >= ?';
      params.push(options.startDate);
    }
    if (options.endDate) {
      sql += ' AND c.fecha <= ?';
      params.push(options.endDate);
    }

    sql += ' ORDER BY c.fecha DESC';
    return await this.rawQuery(sql, params);
  }

  async getCommentCount(options: {
    receiptId?: number;
    userId?: number;
    startDate?: string;
    endDate?: string;
  } = {}): Promise<number> {
    let sql = 'SELECT COUNT(*) as count FROM comments WHERE 1=1';
    const params: any[] = [];

    if (options.receiptId) {
      sql += ' AND recibo_id = ?';
      params.push(options.receiptId);
    }
    if (options.userId) {
      sql += ' AND usuario_id = ?';
      params.push(options.userId);
    }
    if (options.startDate) {
      sql += ' AND fecha >= ?';
      params.push(options.startDate);
    }
    if (options.endDate) {
      sql += ' AND fecha <= ?';
      params.push(options.endDate);
    }

    const result = await this.rawQuery(sql, params);
    return result[0].count;
  }

  async deleteCommentsForReceipt(receiptId: number): Promise<number> {
    const result = await this.executeQuery(
      'DELETE FROM comments WHERE recibo_id = ?',
      [receiptId]
    );
    return result.rowsAffected;
  }
}