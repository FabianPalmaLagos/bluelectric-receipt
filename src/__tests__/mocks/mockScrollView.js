/**
 * Mock específico para el componente ScrollView de React Native
 * Este mock reemplaza el componente ScrollView con una implementación simple
 * que no depende de los módulos nativos problemáticos.
 */

const React = require('react');

// Crear un componente mock simple para ScrollView
const ScrollView = (props) => {
  const { children, style, contentContainerStyle, testID, ...otherProps } = props;
  
  return React.createElement(
    'div',
    {
      style: { ...style },
      'data-testid': testID || 'mock-scrollview',
      ...otherProps
    },
    children
  );
};

// Exportar el componente mock
module.exports = ScrollView; 