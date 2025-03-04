import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import OCRValidationView from '../../components/OCRValidationView';
import { processOCRData } from '../../utils/ocrUtils';

// Mock de las funciones de OCR
jest.mock('../../utils/ocrUtils', () => ({
  processOCRData: jest.fn(),
  extractReceiptData: jest.fn(),
}));

// Mock de datos para las pruebas
const mockOCRData = {
  numeroCliente: '12345678',
  fechaEmision: '01/01/2023',
  fechaVencimiento: '31/01/2023',
  totalPagar: '1500.00',
  periodoFacturacion: 'Enero 2023',
};

// Configuración del mock store
const mockStore = configureStore([]);
const store = mockStore({
  receipts: {
    receipts: [],
    loading: false,
    error: null,
  },
});

describe('OCR Integration Tests', () => {
  beforeEach(() => {
    // Limpiar los mocks antes de cada prueba
    jest.clearAllMocks();
    
    // Configurar el mock de processOCRData para devolver datos de prueba
    processOCRData.mockResolvedValue(mockOCRData);
  });

  describe('OCRValidationView Component', () => {
    test('valida y confirma datos OCR correctamente', async () => {
      const mockOnConfirm = jest.fn();
      const mockOnCancel = jest.fn();
      
      const { getByTestId } = render(
        <Provider store={store}>
          <OCRValidationView
            ocrData={mockOCRData}
            onConfirm={mockOnConfirm}
            onCancel={mockOnCancel}
          />
        </Provider>
      );
      
      // Verificar que los datos se muestran correctamente
      expect(getByTestId('numeroCliente-input').props.value).toBe('12345678');
      expect(getByTestId('totalPagar-input').props.value).toBe('1500.00');
      
      // Editar algunos datos
      fireEvent.changeText(getByTestId('numeroCliente-input'), '87654321');
      
      // Confirmar los datos
      fireEvent.press(getByTestId('confirm-button'));
      
      // Verificar que se llamó a onConfirm con los datos actualizados
      expect(mockOnConfirm).toHaveBeenCalledWith({
        numeroCliente: '87654321',
        fechaEmision: '01/01/2023',
        fechaVencimiento: '31/01/2023',
        totalPagar: '1500.00',
        periodoFacturacion: 'Enero 2023',
      });
    });
    
    test('permite desactivar campos y confirmar solo los activos', async () => {
      const mockOnConfirm = jest.fn();
      const mockOnCancel = jest.fn();
      
      const { getByTestId } = render(
        <Provider store={store}>
          <OCRValidationView
            ocrData={mockOCRData}
            onConfirm={mockOnConfirm}
            onCancel={mockOnCancel}
          />
        </Provider>
      );
      
      // Desactivar algunos campos
      fireEvent(getByTestId('numeroCliente-switch'), 'valueChange', false);
      fireEvent(getByTestId('periodoFacturacion-switch'), 'valueChange', false);
      
      // Confirmar los datos
      fireEvent.press(getByTestId('confirm-button'));
      
      // Verificar que se llamó a onConfirm solo con los campos activos
      expect(mockOnConfirm).toHaveBeenCalledWith({
        fechaEmision: '01/01/2023',
        fechaVencimiento: '31/01/2023',
        totalPagar: '1500.00',
      });
    });
    
    test('cancela el proceso de validación correctamente', async () => {
      const mockOnConfirm = jest.fn();
      const mockOnCancel = jest.fn();
      
      const { getByTestId } = render(
        <Provider store={store}>
          <OCRValidationView
            ocrData={mockOCRData}
            onConfirm={mockOnConfirm}
            onCancel={mockOnCancel}
          />
        </Provider>
      );
      
      // Cancelar el proceso
      fireEvent.press(getByTestId('cancel-button'));
      
      // Verificar que se llamó a onCancel
      expect(mockOnCancel).toHaveBeenCalled();
      expect(mockOnConfirm).not.toHaveBeenCalled();
    });
  });
  
  describe('OCR Data Processing', () => {
    test('procesa correctamente los datos OCR', async () => {
      // Configurar el mock para devolver datos específicos
      processOCRData.mockResolvedValueOnce({
        numeroCliente: '98765432',
        fechaEmision: '15/02/2023',
        fechaVencimiento: '15/03/2023',
        totalPagar: '2500.00',
        periodoFacturacion: 'Febrero 2023',
      });
      
      // Llamar a la función de procesamiento
      const result = await processOCRData('mock-image-uri');
      
      // Verificar el resultado
      expect(result).toEqual({
        numeroCliente: '98765432',
        fechaEmision: '15/02/2023',
        fechaVencimiento: '15/03/2023',
        totalPagar: '2500.00',
        periodoFacturacion: 'Febrero 2023',
      });
      
      // Verificar que se llamó a la función con los parámetros correctos
      expect(processOCRData).toHaveBeenCalledWith('mock-image-uri');
    });
  });
}); 