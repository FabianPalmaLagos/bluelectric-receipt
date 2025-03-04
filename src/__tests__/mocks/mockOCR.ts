// Mock para el módulo OCR
export const processReceiptImage = jest.fn().mockImplementation((imageUri: string) => {
  // Simular éxito o fallo basado en la URI de la imagen
  if (imageUri.includes('error')) {
    return Promise.reject(new Error('Error de procesamiento'));
  }
  
  // Devolver datos simulados de OCR
  return Promise.resolve({
    fecha: '2023-05-15',
    total: '1250.75',
    establecimiento: 'Supermercado Test',
    items: [
      { descripcion: 'Producto 1', precio: '250.50' },
      { descripcion: 'Producto 2', precio: '500.25' },
      { descripcion: 'Producto 3', precio: '500.00' }
    ]
  });
});

export const isOCRAvailable = jest.fn().mockReturnValue(true);

// Exportar el módulo completo para poder hacer mock de todo el módulo
export default {
  processReceiptImage,
  isOCRAvailable
}; 