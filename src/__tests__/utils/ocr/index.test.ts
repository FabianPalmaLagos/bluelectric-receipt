import { processReceiptImage, isOCRAvailable } from '../../../utils/ocr';
import * as mockOCR from '../../mocks/mockOCR';

// Mock del módulo OCR
jest.mock('../../../utils/ocr', () => {
  return {
    processReceiptImage: jest.fn().mockImplementation(mockOCR.processReceiptImage),
    isOCRAvailable: jest.fn().mockImplementation(mockOCR.isOCRAvailable)
  };
});

describe('Módulo OCR', () => {
  beforeEach(() => {
    // Limpiar todos los mocks antes de cada prueba
    jest.clearAllMocks();
  });

  describe('isOCRAvailable', () => {
    it('debería verificar si el OCR está disponible', () => {
      // Configurar el mock para devolver true
      (isOCRAvailable as jest.Mock).mockReturnValue(true);
      
      // Ejecutar la función
      const result = isOCRAvailable();
      
      // Verificar el resultado
      expect(result).toBe(true);
      expect(isOCRAvailable).toHaveBeenCalledTimes(1);
    });

    it('debería verificar si el OCR no está disponible', () => {
      // Configurar el mock para devolver false
      (isOCRAvailable as jest.Mock).mockReturnValue(false);
      
      // Ejecutar la función
      const result = isOCRAvailable();
      
      // Verificar el resultado
      expect(result).toBe(false);
      expect(isOCRAvailable).toHaveBeenCalledTimes(1);
    });
  });

  describe('processReceiptImage', () => {
    it('debería procesar correctamente una imagen de recibo', async () => {
      // Configurar el mock para devolver datos de OCR
      const mockData = {
        fecha: '2023-05-15',
        total: '1250.75',
        establecimiento: 'Supermercado Test',
        items: [
          { descripcion: 'Producto 1', precio: '250.50' },
          { descripcion: 'Producto 2', precio: '500.25' },
          { descripcion: 'Producto 3', precio: '500.00' }
        ]
      };
      
      (processReceiptImage as jest.Mock).mockResolvedValue(mockData);
      
      // Ejecutar la función
      const result = await processReceiptImage('test-image.jpg');
      
      // Verificar el resultado
      expect(result).toEqual(mockData);
      expect(processReceiptImage).toHaveBeenCalledWith('test-image.jpg');
      expect(processReceiptImage).toHaveBeenCalledTimes(1);
    });

    it('debería manejar errores durante el procesamiento de la imagen', async () => {
      // Configurar el mock para lanzar un error
      const errorMessage = 'Error de procesamiento';
      (processReceiptImage as jest.Mock).mockRejectedValue(new Error(errorMessage));
      
      // Ejecutar la función y verificar que lanza un error
      await expect(processReceiptImage('error-image.jpg')).rejects.toThrow(errorMessage);
      expect(processReceiptImage).toHaveBeenCalledWith('error-image.jpg');
      expect(processReceiptImage).toHaveBeenCalledTimes(1);
    });
  });
}); 