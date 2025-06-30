// src/screens/onboarding/OnboardingIntentionScreen.tsx

import React, { useState } from 'react';
import { View, Text, SafeAreaView, StatusBar, Alert } from 'react-native';
import { StackScreenProps } from '@react-navigation/stack';
import LinearGradient from 'react-native-linear-gradient';
import CustomButton from '../../components/CustomButton';
import { GlobalStyles, Colors, Gradients, Spacing } from '../../styles/theme';
import { Fonts } from '../../styles/typography';
import { OnboardingStackParamList } from '../../navigation/types';
import onboardingService from '../../services/onboardingService';

type Props = StackScreenProps<OnboardingStackParamList, 'OnboardingIntention'>;

const INTENTIONS = [
  "Silencio", "Guía", "Solo estar un momento", "Acompañamiento suave"
];

const OnboardingIntentionScreen: React.FC<Props> = ({ navigation }) => {
  const [selectedIntention, setSelectedIntention] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSelectIntention = (intention: string) => {
    setSelectedIntention(intention);
  };

  const handleNext = async () => {
    if (!selectedIntention) {
      Alert.alert('Un momento', 'Por favor, elige tu intención para hoy.');
      return;
    }
    setLoading(true);
    try {
      await onboardingService.saveIntention(selectedIntention);
      navigation.navigate('OnboardingPersonalData');
    } catch (error: any) {
      console.error('Error al guardar intención:', error);
      Alert.alert('Error', 'No se pudo guardar tu intención. Inténtalo de nuevo.\n' + (error?.message || error?.toString() || ''));
    } finally {
      setLoading(false);
    }
  };

  return (
    <LinearGradient colors={Gradients.background} style={{ flex: 1 }}>
      <StatusBar barStyle="light-content" backgroundColor={Colors.background} />
      <SafeAreaView style={GlobalStyles.container}>
      <View style={{ flex: 1, justifyContent: 'center', padding: Spacing.lg }}>
        <Text style={[Fonts.h2, { textAlign: 'center', marginBottom: Spacing.sm }]}>
        ¿Qué buscas en este momento?
        </Text>
        <Text style={[Fonts.body, { textAlign: 'center', marginBottom: Spacing.xl }]}>
        Tu intención guía la experiencia. Elige la que más te llame.
        </Text>
        
        <View style={{ alignItems: 'center' }}>
            {INTENTIONS.map(intention => (
              <CustomButton
                key={intention}
                title={intention}
                onPress={() => handleSelectIntention(intention)}
                style={{
                  marginVertical: Spacing.xs,
                  width: '80%',
                  backgroundColor: selectedIntention === intention ? Colors.primary : Colors.background,
                  borderColor: Colors.primary,
                  borderWidth: 1,
                  borderRadius: 12,
                    // textcolor = blanco
                    // No action needed here; text color is set in textStyle below.
                }}
                textStyle={{
                  color: selectedIntention === intention ? Colors.background : Colors.textOnPrimary
                }}
              />
            ))}
          </View>

          <CustomButton
            title="Siguiente"
            onPress={handleNext}
            variant="gradient"
            loading={loading}
            disabled={!selectedIntention}
            style={{ marginTop: Spacing.xl }}
          />
        </View>
      </SafeAreaView>
    </LinearGradient>
  );
};

export default OnboardingIntentionScreen;
