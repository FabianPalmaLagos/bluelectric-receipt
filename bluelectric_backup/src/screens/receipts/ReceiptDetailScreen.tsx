import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, SPACING, FONT_SIZE, BORDER_RADIUS, SHADOWS } from '../../constants/theme';
import { RootState } from '../../store';
import { fetchReceiptById, updateReceiptStatus, deleteReceipt } from '../../store/slices/receiptsSlice';
import { ReceiptRouteProp, ReceiptNavigationProp } from '../../navigation/types';
import { UserRole, ReceiptStatus } from '../../types';

interface ReceiptDetailScreenProps {
  route: ReceiptRouteProp<'ReceiptDetail'>;
  navigation: ReceiptNavigationProp<'ReceiptDetail'>;
}

const ReceiptDetailScreen: React.FC<ReceiptDetailScreenProps> = ({ route, navigation }) => {
  const { receiptId } = route.params;
  const dispatch = useDispatch();
  const { user } = useSelector((state: RootState) => state.auth);
  const { currentReceipt, loading } = useSelector((state: RootState) => state.receipts);
  const { projects } = useSelector((state: RootState) => state.projects);
  const { isOffline } = useSelector((state: RootState) => state.ui);
  
  const [rejectionReason, setRejectionReason] = useState('');
  const [showRejectionDialog, setShowRejectionDialog] = useState(false);

  useEffect(() => {
    // @ts-ignore - Ignoramos el error de tipado por ahora
    dispatch(fetchReceiptById(receiptId));
  }, [dispatch, receiptId]);

  const getProjectName = (projectId: string) => {
    const project = projects.find(p => p.id === projectId);
    return project ? project.name : 'Proyecto Desconocido';
  };

  const handleApprove = () => {
    if (isOffline) {
      Alert.alert('Error', 'No puedes aprobar recibos en modo sin conexión');
      return;
    }

    Alert.alert(
      'Confirmar Aprobación',
      '¿Estás seguro de que deseas aprobar este recibo?',
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Aprobar',
          onPress: () => {
            if (currentReceipt) {
              // @ts-ignore - Ignoramos el error de tipado por ahora
              dispatch(updateReceiptStatus({
                receiptId: currentReceipt.id,
                status: ReceiptStatus.APPROVED,
              }));
            }
          },
        },
      ]
    );
  };

  const handleReject = () => {
    if (isOffline) {
      Alert.alert('Error', 'No puedes rechazar recibos en modo sin conexión');
      return;
    }

    Alert.alert(
      'Confirmar Rechazo',
      '¿Estás seguro de que deseas rechazar este recibo?',
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Rechazar',
          style: 'destructive',
          onPress: () => {
            if (currentReceipt) {
              // @ts-ignore - Ignoramos el error de tipado por ahora
              dispatch(updateReceiptStatus({
                receiptId: currentReceipt.id,
                status: ReceiptStatus.REJECTED,
                rejectionReason: 'Recibo rechazado por el administrador',
              }));
            }
          },
        },
      ]
    );
  };

  const handleDelete = () => {
    if (isOffline) {
      Alert.alert('Error', 'No puedes eliminar recibos en modo sin conexión');
      return;
    }

    Alert.alert(
      'Confirmar Eliminación',
      '¿Estás seguro de que deseas eliminar este recibo? Esta acción no se puede deshacer.',
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Eliminar',
          style: 'destructive',
          onPress: () => {
            if (currentReceipt) {
              // @ts-ignore - Ignoramos el error de tipado por ahora
              dispatch(deleteReceipt(currentReceipt.id)).then(() => {
                navigation.goBack();
              });
            }
          },
        },
      ]
    );
  };

  const handleEdit = () => {
    if (currentReceipt) {
      navigation.navigate('EditReceipt', { receipt: currentReceipt });
    }
  };

  const handleAddComment = () => {
    if (currentReceipt) {
      navigation.navigate('AddComment', { receiptId: currentReceipt.id });
    }
  };

  if (loading || !currentReceipt) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={COLORS.primary.medium} />
      </View>
    );
  }

  const isAdmin = user?.role === UserRole.ADMIN;
  const isOwner = user?.id === currentReceipt.userId;
  const canEdit = isOwner && currentReceipt.status === ReceiptStatus.PENDING;
  const canApproveReject = isAdmin && currentReceipt.status === ReceiptStatus.PENDING;

  return (
    <ScrollView style={styles.container}>
      {isOffline && (
        <View style={styles.offlineBanner}>
          <Ionicons name="cloud-offline" size={20} color={COLORS.common.white} />
          <Text style={styles.offlineText}>Modo sin conexión</Text>
        </View>
      )}

      <View style={styles.header}>
        <View
          style={[
            styles.statusBadge,
            {
              backgroundColor:
                currentReceipt.status === 'approved'
                  ? COLORS.status.approved
                  : currentReceipt.status === 'rejected'
                  ? COLORS.status.rejected
                  : COLORS.status.pending,
            },
          ]}
        >
          <Text style={styles.statusText}>
            {currentReceipt.status === 'approved'
              ? 'Aprobado'
              : currentReceipt.status === 'rejected'
              ? 'Rechazado'
              : 'Pendiente'}
          </Text>
        </View>
      </View>

      <View style={styles.imageContainer}>
        <Image
          source={{ uri: currentReceipt.imageUrl }}
          style={styles.receiptImage}
          resizeMode="contain"
        />
      </View>

      <View style={styles.detailsContainer}>
        <View style={styles.detailRow}>
          <Text style={styles.detailLabel}>Comercio:</Text>
          <Text style={styles.detailValue}>{currentReceipt.merchant}</Text>
        </View>

        <View style={styles.detailRow}>
          <Text style={styles.detailLabel}>Monto:</Text>
          <Text style={styles.detailValue}>${currentReceipt.amount.toFixed(2)}</Text>
        </View>

        <View style={styles.detailRow}>
          <Text style={styles.detailLabel}>Fecha:</Text>
          <Text style={styles.detailValue}>
            {new Date(currentReceipt.date).toLocaleDateString()}
          </Text>
        </View>

        <View style={styles.detailRow}>
          <Text style={styles.detailLabel}>Proyecto:</Text>
          <Text style={styles.detailValue}>
            {getProjectName(currentReceipt.projectId)}
          </Text>
        </View>

        <View style={styles.descriptionContainer}>
          <Text style={styles.detailLabel}>Descripción:</Text>
          <Text style={styles.descriptionText}>{currentReceipt.description}</Text>
        </View>

        {currentReceipt.status === ReceiptStatus.REJECTED && currentReceipt.rejectionReason && (
          <View style={styles.rejectionContainer}>
            <Text style={styles.rejectionLabel}>Motivo de rechazo:</Text>
            <Text style={styles.rejectionText}>{currentReceipt.rejectionReason}</Text>
          </View>
        )}
      </View>

      <View style={styles.actionsContainer}>
        {canEdit && (
          <TouchableOpacity style={styles.actionButton} onPress={handleEdit}>
            <Ionicons name="create-outline" size={20} color={COLORS.common.white} />
            <Text style={styles.actionButtonText}>Editar</Text>
          </TouchableOpacity>
        )}

        {canApproveReject && (
          <>
            <TouchableOpacity
              style={[styles.actionButton, styles.approveButton]}
              onPress={handleApprove}
            >
              <Ionicons name="checkmark-outline" size={20} color={COLORS.common.white} />
              <Text style={styles.actionButtonText}>Aprobar</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.actionButton, styles.rejectButton]}
              onPress={handleReject}
            >
              <Ionicons name="close-outline" size={20} color={COLORS.common.white} />
              <Text style={styles.actionButtonText}>Rechazar</Text>
            </TouchableOpacity>
          </>
        )}

        <TouchableOpacity
          style={[styles.actionButton, styles.commentButton]}
          onPress={handleAddComment}
        >
          <Ionicons name="chatbubble-outline" size={20} color={COLORS.common.white} />
          <Text style={styles.actionButtonText}>Comentar</Text>
        </TouchableOpacity>

        {(isAdmin || isOwner) && (
          <TouchableOpacity
            style={[styles.actionButton, styles.deleteButton]}
            onPress={handleDelete}
          >
            <Ionicons name="trash-outline" size={20} color={COLORS.common.white} />
            <Text style={styles.actionButtonText}>Eliminar</Text>
          </TouchableOpacity>
        )}
      </View>
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
    padding: SPACING.md,
    alignItems: 'center',
  },
  statusBadge: {
    borderRadius: BORDER_RADIUS.round,
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.xs,
  },
  statusText: {
    fontSize: FONT_SIZE.sm,
    color: COLORS.common.white,
    fontWeight: 'bold',
  },
  imageContainer: {
    backgroundColor: COLORS.common.white,
    margin: SPACING.md,
    borderRadius: BORDER_RADIUS.md,
    overflow: 'hidden',
    ...SHADOWS.medium,
  },
  receiptImage: {
    width: '100%',
    height: 300,
  },
  detailsContainer: {
    backgroundColor: COLORS.common.white,
    margin: SPACING.md,
    padding: SPACING.md,
    borderRadius: BORDER_RADIUS.md,
    ...SHADOWS.light,
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: SPACING.md,
  },
  detailLabel: {
    fontSize: FONT_SIZE.md,
    fontWeight: 'bold',
    color: COLORS.text.light.secondary,
  },
  detailValue: {
    fontSize: FONT_SIZE.md,
    color: COLORS.text.light.primary,
  },
  descriptionContainer: {
    marginTop: SPACING.sm,
  },
  descriptionText: {
    fontSize: FONT_SIZE.md,
    color: COLORS.text.light.primary,
    marginTop: SPACING.xs,
  },
  rejectionContainer: {
    marginTop: SPACING.md,
    padding: SPACING.md,
    backgroundColor: '#FFF5F5',
    borderRadius: BORDER_RADIUS.md,
    borderLeftWidth: 4,
    borderLeftColor: COLORS.status.rejected,
  },
  rejectionLabel: {
    fontSize: FONT_SIZE.md,
    fontWeight: 'bold',
    color: COLORS.status.rejected,
    marginBottom: SPACING.xs,
  },
  rejectionText: {
    fontSize: FONT_SIZE.md,
    color: COLORS.text.light.primary,
  },
  actionsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    padding: SPACING.md,
    marginBottom: SPACING.xl,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.primary.medium,
    borderRadius: BORDER_RADIUS.md,
    paddingVertical: SPACING.md,
    paddingHorizontal: SPACING.md,
    marginBottom: SPACING.md,
    width: '48%',
    ...SHADOWS.light,
  },
  actionButtonText: {
    color: COLORS.common.white,
    fontWeight: 'bold',
    marginLeft: SPACING.xs,
  },
  approveButton: {
    backgroundColor: COLORS.status.approved,
  },
  rejectButton: {
    backgroundColor: COLORS.status.rejected,
  },
  commentButton: {
    backgroundColor: COLORS.primary.light,
  },
  deleteButton: {
    backgroundColor: COLORS.common.error,
  },
});

export default ReceiptDetailScreen; 