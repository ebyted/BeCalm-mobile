# Etapa 1: Build web
FROM node:18-alpine AS builder

WORKDIR /app

# Dependencias necesarias para React Native Web
RUN apk add --no-cache python3 make g++ git

# Copiar dependencias
COPY package*.json ./

# Instalar dependencias (legacy-peer-deps si tienes dependencias complicadas)
RUN npm ci --legacy-peer-deps

# Copiar todo el código
COPY . .

# Compilar solo la versión web
RUN npm run build:web:simple  # <-- asegúrate que este script exista

# Etapa 2: Servir con Nginx
FROM nginx:alpine

# Copiar configuración nginx
COPY nginx.conf /etc/nginx/nginx.conf

# Cambia esta línea si tu build genera otra carpeta (como build/ o web-build/)
COPY --from=builder /app/dist /usr/share/nginx/html

EXPOSE 8015

CMD ["nginx", "-g", "daemon off;"]
