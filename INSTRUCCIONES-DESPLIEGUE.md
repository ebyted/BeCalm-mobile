# 🚀 Instrucciones de Despliegue - BeCalm en VPS Hostinger con Dockploy

## 📋 Resumen del Proyecto Preparado

El proyecto **BeCalm** está completamente preparado para ser desplegado en un VPS Hostinger usando **Dockploy**, exponiendo el servicio en el **puerto 8015**.

### 🎨 **PALETA DE COLORES ACTUALIZADA**

La aplicación ahora respeta la paleta de colores original de BeCalm:
- **Verde oliva claro** (#8fbc8f) - Color principal
- **Blanco** (#ffffff) - Backgrounds y textos sobre verde
- **Café claro/Beige** (#d2b48c) - Color secundario  
- **Gris** (#a0a0a0) - Color de acento
- **Crema** (#f5f5f0) - Background principal

### 🗂️ Archivos Principales Creados/Modificados:

```
BeCalm-Docker/
├── Dockerfile              # Build multi-stage (Node.js + nginx)
├── docker-compose.yml      # Configuración para Dockploy
├── nginx.conf              # Configuración nginx puerto 8015
├── .dockerignore           # Optimización del build
├── package.json            # Dependencias React Native Web
├── src/styles/theme.ts     # ACTUALIZADO: Paleta de colores BeCalm
├── src/components/CustomButton.tsx # ACTUALIZADO: Colores corregidos
├── public/                 # Archivos web estáticos
│   ├── index.html
│   ├── manifest.json
│   └── favicon.ico
├── src/index.js            # Punto de entrada web
├── build-docker.ps1        # Script de build Windows
├── build-docker.sh         # Script de build Linux/Mac
└── README-DOCKER.md        # Documentación específica
```

## 🔧 Configuración Técnica

- **Puerto de Exposición**: 8015
- **Tecnología**: React Native Web + nginx
- **Node.js**: v18-alpine
- **Servidor**: nginx optimizado para SPA
- **Características**: Gzip, headers de seguridad, caché optimizado
- **Colores**: Paleta original BeCalm (verde oliva, blanco, café, gris)

## 📤 Pasos para Subir al VPS

### 1. **Comprimir el Proyecto**
```powershell
# En Windows PowerShell
Compress-Archive -Path "C:\Users\ArteDigital\Documents\New\python\Proyectos\Becalm\front-movil\BeCalm-Docker\*" -DestinationPath "C:\temp\BeCalm-Docker.zip"
```

### 2. **Subir al VPS Hostinger**
- Usar FileZilla, WinSCP, o panel de Hostinger
- Subir `BeCalm-Docker.zip` al VPS
- Extraer en el directorio deseado (ej: `/home/usuario/apps/becalm/`)

### 3. **Configurar en Dockploy**
1. Acceder al panel de Dockploy en tu VPS
2. Crear nueva aplicación
3. Seleccionar el directorio del proyecto
4. Usar la configuración Docker Compose incluida
5. Verificar que el puerto 8015 esté disponible

### 4. **Desplegar**
```bash
# En el VPS (terminal)
cd /ruta/del/proyecto/BeCalm-Docker
docker-compose up --build -d
```

## 🌐 URLs de Acceso

Una vez desplegado:
- **Local**: http://localhost:8015
- **VPS**: http://tu-servidor-ip:8015
- **Dominio**: http://tu-dominio.com:8015

## 🎨 Cambios de UI Implementados

### Colores Actualizados:
- **Backgrounds**: Fondos en crema y blanco en lugar de oscuros
- **Texto principal**: Gris oscuro en lugar de blanco  
- **StatusBar**: Cambiado a "dark-content" para fondos claros
- **Botones**: Verde oliva como color principal
- **Gradientes**: Suaves transiciones en la paleta natural
- **Cards**: Fondos semi-transparentes con verde oliva suave

### Componentes Afectados:
- ✅ `theme.ts` - Paleta de colores completa
- ✅ `CustomButton.tsx` - Colores de texto corregidos
- ✅ `SilencioSagradoScreen.tsx` - StatusBar y colores actualizados
- ✅ Todos los estilos globales respetan la nueva paleta

## 🔒 Configuraciones de Seguridad (nginx.conf)

- Headers de seguridad configurados
- CORS habilitado para desarrollo
- Gzip compression activado
- Cache optimizado para producción
- Configuración SPA para React Router

## 🚨 Verificaciones Pre-Despliegue

✅ **Archivos Verificados:**
- [x] Dockerfile optimizado
- [x] nginx.conf configurado para puerto 8015
- [x] package.json con dependencias React Native Web
- [x] docker-compose.yml listo para Dockploy
- [x] Scripts de build incluidos
- [x] Archivos públicos web creados
- [x] **Paleta de colores BeCalm implementada**
- [x] **Componentes actualizados con colores correctos**

## 🆘 Troubleshooting

### Si el build falla:
1. Verificar que Docker esté instalado en el VPS
2. Revisar logs: `docker-compose logs`
3. Verificar que el puerto 8015 esté libre: `netstat -tulpn | grep 8015`

### Si la app no carga:
1. Verificar nginx logs: `docker exec -it becalm-app nginx -t`
2. Revisar permisos de archivos
3. Verificar configuración de firewall para puerto 8015

## 📞 Comandos Útiles

```bash
# Ver logs del contenedor
docker-compose logs -f

# Reiniciar servicio
docker-compose restart

# Rebuild completo
docker-compose down && docker-compose up --build -d

# Verificar estado
docker-compose ps
```

## 🎯 Próximos Pasos Opcionales

1. **Configurar HTTPS** con Let's Encrypt
2. **Configurar dominio** personalizado
3. **Implementar CI/CD** para deployments automáticos
4. **Monitoreo** con logs centralizados

---

**¡El proyecto está listo para subir al VPS con la paleta de colores BeCalm original! 🚀**

### 🌈 Resumen de Colores Implementados:
- **Verde oliva claro** (#8fbc8f) - Botones principales, acentos
- **Blanco** (#ffffff) - Backgrounds, texto sobre verde
- **Café claro** (#d2b48c) - Elementos secundarios
- **Gris** (#a0a0a0) - Acentos, bordes
- **Crema** (#f5f5f0) - Background principal de la app
