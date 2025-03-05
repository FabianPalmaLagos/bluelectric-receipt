/**
 * Procesamiento OCR local utilizando react-native-text-recognition
 */

import TextRecognition from 'react-native-text-recognition';
import { OCRResult, OCRBlock } from '../../types/receipt';

/**
 * Procesa una imagen utilizando OCR local
 * 
 * @param imageUri URI de la imagen procesada
 * @returns Texto extraído de la imagen
 */
export const processImageLocal = async (imageUri: string): Promise<OCRResult> => {
  try {
    // Usar TextRecognition para extraer texto de la imagen
    const result = await TextRecognition.recognize(imageUri);
    
    // Procesamos el resultado en un formato estandarizado
    // TextRecognition devuelve un array de strings con el texto reconocido
    const text = result.join('\n');
    
    // Crear estructura de bloques básica
    // (react-native-text-recognition no proporciona información de bloques,
    // por lo que creamos una estructura básica)
    const blocks: OCRBlock[] = result.map((line, index) => ({
      text: line,
      confidence: 0.8, // Valor por defecto, la biblioteca no proporciona confianza por línea
    }));
    
    return {
      text,
      blocks
    };
  } catch (error) {
    console.error('Error en el procesamiento OCR local:', error);
    throw new Error('No se pudo realizar el OCR en la imagen proporcionada');
  }
};

/**
 * Determina si el OCR local está disponible en el dispositivo
 * 
 * @returns Booleano indicando si el OCR local está disponible
 */
export const isLocalOCRAvailable = async (): Promise<boolean> => {
  // Implementación básica, se podría mejorar con una verificación real
  // dependiendo de las capacidades del dispositivo
  try {
    // Verificar si podemos acceder a la API de TextRecognition
    return !!TextRecognition;
  } catch (error) {
    return false;
  }
}; 