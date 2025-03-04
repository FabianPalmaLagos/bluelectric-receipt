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
  Switch,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, SPACING, FONT_SIZE, BORDER_RADIUS, SHADOWS } from '../../constants/theme';
import { RootState } from '../../store';
import { updateProject } from '../../store/slices/projectsSlice';
import { ProjectRouteProp, ProjectNavigationProp } from '../../navigation/types';
import { Project } from '../../types';

interface EditProjectScreenProps {
  route: ProjectRouteProp<'EditProject'>;
  navigation: ProjectNavigationProp<'EditProject'>;
}

const EditProjectScreen: React.FC<EditProjectScreenProps> = ({ route, navigation }) => {
  const { project } = route.params;
  const dispatch = useDispatch();
  const { loading } = useSelector((state: RootState) => state.projects);
  const { isOffline } = useSelector((state: RootState) => state.ui);

  const [name, setName] = useState(project.name);
  const [description, setDescription] = useState(project.description || '');
  const [isActive, setIsActive] = useState(project.isActive);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validateForm = () => {
    if (!name.trim()) {
      Alert.alert('Error', 'Por favor ingresa el nombre del proyecto');
      return false;
    }
    return true;
  };

  const handleSubmit = async () => {
    if (isOffline) {
      Alert.alert('Error', 'No puedes editar proyectos en modo sin conexión');
      return;
    }

    if (!validateForm()) {
      return;
    }

    try {
      setIsSubmitting(true);

      const updatedProject: Partial<Project> = {
        id: project.id,
        name,
        description,
        isActive,
      };

      // @ts-ignore - Ignoramos el error de tipado por ahora
      await dispatch(updateProject(updatedProject)).unwrap();

      Alert.alert(
        'Éxito',
        'Proyecto actualizado correctamente',
        [{ text: 'OK', onPress: () => navigation.goBack() }]
      );
    } catch (error) {
      console.error('Error al actualizar proyecto:', error);
      Alert.alert('Error', 'No se pudo actualizar el proyecto. Inténtalo de nuevo.');
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
        <Text style={styles.title}>Editar Proyecto</Text>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Nombre del Proyecto</Text>
          <TextInput
            style={styles.input}
            value={name}
            onChangeText={setName}
            placeholder="Ingresa el nombre del proyecto"
            placeholderTextColor={COLORS.text.light.tertiary}
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Descripción (opcional)</Text>
          <TextInput
            style={[styles.input, styles.textArea]}
            value={description}
            onChangeText={setDescription}
            placeholder="Describe el propósito del proyecto..."
            placeholderTextColor={COLORS.text.light.tertiary}
            multiline
            numberOfLines={4}
            textAlignVertical="top"
          />
        </View>

        <View style={styles.switchContainer}>
          <Text style={styles.label}>Estado del Proyecto</Text>
          <View style={styles.switchRow}>
            <Text style={styles.switchLabel}>
              {isActive ? 'Activo' : 'Inactivo'}
            </Text>
            <Switch
              value={isActive}
              onValueChange={setIsActive}
              trackColor={{ false: COLORS.text.light.tertiary, true: COLORS.primary.light }}
              thumbColor={isActive ? COLORS.primary.medium : COLORS.common.white}
            />
          </View>
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
                <Ionicons name="save-outline" size={20} color={COLORS.common.white} />
                <Text style={styles.buttonText}>Guardar</Text>
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
    minHeight: 120,
  },
  switchContainer: {
    marginBottom: SPACING.lg,
  },
  switchRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: COLORS.common.white,
    borderRadius: BORDER_RADIUS.md,
    padding: SPACING.md,
    borderWidth: 1,
    borderColor: COLORS.border.light,
  },
  switchLabel: {
    fontSize: FONT_SIZE.md,
    color: COLORS.text.light.primary,
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

export default EditProjectScreen; 