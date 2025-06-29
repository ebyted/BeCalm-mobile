// src/config/api.ts - Configuración de API para React Native

const API_CONFIG = {
  // URLs de backend en orden de prioridad - Misma API del proyecto web
  BACKEND_URLS: [
    'http://168.231.67.221:8011', // Backend principal activo
    'http://localhost:8011',      // Local development
    'http://127.0.0.1:8011',     // Alternative localhost
  ],
  
  // URL actual (se establecerá dinámicamente)
  BASE_URL: 'http://168.231.67.221:8011',
  
  // Configuración
  REQUEST_TIMEOUT: 10000,
  MAX_RETRIES: 3,
  
  // Headers por defecto
  DEFAULT_HEADERS: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
  
  // ENDPOINTS - Mismos que la aplicación web
  ENDPOINTS: {
    HEALTH: '/health',
    LOGIN: '/token',
    REGISTER: '/register',
    DIALOGO_MESSAGE: '/dialogo_conmigo/message',
    DIALOGO_HISTORY: '/dialogo_conmigo/history',
    GENERATE: '/v1/generate',
    MEDITATION_MUSIC: '/meditation/music',
  },
  
  // Función para obtener headers con auth
  getAuthHeaders(): { [key: string]: string } {
    const headers: { [key: string]: string } = { ...this.DEFAULT_HEADERS };
    return headers;
  },
  
  // Función para probar un backend específico
  async testBackend(url: string): Promise<boolean> {
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 5000);
      
      const response = await fetch(`${url}/health`, {
        method: 'GET',
        headers: this.DEFAULT_HEADERS,
        signal: controller.signal,
      });
      
      clearTimeout(timeoutId);
      
      if (response.ok) {
        console.log(`✅ Backend ${url} está funcionando`);
        return true;
      } else {
        console.log(`⚠️ Backend ${url} respondió con status ${response.status}`);
        return false;
      }
    } catch (error) {
      console.log(`❌ Backend ${url} no disponible:`, error);
      return false;
    }
  },
  
  // Función para encontrar backend que funcione
  async findWorkingBackend(): Promise<string> {
    console.log('🔍 Buscando backend disponible...');
    
    for (const url of this.BACKEND_URLS) {
      console.log(`🔄 Probando: ${url}`);
      const isWorking = await this.testBackend(url);
      
      if (isWorking) {
        this.BASE_URL = url;
        console.log(`✅ Backend seleccionado: ${url}`);
        return url;
      }
    }
    
    console.error('❌ Ningún backend disponible');
    this.BASE_URL = this.BACKEND_URLS[0]; // Fallback al primero
    return this.BASE_URL;
  }
};

export default API_CONFIG;
