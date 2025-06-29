// src/types/index.ts - Tipos TypeScript para BeCalm

export interface User {
  id?: number;
  username: string;
  full_name?: string;
  created_at?: string;
}

export interface LoginCredentials {
  username: string;
  password: string;
}

export interface RegisterData {
  username: string;
  password: string;
  full_name?: string;
}

export interface AuthResponse {
  access_token: string;
  token_type: string;
}

export interface GenerateRequest {
  prompt: string;
  mode: string;
}

export interface GenerateResponse {
  text?: string;
  audio_base64?: string;
  tracks?: string[];
}

export interface DiaryEntry {
  id: number;
  text: string;
  reflection: string;
  timestamp: Date;
}

export interface MeditationSession {
  name: string;
  duration: number;
  description: string;
}

export interface Message {
  role: 'user' | 'ai';
  content: string;
  timestamp: string;
}

export interface ApiConfig {
  baseUrl: string;
  timeout: number;
  retries: number;
}

// Navigation types
export type RootStackParamList = {
  Dev: undefined;
  Login: undefined;
  Main: undefined;
  DialogoSagrado: undefined;
  DiarioVivo: undefined;
  MeditaConmigo: undefined;
  MensajesDelAlma: undefined;
  RitualDiario: undefined;
  MapaInterior: undefined;
  SilencioSagrado: undefined;
};

export type MenuItem = {
  name: string;
  path: keyof RootStackParamList;
  icon: string;
  emoji: string;
  color: string;
};
