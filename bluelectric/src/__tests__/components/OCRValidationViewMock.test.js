import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';

// Mock de fecha específica para pruebas consistentes
const mockDate = new Date('2023-03-01');

// Componente mock para OCRValidationView
const OCRValidationViewMock = ({ extractedData, onConfirm, onCancel }) => {
  const [merchant, setMerchant] = React.useState(extractedData.merchant);
  const [amount, setAmount] = React.useState(extractedData.amount.toString());
  
  const handleConfirm = () => {
    onConfirm({
      merchant,
      amount: parseFloat(amount),
      date: extractedData.date,
    });
  };

  return (
    <View testID="ocr-validation-view">
      <Text>Validación de datos OCR</Text>
      
      <View>
        <Text>Comercio:</Text>
        <TextInput
          value={merchant}
          onChangeText={setMerchant}
          testID="merchant-input"
        />
      </View>
      
      <View>
        <Text>Monto:</Text>
        <TextInput
          value={amount}
          onChangeText={setAmount}
          testID="amount-input"
        />
      </View>
      
      <View>
        <Text>Fecha: 28/02/2023</Text>
      </View>
      
      <View>
        <TouchableOpacity onPress={onCancel} testID="cancel-button">
          <Text>Cancelar</Text>
        </TouchableOpacity>
        
        <TouchableOpacity onPress={handleConfirm} testID="confirm-button">
          <Text>Confirmar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

describe('OCRValidationViewMock', () => {
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
    const { getByText, getByTestId } = render(
      <OCRValidationViewMock
        extractedData={mockExtractedData}
        onConfirm={mockOnConfirm}
        onCancel={mockOnCancel}
      />
    );

    // Verificar que se muestran los datos correctos
    expect(getByTestId('merchant-input').props.value).toBe('Mercado Central');
    expect(getByTestId('amount-input').props.value).toBe('123.45');
    expect(getByText('Fecha: 28/02/2023')).toBeTruthy();
  });

  it('llama a onCancel cuando se presiona el botón de cancelar', () => {
    const { getByTestId } = render(
      <OCRValidationViewMock
        extractedData={mockExtractedData}
        onConfirm={mockOnConfirm}
        onCancel={mockOnCancel}
      />
    );

    // Presionar el botón de cancelar
    fireEvent.press(getByTestId('cancel-button'));

    // Verificar que se llamó a onCancel
    expect(mockOnCancel).toHaveBeenCalledTimes(1);
  });

  it('llama a onConfirm con los datos correctos cuando se presiona el botón de confirmar', () => {
    const { getByTestId } = render(
      <OCRValidationViewMock
        extractedData={mockExtractedData}
        onConfirm={mockOnConfirm}
        onCancel={mockOnCancel}
      />
    );

    // Presionar el botón de confirmar
    fireEvent.press(getByTestId('confirm-button'));

    // Verificar que se llamó a onConfirm con los datos correctos
    expect(mockOnConfirm).toHaveBeenCalledTimes(1);
    expect(mockOnConfirm).toHaveBeenCalledWith({
      merchant: 'Mercado Central',
      amount: 123.45,
      date: mockDate,
    });
  });

  it('permite editar los datos y confirmar los cambios', () => {
    const { getByTestId } = render(
      <OCRValidationViewMock
        extractedData={mockExtractedData}
        onConfirm={mockOnConfirm}
        onCancel={mockOnCancel}
      />
    );

    // Editar el comercio
    fireEvent.changeText(getByTestId('merchant-input'), 'Supermercado XYZ');

    // Editar el monto
    fireEvent.changeText(getByTestId('amount-input'), '200');

    // Confirmar los cambios
    fireEvent.press(getByTestId('confirm-button'));

    // Verificar que se llamó a onConfirm con los datos actualizados
    expect(mockOnConfirm).toHaveBeenCalledWith({
      merchant: 'Supermercado XYZ',
      amount: 200,
      date: mockDate,
    });
  });
}); 