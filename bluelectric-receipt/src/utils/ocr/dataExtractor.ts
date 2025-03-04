/**
 * Utilidades para extraer datos específicos del texto reconocido por OCR
 * 
 * Este módulo contiene funciones para identificar y extraer información
 * relevante como fechas, montos y nombres de comercios del texto reconocido.
 */

import { OCRResult, ReceiptData } from '../../types/receipt';

/**
 * Expresiones regulares para identificar diferentes patrones en los recibos
 */
const PATTERNS = {
  // Patrones para fechas (diferentes formatos)
  DATES: [
    // Formato DD/MM/YYYY
    /\b(0?[1-9]|[12][0-9]|3[01])[\/\-\.](0?[1-9]|1[012])[\/\-\.](\d{4}|\d{2})\b/,
    // Formato MM/DD/YYYY
    /\b(0?[1-9]|1[012])[\/\-\.](0?[1-9]|[12][0-9]|3[01])[\/\-\.](\d{4}|\d{2})\b/,
    // Formato YYYY/MM/DD
    /\b(\d{4})[\/\-\.](0?[1-9]|1[012])[\/\-\.](0?[1-9]|[12][0-9]|3[01])\b/,
    // Formato de fecha con mes escrito: 01 ENE 2023, 01-ENE-2023, etc.
    /\b(0?[1-9]|[12][0-9]|3[01])[\s\-\.](ENE|FEB|MAR|ABR|MAY|JUN|JUL|AGO|SEP|OCT|NOV|DIC)[\s\-\.](\d{4}|\d{2})\b/i
  ],
  
  // Patrones para montos de dinero
  AMOUNTS: [
    // Formato con $ y posibles separadores de miles y decimales
    /\$\s?([0-9,]+\.[0-9]{2}|[0-9.]+,[0-9]{2}|[0-9,]+)/,
    // Formato con símbolo de moneda al final
    /([0-9,]+\.[0-9]{2}|[0-9.]+,[0-9]{2}|[0-9,]+)\s?\$/,
    // Formato sin símbolo de moneda, pero con "total" cerca
    /TOTAL\s*(?:[\:\=])*\s*([0-9,]+\.[0-9]{2}|[0-9.]+,[0-9]{2}|[0-9,]+)/i,
    // Importes sin símbolo pero con "MXN" o similar
    /([0-9,]+\.[0-9]{2}|[0-9.]+,[0-9]{2}|[0-9,]+)\s?MXN/i
  ],
  
  // Patrones para identificar comercios (normalmente en las primeras líneas)
  MERCHANTS: [
    // Patrones comunes para nombres de comercios
    /^([A-Z][A-Z\s]+)$/m,           // Líneas completas en mayúsculas
    /NOMBRE\s*(?:[\:\=])*\s*(.+)$/im,  // "NOMBRE: XXXX"
    /COMERCIO\s*(?:[\:\=])*\s*(.+)$/im, // "COMERCIO: XXXX"
    /TIENDA\s*(?:[\:\=])*\s*(.+)$/im    // "TIENDA: XXXX"
  ]
};

/**
 * Meses en español para conversión de fechas
 */
const MESES_ESPANOL: {[key: string]: number} = {
  'ENE': 0, 'FEB': 1, 'MAR': 2, 'ABR': 3, 'MAY': 4, 'JUN': 5, 
  'JUL': 6, 'AGO': 7, 'SEP': 8, 'OCT': 9, 'NOV': 10, 'DIC': 11
};

/**
 * Extrae datos estructurados del texto reconocido por OCR
 * 
 * @param ocrResult Resultado del OCR
 * @returns Datos extraídos del recibo
 */
export const extractReceiptData = (ocrResult: OCRResult): ReceiptData => {
  const text = ocrResult.text;
  const lines = text.split('\n').filter(line => line.trim().length > 0);
  
  return {
    merchant: extractMerchant(text, lines),
    amount: extractAmount(text),
    date: extractDate(text),
    rawText: text,
    confidence: calculateConfidence(ocrResult)
  };
};

/**
 * Extrae el nombre del comercio del texto reconocido
 * 
 * @param text Texto completo
 * @param lines Líneas individuales del texto
 * @returns Nombre del comercio o undefined si no se encuentra
 */
const extractMerchant = (text: string, lines: string[]): string | undefined => {
  // Estrategia 1: Buscar patrones específicos
  for (const pattern of PATTERNS.MERCHANTS) {
    const match = text.match(pattern);
    if (match && match[1]) {
      return match[1].trim();
    }
  }
  
  // Estrategia 2: Tomar las primeras líneas en mayúsculas (común en recibos)
  // Las primeras 3 líneas suelen contener el nombre del comercio
  for (let i = 0; i < Math.min(3, lines.length); i++) {
    const line = lines[i].trim();
    // Si la línea está en mayúsculas y no es demasiado corta, puede ser el comercio
    if (line === line.toUpperCase() && line.length > 3 && !/^\d+$/.test(line)) {
      return line;
    }
  }
  
  return undefined;
};

/**
 * Extrae el monto total del recibo del texto reconocido
 * 
 * @param text Texto completo
 * @returns Monto como número o undefined si no se encuentra
 */
const extractAmount = (text: string): number | undefined => {
  for (const pattern of PATTERNS.AMOUNTS) {
    const match = text.match(pattern);
    if (match && match[1]) {
      // Limpiar y convertir el monto a número
      const amountStr = match[1].replace(/[^\d.,]/g, '');
      
      // Manejar diferentes formatos de números (coma o punto como separador decimal)
      if (amountStr.includes(',') && amountStr.includes('.')) {
        // Formato 1,234.56
        if (amountStr.lastIndexOf(',') < amountStr.lastIndexOf('.')) {
          return parseFloat(amountStr.replace(/,/g, ''));
        } 
        // Formato 1.234,56
        else {
          return parseFloat(amountStr.replace(/\./g, '').replace(',', '.'));
        }
      } else if (amountStr.includes(',')) {
        // Si solo hay comas, asumimos formato 1234,56
        return parseFloat(amountStr.replace(',', '.'));
      } else {
        // Si solo hay puntos o ninguno, asumimos formato 1234.56 o 1234
        return parseFloat(amountStr);
      }
    }
  }
  
  return undefined;
};

/**
 * Extrae la fecha del recibo del texto reconocido
 * 
 * @param text Texto completo
 * @returns Fecha como objeto Date o undefined si no se encuentra
 */
const extractDate = (text: string): Date | undefined => {
  for (const pattern of PATTERNS.DATES) {
    const match = text.match(pattern);
    if (match) {
      try {
        // Dependiendo del formato de fecha encontrado
        if (match[0].toUpperCase().includes('ENE') || 
            match[0].toUpperCase().includes('FEB') || 
            match[0].toUpperCase().includes('MAR')) {
          // Formato con mes escrito
          const day = parseInt(match[1]);
          const month = MESES_ESPANOL[match[2].toUpperCase()];
          const year = match[3].length === 2 ? 2000 + parseInt(match[3]) : parseInt(match[3]);
          return new Date(year, month, day);
        } 
        // Formatos numéricos de fecha
        else if (pattern.toString().includes('DD')) {
          // Formato DD/MM/YYYY
          const day = parseInt(match[1]);
          const month = parseInt(match[2]) - 1; // Meses en JS van de 0-11
          const year = match[3].length === 2 ? 2000 + parseInt(match[3]) : parseInt(match[3]);
          return new Date(year, month, day);
        } else if (pattern.toString().includes('MM/DD')) {
          // Formato MM/DD/YYYY
          const month = parseInt(match[1]) - 1;
          const day = parseInt(match[2]);
          const year = match[3].length === 2 ? 2000 + parseInt(match[3]) : parseInt(match[3]);
          return new Date(year, month, day);
        } else {
          // Formato YYYY/MM/DD
          const year = parseInt(match[1]);
          const month = parseInt(match[2]) - 1;
          const day = parseInt(match[3]);
          return new Date(year, month, day);
        }
      } catch (error) {
        console.error('Error al parsear fecha:', error);
        continue; // Intentar con el siguiente patrón
      }
    }
  }
  
  return undefined;
};

/**
 * Calcula el nivel de confianza de los datos extraídos
 * 
 * @param ocrResult Resultado del OCR
 * @returns Objeto con niveles de confianza
 */
const calculateConfidence = (ocrResult: OCRResult): ReceiptData['confidence'] => {
  // Implementación básica de confianza
  // En una implementación real, esto sería más sofisticado
  
  const blocks = ocrResult.blocks || [];
  // Calcular promedio de confianza de los bloques
  const avgConfidence = blocks.length > 0
    ? blocks.reduce((sum, block) => sum + block.confidence, 0) / blocks.length
    : 0.5; // Valor por defecto si no hay información de bloques
    
  return {
    merchant: avgConfidence,
    amount: avgConfidence,
    date: avgConfidence,
    overall: avgConfidence
  };
}; 