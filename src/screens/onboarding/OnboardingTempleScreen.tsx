// src/screens/onboarding/OnboardingTempleScreen.tsx

import React, { useState } from 'react';
import { View, Text, SafeAreaView, StatusBar, Alert } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import LinearGradient from 'react-native-linear-gradient';
import CustomButton from '../../components/CustomButton';
import CustomInput from '../../components/CustomInput';
import { GlobalStyles, Colors, Spacing } from '../../styles/theme';
import { Fonts } from '../../styles/typography';
import { OnboardingStackParamList } from '../../navigation/types';
import onboardingService from '../../services/onboardingService';

type NavigationProps = StackNavigationProp<OnboardingStackParamList, 'OnboardingTemple'>;

interface Props {
  navigation: NavigationProps;
}

// Cambia el color de los títulos y subtítulos a '#556B2F'
const TITLE_COLOR = '#556B2F';

const OnboardingTempleScreen: React.FC<Props> = ({ navigation }) => {
  const [templeName, setTempleName] = useState('');
  const [loading, setLoading] = useState(false);

  const handleNext = async () => {
    if (!templeName.trim()) {
      Alert.alert('Un momento', 'Por favor, dale un nombre a tu templo interior.');
      return;
    }
    setLoading(true);
    try {
      await onboardingService.saveTempleName(templeName);
      navigation.navigate('OnboardingEmotionalState');
    } catch (error) {
      Alert.alert('Error', 'No se pudo guardar el nombre del templo. Inténtalo de nuevo.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <LinearGradient colors={['#1a2a3a', '#000']} style={{ flex: 1 }}>
      <StatusBar barStyle="light-content" backgroundColor="#1a2a3a" />
      <SafeAreaView style={GlobalStyles.container}>
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', padding: Spacing.lg }}>
        <Text style={[Fonts.h2, { color: '#556B2F', textAlign: 'center', marginBottom: Spacing.sm }]}>
        Tu Templo Interior
        </Text>
        <Text style={[Fonts.body, { color: '#556B2F', textAlign: 'center', marginBottom: Spacing.xl }]}>
        Este es tu refugio. Un lugar solo para ti. Dale un nombre que resuene contigo.
        </Text>
        <CustomInput
        label="Nombre de tu templo"
        value={templeName}
        onChangeText={setTempleName}
        placeholder="Ej: El Jardín Sereno, Mi Refugio Estelar..."
        icon="🏛️"
        />
        <CustomButton
        title="Siguiente"
        onPress={handleNext}
        variant="gradient"
        loading={loading}
        disabled={!templeName.trim()}
        style={{ marginTop: Spacing.lg }}
        />
      </View>
      </SafeAreaView>
    </LinearGradient>
  );
};

export default OnboardingTempleScreen;
