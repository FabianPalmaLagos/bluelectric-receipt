import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  ActivityIndicator,
  useColorScheme,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { AuthNavigationProp } from '../../navigation/types';
import { COLORS, SPACING, FONT_SIZE, BORDER_RADIUS } from '../../constants/theme';
import { loginUser } from '../../store/slices/authSlice';
import { RootState } from '../../store';

interface LoginScreenProps {
  navigation: AuthNavigationProp<'Login'>;
}

const LoginScreen: React.FC<LoginScreenProps> = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state: RootState) => state.auth);
  const colorScheme = useColorScheme();
  
  // Determinar qué logo usar según el modo de visualización
  const logoSource = colorScheme === 'dark' 
    ? require('../../assets/logo-dark.png') 
    : require('../../assets/logo-light.png');

  const handleLogin = async () => {
    if (email.trim() === '' || password === '') {
      // Aquí podríamos mostrar una notificación de error
      return;
    }

    // @ts-ignore - Ignoramos el error de tipado por ahora
    dispatch(loginUser({ email, password }));
  };

  return (
    <KeyboardAvoidingView
      style={[
        styles.container, 
        colorScheme === 'dark' && styles.containerDark
      ]}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 64 : 0}
    >
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.logoContainer}>
          <Image
            source={logoSource}
            style={styles.logo}
            resizeMode="contain"
          />
          <Text style={[
            styles.subtitle,
            colorScheme === 'dark' && styles.textDark
          ]}>Gestión de gastos empresariales</Text>
        </View>

        <View style={styles.formContainer}>
          {error && <Text style={styles.errorText}>{error}</Text>}

          <View style={styles.inputContainer}>
            <Text style={[
              styles.label,
              colorScheme === 'dark' && styles.labelDark
            ]}>Correo electrónico</Text>
            <TextInput
              style={[
                styles.input,
                colorScheme === 'dark' && styles.inputDark
              ]}
              placeholder="Ingresa tu correo electrónico"
              placeholderTextColor={colorScheme === 'dark' ? COLORS.text.dark.disabled : COLORS.text.light.disabled}
              keyboardType="email-address"
              autoCapitalize="none"
              value={email}
              onChangeText={setEmail}
            />
          </View>

          <View style={styles.inputContainer}>
            <Text style={[
              styles.label,
              colorScheme === 'dark' && styles.labelDark
            ]}>Contraseña</Text>
            <TextInput
              style={[
                styles.input,
                colorScheme === 'dark' && styles.inputDark
              ]}
              placeholder="Ingresa tu contraseña"
              placeholderTextColor={colorScheme === 'dark' ? COLORS.text.dark.disabled : COLORS.text.light.disabled}
              secureTextEntry
              value={password}
              onChangeText={setPassword}
            />
          </View>

          <View style={styles.forgotPasswordContainer}>
            <TouchableOpacity onPress={() => navigation.navigate('ForgotPassword')}>
              <Text style={[
                styles.forgotPasswordText,
                colorScheme === 'dark' && styles.textDark
              ]}>¿Olvidaste tu contraseña?</Text>
            </TouchableOpacity>
          </View>

          <TouchableOpacity
            style={styles.loginButton}
            onPress={handleLogin}
            disabled={loading}
          >
            {loading ? (
              <ActivityIndicator color={COLORS.common.white} />
            ) : (
              <Text style={styles.loginButtonText}>Iniciar sesión</Text>
            )}
          </TouchableOpacity>

          <View style={styles.registerContainer}>
            <Text style={[
              styles.registerText,
              colorScheme === 'dark' && styles.textDark
            ]}>¿No tienes una cuenta? </Text>
            <TouchableOpacity onPress={() => navigation.navigate('Register')}>
              <Text style={styles.registerLink}>Regístrate</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background.light,
  },
  containerDark: {
    backgroundColor: COLORS.background.dark,
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    padding: SPACING.xl,
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: SPACING.xl,
  },
  logo: {
    width: 250,
    height: 100,
    marginBottom: SPACING.md,
  },
  subtitle: {
    fontSize: FONT_SIZE.md,
    color: COLORS.text.light.secondary,
    marginBottom: SPACING.md,
  },
  textDark: {
    color: COLORS.text.dark.secondary,
  },
  formContainer: {
    width: '100%',
    marginBottom: SPACING.xl,
  },
  errorText: {
    color: COLORS.common.error,
    marginBottom: SPACING.md,
    textAlign: 'center',
  },
  inputContainer: {
    marginBottom: SPACING.md,
  },
  label: {
    fontSize: FONT_SIZE.sm,
    color: COLORS.text.light.secondary,
    marginBottom: SPACING.xs,
  },
  labelDark: {
    color: COLORS.text.dark.secondary,
  },
  input: {
    backgroundColor: COLORS.common.white,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: BORDER_RADIUS.sm,
    padding: SPACING.md,
    fontSize: FONT_SIZE.md,
    color: COLORS.text.light.primary,
  },
  inputDark: {
    backgroundColor: '#1E1E1E',
    borderColor: '#333333',
    color: COLORS.text.dark.primary,
  },
  forgotPasswordContainer: {
    alignItems: 'flex-end',
    marginBottom: SPACING.lg,
  },
  forgotPasswordText: {
    color: COLORS.primary.medium,
    fontSize: FONT_SIZE.sm,
  },
  loginButton: {
    backgroundColor: COLORS.primary.medium,
    borderRadius: BORDER_RADIUS.md,
    padding: SPACING.md,
    alignItems: 'center',
    marginBottom: SPACING.lg,
  },
  loginButtonText: {
    color: COLORS.common.white,
    fontSize: FONT_SIZE.md,
    fontWeight: 'bold',
  },
  registerContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  registerText: {
    color: COLORS.text.light.secondary,
    fontSize: FONT_SIZE.sm,
  },
  registerLink: {
    color: COLORS.primary.medium,
    fontSize: FONT_SIZE.sm,
    fontWeight: 'bold',
  },
});

export default LoginScreen; 