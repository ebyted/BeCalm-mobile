// src/screens/onboarding/OnboardingWelcomeScreen.tsx

import React, { useState } from 'react';
import { View, Text, SafeAreaView, StatusBar, Alert } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import LinearGradient from 'react-native-linear-gradient';
import CustomButton from '../../components/CustomButton';
import { GlobalStyles, Colors, Gradients, Spacing } from '../../styles/theme';
import { Fonts } from '../../styles/typography';
import { OnboardingStackParamList } from '../../navigation/types';
import onboardingService from '../../services/onboardingService';
import API_CONFIG from '../../config/api';

type NavigationProps = StackNavigationProp<OnboardingStackParamList, 'OnboardingWelcome'>;

interface Props {
  navigation: NavigationProps;
}

const OnboardingWelcomeScreen: React.FC<Props> = ({ navigation }) => {
  const [loading, setLoading] = useState(false);

  const handleStart = async () => {
    setLoading(true);
    try {
      // Buscar backend disponible antes de iniciar onboarding
      await API_CONFIG.findWorkingBackend();
      await onboardingService.startOnboarding();
      navigation.navigate('OnboardingTemple');
    } catch (error: any) {
      console.log('Onboarding error:', error);
      Alert.alert('Error',
        'No se pudo iniciar el proceso. Por favor, intenta de nuevo más tarde.\n' + (error?.message || error?.toString() || ''));
    } finally {
      setLoading(false);
    }
  };

  return (
    <LinearGradient colors={['#1a2a3a', '#000']} style={{ flex: 1 }}>
  <StatusBar barStyle="light-content" backgroundColor="#1a2a3a" />
  <SafeAreaView style={GlobalStyles.container}>
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', padding: Spacing.lg }}>
      <Text style={[Fonts.h1, { color: '#556B2F', textAlign: 'center', marginBottom: Spacing.md }]}> 
        Bienvenido a BeCalm
      </Text>
      <Text style={[Fonts.body, { color: '#556B2F', textAlign: 'center', fontSize: 18, lineHeight: 28, marginBottom: Spacing.xl }]}> 
        Aquí no vienes a cambiarte.{"\n"}
        Vienes a regresar a ti.{"\n"}
        Este es tu espacio personal de calma.
      </Text>
      <CustomButton
            title="Entrar a mi espacio"
            onPress={handleStart}
            variant="primary"
            loading={loading}
            icon="🕊️"
            style={{ backgroundColor: Colors.primary, borderRadius: 12 }}
            textStyle={{ color: Colors.background }}
          />
        </View>
      </SafeAreaView>
    </LinearGradient>
  );
};

export default OnboardingWelcomeScreen;
