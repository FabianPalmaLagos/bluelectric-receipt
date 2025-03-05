/**
 * Pruebas unitarias para el módulo OCR
 */

import { processReceiptImage, isOCRAvailable } from '../../../utils/ocr';

// Mock de los módulos utilizados por OCR
jest.mock('../../../utils/ocr/localProcessor', () => ({
  processImageLocal: jest.fn().mockResolvedValue('Texto extraído del recibo\nTIENDA: Mercado Central\nFECHA: 01/03/2023\nTOTAL: $123.45')
}));

jest.mock('../../../utils/ocr/imagePreprocessor', () => ({
  preprocessImage: jest.fn().mockImplementation((imageUri) => Promise.resolve(imageUri))
}));

jest.mock('../../../utils/ocr/dataExtractor', () => ({
  extractReceiptData: jest.fn().mockReturnValue({
    merchant: 'Mercado Central',
    amount: 123.45,
    date: new Date('2023-03-01')
  })
}));

jest.mock('../../../utils/ocr/validation', () => ({
  validateExtractedData: jest.fn().mockImplementation((data) => data)
}));

describe('Módulo OCR', () => {
  beforeEach(() => {
    // Limpiar mocks antes de cada prueba
    jest.clearAllMocks();
  });

  describe('processReceiptImage', () => {
    it('debe procesar una imagen y extraer datos correctamente', async () => {
      // Arrange
      const imageUri = 'file://example/image.jpg';
      
      // Act
      const result = await processReceiptImage(imageUri);
      
      // Assert
      expect(result).toEqual({
        merchant: 'Mercado Central',
        amount: 123.45,
        date: new Date('2023-03-01')
      });
    });

    it('debe manejar errores durante el procesamiento', async () => {
      // Arrange
      const imageUri = 'file://example/image.jpg';
      const errorMessage = 'Error de procesamiento';
      
      // Mock para simular un error
      const { preprocessImage } = require('../../../utils/ocr/imagePreprocessor');
      preprocessImage.mockRejectedValueOnce(new Error(errorMessage));
      
      // Act & Assert
      await expect(processReceiptImage(imageUri)).rejects.toThrow(
        'No se pudo procesar la imagen del recibo correctamente'
      );
    });
  });

  describe('isOCRAvailable', () => {
    it('debe verificar si OCR está disponible', async () => {
      // Act
      const result = await isOCRAvailable();
      
      // Assert
      expect(result).toBe(true);
    });
  });
}); 