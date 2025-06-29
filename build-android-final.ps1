# Script para build de Android APK desde ruta corta
# Configurar variables de entorno
$env:JAVA_HOME = "C:\Program Files\Microsoft\jdk-17.0.15.6-hotspot"
$env:ANDROID_HOME = "$env:LOCALAPPDATA\Android\Sdk"
$env:ANDROID_SDK_ROOT = $env:ANDROID_HOME
$env:PATH = "$env:JAVA_HOME\bin;$env:ANDROID_HOME\tools;$env:ANDROID_HOME\platform-tools;$env:PATH"

Write-Host "=== BUILD DE ANDROID DESDE RUTA CORTA ==="
Write-Host "Directorio actual: $(Get-Location)"
Write-Host "JAVA_HOME: $env:JAVA_HOME"
Write-Host "ANDROID_HOME: $env:ANDROID_HOME"
Write-Host ""

# Verificar que estamos en el directorio correcto
if (-not (Test-Path "package.json")) {
    Write-Host "ERROR: No se encuentra package.json. Asegurate de estar en C:\BeCalm"
    exit 1
}

# Verificar Java
Write-Host "Verificando Java..."
try {
    $javaVersion = java -version 2>&1
    Write-Host "Java OK: $($javaVersion[0])"
} catch {
    Write-Host "ERROR: Java no encontrado"
    exit 1
}

Write-Host ""
Write-Host "Iniciando build de Android APK..."
Write-Host "Esto puede tomar varios minutos..."
Write-Host ""

# Cambiar al directorio android y ejecutar build
Set-Location "android"
.\gradlew assembleRelease --stacktrace

if ($LASTEXITCODE -eq 0) {
    Write-Host ""
    Write-Host "=== BUILD EXITOSO ==="
    Write-Host "El APK deberia estar en: android\app\build\outputs\apk\release\"
    
    # Verificar APK
    $apkPath = "app\build\outputs\apk\release"
    if (Test-Path $apkPath) {
        Get-ChildItem $apkPath -Filter "*.apk" | ForEach-Object {
            Write-Host "APK encontrado: $($_.Name) - Tamaño: $('{0:N2}' -f ($_.Length / 1MB)) MB"
        }
    }
} else {
    Write-Host ""
    Write-Host "=== BUILD FALLO ==="
    Write-Host "Codigo de salida: $LASTEXITCODE"
}
