import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { OnboardingStackParamList } from './types';

// Onboarding Screens
import OnboardingWelcomeScreen from '../screens/onboarding/OnboardingWelcomeScreen';
import OnboardingTempleScreen from '../screens/onboarding/OnboardingTempleScreen';
import OnboardingEmotionalStateScreen from '../screens/onboarding/OnboardingEmotionalStateScreen';
import OnboardingIntentionScreen from '../screens/onboarding/OnboardingIntentionScreen';
import OnboardingPersonalDataScreen from '../screens/onboarding/OnboardingPersonalDataScreen';
import OnboardingAIScreen from '../screens/onboarding/OnboardingAIScreen';
import OnboardingRegisterScreen from '../screens/onboarding/OnboardingRegisterScreen';

const Stack = createStackNavigator<OnboardingStackParamList>();

const OnboardingNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="OnboardingWelcome" component={OnboardingWelcomeScreen} />
      <Stack.Screen name="OnboardingTemple" component={OnboardingTempleScreen} />
      <Stack.Screen name="OnboardingEmotionalState" component={OnboardingEmotionalStateScreen} />
      <Stack.Screen name="OnboardingIntention" component={OnboardingIntentionScreen} />
      <Stack.Screen name="OnboardingPersonalData" component={OnboardingPersonalDataScreen} />
      <Stack.Screen name="OnboardingAIScreen" component={OnboardingAIScreen} />
      <Stack.Screen name="OnboardingRegister" component={OnboardingRegisterScreen} />
    </Stack.Navigator>
  );
};

export default OnboardingNavigator;
