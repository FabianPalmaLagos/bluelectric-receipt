import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MainTabParamList } from './types';
import { COLORS } from '../constants/theme';
import { Ionicons } from '@expo/vector-icons';

// Importar pantallas (se crearán más adelante)
import HomeScreen from '../screens/main/HomeScreen';
import ReceiptsNavigator from './ReceiptsNavigator';
import AddReceiptScreen from '../screens/receipts/AddReceiptScreen';
import ProjectsNavigator from './ProjectsNavigator';
import ProfileScreen from '../screens/main/ProfileScreen';

const Tab = createBottomTabNavigator<MainTabParamList>();

const MainNavigator: React.FC = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName: keyof typeof Ionicons.glyphMap = 'home';

          if (route.name === 'Home') {
            iconName = focused ? 'home' : 'home-outline';
          } else if (route.name === 'Receipts') {
            iconName = focused ? 'receipt' : 'receipt-outline';
          } else if (route.name === 'AddReceipt') {
            iconName = focused ? 'add-circle' : 'add-circle-outline';
          } else if (route.name === 'Projects') {
            iconName = focused ? 'folder' : 'folder-outline';
          } else if (route.name === 'Profile') {
            iconName = focused ? 'person' : 'person-outline';
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: COLORS.primary.medium,
        tabBarInactiveTintColor: COLORS.text.light.secondary,
        headerShown: false,
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Receipts" component={ReceiptsNavigator} />
      <Tab.Screen 
        name="AddReceipt" 
        component={AddReceiptScreen} 
        options={{
          tabBarLabel: 'Añadir',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="add-circle" size={size * 1.5} color={COLORS.primary.medium} />
          ),
        }}
      />
      <Tab.Screen name="Projects" component={ProjectsNavigator} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
};

export default MainNavigator; 