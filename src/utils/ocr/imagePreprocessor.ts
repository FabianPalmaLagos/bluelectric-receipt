/**
 * Utilidades para preprocesamiento de imágenes antes del OCR
 * 
 * Este módulo contiene funciones para mejorar la calidad de las imágenes
 * antes de pasarlas al procesador OCR, aumentando así la precisión de reconocimiento.
 */

import * as FileSystem from 'expo-file-system';
import { manipulateAsync, FlipType, SaveFormat } from 'expo-image-manipulator';

/**
 * Preprocesa una imagen para mejorar la calidad antes del OCR
 * 
 * @param imageUri URI de la imagen original
 * @returns URI de la imagen procesada
 */
export const preprocessImage = async (imageUri: string): Promise<string> => {
  try {
    // Aplicar manipulaciones básicas para mejorar la calidad para OCR
    const manipResult = await manipulateAsync(
      imageUri,
      [
        // Aumentar el contraste para mejorar la detección de texto
        { resize: { width: 1200 } }, // Redimensionar para un tamaño óptimo
        { normalize: true },         // Normalizar histograma para mejorar el contraste
      ],
      { compress: 0.8, format: SaveFormat.JPEG }
    );
    
    return manipResult.uri;
  } catch (error) {
    console.error('Error en el preprocesamiento de la imagen:', error);
    // Si hay un error, devolver la imagen original
    return imageUri;
  }
};

/**
 * Convierte una imagen a escala de grises para mejorar el OCR
 * 
 * @param imageUri URI de la imagen a convertir
 * @returns URI de la imagen en escala de grises
 */
export const convertToGrayscale = async (imageUri: string): Promise<string> => {
  try {
    const manipResult = await manipulateAsync(
      imageUri,
      [
        { grayscale: true }, // Convertir a escala de grises
      ],
      { compress: 0.8, format: SaveFormat.JPEG }
    );
    
    return manipResult.uri;
  } catch (error) {
    console.error('Error al convertir a escala de grises:', error);
    return imageUri;
  }
};

/**
 * Ajusta el brillo y contraste de una imagen
 * 
 * @param imageUri URI de la imagen a ajustar
 * @param brightness Valor de brillo (-1 a 1)
 * @param contrast Valor de contraste (-1 a 1)
 * @returns URI de la imagen ajustada
 */
export const adjustBrightnessContrast = async (
  imageUri: string,
  brightness: number = 0.1,
  contrast: number = 0.2
): Promise<string> => {
  try {
    // Esta función requiere implementaciones más avanzadas con bibliotecas nativas
    // La versión actual de expo-image-manipulator no tiene ajuste directo de brillo/contraste
    // Por ahora devolvemos la imagen original, pero se debería implementar en el futuro
    return imageUri;
  } catch (error) {
    console.error('Error al ajustar brillo/contraste:', error);
    return imageUri;
  }
};

/**
 * Guarda una imagen procesada en un directorio temporal
 * 
 * @param imageUri URI de la imagen a guardar
 * @returns URI de la imagen guardada
 */
export const saveTempImage = async (imageUri: string): Promise<string> => {
  try {
    const fileName = `temp_ocr_${Date.now()}.jpg`;
    const directory = `${FileSystem.cacheDirectory}ocr/`;
    const fileUri = `${directory}${fileName}`;
    
    // Asegurarse de que el directorio existe
    const dirInfo = await FileSystem.getInfoAsync(directory);
    if (!dirInfo.exists) {
      await FileSystem.makeDirectoryAsync(directory, { intermediates: true });
    }
    
    // Copiar el archivo
    await FileSystem.copyAsync({
      from: imageUri,
      to: fileUri
    });
    
    return fileUri;
  } catch (error) {
    console.error('Error al guardar imagen temporal:', error);
    return imageUri;
  }
}; 