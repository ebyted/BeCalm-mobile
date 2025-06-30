import axios from 'axios';
import { UserProfile, UserOnboardingData, HeartRateData, AppEvent } from '../types/profile';
import API_CONFIG from '../config/api';
import AsyncStorage from '@react-native-async-storage/async-storage';

const getAuthHeaders = async () => {
  const token = await AsyncStorage.getItem('access_token'); // <-- changed from 'userToken' to 'access_token'
  return {
    headers: {
      Authorization: `Bearer ${token}`,
      ...API_CONFIG.DEFAULT_HEADERS,
    },
  };
};

const API_URL = API_CONFIG.BASE_URL;

export const getProfile = async (): Promise<UserProfile> => {
  const config = await getAuthHeaders();
  const response = await axios.get(`${API_URL}${API_CONFIG.ENDPOINTS.GET_PROFILE}`, config);
  return response.data;
};

export const updateProfile = async (profileData: Partial<UserProfile>): Promise<UserProfile> => {
  const config = await getAuthHeaders();
  const response = await axios.put(`${API_URL}${API_CONFIG.ENDPOINTS.UPDATE_PROFILE}`, profileData, config);
  return response.data;
};

export const getOnboardingData = async (): Promise<UserOnboardingData> => {
    // Note: The backend uses the same endpoint for GET and PUT for onboarding data within the profile.
    // We alias it here for clarity, but it points to UPDATE_ONBOARDING_DATA.
  const config = await getAuthHeaders();
  const response = await axios.get(`${API_URL}${API_CONFIG.ENDPOINTS.UPDATE_ONBOARDING_DATA}`, config);
  return response.data;
};

export const updateOnboardingData = async (onboardingData: Partial<UserOnboardingData>): Promise<UserOnboardingData> => {
  const config = await getAuthHeaders();
  const response = await axios.put(`${API_URL}${API_CONFIG.ENDPOINTS.UPDATE_ONBOARDING_DATA}`, onboardingData, config);
  return response.data;
};

export const getHeartRateData = async (): Promise<HeartRateData[]> => {
  const config = await getAuthHeaders();
  const response = await axios.get(`${API_URL}${API_CONFIG.ENDPOINTS.GET_HEART_RATE_HISTORY}`, config);
  return response.data;
};

export const getAppEvents = async (): Promise<AppEvent[]> => {
  const config = await getAuthHeaders();
  const response = await axios.get(`${API_URL}${API_CONFIG.ENDPOINTS.GET_APP_EVENTS}`, config);
  return response.data;
};

export const simulateData = async (): Promise<any> => {
    const config = await getAuthHeaders();
    const response = await axios.post(`${API_URL}${API_CONFIG.ENDPOINTS.SIMULATE_DATA}`, {}, config);
    return response.data;
};
