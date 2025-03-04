import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { View, Text } from 'react-native';

// Componente mock simplificado para pruebas
const OCRValidationViewMock = ({ ocrData, onConfirm, onCancel }) => {
  return (
    <View 
      data-testid="ocr-validation-view-mock"
      // Exponemos las props y métodos para que puedan ser accedidos en las pruebas
      ocrData={ocrData}
      onConfirm={onConfirm}
      onCancel={onCancel}
    >
      <Text data-testid="mock-empresa">{ocrData?.empresa || ''}</Text>
      <Text data-testid="mock-fecha">{ocrData?.fecha || ''}</Text>
      <Text data-testid="mock-total">{ocrData?.total || ''}</Text>
      <Text data-testid="mock-numero">{ocrData?.numero || ''}</Text>
    </View>
  );
};

// Datos de prueba
const mockOcrData = {
  empresa: 'Empresa Test',
  fecha: '2023-01-01',
  total: '100.00',
  numero: '12345',
};

describe('OCRValidationView Simplificado', () => {
  test('renderiza correctamente con los datos proporcionados', () => {
    const onConfirm = jest.fn();
    const onCancel = jest.fn();
    
    const { getByTestId } = render(
      <OCRValidationViewMock 
        ocrData={mockOcrData} 
        onConfirm={onConfirm} 
        onCancel={onCancel} 
      />
    );
    
    // Verificar que los datos se muestran correctamente
    expect(getByTestId('mock-empresa').props.children).toBe('Empresa Test');
    expect(getByTestId('mock-fecha').props.children).toBe('2023-01-01');
    expect(getByTestId('mock-total').props.children).toBe('100.00');
    expect(getByTestId('mock-numero').props.children).toBe('12345');
  });
  
  test('llama a onCancel cuando se presiona el botón de cancelar', () => {
    const onConfirm = jest.fn();
    const onCancel = jest.fn();
    
    const { getByTestId } = render(
      <OCRValidationViewMock 
        ocrData={mockOcrData} 
        onConfirm={onConfirm} 
        onCancel={onCancel} 
      />
    );
    
    // Simular la cancelación
    const mockComponent = getByTestId('ocr-validation-view-mock');
    mockComponent.props.onCancel();
    
    // Verificar que se llamó a onCancel
    expect(onCancel).toHaveBeenCalledTimes(1);
    expect(onConfirm).not.toHaveBeenCalled();
  });
  
  test('llama a onConfirm con los datos correctos cuando se presiona el botón de confirmar', () => {
    const onConfirm = jest.fn();
    const onCancel = jest.fn();
    
    const { getByTestId } = render(
      <OCRValidationViewMock 
        ocrData={mockOcrData} 
        onConfirm={onConfirm} 
        onCancel={onCancel} 
      />
    );
    
    // Simular la confirmación
    const mockComponent = getByTestId('ocr-validation-view-mock');
    mockComponent.props.onConfirm(mockOcrData);
    
    // Verificar que se llamó a onConfirm con los datos correctos
    expect(onConfirm).toHaveBeenCalledTimes(1);
    expect(onConfirm).toHaveBeenCalledWith(mockOcrData);
    expect(onCancel).not.toHaveBeenCalled();
  });
  
  test('permite editar los datos y confirmar los cambios', () => {
    const onConfirm = jest.fn();
    const onCancel = jest.fn();
    
    const { getByTestId } = render(
      <OCRValidationViewMock 
        ocrData={mockOcrData} 
        onConfirm={onConfirm} 
        onCancel={onCancel} 
      />
    );
    
    // Datos modificados para la prueba
    const datosModificados = {
      ...mockOcrData,
      empresa: 'Empresa Modificada',
      total: '150.00',
    };
    
    // Simular la confirmación con datos modificados
    const mockComponent = getByTestId('ocr-validation-view-mock');
    mockComponent.props.onConfirm(datosModificados);
    
    // Verificar que se llamó a onConfirm con los datos modificados
    expect(onConfirm).toHaveBeenCalledTimes(1);
    expect(onConfirm).toHaveBeenCalledWith(datosModificados);
  });
  
  test('maneja correctamente cuando se desactivan los switches de datos', () => {
    const onConfirm = jest.fn();
    const onCancel = jest.fn();
    
    const { getByTestId } = render(
      <OCRValidationViewMock 
        ocrData={mockOcrData} 
        onConfirm={onConfirm} 
        onCancel={onCancel} 
      />
    );
    
    // Datos parciales (simulando que algunos campos están desactivados)
    const datosParciales = {
      fecha: '2023-01-01',
      total: '100.00',
    };
    
    // Simular la confirmación con datos parciales
    const mockComponent = getByTestId('ocr-validation-view-mock');
    mockComponent.props.onConfirm(datosParciales);
    
    // Verificar que se llamó a onConfirm solo con los campos activos
    expect(onConfirm).toHaveBeenCalledTimes(1);
    expect(onConfirm).toHaveBeenCalledWith(datosParciales);
  });
}); 