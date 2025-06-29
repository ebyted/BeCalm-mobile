# Script para verificar el APK generado
Write-Host "Verificando APK generado..."
$apkPath = "android\app\build\outputs\apk\release"

if (Test-Path $apkPath) {
    Write-Host "Directorio APK encontrado: $apkPath"
    Get-ChildItem $apkPath -Filter "*.apk" | ForEach-Object {
        Write-Host "APK encontrado: $($_.Name)"
        Write-Host "Tamaño: $('{0:N2}' -f ($_.Length / 1MB)) MB"
        Write-Host "Fecha: $($_.LastWriteTime)"
    }
} else {
    Write-Host "Directorio APK no encontrado: $apkPath"
    Write-Host "Verificando estructura de build..."
    if (Test-Path "android\app\build") {
        Get-ChildItem "android\app\build" -Recurse -Filter "*.apk" | ForEach-Object {
            Write-Host "APK encontrado en: $($_.FullName)"
        }
    }
}
