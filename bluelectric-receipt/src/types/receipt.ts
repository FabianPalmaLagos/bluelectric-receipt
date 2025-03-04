/**
 * Tipos relacionados con recibos y OCR
 */

export type ReceiptStatus = 'pending' | 'approved' | 'rejected';

/**
 * Interfaz para los datos extraídos por OCR
 */
export interface ReceiptData {
  /**
   * Nombre del comercio extraído del recibo
   */
  merchant?: string;
  
  /**
   * Monto total del recibo
   */
  amount?: number;
  
  /**
   * Fecha del recibo
   */
  date?: Date;
  
  /**
   * Texto completo extraído del recibo
   */
  rawText?: string;
  
  /**
   * Nivel de confianza en la extracción (0-1)
   */
  confidence?: {
    merchant?: number;
    amount?: number;
    date?: number;
    overall?: number;
  };
}

/**
 * Interfaz principal de un recibo
 */
export interface Receipt {
  id: string;
  userId: string;
  projectId: string;
  merchant: string;
  amount: number;
  date: string;
  description?: string;
  imageUrl: string;
  status: ReceiptStatus;
  rejectionReason?: string;
  createdAt: string;
  updatedAt: string;
  comments?: Comment[];
}

/**
 * Interfaz para comentarios en recibos
 */
export interface Comment {
  id: string;
  receiptId: string;
  userId: string;
  text: string;
  timestamp: string;
}

/**
 * Interfaz para resultados de OCR brutos
 */
export interface OCRResult {
  text: string;
  blocks?: OCRBlock[];
}

/**
 * Interfaz para bloques de texto detectados por OCR
 */
export interface OCRBlock {
  text: string;
  confidence: number;
  boundingBox?: {
    x: number;
    y: number;
    width: number;
    height: number;
  };
} 