import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  TextInput,
  ActivityIndicator,
  RefreshControl,
  Alert,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, SPACING, FONT_SIZE, BORDER_RADIUS, SHADOWS } from '../../constants/theme';
import { RootState } from '../../store';
import { fetchProjects } from '../../store/slices/projectsSlice';
import { ProjectNavigationProp } from '../../navigation/types';
import { Project, UserRole } from '../../types';

interface ProjectsListScreenProps {
  navigation: ProjectNavigationProp<'ProjectsList'>;
}

const ProjectsListScreen: React.FC<ProjectsListScreenProps> = ({ navigation }) => {
  const dispatch = useDispatch();
  const { projects, loading } = useSelector((state: RootState) => state.projects);
  const { user } = useSelector((state: RootState) => state.auth);
  const { isOffline } = useSelector((state: RootState) => state.ui);

  const [searchQuery, setSearchQuery] = useState('');
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    loadProjects();
  }, [dispatch]);

  const loadProjects = async () => {
    try {
      // @ts-ignore - Ignoramos el error de tipado por ahora
      await dispatch(fetchProjects()).unwrap();
    } catch (error) {
      console.error('Error al cargar proyectos:', error);
      if (!isOffline) {
        Alert.alert('Error', 'No se pudieron cargar los proyectos. Inténtalo de nuevo.');
      }
    }
  };

  const handleRefresh = async () => {
    if (isOffline) {
      Alert.alert('Modo sin conexión', 'No se pueden actualizar los datos en modo sin conexión');
      return;
    }

    setRefreshing(true);
    await loadProjects();
    setRefreshing(false);
  };

  const handleAddProject = () => {
    navigation.navigate('AddProject');
  };

  const handleProjectPress = (project: Project) => {
    navigation.navigate('ProjectDetail', { projectId: project.id });
  };

  const filteredProjects = projects.filter(project =>
    project.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    project.description?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const renderProjectItem = ({ item }: { item: Project }) => {
    const totalExpenses = item.totalExpenses || 0;
    const pendingExpenses = item.pendingExpenses || 0;
    const approvedExpenses = item.approvedExpenses || 0;
    const rejectedExpenses = item.rejectedExpenses || 0;

    return (
      <TouchableOpacity
        style={styles.projectCard}
        onPress={() => handleProjectPress(item)}
      >
        <View style={styles.projectHeader}>
          <Text style={styles.projectName}>{item.name}</Text>
          <View style={styles.statusIndicator}>
            {item.isActive ? (
              <View style={styles.activeStatus}>
                <Text style={styles.statusText}>Activo</Text>
              </View>
            ) : (
              <View style={styles.inactiveStatus}>
                <Text style={styles.statusText}>Inactivo</Text>
              </View>
            )}
          </View>
        </View>

        {item.description && (
          <Text style={styles.projectDescription} numberOfLines={2}>
            {item.description}
          </Text>
        )}

        <View style={styles.projectStats}>
          <View style={styles.statItem}>
            <Text style={styles.statLabel}>Total</Text>
            <Text style={styles.statValue}>${totalExpenses.toFixed(2)}</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statLabel}>Pendiente</Text>
            <Text style={styles.statValue}>${pendingExpenses.toFixed(2)}</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statLabel}>Aprobado</Text>
            <Text style={styles.statValue}>${approvedExpenses.toFixed(2)}</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statLabel}>Rechazado</Text>
            <Text style={styles.statValue}>${rejectedExpenses.toFixed(2)}</Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  const isAdmin = user?.role === UserRole.ADMIN;

  return (
    <View style={styles.container}>
      {isOffline && (
        <View style={styles.offlineBanner}>
          <Ionicons name="cloud-offline" size={20} color={COLORS.common.white} />
          <Text style={styles.offlineText}>Modo sin conexión</Text>
        </View>
      )}

      <View style={styles.searchContainer}>
        <Ionicons name="search" size={20} color={COLORS.text.light.tertiary} />
        <TextInput
          style={styles.searchInput}
          placeholder="Buscar proyectos..."
          value={searchQuery}
          onChangeText={setSearchQuery}
          placeholderTextColor={COLORS.text.light.tertiary}
        />
        {searchQuery.length > 0 && (
          <TouchableOpacity onPress={() => setSearchQuery('')}>
            <Ionicons name="close-circle" size={20} color={COLORS.text.light.tertiary} />
          </TouchableOpacity>
        )}
      </View>

      {loading && !refreshing ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={COLORS.primary.medium} />
        </View>
      ) : (
        <FlatList
          data={filteredProjects}
          renderItem={renderProjectItem}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.listContainer}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={handleRefresh}
              colors={[COLORS.primary.medium]}
              tintColor={COLORS.primary.medium}
            />
          }
          ListEmptyComponent={
            <View style={styles.emptyContainer}>
              <Ionicons name="folder-open-outline" size={60} color={COLORS.text.light.tertiary} />
              <Text style={styles.emptyText}>
                {searchQuery.length > 0
                  ? 'No se encontraron proyectos que coincidan con tu búsqueda'
                  : 'No hay proyectos disponibles'}
              </Text>
              {isAdmin && (
                <TouchableOpacity
                  style={styles.emptyButton}
                  onPress={handleAddProject}
                >
                  <Text style={styles.emptyButtonText}>Crear Proyecto</Text>
                </TouchableOpacity>
              )}
            </View>
          }
        />
      )}

      {isAdmin && (
        <TouchableOpacity
          style={styles.fab}
          onPress={handleAddProject}
          disabled={isOffline}
        >
          <Ionicons name="add" size={24} color={COLORS.common.white} />
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background.light,
  },
  offlineBanner: {
    backgroundColor: COLORS.status.pending,
    padding: SPACING.sm,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  offlineText: {
    color: COLORS.common.white,
    marginLeft: SPACING.xs,
    fontWeight: 'bold',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.common.white,
    borderRadius: BORDER_RADIUS.md,
    margin: SPACING.md,
    paddingHorizontal: SPACING.md,
    ...SHADOWS.light,
  },
  searchInput: {
    flex: 1,
    height: 50,
    fontSize: FONT_SIZE.md,
    marginLeft: SPACING.sm,
    color: COLORS.text.light.primary,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  listContainer: {
    padding: SPACING.md,
    paddingBottom: SPACING.xl * 2,
  },
  projectCard: {
    backgroundColor: COLORS.common.white,
    borderRadius: BORDER_RADIUS.md,
    padding: SPACING.md,
    marginBottom: SPACING.md,
    ...SHADOWS.light,
  },
  projectHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: SPACING.sm,
  },
  projectName: {
    fontSize: FONT_SIZE.lg,
    fontWeight: 'bold',
    color: COLORS.text.light.primary,
    flex: 1,
  },
  statusIndicator: {
    marginLeft: SPACING.sm,
  },
  activeStatus: {
    backgroundColor: COLORS.status.approved,
    paddingHorizontal: SPACING.sm,
    paddingVertical: SPACING.xs / 2,
    borderRadius: BORDER_RADIUS.round,
  },
  inactiveStatus: {
    backgroundColor: COLORS.text.light.tertiary,
    paddingHorizontal: SPACING.sm,
    paddingVertical: SPACING.xs / 2,
    borderRadius: BORDER_RADIUS.round,
  },
  statusText: {
    color: COLORS.common.white,
    fontSize: FONT_SIZE.xs,
    fontWeight: 'bold',
  },
  projectDescription: {
    fontSize: FONT_SIZE.sm,
    color: COLORS.text.light.secondary,
    marginBottom: SPACING.md,
  },
  projectStats: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderTopWidth: 1,
    borderTopColor: COLORS.border.light,
    paddingTop: SPACING.md,
  },
  statItem: {
    alignItems: 'center',
  },
  statLabel: {
    fontSize: FONT_SIZE.xs,
    color: COLORS.text.light.tertiary,
    marginBottom: SPACING.xs / 2,
  },
  statValue: {
    fontSize: FONT_SIZE.sm,
    fontWeight: 'bold',
    color: COLORS.text.light.primary,
  },
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: SPACING.xl,
  },
  emptyText: {
    fontSize: FONT_SIZE.md,
    color: COLORS.text.light.tertiary,
    textAlign: 'center',
    marginTop: SPACING.md,
    marginBottom: SPACING.lg,
  },
  emptyButton: {
    backgroundColor: COLORS.primary.medium,
    paddingHorizontal: SPACING.lg,
    paddingVertical: SPACING.md,
    borderRadius: BORDER_RADIUS.md,
    ...SHADOWS.light,
  },
  emptyButtonText: {
    color: COLORS.common.white,
    fontWeight: 'bold',
  },
  fab: {
    position: 'absolute',
    bottom: SPACING.xl,
    right: SPACING.xl,
    backgroundColor: COLORS.primary.medium,
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
    ...SHADOWS.medium,
  },
});

export default ProjectsListScreen; 