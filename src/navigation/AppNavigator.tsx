// src/navigation/OnboardingNavigator.tsx

import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

// Screens
import OnboardingWelcomeScreen from '../screens/onboarding/OnboardingWelcomeScreen';
import OnboardingTempleScreen from '../screens/onboarding/OnboardingTempleScreen';
import OnboardingEmotionalStateScreen from '../screens/onboarding/OnboardingEmotionalStateScreen';
import OnboardingIntentionScreen from '../screens/onboarding/OnboardingIntentionScreen';
import OnboardingPersonalDataScreen from '../screens/onboarding/OnboardingPersonalDataScreen';
import OnboardingAIScreen from '../screens/onboarding/OnboardingAIScreen';

// Types
import { OnboardingStackParamList } from './types';

const OnboardingStack = createStackNavigator<OnboardingStackParamList>();

const OnboardingNavigator = () => (
  <OnboardingStack.Navigator screenOptions={{ headerShown: false }}>
    <OnboardingStack.Screen name="OnboardingWelcome" component={OnboardingWelcomeScreen} />
    <OnboardingStack.Screen name="OnboardingTemple" component={OnboardingTempleScreen} />
    <OnboardingStack.Screen name="OnboardingEmotionalState" component={OnboardingEmotionalStateScreen} />
    <OnboardingStack.Screen name="OnboardingIntention" component={OnboardingIntentionScreen} />
    <OnboardingStack.Screen name="OnboardingPersonalData" component={OnboardingPersonalDataScreen} />
    <OnboardingStack.Screen name="OnboardingAIScreen" component={OnboardingAIScreen} />
  </OnboardingStack.Navigator>
);

export default OnboardingNavigator;
