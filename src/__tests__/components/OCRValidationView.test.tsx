import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import OCRValidationView from '../../components/OCRValidationView';

// Mock de datos para las pruebas
const mockOCRData = {
  numeroCliente: '12345678',
  fechaEmision: '01/01/2023',
  fechaVencimiento: '31/01/2023',
  totalPagar: '1500.00',
  periodoFacturacion: 'Enero 2023',
};

const mockOnConfirm = jest.fn();
const mockOnCancel = jest.fn();

describe('OCRValidationView', () => {
  beforeEach(() => {
    // Limpiar los mocks antes de cada prueba
    jest.clearAllMocks();
  });

  test('renderiza correctamente con los datos proporcionados', () => {
    const { getByText, getByTestId } = render(
      <OCRValidationView
        ocrData={mockOCRData}
        onConfirm={mockOnConfirm}
        onCancel={mockOnCancel}
      />
    );

    // Verificar que se muestran los datos OCR
    expect(getByText('Validación de Datos')).toBeTruthy();
    expect(getByTestId('numeroCliente-input').props.value).toBe('12345678');
    expect(getByTestId('fechaEmision-input').props.value).toBe('01/01/2023');
    expect(getByTestId('fechaVencimiento-input').props.value).toBe('31/01/2023');
    expect(getByTestId('totalPagar-input').props.value).toBe('1500.00');
    expect(getByTestId('periodoFacturacion-input').props.value).toBe('Enero 2023');
  });

  test('llama a onCancel cuando se presiona el botón de cancelar', () => {
    const { getByTestId } = render(
      <OCRValidationView
        ocrData={mockOCRData}
        onConfirm={mockOnConfirm}
        onCancel={mockOnCancel}
      />
    );

    // Simular clic en el botón de cancelar
    fireEvent.press(getByTestId('cancel-button'));

    // Verificar que se llamó a la función onCancel
    expect(mockOnCancel).toHaveBeenCalledTimes(1);
  });

  test('llama a onConfirm con los datos correctos cuando se presiona el botón de confirmar', () => {
    const { getByTestId } = render(
      <OCRValidationView
        ocrData={mockOCRData}
        onConfirm={mockOnConfirm}
        onCancel={mockOnCancel}
      />
    );

    // Simular clic en el botón de confirmar
    fireEvent.press(getByTestId('confirm-button'));

    // Verificar que se llamó a la función onConfirm con los datos correctos
    expect(mockOnConfirm).toHaveBeenCalledTimes(1);
    expect(mockOnConfirm).toHaveBeenCalledWith({
      numeroCliente: '12345678',
      fechaEmision: '01/01/2023',
      fechaVencimiento: '31/01/2023',
      totalPagar: '1500.00',
      periodoFacturacion: 'Enero 2023',
    });
  });

  test('permite editar los datos y confirmar los cambios', () => {
    const { getByTestId } = render(
      <OCRValidationView
        ocrData={mockOCRData}
        onConfirm={mockOnConfirm}
        onCancel={mockOnCancel}
      />
    );

    // Editar los campos
    fireEvent.changeText(getByTestId('numeroCliente-input'), '87654321');
    fireEvent.changeText(getByTestId('totalPagar-input'), '2000.00');

    // Simular clic en el botón de confirmar
    fireEvent.press(getByTestId('confirm-button'));

    // Verificar que se llamó a la función onConfirm con los datos actualizados
    expect(mockOnConfirm).toHaveBeenCalledTimes(1);
    expect(mockOnConfirm).toHaveBeenCalledWith({
      numeroCliente: '87654321',
      fechaEmision: '01/01/2023',
      fechaVencimiento: '31/01/2023',
      totalPagar: '2000.00',
      periodoFacturacion: 'Enero 2023',
    });
  });

  test('maneja correctamente cuando se desactivan los switches de datos', () => {
    const { getByTestId } = render(
      <OCRValidationView
        ocrData={mockOCRData}
        onConfirm={mockOnConfirm}
        onCancel={mockOnCancel}
      />
    );

    // Desactivar algunos switches
    fireEvent(getByTestId('numeroCliente-switch'), 'valueChange', false);
    fireEvent(getByTestId('totalPagar-switch'), 'valueChange', false);

    // Simular clic en el botón de confirmar
    fireEvent.press(getByTestId('confirm-button'));

    // Verificar que se llamó a la función onConfirm con los datos correctos (sin los campos desactivados)
    expect(mockOnConfirm).toHaveBeenCalledTimes(1);
    expect(mockOnConfirm).toHaveBeenCalledWith({
      fechaEmision: '01/01/2023',
      fechaVencimiento: '31/01/2023',
      periodoFacturacion: 'Enero 2023',
    });
  });
}); 