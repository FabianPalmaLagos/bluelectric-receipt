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
  KeyboardAvoidingView,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { Picker } from '@react-native-picker/picker';
import DateTimePicker from '@react-native-community/datetimepicker';
import * as ImagePicker from 'expo-image-picker';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, SPACING, FONT_SIZE, BORDER_RADIUS, SHADOWS } from '../../constants/theme';
import { RootState } from '../../store';
import { addReceipt } from '../../store/slices/receiptsSlice';
import { fetchProjects } from '../../store/slices/projectsSlice';
import { ReceiptNavigationProp } from '../../navigation/types';
import { processReceiptImage, isOCRAvailable } from '../../utils/ocr';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';

interface AddReceiptScreenProps {
  navigation: ReceiptNavigationProp<'AddReceipt'>;
}

const AddReceiptScreen: React.FC<AddReceiptScreenProps> = ({ navigation }) => {
  const dispatch = useDispatch();
  const { user } = useSelector((state: RootState) => state.auth);
  const { projects, loading: projectsLoading } = useSelector((state: RootState) => state.projects);
  const { loading: receiptLoading } = useSelector((state: RootState) => state.receipts);
  const { isOffline } = useSelector((state: RootState) => state.ui);

  const [merchant, setMerchant] = useState('');
  const [amount, setAmount] = useState('');
  const [date, setDate] = useState(new Date());
  const [description, setDescription] = useState('');
  const [projectId, setProjectId] = useState('');
  const [image, setImage] = useState<string | null>(null);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    // @ts-ignore - Ignoramos el error de tipado por ahora
    dispatch(fetchProjects());
  }, [dispatch]);

  useEffect(() => {
    if (projects.length > 0 && !projectId) {
      setProjectId(projects[0].id);
    }
  }, [projects]);

  const handleImagePicked = async (pickerResult: ImagePickerResult) => {
    try {
      setIsSubmitting(true);

      if (pickerResult.cancelled) {
        return;
      }

      // El resto del código existente para manejar la imagen
      const imageUri = pickerResult.uri;
      setImage(imageUri);

      // Añadir procesamiento OCR aquí
      try {
        // Verificar si OCR está disponible
        const ocrAvailable = await isOCRAvailable();
        
        if (ocrAvailable) {
          // Mostrar indicador de carga para OCR
          setIsSubmitting(true);
          
          // Procesar la imagen con OCR
          const extractedData = await processReceiptImage(imageUri);
          
          // Actualizar el formulario con los datos extraídos
          if (extractedData.merchant) {
            setMerchant(extractedData.merchant);
          }
          
          if (extractedData.amount) {
            setAmount(extractedData.amount.toString());
          }
          
          if (extractedData.date) {
            setDate(extractedData.date);
          }
          
          // Mostrar mensaje de éxito
          if (extractedData.merchant || extractedData.amount || extractedData.date) {
            Alert.alert(
              'Información detectada',
              'Se ha detectado información automáticamente del recibo. Por favor, verifique y corrija si es necesario.',
              [{ text: 'OK' }]
            );
          }
        }
      } catch (error) {
        console.error('Error en el procesamiento OCR:', error);
        // No mostrar error al usuario, simplemente continuar con el formulario manual
      }
    } catch (error) {
      console.error('Error al procesar la imagen:', error);
      Alert.alert('Error', 'No se pudo procesar la imagen.');
    } finally {
      setIsSubmitting(false);
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

    if (!image) {
      Alert.alert('Error', 'Por favor selecciona o toma una foto del recibo');
      return false;
    }

    return true;
  };

  const handleSubmit = async () => {
    if (isOffline) {
      Alert.alert('Error', 'No puedes añadir recibos en modo sin conexión');
      return;
    }

    if (!validateForm()) {
      return;
    }

    try {
      setIsSubmitting(true);

      // @ts-ignore - Ignoramos el error de tipado por ahora
      await dispatch(addReceipt({
        merchant,
        amount: parseFloat(amount),
        date: date.toISOString(),
        description,
        projectId,
        imageUri: image,
        userId: user?.id,
      })).unwrap();

      Alert.alert(
        'Éxito',
        'Recibo añadido correctamente',
        [{ text: 'OK', onPress: () => navigation.goBack() }]
      );
    } catch (error) {
      console.error('Error al añadir recibo:', error);
      Alert.alert('Error', 'No se pudo añadir el recibo. Inténtalo de nuevo.');
    } finally {
      setIsSubmitting(false);
    }
  };

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
        setImage(result.assets[0].uri);
        // Procesar la imagen con OCR
        await processImageWithOCR(result.assets[0].uri);
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
        setImage(result.assets[0].uri);
        // Procesar la imagen con OCR
        await processImageWithOCR(result.assets[0].uri);
      }
    } catch (error) {
      console.error('Error al tomar foto:', error);
      Alert.alert('Error', 'No se pudo tomar la foto');
    }
  };

  // Nueva función para procesar la imagen con OCR
  const processImageWithOCR = async (imageUri: string) => {
    try {
      // Verificar si OCR está disponible
      const ocrAvailable = await isOCRAvailable();
      
      if (ocrAvailable) {
        // Mostrar indicador de carga para OCR
        setIsSubmitting(true);
        
        // Procesar la imagen con OCR
        const extractedData = await processReceiptImage(imageUri);
        
        // Actualizar el formulario con los datos extraídos
        if (extractedData.merchant) {
          setMerchant(extractedData.merchant);
        }
        
        if (extractedData.amount) {
          setAmount(extractedData.amount.toString());
        }
        
        if (extractedData.date) {
          setDate(extractedData.date);
        }
        
        // Mostrar mensaje de éxito si se detectó alguna información
        if (extractedData.merchant || extractedData.amount || extractedData.date) {
          Alert.alert(
            'Información detectada',
            'Se ha detectado información automáticamente del recibo. Por favor, verifique y corrija si es necesario.',
            [{ text: 'OK' }]
          );
        }
      }
    } catch (error) {
      console.error('Error en el procesamiento OCR:', error);
      // No mostrar error al usuario, simplemente continuar con el formulario manual
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
        <Text style={styles.title}>Añadir Nuevo Recibo</Text>

        <View style={styles.imageSection}>
          {image ? (
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
              <Text style={styles.submitButtonText}>Guardar Recibo</Text>
            </>
          )}
        </TouchableOpacity>
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
  imageButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: SPACING.md,
    borderRadius: BORDER_RADIUS.md,
    width: '48%',
    ...SHADOWS.light,
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
  submitButton: {
    backgroundColor: COLORS.primary.medium,
    borderRadius: BORDER_RADIUS.md,
    padding: SPACING.md,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: SPACING.lg,
    ...SHADOWS.medium,
  },
  submitButtonText: {
    color: COLORS.common.white,
    fontSize: FONT_SIZE.md,
    fontWeight: 'bold',
    marginLeft: SPACING.xs,
  },
  disabledButton: {
    backgroundColor: COLORS.text.light.tertiary,
  },
});

export default AddReceiptScreen; 