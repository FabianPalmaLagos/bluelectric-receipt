import { BaseRepository } from './BaseRepository';
import { User } from '../types';

export class UserRepository extends BaseRepository<User> {
  constructor() {
    super('users');
  }

  async findByEmail(email: string): Promise<User | null> {
    return await this.findOneByField('email', email);
  }

  async findByRole(role: 'ADMINISTRADOR' | 'TRABAJADOR'): Promise<User[]> {
    return await this.findByField('rol', role);
  }

  async createUser(user: Omit<User, 'id'>): Promise<number> {
    // Asegurar que fecha_alta esté presente
    const userData = {
      ...user,
      fecha_alta: user.fecha_alta || new Date().toISOString()
    };
    return await this.create(userData);
  }

  async updateUser(id: number, user: Partial<User>): Promise<boolean> {
    // No permitir actualizar el email a uno ya existente
    if (user.email) {
      const existingUser = await this.findByEmail(user.email);
      if (existingUser && existingUser.id !== id) {
        throw new Error('El email ya está en uso');
      }
    }
    return await this.update(id, user);
  }

  async validateCredentials(email: string, rol: 'ADMINISTRADOR' | 'TRABAJADOR'): Promise<User | null> {
    const users = await this.rawQuery(
      'SELECT * FROM users WHERE email = ? AND rol = ?',
      [email, rol]
    );
    return users.length > 0 ? users[0] : null;
  }

  async getActiveUsers(): Promise<User[]> {
    // Podríamos agregar un campo 'activo' en el futuro si se necesita
    return await this.findAll();
  }

  async searchUsers(query: string): Promise<User[]> {
    return await this.rawQuery(
      `SELECT * FROM users 
       WHERE nombre LIKE ? OR email LIKE ?`,
      [`%${query}%`, `%${query}%`]
    );
  }

  async getUsersStats(): Promise<{ 
    total: number, 
    admins: number, 
    workers: number 
  }> {
    const stats = await this.rawQuery(`
      SELECT 
        COUNT(*) as total,
        SUM(CASE WHEN rol = 'ADMINISTRADOR' THEN 1 ELSE 0 END) as admins,
        SUM(CASE WHEN rol = 'TRABAJADOR' THEN 1 ELSE 0 END) as workers
      FROM users
    `);
    return stats[0];
  }
}