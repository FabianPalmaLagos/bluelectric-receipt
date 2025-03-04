import React from 'react';

const OCRValidationViewMock = ({ 
  ocrData, 
  onConfirm, 
  onCancel, 
  ...props 
}) => {
  // Función para simular la confirmación de datos
  const handleConfirm = () => {
    if (onConfirm) {
      onConfirm(ocrData);
    }
  };

  // Función para simular la cancelación
  const handleCancel = () => {
    if (onCancel) {
      onCancel();
    }
  };

  return React.createElement('div', {
    'data-testid': 'ocr-validation-view-mock',
    ...props,
    'data-ocr-data': JSON.stringify(ocrData),
    'data-can-confirm': true,
    'data-can-cancel': true,
    onConfirm: handleConfirm,
    onCancel: handleCancel
  }, 'OCRValidationView Mock');
};

export default OCRValidationViewMock; 