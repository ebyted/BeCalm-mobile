# Dockerfile para BeCalm - React Native Web
# Optimizado para producción con Node.js 18

FROM node:18-alpine as builder

# Establecer directorio de trabajo
WORKDIR /app

# Instalar dependencias del sistema necesarias para React Native
RUN apk add --no-cache \
    python3 \
    make \
    g++ \
    git

# Copiar package.json y package-lock.json
COPY package*.json ./

# Instalar dependencias
RUN npm ci --legacy-peer-deps

# Copiar el código fuente
COPY . .

# Crear versión web simplificada
RUN npm run build:web:simple

# Etapa de producción
FROM nginx:alpine

# Copiar configuración personalizada de nginx
COPY nginx.conf /etc/nginx/nginx.conf

# Copiar los archivos construidos desde la etapa anterior
COPY --from=builder /app/dist /usr/share/nginx/html

# Exponer el puerto 8015
EXPOSE 8015

# Comando para iniciar nginx
CMD ["nginx", "-g", "daemon off;"]
