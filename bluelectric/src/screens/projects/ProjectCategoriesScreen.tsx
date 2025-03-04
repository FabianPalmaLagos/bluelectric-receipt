import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Alert, ActivityIndicator } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
import { ProjectStackParamList } from '../../navigation/types';
import { supabase } from '../../api/supabase';
import { COLORS } from '../../constants/theme';
import { Ionicons } from '@expo/vector-icons';

type ProjectCategoriesScreenNavigationProp = StackNavigationProp<
  ProjectStackParamList,
  'ProjectCategories'
>;

type ProjectCategoriesScreenRouteProp = RouteProp<
  ProjectStackParamList,
  'ProjectCategories'
>;

type Props = {
  navigation: ProjectCategoriesScreenNavigationProp;
  route: ProjectCategoriesScreenRouteProp;
};

type Category = {
  id: number;
  name: string;
  description?: string;
  project_id: number;
  created_at: string;
};

const ProjectCategoriesScreen: React.FC<Props> = ({ navigation, route }) => {
  const { projectId, projectName } = route.params;
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    navigation.setOptions({
      title: `Categorías: ${projectName}`,
      headerRight: () => (
        <TouchableOpacity
          style={{ marginRight: 15 }}
          onPress={() => handleAddCategory()}
        >
          <Ionicons name="add-circle-outline" size={24} color={COLORS.common.white} />
        </TouchableOpacity>
      ),
    });

    fetchCategories();
  }, [projectId]);

  const fetchCategories = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('categories')
        .select('*')
        .eq('project_id', projectId)
        .order('name');

      if (error) throw error;
      setCategories(data || []);
    } catch (error) {
      console.error('Error fetching categories:', error);
      Alert.alert('Error', 'No se pudieron cargar las categorías');
    } finally {
      setLoading(false);
    }
  };

  const handleAddCategory = () => {
    // Implementación de la funcionalidad para añadir categoría
    Alert.alert(
      'Añadir Categoría',
      'Función para añadir categoría aún no implementada'
    );
  };

  const handleEditCategory = (category: Category) => {
    // Implementación de la funcionalidad para editar categoría
    Alert.alert(
      'Editar Categoría',
      'Función para editar categoría aún no implementada'
    );
  };

  const handleDeleteCategory = (categoryId: number) => {
    Alert.alert(
      'Eliminar Categoría',
      '¿Estás seguro de que deseas eliminar esta categoría?',
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Eliminar',
          style: 'destructive',
          onPress: async () => {
            try {
              setLoading(true);
              const { error } = await supabase
                .from('categories')
                .delete()
                .eq('id', categoryId);

              if (error) throw error;
              // Refrescar la lista después de eliminar
              fetchCategories();
            } catch (error) {
              console.error('Error deleting category:', error);
              Alert.alert('Error', 'No se pudo eliminar la categoría');
              setLoading(false);
            }
          },
        },
      ]
    );
  };

  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color={COLORS.primary.medium} />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {categories.length === 0 ? (
        <View style={styles.centered}>
          <Text style={styles.emptyText}>No hay categorías para este proyecto</Text>
          <TouchableOpacity 
            style={styles.addButton} 
            onPress={handleAddCategory}
          >
            <Text style={styles.addButtonText}>Añadir categoría</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <FlatList
          data={categories}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.categoryItem}
              onPress={() => handleEditCategory(item)}
            >
              <View style={styles.categoryInfo}>
                <Text style={styles.categoryName}>{item.name}</Text>
                {item.description && (
                  <Text style={styles.categoryDescription}>{item.description}</Text>
                )}
              </View>
              <TouchableOpacity
                style={styles.deleteButton}
                onPress={() => handleDeleteCategory(item.id)}
              >
                <Ionicons name="trash-outline" size={20} color={COLORS.danger.medium} />
              </TouchableOpacity>
            </TouchableOpacity>
          )}
          ItemSeparatorComponent={() => <View style={styles.separator} />}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.common.white,
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  emptyText: {
    fontSize: 16,
    color: COLORS.grey.medium,
    marginBottom: 20,
  },
  addButton: {
    backgroundColor: COLORS.primary.medium,
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  addButtonText: {
    color: COLORS.common.white,
    fontSize: 16,
    fontWeight: 'bold',
  },
  categoryItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
  },
  categoryInfo: {
    flex: 1,
  },
  categoryName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.text.dark,
  },
  categoryDescription: {
    fontSize: 14,
    color: COLORS.text.medium,
    marginTop: 4,
  },
  deleteButton: {
    padding: 8,
  },
  separator: {
    height: 1,
    backgroundColor: COLORS.grey.light,
  },
});

export default ProjectCategoriesScreen; 