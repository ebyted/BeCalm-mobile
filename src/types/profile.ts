export interface UserProfile {
  id: number;
  user_id: number;
  email: string; // Added email field
  avatar_url?: string;
  bio?: string;
  phone?: string;
  timezone: string;
  email_notifications: boolean;
  push_notifications: boolean;
  meditation_reminders: boolean;
  created_at: string;
  updated_at: string;
}

export interface UserOnboardingData {
  full_name?: string;
  birth_date?: string;
  birth_place?: string;
  birth_time?: string;
  temple_name?: string;
  emotional_state?: string;
  intention?: string;
}

export interface HeartRateData {
  id: number;
  heart_rate: number;
  recorded_at: string;
  device_type: string;
  activity_type?: string;
  stress_level?: number;
}

export interface AppEvent {
  id: number;
  event_type: string;
  event_name: string;
  duration_minutes?: number;
  details?: string;
  created_at: string;
}
