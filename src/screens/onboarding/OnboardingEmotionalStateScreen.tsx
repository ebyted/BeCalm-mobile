// src/screens/onboarding/OnboardingEmotionalStateScreen.tsx

import React, { useState } from 'react';
import { View, Text, SafeAreaView, StatusBar, Alert } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';
import CustomButton from '../../components/CustomButton';
import { GlobalStyles, Colors, Spacing } from '../../styles/theme';
import { Fonts } from '../../styles/typography';
import { OnboardingStackParamList } from '../../navigation/types';
import onboardingService from '../../services/onboardingService';

type NavigationProps = StackNavigationProp<OnboardingStackParamList, 'OnboardingEmotionalState'>;

interface Props {
  navigation: NavigationProps;
}

const EMOTIONAL_STATES = [
  "En paz", "Ansioso", "Esperanzado", "Confundido",
  "Alegre", "Melancólico", "Sereno", "Inquieto"
];

const OnboardingEmotionalStateScreen: React.FC<Props> = ({ navigation }) => {
  const [selectedState, setSelectedState] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSelectState = (state: string) => {
    setSelectedState(state);
  };

  const handleNext = async () => {
    if (!selectedState) {
      Alert.alert('Un momento', 'Por favor, elige cómo te sientes hoy.');
      return;
    }
    setLoading(true);
    try {
      await onboardingService.saveEmotionalState(selectedState);
      navigation.navigate('OnboardingIntention');
    } catch (error) {
      Alert.alert('Error', 'No se pudo guardar tu estado. Inténtalo de nuevo.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <LinearGradient colors={['#1a2a3a', '#000']} style={{ flex: 1 }}>
      <StatusBar barStyle="light-content" backgroundColor={Colors.background} />
      <SafeAreaView style={GlobalStyles.container}>
        <View style={{ flex: 1, justifyContent: 'center', padding: Spacing.lg }}>
          <Text style={[Fonts.h2, { color: Colors.textOnPrimary, textAlign: 'center', marginBottom: Spacing.sm }]}>
            ¿Cómo te sientes hoy?
          </Text>
          <Text style={[Fonts.body, {  color: Colors.textOnPrimary, textAlign: 'center', marginBottom: Spacing.xl }]}>
            No hay respuestas correctas o incorrectas. Solo lo que sientes en este momento.
          </Text>
          
          <View style={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center' }}>
            {EMOTIONAL_STATES.map(state => (
              <CustomButton
                key={state}
                title={state}
                onPress={() => handleSelectState(state)}
                variant={selectedState === state ? 'primary' : 'secondary'}
                style={{ margin: Spacing.xs }}
              />
            ))}
          </View>

          <CustomButton
            title="Siguiente"
            onPress={handleNext}
            variant="gradient"
            loading={loading}
            disabled={!selectedState}
            style={{ marginTop: Spacing.xl }}
          />
        </View>
      </SafeAreaView>
    </LinearGradient>
  );
};

export default OnboardingEmotionalStateScreen;
