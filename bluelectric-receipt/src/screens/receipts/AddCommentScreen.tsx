import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Alert,
  ActivityIndicator,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, SPACING, FONT_SIZE, BORDER_RADIUS, SHADOWS } from '../../constants/theme';
import { RootState } from '../../store';
import { addComment } from '../../store/slices/receiptsSlice';
import { ReceiptRouteProp, ReceiptNavigationProp } from '../../navigation/types';

interface AddCommentScreenProps {
  route: ReceiptRouteProp<'AddComment'>;
  navigation: ReceiptNavigationProp<'AddComment'>;
}

const AddCommentScreen: React.FC<AddCommentScreenProps> = ({ route, navigation }) => {
  const { receiptId } = route.params;
  const dispatch = useDispatch();
  const { user } = useSelector((state: RootState) => state.auth);
  const { loading } = useSelector((state: RootState) => state.receipts);
  const { isOffline } = useSelector((state: RootState) => state.ui);

  const [comment, setComment] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validateForm = () => {
    if (!comment.trim()) {
      Alert.alert('Error', 'Por favor ingresa un comentario');
      return false;
    }
    return true;
  };

  const handleSubmit = async () => {
    if (isOffline) {
      Alert.alert('Error', 'No puedes añadir comentarios en modo sin conexión');
      return;
    }

    if (!validateForm()) {
      return;
    }

    try {
      setIsSubmitting(true);

      // @ts-ignore - Ignoramos el error de tipado por ahora
      await dispatch(addComment({
        receiptId,
        userId: user?.id,
        text: comment,
        timestamp: new Date().toISOString(),
      })).unwrap();

      Alert.alert(
        'Éxito',
        'Comentario añadido correctamente',
        [{ text: 'OK', onPress: () => navigation.goBack() }]
      );
    } catch (error) {
      console.error('Error al añadir comentario:', error);
      Alert.alert('Error', 'No se pudo añadir el comentario. Inténtalo de nuevo.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <ScrollView style={styles.container}>
      {isOffline && (
        <View style={styles.offlineBanner}>
          <Ionicons name="cloud-offline" size={20} color={COLORS.common.white} />
          <Text style={styles.offlineText}>Modo sin conexión</Text>
        </View>
      )}

      <View style={styles.formContainer}>
        <Text style={styles.title}>Añadir Comentario</Text>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Tu comentario</Text>
          <TextInput
            style={[styles.input, styles.textArea]}
            value={comment}
            onChangeText={setComment}
            placeholder="Escribe tu comentario aquí..."
            placeholderTextColor={COLORS.text.light.tertiary}
            multiline
            numberOfLines={6}
            textAlignVertical="top"
          />
        </View>

        <View style={styles.buttonsContainer}>
          <TouchableOpacity
            style={styles.cancelButton}
            onPress={() => navigation.goBack()}
          >
            <Ionicons name="close-outline" size={20} color={COLORS.common.white} />
            <Text style={styles.buttonText}>Cancelar</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.submitButton,
              (isSubmitting || isOffline) && styles.disabledButton,
            ]}
            onPress={handleSubmit}
            disabled={isSubmitting || isOffline}
          >
            {isSubmitting || loading ? (
              <ActivityIndicator size="small" color={COLORS.common.white} />
            ) : (
              <>
                <Ionicons name="send-outline" size={20} color={COLORS.common.white} />
                <Text style={styles.buttonText}>Enviar</Text>
              </>
            )}
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
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
  formContainer: {
    padding: SPACING.md,
  },
  title: {
    fontSize: FONT_SIZE.xl,
    fontWeight: 'bold',
    color: COLORS.text.light.primary,
    marginBottom: SPACING.lg,
    textAlign: 'center',
  },
  inputGroup: {
    marginBottom: SPACING.md,
  },
  label: {
    fontSize: FONT_SIZE.md,
    fontWeight: 'bold',
    color: COLORS.text.light.secondary,
    marginBottom: SPACING.xs,
  },
  input: {
    backgroundColor: COLORS.common.white,
    borderRadius: BORDER_RADIUS.md,
    padding: SPACING.md,
    fontSize: FONT_SIZE.md,
    color: COLORS.text.light.primary,
    borderWidth: 1,
    borderColor: COLORS.border.light,
  },
  textArea: {
    minHeight: 150,
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: SPACING.lg,
  },
  submitButton: {
    backgroundColor: COLORS.primary.medium,
    borderRadius: BORDER_RADIUS.md,
    padding: SPACING.md,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: '48%',
    ...SHADOWS.medium,
  },
  cancelButton: {
    backgroundColor: COLORS.text.light.secondary,
    borderRadius: BORDER_RADIUS.md,
    padding: SPACING.md,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: '48%',
    ...SHADOWS.medium,
  },
  buttonText: {
    color: COLORS.common.white,
    fontSize: FONT_SIZE.md,
    fontWeight: 'bold',
    marginLeft: SPACING.xs,
  },
  disabledButton: {
    backgroundColor: COLORS.text.light.tertiary,
  },
});

export default AddCommentScreen; 