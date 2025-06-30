// src/services/onboardingService.ts

import API_CONFIG from '../config/api';
import { OnboardingData } from '../types/onboarding';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ONBOARDING_SESSION_ID_KEY = 'onboarding_session_id';

class OnboardingService {
  private static instance: OnboardingService;

  public static getInstance(): OnboardingService {
    if (!OnboardingService.instance) {
      OnboardingService.instance = new OnboardingService();
    }
    return OnboardingService.instance;
  }

  private async getSessionId(): Promise<string | null> {
    return AsyncStorage.getItem(ONBOARDING_SESSION_ID_KEY);
  }

  async startOnboarding(): Promise<string> {
    const response = await fetch(`${API_CONFIG.BASE_URL}/onboarding/start`, {
      method: 'POST',
      headers: API_CONFIG.DEFAULT_HEADERS,
    });
    if (!response.ok) {
      throw new Error('Failed to start onboarding session');
    }
    const data = await response.json();
    await AsyncStorage.setItem(ONBOARDING_SESSION_ID_KEY, data.session_id);
    return data.session_id;
  }

  async saveTempleName(templeName: string): Promise<void> {
    const sessionId = await this.getSessionId();
    await fetch(`${API_CONFIG.BASE_URL}/onboarding/temple`, {
      method: 'POST',
      headers: API_CONFIG.DEFAULT_HEADERS,
      body: JSON.stringify({ session_id: sessionId, temple_name: templeName }),
    });
  }

  async saveEmotionalState(emotionalState: string): Promise<void> {
    const sessionId = await this.getSessionId();
    await fetch(`${API_CONFIG.BASE_URL}/onboarding/emotional-state`, {
      method: 'POST',
      headers: API_CONFIG.DEFAULT_HEADERS,
      body: JSON.stringify({ session_id: sessionId, emotional_state: emotionalState }),
    });
  }

  async saveIntention(intention: string): Promise<void> {
    const sessionId = await this.getSessionId();
    await fetch(`${API_CONFIG.BASE_URL}/onboarding/intention`, {
      method: 'POST',
      headers: API_CONFIG.DEFAULT_HEADERS,
      body: JSON.stringify({ session_id: sessionId, intention: intention }),
    });
  }

  async savePersonalData(data: { full_name: string, birth_date: string, birth_place: string, birth_time?: string }): Promise<void> {
    const sessionId = await this.getSessionId();
    await fetch(`${API_CONFIG.BASE_URL}/onboarding/personal-data`, {
        method: 'POST',
        headers: API_CONFIG.DEFAULT_HEADERS,
        body: JSON.stringify({ session_id: sessionId, ...data }),
    });
  }

  async getWelcomeMessage(): Promise<string> {
    const sessionId = await this.getSessionId();
    const response = await fetch(`${API_CONFIG.BASE_URL}/onboarding/generate-welcome`, {
        method: 'POST',
        headers: API_CONFIG.DEFAULT_HEADERS,
        body: JSON.stringify({ session_id: sessionId }),
    });
    if (!response.ok) {
        let errorText = '';
        try {
          errorText = await response.text();
        } catch {}
        console.error('Failed to generate welcome message:', response.status, errorText);
        throw new Error(`Failed to generate welcome message: ${response.status} ${errorText}`);
    }
    const data = await response.json();
    return data.welcome_message;
  }

  async completeRegistration(email: string, password: string): Promise<any> {
    const sessionId = await this.getSessionId();
    const response = await fetch(`${API_CONFIG.BASE_URL}/onboarding/complete-registration`, {
        method: 'POST',
        headers: API_CONFIG.DEFAULT_HEADERS,
        body: JSON.stringify({ session_id: sessionId, email, password }),
    });
    const data = await response.json();
    if (!response.ok) {
        throw new Error(data.detail || 'Failed to complete registration');
    }
    await AsyncStorage.removeItem(ONBOARDING_SESSION_ID_KEY);
    return data;
  }
}

export default OnboardingService.getInstance();

export function saveIntention(arg0: { intention: string; }) {
    throw new Error('Function not implemented.');
}

