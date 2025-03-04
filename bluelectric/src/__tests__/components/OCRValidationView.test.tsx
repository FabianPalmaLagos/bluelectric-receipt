import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';

// Importar los mocks antes de importar el componente
jest.mock('../../constants/theme', () => require('../mocks/mockConstants'));

// Mock para format de date-fns
jest.mock('date-fns', () => ({
  format: jest.fn().mockImplementation(() => '28/02/2023'),
  es: {}
}));

import OCRValidationView from '../../components/OCRValidationView';

// Mock de fecha específica para pruebas consistentes
const mockDate = new Date('2023-03-01');

describe('OCRValidationView', () => {
  const mockExtractedData = {
    merchant: 'Mercado Central',
    amount: 123.45,
    date: mockDate,
  };

  const mockOnConfirm = jest.fn();
  const mockOnCancel = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renderiza correctamente con los datos proporcionados', () => {
    const { getByText, getByDisplayValue } = render(
      <OCRValidationView
        extractedData={mockExtractedData}
        onConfirm={mockOnConfirm}
        onCancel={mockOnCancel}
      />
    );

    // Verificar que se muestran los datos correctos
    expect(getByDisplayValue('Mercado Central')).toBeTruthy();
    expect(getByDisplayValue('123.45')).toBeTruthy();
    expect(getByText('28/02/2023')).toBeTruthy(); // Fecha formateada por el mock
  });

  it('llama a onCancel cuando se presiona el botón de cancelar', () => {
    const { getByText } = render(
      <OCRValidationView
        extractedData={mockExtractedData}
        onConfirm={mockOnConfirm}
        onCancel={mockOnCancel}
      />
    );

    // Presionar el botón de cancelar
    fireEvent.press(getByText('Cancelar'));

    // Verificar que se llamó a onCancel
    expect(mockOnCancel).toHaveBeenCalledTimes(1);
  });

  it('llama a onConfirm con los datos correctos cuando se presiona el botón de confirmar', () => {
    const { getByText } = render(
      <OCRValidationView
        extractedData={mockExtractedData}
        onConfirm={mockOnConfirm}
        onCancel={mockOnCancel}
      />
    );

    // Presionar el botón de confirmar
    fireEvent.press(getByText('Confirmar'));

    // Verificar que se llamó a onConfirm con los datos correctos
    expect(mockOnConfirm).toHaveBeenCalledTimes(1);
    expect(mockOnConfirm).toHaveBeenCalledWith({
      merchant: 'Mercado Central',
      amount: 123.45,
      date: mockDate,
    });
  });

  it('permite editar los datos y confirmar los cambios', () => {
    const { getByText, getByDisplayValue } = render(
      <OCRValidationView
        extractedData={mockExtractedData}
        onConfirm={mockOnConfirm}
        onCancel={mockOnCancel}
      />
    );

    // Editar el comercio
    const merchantInput = getByDisplayValue('Mercado Central');
    fireEvent.changeText(merchantInput, 'Supermercado XYZ');

    // Editar el monto
    const amountInput = getByDisplayValue('123.45');
    fireEvent.changeText(amountInput, '200');

    // Confirmar los cambios
    fireEvent.press(getByText('Confirmar'));

    // Verificar que se llamó a onConfirm con los datos actualizados
    expect(mockOnConfirm).toHaveBeenCalledWith(
      expect.objectContaining({
        merchant: 'Supermercado XYZ',
        amount: 200,
        date: mockDate,
      })
    );
  });

  it('maneja correctamente cuando se desactivan los switches de datos', () => {
    const { getByText, getAllByRole } = render(
      <OCRValidationView
        extractedData={mockExtractedData}
        onConfirm={mockOnConfirm}
        onCancel={mockOnCancel}
      />
    );

    // Obtener los switches (pueden variar según la implementación de @testing-library/react-native)
    const switches = getAllByRole('switch');
    
    // Desactivar todos los switches
    fireEvent(switches[0], 'valueChange', false); // Comercio
    fireEvent(switches[1], 'valueChange', false); // Monto
    fireEvent(switches[2], 'valueChange', false); // Fecha

    // Confirmar los cambios
    fireEvent.press(getByText('Confirmar'));

    // Verificar que se llamó a onConfirm con los datos vacíos
    expect(mockOnConfirm).toHaveBeenCalledWith(expect.objectContaining({
      merchant: '',
      amount: 0,
      // No verificamos la fecha exacta porque puede variar
    }));
  });
}); 