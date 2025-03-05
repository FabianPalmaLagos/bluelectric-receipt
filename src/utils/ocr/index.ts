/**
 * Módulo OCR para BlueElectric Receipt
 * 
 * Este módulo proporciona funcionalidades para el reconocimiento óptico de caracteres
 * en imágenes de recibos, permitiendo extraer automáticamente información como
 * fecha, monto y comercio.
 */

import { processImageLocal } from './localProcessor';
import { extractReceiptData } from './dataExtractor';
import { preprocessImage } from './imagePreprocessor';
import { validateExtractedData } from './validation';
import { ReceiptData } from '../../types/receipt';

/**
 * Procesa una imagen de recibo y extrae la información relevante
 * 
 * @param imageUri URI de la imagen capturada
 * @returns Objeto con los datos extraídos del recibo (fecha, monto, comercio)
 */
export const processReceiptImage = async (imageUri: string): Promise<ReceiptData> => {
  try {
    // Preprocesar la imagen para mejorar la calidad
    const processedImageUri = await preprocessImage(imageUri);
    
    // Realizar OCR usando el procesador local
    const extractedText = await processImageLocal(processedImageUri);
    
    // Extraer datos específicos del texto reconocido
    const extractedData = extractReceiptData(extractedText);
    
    // Validar los datos extraídos
    const validatedData = validateExtractedData(extractedData);
    
    return validatedData;
  } catch (error) {
    console.error('Error en el procesamiento de la imagen:', error);
    throw new Error('No se pudo procesar la imagen del recibo correctamente');
  }
};

/**
 * Indica si el OCR está disponible en el dispositivo actual
 * 
 * @returns Booleano indicando si el OCR está disponible
 */
export const isOCRAvailable = async (): Promise<boolean> => {
  try {
    // Verificar si el dispositivo puede usar OCR
    // Esta implementación dependerá de la biblioteca específica
    return true;
  } catch (error) {
    console.error('Error al verificar disponibilidad de OCR:', error);
    return false;
  }
};

export default {
  processReceiptImage,
  isOCRAvailable
}; 