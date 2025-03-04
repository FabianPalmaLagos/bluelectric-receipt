import React from 'react';
import { View, Text } from 'react-native';

/**
 * Componente mock para OCRValidationView que evita problemas con ScrollView
 * y otros componentes nativos complejos durante las pruebas.
 */
const OCRValidationViewMock = ({ ocrData, onConfirm, onCancel }) => {
  // Renderizamos un componente simple que expone las props y métodos necesarios
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

export default OCRValidationViewMock; 