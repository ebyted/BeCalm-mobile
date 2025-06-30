// src/screens/onboarding/OnboardingWelcomeScreen.tsx

import React, { useState } from 'react';
import { View, Text, SafeAreaView, StatusBar, Alert } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import CustomButton from '../../components/CustomButton';
import { GlobalStyles, Colors, Spacing } from '../../styles/theme';
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
    <SafeAreaView style={[GlobalStyles.container, { backgroundColor: Colors.background }]}> 
      <StatusBar barStyle="dark-content" backgroundColor={Colors.background} />
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', padding: Spacing.lg }}>
        <Text style={[Fonts.h1, { color: Colors.primaryDark, textAlign: 'center', marginBottom: Spacing.md }]}> 
          Bienvenido a BeCalm
        </Text>
        <Text style={[Fonts.body, { color: Colors.textSecondary, textAlign: 'center', fontSize: 18, lineHeight: 28, marginBottom: Spacing.xl }]}> 
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
  );
};

export default OnboardingWelcomeScreen;
