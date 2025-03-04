import React, { useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, SPACING, FONT_SIZE, BORDER_RADIUS, SHADOWS } from '../../constants/theme';
import { RootState } from '../../store';
import { fetchReceipts } from '../../store/slices/receiptsSlice';
import { fetchProjects } from '../../store/slices/projectsSlice';
import { MainTabNavigationProp } from '../../navigation/types';

interface HomeScreenProps {
  navigation: MainTabNavigationProp<'Home'>;
}

const HomeScreen: React.FC<HomeScreenProps> = ({ navigation }) => {
  const dispatch = useDispatch();
  const { user } = useSelector((state: RootState) => state.auth);
  const { receipts, loading: receiptsLoading } = useSelector((state: RootState) => state.receipts);
  const { projects, loading: projectsLoading } = useSelector((state: RootState) => state.projects);
  const { isOffline } = useSelector((state: RootState) => state.ui);

  useEffect(() => {
    if (user) {
      // @ts-ignore - Ignoramos el error de tipado por ahora
      dispatch(fetchReceipts(user.id));
      // @ts-ignore - Ignoramos el error de tipado por ahora
      dispatch(fetchProjects());
    }
  }, [dispatch, user]);

  // Calcular estadísticas
  const pendingReceipts = receipts.filter(receipt => receipt.status === 'pending');
  const approvedReceipts = receipts.filter(receipt => receipt.status === 'approved');
  const rejectedReceipts = receipts.filter(receipt => receipt.status === 'rejected');

  const totalAmount = approvedReceipts.reduce((sum, receipt) => sum + receipt.amount, 0);

  // Obtener los recibos más recientes
  const recentReceipts = [...receipts].sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  ).slice(0, 5);

  if (receiptsLoading || projectsLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={COLORS.primary.medium} />
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      {isOffline && (
        <View style={styles.offlineBanner}>
          <Ionicons name="cloud-offline" size={20} color={COLORS.common.white} />
          <Text style={styles.offlineText}>Modo sin conexión</Text>
        </View>
      )}

      <View style={styles.header}>
        <Text style={styles.greeting}>Hola, {user?.firstName || 'Usuario'}</Text>
        <Text style={styles.subGreeting}>Bienvenido a BlueElectric Receipt</Text>
      </View>

      <View style={styles.statsContainer}>
        <View style={styles.statCard}>
          <Text style={styles.statValue}>{receipts.length}</Text>
          <Text style={styles.statLabel}>Total Recibos</Text>
        </View>
        <View style={styles.statCard}>
          <Text style={styles.statValue}>{pendingReceipts.length}</Text>
          <Text style={styles.statLabel}>Pendientes</Text>
        </View>
        <View style={styles.statCard}>
          <Text style={styles.statValue}>${totalAmount.toFixed(2)}</Text>
          <Text style={styles.statLabel}>Aprobados</Text>
        </View>
      </View>

      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>Recibos Recientes</Text>
        <TouchableOpacity onPress={() => navigation.navigate('Receipts')}>
          <Text style={styles.seeAllText}>Ver todos</Text>
        </TouchableOpacity>
      </View>

      {recentReceipts.length > 0 ? (
        recentReceipts.map(receipt => (
          <TouchableOpacity
            key={receipt.id}
            style={styles.receiptCard}
            onPress={() => navigation.navigate('Receipts', {
              screen: 'ReceiptDetail',
              params: { receiptId: receipt.id },
            })}
          >
            <View style={styles.receiptInfo}>
              <Text style={styles.receiptMerchant}>{receipt.merchant}</Text>
              <Text style={styles.receiptDate}>
                {new Date(receipt.date).toLocaleDateString()}
              </Text>
            </View>
            <View style={styles.receiptAmount}>
              <Text style={styles.amountText}>${receipt.amount.toFixed(2)}</Text>
              <View
                style={[
                  styles.statusBadge,
                  {
                    backgroundColor:
                      receipt.status === 'approved'
                        ? COLORS.status.approved
                        : receipt.status === 'rejected'
                        ? COLORS.status.rejected
                        : COLORS.status.pending,
                  },
                ]}
              >
                <Text style={styles.statusText}>
                  {receipt.status === 'approved'
                    ? 'Aprobado'
                    : receipt.status === 'rejected'
                    ? 'Rechazado'
                    : 'Pendiente'}
                </Text>
              </View>
            </View>
          </TouchableOpacity>
        ))
      ) : (
        <View style={styles.emptyState}>
          <Ionicons name="receipt-outline" size={48} color={COLORS.text.light.disabled} />
          <Text style={styles.emptyStateText}>No hay recibos recientes</Text>
          <TouchableOpacity
            style={styles.addButton}
            onPress={() => navigation.navigate('AddReceipt')}
          >
            <Text style={styles.addButtonText}>Añadir Recibo</Text>
          </TouchableOpacity>
        </View>
      )}

      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>Proyectos</Text>
        <TouchableOpacity onPress={() => navigation.navigate('Projects')}>
          <Text style={styles.seeAllText}>Ver todos</Text>
        </TouchableOpacity>
      </View>

      {projects.length > 0 ? (
        projects.slice(0, 3).map(project => (
          <TouchableOpacity
            key={project.id}
            style={styles.projectCard}
            onPress={() => navigation.navigate('Projects', {
              screen: 'ProjectDetail',
              params: { projectId: project.id },
            })}
          >
            <View style={styles.projectInfo}>
              <Text style={styles.projectName}>{project.name}</Text>
              <Text style={styles.projectDescription} numberOfLines={1}>
                {project.description}
              </Text>
            </View>
            <Ionicons name="chevron-forward" size={24} color={COLORS.text.light.secondary} />
          </TouchableOpacity>
        ))
      ) : (
        <View style={styles.emptyState}>
          <Ionicons name="folder-outline" size={48} color={COLORS.text.light.disabled} />
          <Text style={styles.emptyStateText}>No hay proyectos disponibles</Text>
        </View>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background.light,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
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
  header: {
    padding: SPACING.lg,
    backgroundColor: COLORS.primary.medium,
  },
  greeting: {
    fontSize: FONT_SIZE.xl,
    fontWeight: 'bold',
    color: COLORS.common.white,
  },
  subGreeting: {
    fontSize: FONT_SIZE.md,
    color: COLORS.common.white,
    opacity: 0.8,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: SPACING.md,
    marginTop: -SPACING.lg,
  },
  statCard: {
    flex: 1,
    backgroundColor: COLORS.common.white,
    borderRadius: BORDER_RADIUS.md,
    padding: SPACING.md,
    marginHorizontal: SPACING.xs,
    alignItems: 'center',
    ...SHADOWS.medium,
  },
  statValue: {
    fontSize: FONT_SIZE.lg,
    fontWeight: 'bold',
    color: COLORS.primary.medium,
  },
  statLabel: {
    fontSize: FONT_SIZE.xs,
    color: COLORS.text.light.secondary,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: SPACING.md,
    marginTop: SPACING.md,
  },
  sectionTitle: {
    fontSize: FONT_SIZE.lg,
    fontWeight: 'bold',
    color: COLORS.text.light.primary,
  },
  seeAllText: {
    fontSize: FONT_SIZE.sm,
    color: COLORS.primary.medium,
  },
  receiptCard: {
    backgroundColor: COLORS.common.white,
    borderRadius: BORDER_RADIUS.md,
    padding: SPACING.md,
    marginHorizontal: SPACING.md,
    marginBottom: SPACING.md,
    flexDirection: 'row',
    justifyContent: 'space-between',
    ...SHADOWS.light,
  },
  receiptInfo: {
    flex: 1,
  },
  receiptMerchant: {
    fontSize: FONT_SIZE.md,
    fontWeight: 'bold',
    color: COLORS.text.light.primary,
  },
  receiptDate: {
    fontSize: FONT_SIZE.sm,
    color: COLORS.text.light.secondary,
  },
  receiptAmount: {
    alignItems: 'flex-end',
  },
  amountText: {
    fontSize: FONT_SIZE.md,
    fontWeight: 'bold',
    color: COLORS.text.light.primary,
  },
  statusBadge: {
    borderRadius: BORDER_RADIUS.round,
    paddingHorizontal: SPACING.sm,
    paddingVertical: SPACING.xs / 2,
    marginTop: SPACING.xs,
  },
  statusText: {
    fontSize: FONT_SIZE.xs,
    color: COLORS.common.white,
    fontWeight: 'bold',
  },
  emptyState: {
    alignItems: 'center',
    padding: SPACING.xl,
  },
  emptyStateText: {
    fontSize: FONT_SIZE.md,
    color: COLORS.text.light.secondary,
    marginTop: SPACING.md,
  },
  addButton: {
    backgroundColor: COLORS.primary.medium,
    borderRadius: BORDER_RADIUS.md,
    paddingHorizontal: SPACING.lg,
    paddingVertical: SPACING.md,
    marginTop: SPACING.md,
  },
  addButtonText: {
    color: COLORS.common.white,
    fontWeight: 'bold',
  },
  projectCard: {
    backgroundColor: COLORS.common.white,
    borderRadius: BORDER_RADIUS.md,
    padding: SPACING.md,
    marginHorizontal: SPACING.md,
    marginBottom: SPACING.md,
    flexDirection: 'row',
    alignItems: 'center',
    ...SHADOWS.light,
  },
  projectInfo: {
    flex: 1,
  },
  projectName: {
    fontSize: FONT_SIZE.md,
    fontWeight: 'bold',
    color: COLORS.text.light.primary,
  },
  projectDescription: {
    fontSize: FONT_SIZE.sm,
    color: COLORS.text.light.secondary,
  },
});

export default HomeScreen; 