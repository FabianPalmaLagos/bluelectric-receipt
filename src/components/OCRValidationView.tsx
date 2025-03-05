import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Switch,
  TextInput,
  ScrollView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import { COLORS, SPACING, FONT_SIZE, BORDER_RADIUS } from '../constants/theme';
import { ReceiptData } from '../types/receipt';

interface OCRValidationViewProps {
  extractedData: ReceiptData;
  onConfirm: (validatedData: ReceiptData) => void;
  onCancel: () => void;
}

/**
 * Componente para validar visualmente los datos extraídos por OCR
 * Permite al usuario verificar y corregir los datos antes de confirmarlos
 */
const OCRValidationView: React.FC<OCRValidationViewProps> = ({
  extractedData,
  onConfirm,
  onCancel,
}) => {
  // Estado inicial con los datos extraídos
  const [data, setData] = useState<ReceiptData>({
    merchant: extractedData.merchant || '',
    amount: extractedData.amount || 0,
    date: extractedData.date || new Date(),
  });

  // Estado para controlar qué datos se aceptan
  const [useMerchant, setUseMerchant] = useState(!!extractedData.merchant);
  const [useAmount, setUseAmount] = useState(!!extractedData.amount);
  const [useDate, setUseDate] = useState(!!extractedData.date);

  // Manejadores de cambios en los datos
  const handleMerchantChange = (text: string) => {
    setData({ ...data, merchant: text });
  };

  const handleAmountChange = (text: string) => {
    const numericValue = parseFloat(text.replace(/[^0-9.]/g, ''));
    if (!isNaN(numericValue)) {
      setData({ ...data, amount: numericValue });
    } else if (text === '') {
      setData({ ...data, amount: 0 });
    }
  };

  // Función para formatear la fecha
  const formatDate = (date: Date): string => {
    return format(date, 'dd/MM/yyyy', { locale: es });
  };

  // Función para obtener los datos validados según las selecciones del usuario
  const getValidatedData = (): ReceiptData => {
    return {
      merchant: useMerchant ? data.merchant : '',
      amount: useAmount ? data.amount : 0,
      date: useDate ? data.date : new Date(),
    };
  };

  // Manejador para confirmar los datos
  const handleConfirm = () => {
    onConfirm(getValidatedData());
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Validar datos detectados</Text>
        <TouchableOpacity onPress={onCancel} style={styles.closeButton}>
          <Ionicons name="close" size={24} color={COLORS.common.black} />
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content}>
        <Text style={styles.description}>
          Se han detectado automáticamente estos datos del recibo.
          Verifica y ajusta según sea necesario.
        </Text>

        {/* Sección del comercio */}
        <View style={styles.dataRow}>
          <View style={styles.dataHeader}>
            <Ionicons name="business" size={20} color={COLORS.primary.medium} />
            <Text style={styles.dataLabel}>Comercio</Text>
            <Switch
              value={useMerchant}
              onValueChange={setUseMerchant}
              thumbColor={COLORS.common.white}
              trackColor={{ 
                false: COLORS.grey.light, 
                true: COLORS.primary.light 
              }}
            />
          </View>
          <TextInput
            style={[
              styles.dataInput,
              !useMerchant && styles.disabledInput,
            ]}
            value={data.merchant}
            onChangeText={handleMerchantChange}
            editable={useMerchant}
            placeholder="No detectado"
          />
        </View>

        {/* Sección del monto */}
        <View style={styles.dataRow}>
          <View style={styles.dataHeader}>
            <Ionicons name="cash" size={20} color={COLORS.primary.medium} />
            <Text style={styles.dataLabel}>Monto</Text>
            <Switch
              value={useAmount}
              onValueChange={setUseAmount}
              thumbColor={COLORS.common.white}
              trackColor={{ 
                false: COLORS.grey.light, 
                true: COLORS.primary.light 
              }}
            />
          </View>
          <TextInput
            style={[
              styles.dataInput,
              !useAmount && styles.disabledInput,
            ]}
            value={data.amount > 0 ? data.amount.toString() : ''}
            onChangeText={handleAmountChange}
            editable={useAmount}
            keyboardType="numeric"
            placeholder="No detectado"
          />
        </View>

        {/* Sección de la fecha */}
        <View style={styles.dataRow}>
          <View style={styles.dataHeader}>
            <Ionicons name="calendar" size={20} color={COLORS.primary.medium} />
            <Text style={styles.dataLabel}>Fecha</Text>
            <Switch
              value={useDate}
              onValueChange={setUseDate}
              thumbColor={COLORS.common.white}
              trackColor={{ 
                false: COLORS.grey.light, 
                true: COLORS.primary.light 
              }}
            />
          </View>
          <Text 
            style={[
              styles.dataInput, 
              styles.dateText,
              !useDate && styles.disabledInput,
            ]}
          >
            {formatDate(data.date)}
          </Text>
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <TouchableOpacity
          style={styles.cancelButton}
          onPress={onCancel}
        >
          <Text style={styles.cancelButtonText}>Cancelar</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.confirmButton}
          onPress={handleConfirm}
        >
          <Text style={styles.confirmButtonText}>Confirmar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.common.white,
    borderRadius: BORDER_RADIUS.large,
    padding: SPACING.medium,
    maxHeight: '80%',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: SPACING.medium,
  },
  title: {
    fontSize: FONT_SIZE.large,
    fontWeight: 'bold',
    color: COLORS.primary.dark,
  },
  closeButton: {
    padding: SPACING.small,
  },
  content: {
    marginBottom: SPACING.medium,
  },
  description: {
    fontSize: FONT_SIZE.small,
    color: COLORS.grey.medium,
    marginBottom: SPACING.large,
  },
  dataRow: {
    marginBottom: SPACING.large,
  },
  dataHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: SPACING.small,
  },
  dataLabel: {
    fontSize: FONT_SIZE.medium,
    fontWeight: '500',
    marginLeft: SPACING.small,
    flex: 1,
  },
  dataInput: {
    borderWidth: 1,
    borderColor: COLORS.grey.light,
    borderRadius: BORDER_RADIUS.small,
    padding: SPACING.small,
    fontSize: FONT_SIZE.medium,
    backgroundColor: COLORS.grey.veryLight,
  },
  disabledInput: {
    backgroundColor: COLORS.grey.light,
    color: COLORS.grey.medium,
  },
  dateText: {
    paddingVertical: SPACING.small + 2, // Ajustar para alinear con los inputs
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  cancelButton: {
    flex: 1,
    backgroundColor: COLORS.grey.light,
    padding: SPACING.medium,
    borderRadius: BORDER_RADIUS.small,
    marginRight: SPACING.small,
    alignItems: 'center',
  },
  cancelButtonText: {
    color: COLORS.grey.dark,
    fontWeight: '500',
  },
  confirmButton: {
    flex: 1,
    backgroundColor: COLORS.primary.medium,
    padding: SPACING.medium,
    borderRadius: BORDER_RADIUS.small,
    marginLeft: SPACING.small,
    alignItems: 'center',
  },
  confirmButtonText: {
    color: COLORS.common.white,
    fontWeight: '500',
  },
});

export default OCRValidationView; 