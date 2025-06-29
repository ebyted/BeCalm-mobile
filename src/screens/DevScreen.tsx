// src/screens/DevScreen.tsx - Pantalla de desarrollo para testing

import React from 'react';
import { View, Text, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import LinearGradient from 'react-native-linear-gradient';

import CustomButton from '../components/CustomButton';
import authService from '../services/authService';
import { GlobalStyles, Colors, Gradients, Spacing } from '../styles/theme';

interface Props {
  navigation: any;
}

const DevScreen: React.FC<Props> = ({ navigation }) => {
  
  const clearStorage = async () => {
    try {
      await AsyncStorage.clear();
      Alert.alert('✅ Éxito', 'AsyncStorage limpiado completamente', [
        { text: 'OK', onPress: () => navigation.replace('Login') }
      ]);
    } catch (error) {
      Alert.alert('❌ Error', 'No se pudo limpiar el storage');
    }
  };

  const forceLogout = async () => {
    try {
      await authService.logout();
      Alert.alert('✅ Logout', 'Sesión cerrada exitosamente', [
        { text: 'OK', onPress: () => navigation.replace('Login') }
      ]);
    } catch (error) {
      Alert.alert('❌ Error', 'No se pudo cerrar sesión');
    }
  };

  const checkAuthStatus = async () => {
    try {
      const isAuth = await authService.isAuthenticated();
      const token = await AsyncStorage.getItem('access_token');
      Alert.alert('🔍 Auth Status', 
        `Autenticado: ${isAuth}\nToken: ${token ? 'Existe' : 'No existe'}`
      );
    } catch (error) {
      Alert.alert('❌ Error', 'No se pudo verificar el estado');
    }
  };

  return (
    <LinearGradient colors={Gradients.background} style={GlobalStyles.container}>
      <View style={{ 
        flex: 1, 
        justifyContent: 'center', 
        alignItems: 'center',
        padding: Spacing.lg 
      }}>
        
        <Text style={[GlobalStyles.title, { marginBottom: Spacing.xl, textAlign: 'center' }]}>
          🛠️ Panel de Desarrollo
        </Text>
        
        <Text style={[GlobalStyles.bodyText, { 
          marginBottom: Spacing.xl, 
          textAlign: 'center',
          opacity: 0.8 
        }]}>
          Herramientas para testing y desarrollo
        </Text>

        <View style={{ width: '100%', maxWidth: 300 }}>
          
          <CustomButton
            title="🗑️ Limpiar AsyncStorage"
            onPress={clearStorage}
            variant="secondary"
            style={{ marginBottom: Spacing.md }}
          />

          <CustomButton
            title="🚪 Forzar Logout"
            onPress={forceLogout}
            variant="secondary"
            style={{ marginBottom: Spacing.md }}
          />

          <CustomButton
            title="🔍 Verificar Auth Status"
            onPress={checkAuthStatus}
            variant="primary"
            style={{ marginBottom: Spacing.md }}
          />

          <CustomButton
            title="🏠 Ir a Main"
            onPress={() => navigation.navigate('Main')}
            variant="gradient"
            style={{ marginBottom: Spacing.md }}
          />

          <CustomButton
            title="🔐 Ir a Login"
            onPress={() => navigation.replace('Login')}
            variant="gradient"
          />

        </View>
      </View>
    </LinearGradient>
  );
};

export default DevScreen;
