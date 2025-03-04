/**
 * Utilidades para validar los datos extraídos por OCR
 * 
 * Este módulo contiene funciones para validar y normalizar los datos
 * extraídos del texto reconocido por OCR.
 */

import { ReceiptData } from '../../types/receipt';

/**
 * Valida y corrige los datos extraídos por OCR
 * 
 * @param data Datos extraídos por OCR
 * @returns Datos validados y corregidos
 */
export const validateExtractedData = (data: ReceiptData): ReceiptData => {
  return {
    merchant: validateMerchant(data.merchant),
    amount: validateAmount(data.amount),
    date: validateDate(data.date),
    rawText: data.rawText,
    confidence: calculateAdjustedConfidence(data)
  };
};

/**
 * Valida y corrige el nombre del comercio
 * 
 * @param merchant Nombre del comercio extraído
 * @returns Nombre del comercio validado
 */
const validateMerchant = (merchant?: string): string | undefined => {
  if (!merchant) return undefined;
  
  // Eliminar caracteres no deseados
  let cleaned = merchant.trim()
    .replace(/^[^a-zA-Z0-9áéíóúÁÉÍÓÚüÜñÑ]+/, '') // Eliminar caracteres no alfanuméricos al inicio
    .replace(/[^a-zA-Z0-9áéíóúÁÉÍÓÚüÜñÑ]+$/, ''); // Eliminar caracteres no alfanuméricos al final
  
  // Convertir múltiples espacios en uno solo
  cleaned = cleaned.replace(/\s+/g, ' ');
  
  // Normalizar capitalización (primera letra de cada palabra en mayúscula)
  if (cleaned === cleaned.toUpperCase() || cleaned === cleaned.toLowerCase()) {
    cleaned = cleaned.toLowerCase()
      .split(' ')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  }
  
  // Si después de la limpieza queda un texto muy corto, rechazarlo
  if (cleaned.length < 3) return undefined;
  
  return cleaned;
};

/**
 * Valida y corrige el monto
 * 
 * @param amount Monto extraído
 * @returns Monto validado
 */
const validateAmount = (amount?: number): number | undefined => {
  if (amount === undefined) return undefined;
  
  // Verificar que el monto sea positivo
  if (amount <= 0) return undefined;
  
  // Verificar que el monto no sea absurdamente grande (ej. por error de OCR)
  if (amount > 1000000) return undefined;
  
  // Redondear a 2 decimales
  return Math.round(amount * 100) / 100;
};

/**
 * Valida y corrige la fecha
 * 
 * @param date Fecha extraída
 * @returns Fecha validada
 */
const validateDate = (date?: Date): Date | undefined => {
  if (!date) return undefined;
  
  // Verificar que la fecha sea válida
  if (isNaN(date.getTime())) return undefined;
  
  // Verificar que la fecha no sea en el futuro
  const today = new Date();
  if (date > today) return undefined;
  
  // Verificar que la fecha no sea demasiado antigua (más de 5 años)
  const fiveYearsAgo = new Date();
  fiveYearsAgo.setFullYear(today.getFullYear() - 5);
  if (date < fiveYearsAgo) return undefined;
  
  return date;
};

/**
 * Calcula el nivel de confianza ajustado basado en las validaciones
 * 
 * @param data Datos extraídos por OCR
 * @returns Objeto con niveles de confianza ajustados
 */
const calculateAdjustedConfidence = (data: ReceiptData): ReceiptData['confidence'] => {
  const baseConfidence = data.confidence || {
    merchant: 0.5,
    amount: 0.5,
    date: 0.5,
    overall: 0.5
  };
  
  // Ajustar confianza basada en si los datos pasaron la validación
  const merchantConfidence = data.merchant ? baseConfidence.merchant : 0;
  const amountConfidence = data.amount ? baseConfidence.amount : 0;
  const dateConfidence = data.date ? baseConfidence.date : 0;
  
  // Calcular confianza general
  const validFields = [
    !!data.merchant, 
    !!data.amount, 
    !!data.date
  ].filter(Boolean).length;
  
  const overall = validFields > 0 
    ? (merchantConfidence + amountConfidence + dateConfidence) / validFields
    : 0;
  
  return {
    merchant: merchantConfidence,
    amount: amountConfidence,
    date: dateConfidence,
    overall
  };
}; 