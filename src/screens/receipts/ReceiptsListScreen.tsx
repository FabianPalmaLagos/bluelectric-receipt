import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
  TextInput,
  RefreshControl,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, SPACING, FONT_SIZE, BORDER_RADIUS, SHADOWS } from '../../constants/theme';
import { RootState } from '../../store';
import { fetchReceipts } from '../../store/slices/receiptsSlice';
import { fetchProjects } from '../../store/slices/projectsSlice';
import { ReceiptNavigationProp } from '../../navigation/types';
import { Receipt, ReceiptStatus, Project } from '../../types';

interface ReceiptsListScreenProps {
  navigation: ReceiptNavigationProp<'ReceiptsList'>;
}

const ReceiptsListScreen: React.FC<ReceiptsListScreenProps> = ({ navigation }) => {
  const dispatch = useDispatch();
  const { user } = useSelector((state: RootState) => state.auth);
  const { receipts, loading, pendingReceipts } = useSelector((state: RootState) => state.receipts);
  const { projects } = useSelector((state: RootState) => state.projects);
  const { isOffline } = useSelector((state: RootState) => state.ui);

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStatus, setSelectedStatus] = useState<ReceiptStatus | 'all'>('all');
  const [selectedProject, setSelectedProject] = useState<string | 'all'>('all');
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    loadData();
  }, [dispatch, user]);

  const loadData = () => {
    if (user) {
      // @ts-ignore - Ignoramos el error de tipado por ahora
      dispatch(fetchReceipts(user.id));
      // @ts-ignore - Ignoramos el error de tipado por ahora
      dispatch(fetchProjects());
    }
  };

  const onRefresh = () => {
    setRefreshing(true);
    loadData();
    setRefreshing(false);
  };

  // Filtrar recibos
  const filteredReceipts = [...receipts, ...pendingReceipts].filter(receipt => {
    // Filtrar por búsqueda
    const matchesSearch =
      receipt.merchant.toLowerCase().includes(searchQuery.toLowerCase()) ||
      receipt.description.toLowerCase().includes(searchQuery.toLowerCase());

    // Filtrar por estado
    const matchesStatus = selectedStatus === 'all' || receipt.status === selectedStatus;

    // Filtrar por proyecto
    const matchesProject = selectedProject === 'all' || receipt.projectId === selectedProject;

    return matchesSearch && matchesStatus && matchesProject;
  });

  // Ordenar recibos por fecha (más recientes primero)
  const sortedReceipts = [...filteredReceipts].sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );

  const getProjectName = (projectId: string) => {
    const project = projects.find(p => p.id === projectId);
    return project ? project.name : 'Proyecto Desconocido';
  };

  const renderReceiptItem = ({ item }: { item: Receipt }) => {
    const isPending = item.id.startsWith('temp-');
    
    return (
      <TouchableOpacity
        style={[styles.receiptCard, isPending && styles.pendingCard]}
        onPress={() => {
          if (!isPending) {
            navigation.navigate('ReceiptDetail', { receiptId: item.id });
          }
        }}
        disabled={isPending}
      >
        <View style={styles.receiptHeader}>
          <Text style={styles.receiptMerchant}>{item.merchant}</Text>
          <Text style={styles.receiptAmount}>${item.amount.toFixed(2)}</Text>
        </View>
        
        <View style={styles.receiptInfo}>
          <Text style={styles.receiptDate}>
            {new Date(item.date).toLocaleDateString()}
          </Text>
          <Text style={styles.receiptProject}>
            {getProjectName(item.projectId)}
          </Text>
        </View>
        
        <View style={styles.receiptFooter}>
          <View
            style={[
              styles.statusBadge,
              {
                backgroundColor:
                  item.status === 'approved'
                    ? COLORS.status.approved
                    : item.status === 'rejected'
                    ? COLORS.status.rejected
                    : COLORS.status.pending,
              },
            ]}
          >
            <Text style={styles.statusText}>
              {item.status === 'approved'
                ? 'Aprobado'
                : item.status === 'rejected'
                ? 'Rechazado'
                : 'Pendiente'}
            </Text>
          </View>
          
          {isPending && (
            <View style={styles.syncBadge}>
              <Ionicons name="cloud-offline" size={14} color={COLORS.common.white} />
              <Text style={styles.syncText}>Sin sincronizar</Text>
            </View>
          )}
        </View>
      </TouchableOpacity>
    );
  };

  const renderEmptyList = () => (
    <View style={styles.emptyContainer}>
      <Ionicons name="receipt-outline" size={64} color={COLORS.text.light.disabled} />
      <Text style={styles.emptyText}>No hay recibos disponibles</Text>
      <TouchableOpacity
        style={styles.addButton}
        onPress={() => navigation.navigate('AddReceipt' as any)}
      >
        <Text style={styles.addButtonText}>Añadir Recibo</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      {isOffline && (
        <View style={styles.offlineBanner}>
          <Ionicons name="cloud-offline" size={20} color={COLORS.common.white} />
          <Text style={styles.offlineText}>Modo sin conexión</Text>
        </View>
      )}

      <View style={styles.searchContainer}>
        <View style={styles.searchInputContainer}>
          <Ionicons name="search" size={20} color={COLORS.text.light.secondary} />
          <TextInput
            style={styles.searchInput}
            placeholder="Buscar recibos..."
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
          {searchQuery ? (
            <TouchableOpacity onPress={() => setSearchQuery('')}>
              <Ionicons name="close-circle" size={20} color={COLORS.text.light.secondary} />
            </TouchableOpacity>
          ) : null}
        </View>
      </View>

      <View style={styles.filtersContainer}>
        <ScrollableFilter
          options={[
            { label: 'Todos', value: 'all' },
            { label: 'Pendientes', value: 'pending' },
            { label: 'Aprobados', value: 'approved' },
            { label: 'Rechazados', value: 'rejected' },
          ]}
          selectedValue={selectedStatus}
          onSelect={(value) => setSelectedStatus(value as ReceiptStatus | 'all')}
        />

        <ScrollableFilter
          options={[
            { label: 'Todos los Proyectos', value: 'all' },
            ...projects.map(project => ({ label: project.name, value: project.id })),
          ]}
          selectedValue={selectedProject}
          onSelect={setSelectedProject}
        />
      </View>

      {loading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={COLORS.primary.medium} />
        </View>
      ) : (
        <FlatList
          data={sortedReceipts}
          renderItem={renderReceiptItem}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.listContainer}
          ListEmptyComponent={renderEmptyList}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        />
      )}

      <TouchableOpacity
        style={styles.fab}
        onPress={() => navigation.navigate('AddReceipt' as any)}
      >
        <Ionicons name="add" size={24} color={COLORS.common.white} />
      </TouchableOpacity>
    </View>
  );
};

interface ScrollableFilterProps {
  options: Array<{ label: string; value: string }>;
  selectedValue: string;
  onSelect: (value: string) => void;
}

const ScrollableFilter: React.FC<ScrollableFilterProps> = ({ options, selectedValue, onSelect }) => {
  return (
    <View style={styles.filterScrollContainer}>
      <FlatList
        horizontal
        data={options}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={[
              styles.filterOption,
              selectedValue === item.value && styles.filterOptionSelected,
            ]}
            onPress={() => onSelect(item.value)}
          >
            <Text
              style={[
                styles.filterOptionText,
                selectedValue === item.value && styles.filterOptionTextSelected,
              ]}
            >
              {item.label}
            </Text>
          </TouchableOpacity>
        )}
        keyExtractor={(item) => item.value}
        showsHorizontalScrollIndicator={false}
      />
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
    padding: SPACING.md,
    backgroundColor: COLORS.primary.medium,
  },
  searchInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.common.white,
    borderRadius: BORDER_RADIUS.md,
    paddingHorizontal: SPACING.md,
  },
  searchInput: {
    flex: 1,
    height: 40,
    marginLeft: SPACING.sm,
    color: COLORS.text.light.primary,
  },
  filtersContainer: {
    backgroundColor: COLORS.common.white,
    ...SHADOWS.light,
  },
  filterScrollContainer: {
    paddingVertical: SPACING.sm,
  },
  filterOption: {
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.xs,
    marginHorizontal: SPACING.xs,
    borderRadius: BORDER_RADIUS.round,
    backgroundColor: COLORS.background.light,
  },
  filterOptionSelected: {
    backgroundColor: COLORS.primary.medium,
  },
  filterOptionText: {
    color: COLORS.text.light.secondary,
    fontSize: FONT_SIZE.sm,
  },
  filterOptionTextSelected: {
    color: COLORS.common.white,
    fontWeight: 'bold',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  listContainer: {
    padding: SPACING.md,
    paddingBottom: SPACING.xxl,
  },
  receiptCard: {
    backgroundColor: COLORS.common.white,
    borderRadius: BORDER_RADIUS.md,
    padding: SPACING.md,
    marginBottom: SPACING.md,
    ...SHADOWS.light,
  },
  pendingCard: {
    borderLeftWidth: 4,
    borderLeftColor: COLORS.status.pending,
  },
  receiptHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: SPACING.xs,
  },
  receiptMerchant: {
    fontSize: FONT_SIZE.md,
    fontWeight: 'bold',
    color: COLORS.text.light.primary,
  },
  receiptAmount: {
    fontSize: FONT_SIZE.md,
    fontWeight: 'bold',
    color: COLORS.primary.medium,
  },
  receiptInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: SPACING.md,
  },
  receiptDate: {
    fontSize: FONT_SIZE.sm,
    color: COLORS.text.light.secondary,
  },
  receiptProject: {
    fontSize: FONT_SIZE.sm,
    color: COLORS.text.light.secondary,
  },
  receiptFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  statusBadge: {
    borderRadius: BORDER_RADIUS.round,
    paddingHorizontal: SPACING.sm,
    paddingVertical: SPACING.xs / 2,
  },
  statusText: {
    fontSize: FONT_SIZE.xs,
    color: COLORS.common.white,
    fontWeight: 'bold',
  },
  syncBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.status.pending,
    borderRadius: BORDER_RADIUS.round,
    paddingHorizontal: SPACING.sm,
    paddingVertical: SPACING.xs / 2,
  },
  syncText: {
    fontSize: FONT_SIZE.xs,
    color: COLORS.common.white,
    fontWeight: 'bold',
    marginLeft: SPACING.xs,
  },
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: SPACING.xl,
  },
  emptyText: {
    fontSize: FONT_SIZE.md,
    color: COLORS.text.light.secondary,
    marginTop: SPACING.md,
    marginBottom: SPACING.lg,
  },
  addButton: {
    backgroundColor: COLORS.primary.medium,
    borderRadius: BORDER_RADIUS.md,
    paddingHorizontal: SPACING.lg,
    paddingVertical: SPACING.md,
  },
  addButtonText: {
    color: COLORS.common.white,
    fontWeight: 'bold',
  },
  fab: {
    position: 'absolute',
    bottom: SPACING.lg,
    right: SPACING.lg,
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: COLORS.primary.medium,
    justifyContent: 'center',
    alignItems: 'center',
    ...SHADOWS.medium,
  },
});

export default ReceiptsListScreen; 