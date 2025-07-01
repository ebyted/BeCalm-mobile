// src/screens/LoginScreen.tsx - Pantalla de login y registro

import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  Alert,
  KeyboardAvoidingView,
  Platform,
  StatusBar
} from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import LinearGradient from 'react-native-linear-gradient';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Components
import CustomInput from '../components/CustomInput';
import CustomButton from '../components/CustomButton';
import LoadingSpinner from '../components/LoadingSpinner';

// Services
import authService from '../services/authService';

// Types
import { RootStackParamList } from '../navigation/types'; // Corrected import path

// Styles
import { GlobalStyles, Colors, Gradients, Spacing } from '../styles/theme';

type LoginScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Login'>;

import { RouteProp } from '@react-navigation/native';

interface Props {
  navigation: LoginScreenNavigationProp;
  route: RouteProp<RootStackParamList, 'Login'>;
}

const LoginScreen: React.FC<Props> = ({ navigation, route }) => {
  const [activeTab, setActiveTab] = useState<'login' | 'register'>('login');
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    fullName: ''
  });
  const [loading, setLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(true);

  useEffect(() => {
    checkAuthStatus();
  }, []);

  useEffect(() => {
    // Si viene usuario/contraseña por navegación o AsyncStorage, autocompleta
    const fillFromParamsOrStorage = async () => {
      if (route?.params?.username && route?.params?.password) {
        setFormData(prev => ({
          ...prev,
          username: route.params?.username ?? '',
          password: route.params?.password ?? '',
          fullName: route.params?.fullName ?? ''
        }));
        return;
      }
      const last = await AsyncStorage.getItem('lastRegisteredUser');
      if (last) {
        const { username, password, fullName } = JSON.parse(last);
        setFormData(prev => ({ ...prev, username, password, fullName: fullName || '' }));
      }
    };
    fillFromParamsOrStorage();
  }, [route]);

  const checkAuthStatus = async () => {
    try {
      const isAuthenticated = await authService.isAuthenticated();
      if (isAuthenticated) {
        navigation.replace('Main', { screen: 'MainTabs', params: { screen: 'MainMenu' } });
        return;
      }
    } catch (error) {
      console.error('Error verificando autenticación:', error);
    } finally {
      setInitialLoading(false);
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleLogin = async () => {
    if (!formData.username.trim() || !formData.password.trim()) {
      Alert.alert('Error', 'Por favor completa todos los campos');
      return;
    }

    setLoading(true);
    try {
      await authService.login({
        username: formData.username.trim(),
        password: formData.password
      });
      
      Alert.alert('¡Bienvenido!', 'Has iniciado sesión exitosamente', [
        { text: 'OK', onPress: () => navigation.replace('Main', { screen: 'MainTabs', params: { screen: 'MainMenu' } }) }
      ]);
    } catch (error) {
      Alert.alert('Error', error instanceof Error ? error.message : 'Error al iniciar sesión');
    } finally {
      setLoading(false);
    }
  };

  const handleDemoLogin = async () => {
    setLoading(true);
    try {
      await authService.login({ username: 'demo', password: 'demo' });
      Alert.alert('Modo Demo', 'Has iniciado sesión en modo de demostración.', [
        { text: 'OK', onPress: () => navigation.replace('Main', { screen: 'MainTabs', params: { screen: 'MainMenu' } }) },
      ]);
    } catch (error) {
      Alert.alert('Error', error instanceof Error ? error.message : 'No se pudo iniciar el modo demo.');
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = async () => {
    if (!formData.username.trim() || !formData.password.trim()) {
      Alert.alert('Error', 'Por favor completa todos los campos requeridos');
      return;
    }

    setLoading(true);
    try {
      await authService.register({
        username: formData.username.trim(),
        password: formData.password,
        full_name: formData.fullName.trim()
      });
      
      Alert.alert(
        '¡Registro exitoso!', 
        'Tu cuenta ha sido creada. Ahora puedes iniciar sesión.',
        [
          { 
            text: 'OK', 
            onPress: () => {
              setActiveTab('login');
              setFormData(prev => ({ ...prev, password: '' }));
            }
          }
        ]
      );
    } catch (error) {
      Alert.alert('Error', error instanceof Error ? error.message : 'Error al registrar usuario');
    } finally {
      setLoading(false);
    }
  };

  if (initialLoading) {
    return <LoadingSpinner fullScreen message="Verificando sesión..." />;
  }

  return (
    <LinearGradient colors={Gradients.background} style={GlobalStyles.container}>
      <StatusBar barStyle="light-content" backgroundColor={Colors.background} />
      
      <KeyboardAvoidingView 
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <ScrollView
          contentContainerStyle={{ flexGrow: 1, justifyContent: 'center', padding: Spacing.md }}
          keyboardShouldPersistTaps="handled"
        >
          {/* Header */}
          <View style={{ alignItems: 'center', marginBottom: Spacing.xxl }}>
            <Text style={{ fontSize: 60, marginBottom: Spacing.md }}>🕊️</Text>
            <Text style={[GlobalStyles.title, { fontSize: 36, marginBottom: Spacing.sm }]}>
              BeCalm
            </Text>
            <Text style={[GlobalStyles.bodyText, { textAlign: 'center', opacity: 0.8 }]}>
              Tu santuario digital de paz y bienestar
            </Text>
          </View>

          {/* Tabs */}
          <View style={{
            flexDirection: 'row',
            backgroundColor: Colors.backgroundCard,
            borderRadius: 12,
            marginBottom: Spacing.lg,
            padding: 4
          }}>
            <CustomButton
              title="🔑 Iniciar Sesión"
              onPress={() => setActiveTab('login')}
              variant={activeTab === 'login' ? 'gradient' : 'secondary'}
              style={{ flex: 1, marginRight: 4 }}
            />
            <CustomButton
              title="✨ Registrarse"
              onPress={() => setActiveTab('register')}
              variant={activeTab === 'register' ? 'gradient' : 'secondary'}
              style={{ flex: 1, marginLeft: 4 }}
            />
          </View>

          {/* Form */}
          <View style={[GlobalStyles.glassCard, { paddingVertical: Spacing.md }]}>
            {activeTab === 'login' ? (
              <>
                <CustomInput
                  label="Usuario"
                  value={formData.username}
                  onChangeText={(text: string) => handleInputChange('username', text)}
                  placeholder="Ingresa tu usuario"
                  icon="👤"
                />
                
                <CustomInput
                  label="Contraseña"
                  value={formData.password}
                  onChangeText={(text: string) => handleInputChange('password', text)}
                  placeholder="Ingresa tu contraseña"
                  secureTextEntry
                  icon="🔒"
                />
                
                <CustomButton
                  title="Iniciar Sesión"
                  onPress={handleLogin}
                  variant="gradient"
                  loading={loading}
                  style={{ marginTop: Spacing.md }}
                />
                <CustomButton
                  title="Entrar como Demo"
                  onPress={handleDemoLogin}
                  variant="secondary"
                  style={{ marginTop: Spacing.sm }}
                />
              </>
            ) : (
              <>
                <CustomInput
                  label="Nombre completo (opcional)"
                  value={formData.fullName}
                  onChangeText={(text: string) => handleInputChange('fullName', text)}
                  placeholder="Tu nombre completo"
                  icon="✨"
                />
                
                <CustomInput
                  label="Usuario"
                  value={formData.username}
                  onChangeText={(text: string) => handleInputChange('username', text)}
                  placeholder="Elige un usuario"
                  icon="👤"
                />
                
                <CustomInput
                  label="Contraseña"
                  value={formData.password}
                  onChangeText={(text: string) => handleInputChange('password', text)}
                  placeholder="Crea una contraseña"
                  secureTextEntry
                  icon="🔒"
                />
                
                <CustomButton
                  title="Crear Cuenta"
                  onPress={handleRegister}
                  variant="gradient"
                  loading={loading}
                  style={{ marginTop: Spacing.md }}
                />
              </>
            )}
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </LinearGradient>
  );
};

export default LoginScreen;
