// src/services/apiService.ts - Servicio principal de API para React Native

import API_CONFIG from '../config/api';
import authService from './authService';
import { GenerateRequest, GenerateResponse, Message } from '../types';

class ApiService {
  private static instance: ApiService;

  public static getInstance(): ApiService {
    if (!ApiService.instance) {
      ApiService.instance = new ApiService();
    }
    return ApiService.instance;
  }

  async request(endpoint: string, options: RequestInit = {}): Promise<any> {
    const url = `${API_CONFIG.BASE_URL}${endpoint}`;
    console.log('📡 Request a:', url);
    
    const headers = await authService.getAuthHeaders();
    
    const config: RequestInit = {
      ...options,
      headers: {
        ...headers,
        ...options.headers,
      },
    };

    try {
      const response = await fetch(url, config);
      console.log('📥 Response status:', response.status);
      
      if (!response.ok) {
        if (response.status === 401) {
          // Token expirado, cerrar sesión
          await authService.logout();
        }
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }
      
      const data = await response.json();
      console.log('✅ Request exitoso');
      return data;
      
    } catch (error) {
      console.error('❌ Request falló:', {
        url,
        error: error instanceof Error ? error.message : error
      });
      throw error;
    }
  }

  // Métodos HTTP simples
  async get(endpoint: string): Promise<any> {
    return this.request(endpoint, { method: 'GET' });
  }

  async post(endpoint: string, data: any): Promise<any> {
    return this.request(endpoint, {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async put(endpoint: string, data: any): Promise<any> {
    return this.request(endpoint, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  }

  async delete(endpoint: string): Promise<any> {
    return this.request(endpoint, { method: 'DELETE' });
  }

  // Métodos específicos para la aplicación
  async healthCheck(): Promise<any> {
    return this.get(API_CONFIG.ENDPOINTS.HEALTH);
  }

  async generateContent(request: GenerateRequest): Promise<GenerateResponse> {
    return this.post(API_CONFIG.ENDPOINTS.GENERATE, request);
  }

  async sendDialogMessage(request: GenerateRequest): Promise<GenerateResponse> {
    return this.post(API_CONFIG.ENDPOINTS.DIALOGO_MESSAGE, request);
  }

  async getDialogHistory(days: number = 2): Promise<Message[]> {
    return this.get(`${API_CONFIG.ENDPOINTS.DIALOGO_HISTORY}?days=${days}`);
  }

  async getMeditationMusic(request: GenerateRequest): Promise<{ tracks: string[] }> {
    return this.post(API_CONFIG.ENDPOINTS.MEDITATION_MUSIC, request);
  }
}

export default ApiService.getInstance();
