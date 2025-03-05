// Tipos de usuario
export enum UserRole {
  ADMIN = 'admin',
  WORKER = 'worker',
}

export interface User {
  id: string;
  email: string;
  role: UserRole;
  firstName: string;
  lastName: string;
  createdAt: string;
}

// Tipos de proyecto
export interface Project {
  id: string;
  name: string;
  description: string;
  createdAt: string;
  updatedAt: string;
}

// Tipos de categoría
export interface Category {
  id: string;
  name: string;
  projectId: string;
}

// Estados de recibos
export enum ReceiptStatus {
  PENDING = 'pending',
  APPROVED = 'approved',
  REJECTED = 'rejected',
}

// Tipos de recibo
export interface Receipt {
  id: string;
  tempId?: string; // ID temporal para operaciones offline
  userId: string;
  projectId: string;
  categoryId: string;
  amount: number;
  date: string;
  merchant: string;
  description: string;
  imageUrl: string;
  status: ReceiptStatus;
  rejectionReason?: string;
  createdAt: string;
  updatedAt: string;
  isOffline?: boolean; // Indica si el recibo está pendiente de sincronizar
}

// Tipos de comentario
export interface Comment {
  id: string;
  receiptId: string;
  userId: string;
  text: string;
  createdAt: string;
}

// Tipos para OCR
export interface OCRResult {
  merchant?: string;
  date?: string;
  amount?: number;
  items?: Array<{
    description: string;
    price: number;
  }>;
  total?: number;
  taxAmount?: number;
} 