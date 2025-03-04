import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
  FlatList,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, SPACING, FONT_SIZE, BORDER_RADIUS, SHADOWS } from '../../constants/theme';
import { RootState } from '../../store';
import { fetchProjectById, updateProjectStatus } from '../../store/slices/projectsSlice';
import { fetchReceiptsByProject } from '../../store/slices/receiptsSlice';
import { ProjectRouteProp, ProjectNavigationProp } from '../../navigation/types';
import { UserRole, ReceiptStatus } from '../../types';

interface ProjectDetailScreenProps {
  route: ProjectRouteProp<'ProjectDetail'>;
  navigation: ProjectNavigationProp<'ProjectDetail'>;
}

const ProjectDetailScreen: React.FC<ProjectDetailScreenProps> = ({ route, navigation }) => {
  const { projectId } = route.params;
  const dispatch = useDispatch();
  const { user } = useSelector((state: RootState) => state.auth);
  const { currentProject, loading: projectLoading } = useSelector((state: RootState) => state.projects);
  const { receipts, loading: receiptsLoading } = useSelector((state: RootState) => state.receipts);
  const { isOffline } = useSelector((state: RootState) => state.ui);

  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    loadProjectData();
  }, [dispatch, projectId]);

  const loadProjectData = async () => {
    try {
      // @ts-ignore - Ignoramos el error de tipado por ahora
      await dispatch(fetchProjectById(projectId));
      // @ts-ignore - Ignoramos el error de tipado por ahora
      await dispatch(fetchReceiptsByProject(projectId));
    } catch (error) {
      console.error('Error al cargar datos del proyecto:', error);
      if (!isOffline) {
        Alert.alert('Error', 'No se pudieron cargar los datos del proyecto. Inténtalo de nuevo.');
      }
    }
  };

  const handleRefresh = async () => {
    if (isOffline) {
      Alert.alert('Modo sin conexión', 'No se pueden actualizar los datos en modo sin conexión');
      return;
    }

    setRefreshing(true);
    await loadProjectData();
    setRefreshing(false);
  };

  const handleEditProject = () => {
    if (currentProject) {
      navigation.navigate('EditProject', { project: currentProject });
    }
  };

  const handleToggleProjectStatus = () => {
    if (isOffline) {
      Alert.alert('Error', 'No puedes cambiar el estado del proyecto en modo sin conexión');
      return;
    }

    if (!currentProject) return;

    const newStatus = !currentProject.isActive;
    const actionText = newStatus ? 'activar' : 'desactivar';

    Alert.alert(
      `Confirmar ${actionText} proyecto`,
      `¿Estás seguro de que deseas ${actionText} este proyecto?`,
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Confirmar',
          onPress: async () => {
            try {
              // @ts-ignore - Ignoramos el error de tipado por ahora
              await dispatch(updateProjectStatus({
                projectId: currentProject.id,
                isActive: newStatus,
              })).unwrap();
              
              Alert.alert('Éxito', `El proyecto ha sido ${newStatus ? 'activado' : 'desactivado'} correctamente`);
            } catch (error) {
              console.error('Error al actualizar estado del proyecto:', error);
              Alert.alert('Error', 'No se pudo actualizar el estado del proyecto. Inténtalo de nuevo.');
            }
          },
        },
      ]
    );
  };

  const handleReceiptPress = (receiptId: string) => {
    navigation.navigate('ReceiptDetail', { receiptId });
  };

  const renderReceiptItem = ({ item }: any) => {
    return (
      <TouchableOpacity
        style={styles.receiptItem}
        onPress={() => handleReceiptPress(item.id)}
      >
        <View style={styles.receiptHeader}>
          <Text style={styles.receiptMerchant}>{item.merchant}</Text>
          <View
            style={[
              styles.receiptStatusBadge,
              {
                backgroundColor:
                  item.status === ReceiptStatus.APPROVED
                    ? COLORS.status.approved
                    : item.status === ReceiptStatus.REJECTED
                    ? COLORS.status.rejected
                    : COLORS.status.pending,
              },
            ]}
          >
            <Text style={styles.receiptStatusText}>
              {item.status === ReceiptStatus.APPROVED
                ? 'Aprobado'
                : item.status === ReceiptStatus.REJECTED
                ? 'Rechazado'
                : 'Pendiente'}
            </Text>
          </View>
        </View>

        <View style={styles.receiptDetails}>
          <View style={styles.receiptDetail}>
            <Ionicons name="calendar-outline" size={16} color={COLORS.text.light.secondary} />
            <Text style={styles.receiptDetailText}>
              {new Date(item.date).toLocaleDateString()}
            </Text>
          </View>

          <View style={styles.receiptDetail}>
            <Ionicons name="cash-outline" size={16} color={COLORS.text.light.secondary} />
            <Text style={styles.receiptDetailText}>${item.amount.toFixed(2)}</Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  if (projectLoading && !currentProject) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={COLORS.primary.medium} />
      </View>
    );
  }

  if (!currentProject) {
    return (
      <View style={styles.errorContainer}>
        <Ionicons name="alert-circle-outline" size={60} color={COLORS.common.error} />
        <Text style={styles.errorText}>No se pudo cargar el proyecto</Text>
        <TouchableOpacity style={styles.errorButton} onPress={() => navigation.goBack()}>
          <Text style={styles.errorButtonText}>Volver</Text>
        </TouchableOpacity>
      </View>
    );
  }

  const isAdmin = user?.role === UserRole.ADMIN;
  const projectReceipts = receipts.filter(receipt => receipt.projectId === projectId);

  // Calcular estadísticas
  const totalExpenses = currentProject.totalExpenses || 0;
  const pendingExpenses = currentProject.pendingExpenses || 0;
  const approvedExpenses = currentProject.approvedExpenses || 0;
  const rejectedExpenses = currentProject.rejectedExpenses || 0;

  const pendingCount = projectReceipts.filter(r => r.status === ReceiptStatus.PENDING).length;
  const approvedCount = projectReceipts.filter(r => r.status === ReceiptStatus.APPROVED).length;
  const rejectedCount = projectReceipts.filter(r => r.status === ReceiptStatus.REJECTED).length;

  return (
    <View style={styles.container}>
      {isOffline && (
        <View style={styles.offlineBanner}>
          <Ionicons name="cloud-offline" size={20} color={COLORS.common.white} />
          <Text style={styles.offlineText}>Modo sin conexión</Text>
        </View>
      )}

      <ScrollView
        style={styles.scrollContainer}
        refreshing={refreshing}
        onRefresh={handleRefresh}
      >
        <View style={styles.header}>
          <View style={styles.projectTitleContainer}>
            <Text style={styles.projectTitle}>{currentProject.name}</Text>
            <View
              style={[
                styles.statusBadge,
                {
                  backgroundColor: currentProject.isActive
                    ? COLORS.status.approved
                    : COLORS.text.light.tertiary,
                },
              ]}
            >
              <Text style={styles.statusText}>
                {currentProject.isActive ? 'Activo' : 'Inactivo'}
              </Text>
            </View>
          </View>

          {isAdmin && (
            <View style={styles.actionButtons}>
              <TouchableOpacity
                style={[styles.actionButton, styles.editButton]}
                onPress={handleEditProject}
              >
                <Ionicons name="create-outline" size={20} color={COLORS.common.white} />
              </TouchableOpacity>

              <TouchableOpacity
                style={[
                  styles.actionButton,
                  currentProject.isActive ? styles.deactivateButton : styles.activateButton,
                ]}
                onPress={handleToggleProjectStatus}
                disabled={isOffline}
              >
                <Ionicons
                  name={currentProject.isActive ? 'close-outline' : 'checkmark-outline'}
                  size={20}
                  color={COLORS.common.white}
                />
              </TouchableOpacity>
            </View>
          )}
        </View>

        {currentProject.description && (
          <View style={styles.descriptionContainer}>
            <Text style={styles.descriptionTitle}>Descripción</Text>
            <Text style={styles.descriptionText}>{currentProject.description}</Text>
          </View>
        )}

        <View style={styles.statsContainer}>
          <Text style={styles.sectionTitle}>Resumen Financiero</Text>
          
          <View style={styles.statsGrid}>
            <View style={styles.statCard}>
              <Text style={styles.statValue}>${totalExpenses.toFixed(2)}</Text>
              <Text style={styles.statLabel}>Total Gastos</Text>
            </View>
            
            <View style={styles.statCard}>
              <Text style={styles.statValue}>${pendingExpenses.toFixed(2)}</Text>
              <Text style={styles.statLabel}>Pendiente</Text>
              <Text style={styles.statCount}>{pendingCount} recibos</Text>
            </View>
            
            <View style={styles.statCard}>
              <Text style={styles.statValue}>${approvedExpenses.toFixed(2)}</Text>
              <Text style={styles.statLabel}>Aprobado</Text>
              <Text style={styles.statCount}>{approvedCount} recibos</Text>
            </View>
            
            <View style={styles.statCard}>
              <Text style={styles.statValue}>${rejectedExpenses.toFixed(2)}</Text>
              <Text style={styles.statLabel}>Rechazado</Text>
              <Text style={styles.statCount}>{rejectedCount} recibos</Text>
            </View>
          </View>
        </View>

        <View style={styles.receiptsContainer}>
          <View style={styles.receiptsHeader}>
            <Text style={styles.sectionTitle}>Recibos</Text>
            <TouchableOpacity
              style={styles.addReceiptButton}
              onPress={() => navigation.navigate('AddReceipt')}
              disabled={isOffline || !currentProject.isActive}
            >
              <Ionicons name="add-outline" size={20} color={COLORS.common.white} />
              <Text style={styles.addReceiptButtonText}>Nuevo Recibo</Text>
            </TouchableOpacity>
          </View>

          {receiptsLoading ? (
            <ActivityIndicator size="large" color={COLORS.primary.medium} style={styles.receiptsLoading} />
          ) : projectReceipts.length === 0 ? (
            <View style={styles.emptyReceiptsContainer}>
              <Ionicons name="receipt-outline" size={60} color={COLORS.text.light.tertiary} />
              <Text style={styles.emptyReceiptsText}>No hay recibos para este proyecto</Text>
            </View>
          ) : (
            <FlatList
              data={projectReceipts}
              renderItem={renderReceiptItem}
              keyExtractor={(item) => item.id}
              scrollEnabled={false}
            />
          )}
        </View>
      </ScrollView>
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
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: SPACING.xl,
  },
  errorText: {
    fontSize: FONT_SIZE.lg,
    color: COLORS.text.light.secondary,
    textAlign: 'center',
    marginTop: SPACING.md,
    marginBottom: SPACING.lg,
  },
  errorButton: {
    backgroundColor: COLORS.primary.medium,
    paddingHorizontal: SPACING.lg,
    paddingVertical: SPACING.md,
    borderRadius: BORDER_RADIUS.md,
  },
  errorButtonText: {
    color: COLORS.common.white,
    fontWeight: 'bold',
  },
  scrollContainer: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: SPACING.md,
    backgroundColor: COLORS.common.white,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border.light,
  },
  projectTitleContainer: {
    flex: 1,
  },
  projectTitle: {
    fontSize: FONT_SIZE.xl,
    fontWeight: 'bold',
    color: COLORS.text.light.primary,
    marginBottom: SPACING.xs,
  },
  statusBadge: {
    alignSelf: 'flex-start',
    paddingHorizontal: SPACING.sm,
    paddingVertical: SPACING.xs / 2,
    borderRadius: BORDER_RADIUS.round,
    marginTop: SPACING.xs,
  },
  statusText: {
    color: COLORS.common.white,
    fontSize: FONT_SIZE.xs,
    fontWeight: 'bold',
  },
  actionButtons: {
    flexDirection: 'row',
  },
  actionButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: SPACING.sm,
  },
  editButton: {
    backgroundColor: COLORS.primary.medium,
  },
  activateButton: {
    backgroundColor: COLORS.status.approved,
  },
  deactivateButton: {
    backgroundColor: COLORS.status.rejected,
  },
  descriptionContainer: {
    backgroundColor: COLORS.common.white,
    padding: SPACING.md,
    marginTop: SPACING.md,
    marginHorizontal: SPACING.md,
    borderRadius: BORDER_RADIUS.md,
    ...SHADOWS.light,
  },
  descriptionTitle: {
    fontSize: FONT_SIZE.md,
    fontWeight: 'bold',
    color: COLORS.text.light.secondary,
    marginBottom: SPACING.sm,
  },
  descriptionText: {
    fontSize: FONT_SIZE.md,
    color: COLORS.text.light.primary,
    lineHeight: 22,
  },
  statsContainer: {
    backgroundColor: COLORS.common.white,
    padding: SPACING.md,
    marginTop: SPACING.md,
    marginHorizontal: SPACING.md,
    borderRadius: BORDER_RADIUS.md,
    ...SHADOWS.light,
  },
  sectionTitle: {
    fontSize: FONT_SIZE.lg,
    fontWeight: 'bold',
    color: COLORS.text.light.primary,
    marginBottom: SPACING.md,
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  statCard: {
    width: '48%',
    backgroundColor: COLORS.background.light,
    borderRadius: BORDER_RADIUS.md,
    padding: SPACING.md,
    marginBottom: SPACING.md,
    alignItems: 'center',
  },
  statValue: {
    fontSize: FONT_SIZE.xl,
    fontWeight: 'bold',
    color: COLORS.primary.medium,
    marginBottom: SPACING.xs,
  },
  statLabel: {
    fontSize: FONT_SIZE.sm,
    color: COLORS.text.light.secondary,
    marginBottom: SPACING.xs,
  },
  statCount: {
    fontSize: FONT_SIZE.xs,
    color: COLORS.text.light.tertiary,
  },
  receiptsContainer: {
    backgroundColor: COLORS.common.white,
    padding: SPACING.md,
    marginTop: SPACING.md,
    marginHorizontal: SPACING.md,
    marginBottom: SPACING.xl,
    borderRadius: BORDER_RADIUS.md,
    ...SHADOWS.light,
  },
  receiptsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: SPACING.md,
  },
  addReceiptButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.primary.medium,
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.sm,
    borderRadius: BORDER_RADIUS.md,
  },
  addReceiptButtonText: {
    color: COLORS.common.white,
    fontWeight: 'bold',
    marginLeft: SPACING.xs,
  },
  receiptsLoading: {
    marginVertical: SPACING.xl,
  },
  emptyReceiptsContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: SPACING.xl,
  },
  emptyReceiptsText: {
    fontSize: FONT_SIZE.md,
    color: COLORS.text.light.tertiary,
    textAlign: 'center',
    marginTop: SPACING.md,
  },
  receiptItem: {
    backgroundColor: COLORS.background.light,
    borderRadius: BORDER_RADIUS.md,
    padding: SPACING.md,
    marginBottom: SPACING.md,
  },
  receiptHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: SPACING.sm,
  },
  receiptMerchant: {
    fontSize: FONT_SIZE.md,
    fontWeight: 'bold',
    color: COLORS.text.light.primary,
  },
  receiptStatusBadge: {
    paddingHorizontal: SPACING.sm,
    paddingVertical: SPACING.xs / 2,
    borderRadius: BORDER_RADIUS.round,
  },
  receiptStatusText: {
    color: COLORS.common.white,
    fontSize: FONT_SIZE.xs,
    fontWeight: 'bold',
  },
  receiptDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  receiptDetail: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  receiptDetailText: {
    fontSize: FONT_SIZE.sm,
    color: COLORS.text.light.secondary,
    marginLeft: SPACING.xs,
  },
});

export default ProjectDetailScreen; 