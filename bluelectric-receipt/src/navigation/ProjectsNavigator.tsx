import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { ProjectStackParamList } from './types';
import { COLORS } from '../constants/theme';

// Importar pantallas (se crearán más adelante)
import ProjectsListScreen from '../screens/projects/ProjectsListScreen';
import ProjectDetailScreen from '../screens/projects/ProjectDetailScreen';
import AddProjectScreen from '../screens/projects/AddProjectScreen';
import EditProjectScreen from '../screens/projects/EditProjectScreen';
import ProjectCategoriesScreen from '../screens/projects/ProjectCategoriesScreen';

const Stack = createStackNavigator<ProjectStackParamList>();

const ProjectsNavigator: React.FC = () => {
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
        name="ProjectsList" 
        component={ProjectsListScreen} 
        options={{ title: 'Proyectos' }}
      />
      <Stack.Screen 
        name="ProjectDetail" 
        component={ProjectDetailScreen} 
        options={{ title: 'Detalle del Proyecto' }}
      />
      <Stack.Screen 
        name="AddProject" 
        component={AddProjectScreen} 
        options={{ title: 'Añadir Proyecto' }}
      />
      <Stack.Screen 
        name="EditProject" 
        component={EditProjectScreen} 
        options={{ title: 'Editar Proyecto' }}
      />
      <Stack.Screen 
        name="ProjectCategories" 
        component={ProjectCategoriesScreen} 
        options={{ title: 'Categorías del Proyecto' }}
      />
    </Stack.Navigator>
  );
};

export default ProjectsNavigator; 