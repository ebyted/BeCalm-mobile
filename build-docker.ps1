# Script de construcción para BeCalm Docker
Write-Host "🚀 Iniciando build de BeCalm para Docker..." -ForegroundColor Green

# Verificar que estamos en el directorio correcto
if (-not (Test-Path "package.json")) {
    Write-Host "❌ Error: No se encuentra package.json. Ejecuta este script desde el directorio del proyecto." -ForegroundColor Red
    exit 1
}

# Construir la imagen Docker
Write-Host "📦 Construyendo imagen Docker..." -ForegroundColor Yellow
docker build -t becalm-web:latest .

if ($LASTEXITCODE -eq 0) {
    Write-Host "✅ Build completado exitosamente!" -ForegroundColor Green
    Write-Host "🌐 Para ejecutar la aplicación:" -ForegroundColor Cyan
    Write-Host "   docker run -p 8015:8015 becalm-web:latest" -ForegroundColor White
    Write-Host "   Luego visita: http://localhost:8015" -ForegroundColor White
} else {
    Write-Host "❌ Error en el build. Revisa los logs arriba." -ForegroundColor Red
    exit 1
}
