# Script para configurar Android Development en Windows
# Configuración automática para React Native

Write-Host "🔧 Configurando entorno Android para React Native..." -ForegroundColor Green

# Verificar si Java está instalado
$javaVersion = $null
try {
    $javaVersion = & java -version 2>&1 | Select-String "version"
    if ($javaVersion) {
        Write-Host "✅ Java encontrado: $javaVersion" -ForegroundColor Green
    }
} catch {
    Write-Host "❌ Java no encontrado" -ForegroundColor Red
    Write-Host "🔗 Descarga Java 17 desde: https://adoptium.net/" -ForegroundColor Yellow
    exit 1
}

# Configurar JAVA_HOME
$javaHome = $env:JAVA_HOME
if (-not $javaHome) {
    # Buscar Java en ubicaciones comunes
    $possibleJavaPaths = @(
        "${env:ProgramFiles}\Eclipse Adoptium\jdk-17*",
        "${env:ProgramFiles}\Java\jdk-17*",
        "${env:ProgramFiles(x86)}\Eclipse Adoptium\jdk-17*",
        "${env:ProgramFiles(x86)}\Java\jdk-17*"
    )
    
    foreach ($path in $possibleJavaPaths) {
        $javaDir = Get-ChildItem $path -ErrorAction SilentlyContinue | Select-Object -First 1
        if ($javaDir) {
            $javaHome = $javaDir.FullName
            break
        }
    }
    
    if ($javaHome) {
        [Environment]::SetEnvironmentVariable("JAVA_HOME", $javaHome, "User")
        Write-Host "✅ JAVA_HOME configurado: $javaHome" -ForegroundColor Green
    } else {
        Write-Host "❌ No se pudo encontrar Java automáticamente" -ForegroundColor Red
        Write-Host "📍 Configura JAVA_HOME manualmente" -ForegroundColor Yellow
    }
}

# Configurar ANDROID_HOME
$androidHome = $env:ANDROID_HOME
if (-not $androidHome) {
    $androidSdk = "$env:LOCALAPPDATA\Android\Sdk"
    if (Test-Path $androidSdk) {
        [Environment]::SetEnvironmentVariable("ANDROID_HOME", $androidSdk, "User")
        Write-Host "✅ ANDROID_HOME configurado: $androidSdk" -ForegroundColor Green
        $androidHome = $androidSdk
    } else {
        Write-Host "❌ Android SDK no encontrado en $androidSdk" -ForegroundColor Red
        Write-Host "📥 Instala Android Studio desde: https://developer.android.com/studio" -ForegroundColor Yellow
    }
}

# Configurar PATH para herramientas Android
if ($androidHome) {
    $platformTools = "$androidHome\platform-tools"
    $tools = "$androidHome\tools"
    $emulator = "$androidHome\emulator"
    
    $currentPath = [Environment]::GetEnvironmentVariable("PATH", "User")
    $pathsToAdd = @($platformTools, $tools, $emulator)
    
    foreach ($pathToAdd in $pathsToAdd) {
        if ($currentPath -notlike "*$pathToAdd*") {
            $currentPath = "$currentPath;$pathToAdd"
        }
    }
    
    [Environment]::SetEnvironmentVariable("PATH", $currentPath, "User")
    Write-Host "✅ PATH actualizado con herramientas Android" -ForegroundColor Green
}

# Verificar emuladores disponibles
Write-Host "🔍 Verificando emuladores..." -ForegroundColor Yellow
if ($androidHome) {
    $emulatorExe = "$androidHome\emulator\emulator.exe"
    if (Test-Path $emulatorExe) {
        try {
            $avds = & "$emulatorExe" -list-avds 2>$null
            if ($avds) {
                Write-Host "✅ Emuladores encontrados:" -ForegroundColor Green
                $avds | ForEach-Object { Write-Host "  📱 $_" -ForegroundColor Cyan }
            } else {
                Write-Host "⚠️ No hay emuladores creados" -ForegroundColor Yellow
                Write-Host "📱 Crea un emulador en Android Studio > Tools > AVD Manager" -ForegroundColor Yellow
            }
        } catch {
            Write-Host "⚠️ Error al verificar emuladores" -ForegroundColor Yellow
        }
    }
}

Write-Host "🔄 Reinicia PowerShell para aplicar los cambios" -ForegroundColor Yellow
Write-Host "✅ Configuración completada!" -ForegroundColor Green
