import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { ReceiptStackParamList } from './types';
import { COLORS } from '../constants/theme';

// Importar pantallas (se crearán más adelante)
import ReceiptsListScreen from '../screens/receipts/ReceiptsListScreen';
import ReceiptDetailScreen from '../screens/receipts/ReceiptDetailScreen';
import EditReceiptScreen from '../screens/receipts/EditReceiptScreen';
import AddCommentScreen from '../screens/receipts/AddCommentScreen';

const Stack = createStackNavigator<ReceiptStackParamList>();

const ReceiptsNavigator: React.FC = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: COLORS.primary.medium,
        },
        headerTintColor: COLORS.common.white,
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      }}
    >
      <Stack.Screen 
        name="ReceiptsList" 
        component={ReceiptsListScreen} 
        options={{ title: 'Recibos' }}
      />
      <Stack.Screen 
        name="ReceiptDetail" 
        component={ReceiptDetailScreen} 
        options={{ title: 'Detalle del Recibo' }}
      />
      <Stack.Screen 
        name="EditReceipt" 
        component={EditReceiptScreen} 
        options={{ title: 'Editar Recibo' }}
      />
      <Stack.Screen 
        name="AddComment" 
        component={AddCommentScreen} 
        options={{ title: 'Añadir Comentario' }}
      />
    </Stack.Navigator>
  );
};

export default ReceiptsNavigator; 