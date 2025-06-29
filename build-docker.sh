#!/bin/bash

# Script de construcción para BeCalm Docker
echo "🚀 Iniciando build de BeCalm para Docker..."

# Verificar que estamos en el directorio correcto
if [ ! -f "package.json" ]; then
    echo "❌ Error: No se encuentra package.json. Ejecuta este script desde el directorio del proyecto."
    exit 1
fi

# Construir la imagen Docker
echo "📦 Construyendo imagen Docker..."
docker build -t becalm-web:latest .

if [ $? -eq 0 ]; then
    echo "✅ Build completado exitosamente!"
    echo "🌐 Para ejecutar la aplicación:"
    echo "   docker run -p 8015:8015 becalm-web:latest"
    echo "   Luego visita: http://localhost:8015"
else
    echo "❌ Error en el build. Revisa los logs arriba."
    exit 1
fi
