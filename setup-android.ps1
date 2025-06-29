# Script para configurar Android Studio y variables de entorno para React Native

Write-Host "🔧 Configurando Android Studio para React Native..." -ForegroundColor Green

# Definir rutas típicas de Android Studio
$androidStudioPath = "$env:LOCALAPPDATA\Android\Sdk"
$userProfile = $env:USERPROFILE

Write-Host "📁 Verificando instalación de Android Studio..." -ForegroundColor Yellow

# Verificar si Android Studio está instalado
$androidStudioExe = Get-ChildItem -Path "C:\Program Files\Android\Android Studio\bin" -Filter "studio64.exe" -ErrorAction SilentlyContinue

if ($androidStudioExe) {
    Write-Host "✅ Android Studio encontrado en: $($androidStudioExe.DirectoryName)" -ForegroundColor Green
} else {
    Write-Host "❌ Android Studio no encontrado. Asegúrate de que la instalación haya terminado." -ForegroundColor Red
    Write-Host "📍 Busca Android Studio en: C:\Program Files\Android\Android Studio\" -ForegroundColor Yellow
}

# Configurar variables de entorno
Write-Host "🔧 Configurando variables de entorno..." -ForegroundColor Yellow

# ANDROID_HOME
if (-not $env:ANDROID_HOME) {
    [Environment]::SetEnvironmentVariable("ANDROID_HOME", $androidStudioPath, "User")
    $env:ANDROID_HOME = $androidStudioPath
    Write-Host "✅ ANDROID_HOME configurado: $androidStudioPath" -ForegroundColor Green
} else {
    Write-Host "✅ ANDROID_HOME ya configurado: $env:ANDROID_HOME" -ForegroundColor Green
}

# Actualizar PATH
$currentPath = [Environment]::GetEnvironmentVariable("PATH", "User")
$platformTools = "$androidStudioPath\platform-tools"
$tools = "$androidStudioPath\tools"
$toolsBin = "$androidStudioPath\tools\bin"

if ($currentPath -notlike "*$platformTools*") {
    $newPath = "$currentPath;$platformTools;$tools;$toolsBin"
    [Environment]::SetEnvironmentVariable("PATH", $newPath, "User")
    Write-Host "✅ PATH actualizado con herramientas de Android" -ForegroundColor Green
} else {
    Write-Host "✅ PATH ya contiene herramientas de Android" -ForegroundColor Green
}

Write-Host "🎯 Configuración completada. Reinicia tu terminal para aplicar los cambios." -ForegroundColor Green
Write-Host "📱 Próximo paso: Abrir Android Studio y configurar un emulador." -ForegroundColor Cyan

# Instrucciones para el usuario
Write-Host "`n📋 PRÓXIMOS PASOS:" -ForegroundColor Magenta
Write-Host "1. Abre Android Studio desde el menú de inicio" -ForegroundColor White
Write-Host "2. Completa el setup inicial (acepta licencias)" -ForegroundColor White
Write-Host "3. Ve a Tools -> AVD Manager" -ForegroundColor White
Write-Host "4. Crea un nuevo dispositivo virtual (recomendado: Pixel 6 con API 33)" -ForegroundColor White
Write-Host "5. Inicia el emulador" -ForegroundColor White
Write-Host "6. Ejecuta: npm run android" -ForegroundColor White
