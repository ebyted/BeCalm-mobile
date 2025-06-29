# Script para build de Android APK
# Configurar variables de entorno
$env:JAVA_HOME = "C:\Program Files\Microsoft\jdk-17.0.15.6-hotspot"
$env:ANDROID_HOME = "$env:LOCALAPPDATA\Android\Sdk"
$env:ANDROID_SDK_ROOT = $env:ANDROID_HOME
$env:PATH = "$env:JAVA_HOME\bin;$env:ANDROID_HOME\tools;$env:ANDROID_HOME\platform-tools;$env:PATH"

Write-Host "Variables de entorno configuradas:"
Write-Host "JAVA_HOME: $env:JAVA_HOME"
Write-Host "ANDROID_HOME: $env:ANDROID_HOME"
Write-Host ""

# Verificar Java
Write-Host "Verificando Java..."
java -version
Write-Host ""

# Cambiar al directorio android
Set-Location "android"

# Ejecutar build
Write-Host "Iniciando build de Android APK..."
.\gradlew assembleRelease

Write-Host ""
Write-Host "Build completado. El APK debería estar en: android\app\build\outputs\apk\release\"
