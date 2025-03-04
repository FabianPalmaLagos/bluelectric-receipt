import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Image,
  Platform,
  Alert,
  ActivityIndicator,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { Picker } from '@react-native-picker/picker';
import DateTimePicker from '@react-native-community/datetimepicker';
import * as ImagePicker from 'expo-image-picker';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, SPACING, FONT_SIZE, BORDER_RADIUS, SHADOWS } from '../../constants/theme';
import { RootState } from '../../store';
import { updateReceipt } from '../../store/slices/receiptsSlice';
import { fetchProjects } from '../../store/slices/projectsSlice';
import { ReceiptRouteProp, ReceiptNavigationProp } from '../../navigation/types';
import { Receipt } from '../../types';

interface EditReceiptScreenProps {
  route: ReceiptRouteProp<'EditReceipt'>;
  navigation: ReceiptNavigationProp<'EditReceipt'>;
}

const EditReceiptScreen: React.FC<EditReceiptScreenProps> = ({ route, navigation }) => {
  const { receipt } = route.params;
  const dispatch = useDispatch();
  const { projects, loading: projectsLoading } = useSelector((state: RootState) => state.projects);
  const { loading: receiptLoading } = useSelector((state: RootState) => state.receipts);
  const { isOffline } = useSelector((state: RootState) => state.ui);

  const [merchant, setMerchant] = useState(receipt.merchant);
  const [amount, setAmount] = useState(receipt.amount.toString());
  const [date, setDate] = useState(new Date(receipt.date));
  const [description, setDescription] = useState(receipt.description || '');
  const [projectId, setProjectId] = useState(receipt.projectId);
  const [image, setImage] = useState<string | null>(receipt.imageUrl);
  const [newImage, setNewImage] = useState<string | null>(null);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    // @ts-ignore - Ignoramos el error de tipado por ahora
    dispatch(fetchProjects());
  }, [dispatch]);

  const pickImage = async () => {
    try {
      // Solicitar permisos para acceder a la galería
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      
      if (status !== 'granted') {
        Alert.alert('Permiso denegado', 'Necesitamos permisos para acceder a tu galería de fotos');
        return;
      }

      // Abrir el selector de imágenes
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 0.8,
      });

      if (!result.canceled && result.assets && result.assets.length > 0) {
        setNewImage(result.assets[0].uri);
      }
    } catch (error) {
      console.error('Error al seleccionar imagen:', error);
      Alert.alert('Error', 'No se pudo seleccionar la imagen');
    }
  };

  const takePhoto = async () => {
    try {
      // Solicitar permisos para acceder a la cámara
      const { status } = await ImagePicker.requestCameraPermissionsAsync();
      
      if (status !== 'granted') {
        Alert.alert('Permiso denegado', 'Necesitamos permisos para acceder a tu cámara');
        return;
      }

      // Abrir la cámara
      const result = await ImagePicker.launchCameraAsync({
        allowsEditing: true,
        aspect: [4, 3],
        quality: 0.8,
      });

      if (!result.canceled && result.assets && result.assets.length > 0) {
        setNewImage(result.assets[0].uri);
      }
    } catch (error) {
      console.error('Error al tomar foto:', error);
      Alert.alert('Error', 'No se pudo tomar la foto');
    }
  };

  const onDateChange = (event: any, selectedDate?: Date) => {
    const currentDate = selectedDate || date;
    setShowDatePicker(Platform.OS === 'ios');
    setDate(currentDate);
  };

  const validateForm = () => {
    if (!merchant.trim()) {
      Alert.alert('Error', 'Por favor ingresa el nombre del comercio');
      return false;
    }

    if (!amount.trim() || isNaN(parseFloat(amount)) || parseFloat(amount) <= 0) {
      Alert.alert('Error', 'Por favor ingresa un monto válido');
      return false;
    }

    if (!projectId) {
      Alert.alert('Error', 'Por favor selecciona un proyecto');
      return false;
    }

    if (!image && !newImage) {
      Alert.alert('Error', 'Por favor selecciona o toma una foto del recibo');
      return false;
    }

    return true;
  };

  const handleSubmit = async () => {
    if (isOffline) {
      Alert.alert('Error', 'No puedes editar recibos en modo sin conexión');
      return;
    }

    if (!validateForm()) {
      return;
    }

    try {
      setIsSubmitting(true);

      const updatedReceipt: Partial<Receipt> = {
        id: receipt.id,
        merchant,
        amount: parseFloat(amount),
        date: date.toISOString(),
        description,
        projectId,
      };

      if (newImage) {
        updatedReceipt.imageUri = newImage;
      }

      // @ts-ignore - Ignoramos el error de tipado por ahora
      await dispatch(updateReceipt(updatedReceipt)).unwrap();

      Alert.alert(
        'Éxito',
        'Recibo actualizado correctamente',
        [{ text: 'OK', onPress: () => navigation.goBack() }]
      );
    } catch (error) {
      console.error('Error al actualizar recibo:', error);
      Alert.alert('Error', 'No se pudo actualizar el recibo. Inténtalo de nuevo.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (projectsLoading) {
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

      <View style={styles.formContainer}>
        <Text style={styles.title}>Editar Recibo</Text>

        <View style={styles.imageSection}>
          {newImage ? (
            <View style={styles.imagePreviewContainer}>
              <Image source={{ uri: newImage }} style={styles.imagePreview} />
              <TouchableOpacity
                style={styles.changeImageButton}
                onPress={() => setNewImage(null)}
              >
                <Ionicons name="close-circle" size={24} color={COLORS.common.white} />
              </TouchableOpacity>
            </View>
          ) : image ? (
            <View style={styles.imagePreviewContainer}>
              <Image source={{ uri: image }} style={styles.imagePreview} />
              <TouchableOpacity
                style={styles.changeImageButton}
                onPress={() => setImage(null)}
              >
                <Ionicons name="close-circle" size={24} color={COLORS.common.white} />
              </TouchableOpacity>
            </View>
          ) : (
            <View style={styles.imageButtonsContainer}>
              <TouchableOpacity
                style={[styles.imageButton, styles.cameraButton]}
                onPress={takePhoto}
              >
                <Ionicons name="camera" size={24} color={COLORS.common.white} />
                <Text style={styles.imageButtonText}>Tomar Foto</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[styles.imageButton, styles.galleryButton]}
                onPress={pickImage}
              >
                <Ionicons name="images" size={24} color={COLORS.common.white} />
                <Text style={styles.imageButtonText}>Galería</Text>
              </TouchableOpacity>
            </View>
          )}

          {(image || newImage) && (
            <View style={styles.changeImageButtonsContainer}>
              <TouchableOpacity
                style={[styles.imageButton, styles.cameraButton, styles.smallButton]}
                onPress={takePhoto}
              >
                <Ionicons name="camera" size={20} color={COLORS.common.white} />
                <Text style={styles.imageButtonText}>Nueva Foto</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[styles.imageButton, styles.galleryButton, styles.smallButton]}
                onPress={pickImage}
              >
                <Ionicons name="images" size={20} color={COLORS.common.white} />
                <Text style={styles.imageButtonText}>Nueva Imagen</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Comercio</Text>
          <TextInput
            style={styles.input}
            value={merchant}
            onChangeText={setMerchant}
            placeholder="Nombre del comercio"
            placeholderTextColor={COLORS.text.light.tertiary}
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Monto ($)</Text>
          <TextInput
            style={styles.input}
            value={amount}
            onChangeText={setAmount}
            placeholder="0.00"
            placeholderTextColor={COLORS.text.light.tertiary}
            keyboardType="decimal-pad"
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Fecha</Text>
          <TouchableOpacity
            style={styles.datePickerButton}
            onPress={() => setShowDatePicker(true)}
          >
            <Text style={styles.dateText}>
              {date.toLocaleDateString()}
            </Text>
            <Ionicons name="calendar" size={20} color={COLORS.primary.medium} />
          </TouchableOpacity>

          {showDatePicker && (
            <DateTimePicker
              value={date}
              mode="date"
              display="default"
              onChange={onDateChange}
              maximumDate={new Date()}
            />
          )}
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Proyecto</Text>
          <View style={styles.pickerContainer}>
            <Picker
              selectedValue={projectId}
              onValueChange={(itemValue) => setProjectId(itemValue)}
              style={styles.picker}
            >
              {projects.map((project) => (
                <Picker.Item
                  key={project.id}
                  label={project.name}
                  value={project.id}
                />
              ))}
            </Picker>
          </View>
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Descripción (opcional)</Text>
          <TextInput
            style={[styles.input, styles.textArea]}
            value={description}
            onChangeText={setDescription}
            placeholder="Añade detalles sobre este gasto..."
            placeholderTextColor={COLORS.text.light.tertiary}
            multiline
            numberOfLines={4}
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
            {isSubmitting || receiptLoading ? (
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
  imageSection: {
    marginBottom: SPACING.lg,
  },
  imageButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  changeImageButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: SPACING.md,
  },
  imageButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: SPACING.md,
    borderRadius: BORDER_RADIUS.md,
    width: '48%',
    ...SHADOWS.light,
  },
  smallButton: {
    padding: SPACING.sm,
  },
  cameraButton: {
    backgroundColor: COLORS.primary.dark,
  },
  galleryButton: {
    backgroundColor: COLORS.primary.medium,
  },
  imageButtonText: {
    color: COLORS.common.white,
    fontWeight: 'bold',
    marginLeft: SPACING.xs,
    fontSize: FONT_SIZE.sm,
  },
  imagePreviewContainer: {
    position: 'relative',
    borderRadius: BORDER_RADIUS.md,
    overflow: 'hidden',
    ...SHADOWS.medium,
  },
  imagePreview: {
    width: '100%',
    height: 200,
    borderRadius: BORDER_RADIUS.md,
  },
  changeImageButton: {
    position: 'absolute',
    top: SPACING.xs,
    right: SPACING.xs,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    borderRadius: BORDER_RADIUS.round,
    padding: SPACING.xs,
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
    minHeight: 100,
  },
  datePickerButton: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: COLORS.common.white,
    borderRadius: BORDER_RADIUS.md,
    padding: SPACING.md,
    borderWidth: 1,
    borderColor: COLORS.border.light,
  },
  dateText: {
    fontSize: FONT_SIZE.md,
    color: COLORS.text.light.primary,
  },
  pickerContainer: {
    backgroundColor: COLORS.common.white,
    borderRadius: BORDER_RADIUS.md,
    borderWidth: 1,
    borderColor: COLORS.border.light,
    overflow: 'hidden',
  },
  picker: {
    height: 50,
    width: '100%',
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

export default EditReceiptScreen; 