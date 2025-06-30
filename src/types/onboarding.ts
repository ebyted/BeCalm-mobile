export interface OnboardingData {
  templeName?: string;
  emotionalState?: string;
  intention?: string;
  personalData?: {
    name?: string;
    email?: string;
    birthDate?: string;
    username?: string;
    password?: string;
  };
  welcomeMessage?: string;
}
