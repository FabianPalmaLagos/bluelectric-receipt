export interface SQLResultSet {
  insertId: number;
  rowsAffected: number;
  rows: {
    _array: any[];
    length: number;
  };
}

// Interfaces de datos
export interface User {
  id?: number;
  nombre: string;
  email: string;
  rol: 'ADMINISTRADOR' | 'TRABAJADOR';
  foto_perfil?: string;
  fecha_alta: string;
}

export interface Project {
  id?: number;
  nombre: string;
  descripcion?: string;
  fecha_creacion: string;
}

export interface Category {
  id?: number;
  nombre: string;
}

export interface Receipt {
  id?: number;
  monto: number;
  fecha: string;
  comercio: string;
  imagenUri: string;
  estado: 'pendiente' | 'aprobado' | 'rechazado';
  motivo_rechazo?: string;
  usuario_id: number;
  proyecto_id: number;
  categoria_id: number;
}

export interface Comment {
  id?: number;
  texto: string;
  fecha: string;
  recibo_id: number;
  usuario_id: number;
}

// Interfaz común para implementaciones de base de datos
export interface DatabaseConnection {
  init(): Promise<void>;
  query(sql: string, params?: any[]): Promise<any[]>;
  insert(table: string, data: Record<string, any>): Promise<number>;
  update(table: string, id: number, data: Record<string, any>): Promise<number>;
  delete(table: string, id: number): Promise<number>;
  executeQuery(sql: string, params?: any[]): Promise<SQLResultSet>;
  cleanDatabase(): Promise<void>;
}