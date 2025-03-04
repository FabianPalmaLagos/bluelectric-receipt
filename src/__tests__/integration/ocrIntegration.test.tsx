import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import OCRValidationViewMock from '../mocks/OCRValidationViewMock';

// Mock del componente real
jest.mock('../../../src/components/OCRValidationView', () => {
  return require('../mocks/OCRValidationViewMock').default;
});

// Mock de la función de procesamiento OCR
jest.mock('../../utils/ocr', () => ({
  processOCRData: jest.fn().mockResolvedValue({
    empresa: 'Empresa Test',
    fecha: '2023-01-01',
    total: '100.00',
    numero: '12345',
  }),
}));

// Componente simplificado para pruebas de integración
const OCRIntegrationTestComponent = ({ onComplete }) => {
  const [ocrData, setOcrData] = React.useState(null);
  const [showValidation, setShowValidation] = React.useState(false);

  const handleProcessImage = async () => {
    const { processOCRData } = require('../../utils/ocr');
    const result = await processOCRData('test-image-uri');
    setOcrData(result);
    setShowValidation(true);
  };

  const handleConfirm = (data) => {
    setShowValidation(false);
    if (onComplete) {
      onComplete(data);
    }
  };

  const handleCancel = () => {
    setShowValidation(false);
    setOcrData(null);
  };

  return (
    <div data-testid="ocr-integration-test">
      <button 
        data-testid="process-button"
        onClick={handleProcessImage}
      >
        Procesar Imagen
      </button>
      
      {showValidation && ocrData && (
        <OCRValidationViewMock
          ocrData={ocrData}
          onConfirm={handleConfirm}
          onCancel={handleCancel}
        />
      )}
    </div>
  );
};

describe('OCR Integration Tests', () => {
  describe('OCRValidationView Component', () => {
    test('valida y confirma datos OCR correctamente', async () => {
      const mockOnComplete = jest.fn();
      
      const { getByTestId, queryByTestId } = render(
        <OCRIntegrationTestComponent onComplete={mockOnComplete} />
      );
      
      // Verificar que el componente de validación no se muestra inicialmente
      expect(queryByTestId('ocr-validation-view-mock')).toBeNull();
      
      // Simular el procesamiento de una imagen
      fireEvent.click(getByTestId('process-button'));
      
      // Esperar a que se muestre el componente de validación
      await waitFor(() => {
        expect(getByTestId('ocr-validation-view-mock')).toBeTruthy();
      });
      
      // Simular la confirmación de los datos
      const validationComponent = getByTestId('ocr-validation-view-mock');
      validationComponent.props.onConfirm();
      
      // Verificar que se llamó a onComplete con los datos correctos
      expect(mockOnComplete).toHaveBeenCalledTimes(1);
      expect(mockOnComplete).toHaveBeenCalledWith({
        empresa: 'Empresa Test',
        fecha: '2023-01-01',
        total: '100.00',
        numero: '12345',
      });
      
      // Verificar que el componente de validación ya no se muestra
      expect(queryByTestId('ocr-validation-view-mock')).toBeNull();
    });
    
    test('cancela el proceso OCR correctamente', async () => {
      const mockOnComplete = jest.fn();
      
      const { getByTestId, queryByTestId } = render(
        <OCRIntegrationTestComponent onComplete={mockOnComplete} />
      );
      
      // Simular el procesamiento de una imagen
      fireEvent.click(getByTestId('process-button'));
      
      // Esperar a que se muestre el componente de validación
      await waitFor(() => {
        expect(getByTestId('ocr-validation-view-mock')).toBeTruthy();
      });
      
      // Simular la cancelación
      const validationComponent = getByTestId('ocr-validation-view-mock');
      validationComponent.props.onCancel();
      
      // Verificar que no se llamó a onComplete
      expect(mockOnComplete).not.toHaveBeenCalled();
      
      // Verificar que el componente de validación ya no se muestra
      expect(queryByTestId('ocr-validation-view-mock')).toBeNull();
    });
  });
}); 