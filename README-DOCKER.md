# BeCalm - Despliegue Docker

Este es el proyecto BeCalm preparado para despliegue usando Docker y nginx, exponiendo el servicio en el puerto 8015.

## Estructura del proyecto

- **Dockerfile**: Configuración multi-stage para construir la app React Native Web y servirla con nginx
- **nginx.conf**: Configuración personalizada de nginx para el puerto 8015
- **package.json**: Dependencias actualizadas para React Native Web
- **public/**: Archivos estáticos para la web (index.html, manifest.json, favicon)

## Construcción y despliegue

### Con Docker localmente
```bash
# Construir la imagen
docker build -t becalm-web .

# Ejecutar el contenedor
docker run -p 8015:8015 becalm-web
```

### Con Docker Compose (Dockploy)
```yaml
version: '3.8'
services:
  becalm:
    build: .
    ports:
      - "8015:8015"
    restart: unless-stopped
```

## Acceso
Una vez desplegado, la aplicación estará disponible en:
- Local: http://localhost:8015
- VPS: http://tu-servidor:8015

## Características del despliegue

- **Puerto**: 8015 (configurable en nginx.conf)
- **Servidor web**: nginx optimizado para SPA
- **Gzip**: Habilitado para todos los archivos estáticos
- **Headers de seguridad**: Configurados para producción
- **Caché**: Optimizado para archivos estáticos y dinámicos
- **SPA**: Configurado para manejar rutas de React Router

## Archivos importantes

- `Dockerfile`: Build multi-stage con Node.js 18 y nginx
- `nginx.conf`: Configuración de nginx para puerto 8015
- `src/index.js`: Punto de entrada para React Native Web
- `public/index.html`: Template HTML para la aplicación web
