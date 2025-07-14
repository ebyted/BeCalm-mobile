// src/navigation/types.ts
import type { StackScreenProps } from '@react-navigation/stack';
import { NavigatorScreenParams } from '@react-navigation/native';

// Onboarding
export type OnboardingStackParamList = {
  OnboardingWelcome: undefined;
  OnboardingTemple: undefined;
  OnboardingEmotionalState: undefined;
  OnboardingIntention: undefined;
  OnboardingPersonalData: undefined;
  OnboardingAIScreen: { name: string };
};

// Main App Tabs
export type MainTabParamList = {
  MainMenu: undefined;
  DialogoSagrado: undefined;
  DiarioVivo: undefined;
  MeditaConmigo: undefined;
  Profile: undefined;
};

// Main App Stack (includes tabs and other screens)
export type MainStackParamList = {
  MainTabs: NavigatorScreenParams<MainTabParamList>;
  MensajesDelAlma: undefined;
  RitualDiario: undefined;
  MapaInterior: undefined;
  SilencioSagrado: undefined;
  Dev: undefined;
};

export type RootStackParamList = {
  Onboarding: NavigatorScreenParams<OnboardingStackParamList>;
  Login: {
    username?: string;
    password?: string;
    fullName?: string;
  } | undefined;
  Main: NavigatorScreenParams<MainStackParamList>;
  
};


// Screen props
export type RootStackScreenProps<T extends keyof RootStackParamList> = StackScreenProps<RootStackParamList, T>;
export type MainStackScreenProps<T extends keyof MainStackParamList> = StackScreenProps<MainStackParamList, T>;
export type OnboardingStackScreenProps<T extends keyof OnboardingStackParamList> = StackScreenProps<OnboardingStackParamList, T>;
