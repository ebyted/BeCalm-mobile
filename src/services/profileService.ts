import axios from 'axios';
import { UserProfile, UserOnboardingData, HeartRateData, AppEvent } from '../types/profile';
import API_CONFIG from '../config/api';
import AsyncStorage from '@react-native-async-storage/async-storage';

const getAuthHeaders = async () => {
  const token = await AsyncStorage.getItem('access_token');
  console.log('Token found:', token ? 'Yes' : 'No');
  return {
    headers: {
      Authorization: `Bearer ${token}`,
      ...API_CONFIG.DEFAULT_HEADERS,
    },
  };
};

const API_URL = API_CONFIG.BASE_URL;

export const getProfile = async (): Promise<UserProfile> => {
  try {
    console.log('Fetching profile from:', `${API_URL}${API_CONFIG.ENDPOINTS.GET_PROFILE}`);
    const config = await getAuthHeaders();
    const response = await axios.get(`${API_URL}${API_CONFIG.ENDPOINTS.GET_PROFILE}`, config);
    console.log('Profile response status:', response.status);
    return response.data;
  } catch (error: any) {
    console.error('Error fetching profile:', error.response?.status, error.response?.data, error.message);
    throw error;
  }
};

export const updateProfile = async (profileData: Partial<UserProfile>): Promise<UserProfile> => {
  const config = await getAuthHeaders();
  const response = await axios.put(`${API_URL}${API_CONFIG.ENDPOINTS.UPDATE_PROFILE}`, profileData, config);
  return response.data;
};

export const getOnboardingData = async (): Promise<UserOnboardingData> => {
  try {
    console.log('Fetching onboarding data from:', `${API_URL}${API_CONFIG.ENDPOINTS.UPDATE_ONBOARDING_DATA}`);
    const config = await getAuthHeaders();
    const response = await axios.get(`${API_URL}${API_CONFIG.ENDPOINTS.UPDATE_ONBOARDING_DATA}`, config);
    console.log('Onboarding data response status:', response.status);
    return response.data;
  } catch (error: any) {
    console.error('Error fetching onboarding data:', error.response?.status, error.response?.data, error.message);
    throw error;
  }
};

export const updateOnboardingData = async (onboardingData: Partial<UserOnboardingData>): Promise<UserOnboardingData> => {
  const config = await getAuthHeaders();
  const response = await axios.put(`${API_URL}${API_CONFIG.ENDPOINTS.UPDATE_ONBOARDING_DATA}`, onboardingData, config);
  return response.data;
};

export const getHeartRateData = async (): Promise<HeartRateData[]> => {
  try {
    console.log('Fetching heart rate data from:', `${API_URL}${API_CONFIG.ENDPOINTS.GET_HEART_RATE_HISTORY}`);
    const config = await getAuthHeaders();
    const response = await axios.get(`${API_URL}${API_CONFIG.ENDPOINTS.GET_HEART_RATE_HISTORY}`, config);
    console.log('Heart rate data response status:', response.status);
    return response.data;
  } catch (error: any) {
    console.error('Error fetching heart rate data:', error.response?.status, error.response?.data, error.message);
    throw error;
  }
};

export const getAppEvents = async (): Promise<AppEvent[]> => {
  try {
    console.log('Fetching app events from:', `${API_URL}${API_CONFIG.ENDPOINTS.GET_APP_EVENTS}`);
    const config = await getAuthHeaders();
    const response = await axios.get(`${API_URL}${API_CONFIG.ENDPOINTS.GET_APP_EVENTS}`, config);
    console.log('App events response status:', response.status);
    return response.data;
  } catch (error: any) {
    console.error('Error fetching app events:', error.response?.status, error.response?.data, error.message);
    throw error;
  }
};

export const simulateData = async (): Promise<any> => {
    const config = await getAuthHeaders();
    const response = await axios.post(`${API_URL}${API_CONFIG.ENDPOINTS.SIMULATE_DATA}`, {}, config);
    return response.data;
};
