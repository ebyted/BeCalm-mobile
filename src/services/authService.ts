// src/services/authService.ts - Servicio de autenticación para React Native

import AsyncStorage from '@react-native-async-storage/async-storage';
import API_CONFIG from '../config/api';
import { LoginCredentials, RegisterData, AuthResponse, User } from '../types';

class AuthService {
  private static instance: AuthService;

  public static getInstance(): AuthService {
    if (!AuthService.instance) {
      AuthService.instance = new AuthService();
    }
    return AuthService.instance;
  }

  // Método demoLogin para modo demo cuando el backend no está disponible
  private demoLogin(credentials: LoginCredentials): AuthResponse {
    // Puedes personalizar los datos de respuesta demo según tus necesidades
    if (credentials.username === 'demo' && credentials.password === 'demo') {
      return {
        access_token: 'demo-token',
        token_type: 'bearer',
        user: {
          id: 1,
          username: 'demo',
          full_name: 'Demo User',
        } as User,
      };
    } else {
      throw new Error('Usuario o contraseña incorrectos (modo demo)');
    }
  }

  async login(credentials: LoginCredentials): Promise<AuthResponse> {
    try {
      // Verificar si el backend está disponible
      const isHealthy = await this.checkHealth();
      
      if (!isHealthy) {
        // Modo demo cuando el servidor no está disponible
        console.log('🔄 Servidor no disponible, iniciando modo demo...');
        return this.demoLogin(credentials);
      }
      
      const formData = new URLSearchParams();
      formData.append('username', credentials.username);
      formData.append('password', credentials.password);
      
      const response = await fetch(`${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.LOGIN}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: formData.toString(),
      });

      if (!response.ok) {
        let errorMessage = 'Credenciales incorrectas';
        try {
          const errorData = await response.json();
          errorMessage = errorData.detail || errorMessage;
        } catch (e) {
          if (response.status === 404) {
            errorMessage = 'Servidor no encontrado';
          } else if (response.status === 401) {
            errorMessage = 'Usuario o contraseña incorrectos';
          } else {
            errorMessage = `Error del servidor: ${response.status}`;
          }
        }
        throw new Error(errorMessage);
      }

      const data = await response.json();
      
      // Guardar tokens en AsyncStorage
      await AsyncStorage.setItem('access_token', data.access_token);
      await AsyncStorage.setItem('token_type', data.token_type);
      await AsyncStorage.setItem('backend_url', API_CONFIG.BASE_URL);
      
      return data;
    } catch (error) {
      if (error instanceof TypeError && error.message.includes('fetch')) {
        throw new Error(`No se puede conectar al servidor: ${API_CONFIG.BASE_URL}`);
      }
      throw error;
    }
  }

  async register(userData: RegisterData): Promise<{ msg: string }> {
    try {
      const response = await fetch(`${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.REGISTER}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: userData.username,
          password: userData.password,
          full_name: userData.full_name || '',
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.detail || 'Error al registrar usuario');
      }

      return await response.json();
    } catch (error) {
      throw error;
    }
  }

  async logout(): Promise<void> {
    try {
      await AsyncStorage.multiRemove(['access_token', 'token_type', 'backend_url']);
    } catch (error) {
      console.error('Error al cerrar sesión:', error);
    }
  }

  async getToken(): Promise<string | null> {
    try {
      return await AsyncStorage.getItem('access_token');
    } catch (error) {
      console.error('Error al obtener token:', error);
      return null;
    }
  }

  async isAuthenticated(): Promise<boolean> {
    try {
      const token = await this.getToken();
      if (!token) return false;

      // Check if token is expired (basic check)
      const payload = JSON.parse(atob(token.split('.')[1]));
      const now = Date.now() / 1000;
      return payload.exp > now;
    } catch (error) {
      console.error('Error verificando autenticación:', error);
      return false;
    }
  }

  async getAuthHeaders(): Promise<{ [key: string]: string }> {
    const token = await this.getToken();
    const headers: { [key: string]: string } = { ...API_CONFIG.DEFAULT_HEADERS };
    
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }
    
    return headers;
  }

  // Modo demo cuando el servidor no está disponible
  

  async checkHealth(): Promise<boolean> {
    try {
      const workingUrl = await API_CONFIG.findWorkingBackend();
      return workingUrl !== null;
    } catch (error) {
      console.error('Error en health check:', error);
      return false;
    }
  }
}

export default AuthService.getInstance();
