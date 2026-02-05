# Flutter Cleanup Script
# This script removes all Flutter-related files and directories

Write-Host "Cleaning up Flutter files..." -ForegroundColor Cyan
Write-Host ""

# Flutter directories to remove
$flutterDirs = @(
    ".dart_tool",
    "android",
    "ios",
    "linux",
    "macos",
    "windows",
    "build",
    "lib",
    "test",
    "web"
)

# Flutter files to remove
$flutterFiles = @(
    ".flutter-plugins-dependencies",
    ".metadata",
    "analysis_options.yaml",
    "pubspec.lock",
    "pubspec.yaml"
)

$removedCount = 0

# Remove directories
foreach ($dir in $flutterDirs) {
    $path = Join-Path $PSScriptRoot $dir
    if (Test-Path $path) {
        Write-Host "Removing directory: $dir" -ForegroundColor Yellow
        Remove-Item -Path $path -Recurse -Force
        $removedCount++
    }
}

# Remove files
foreach ($file in $flutterFiles) {
    $path = Join-Path $PSScriptRoot $file
    if (Test-Path $path) {
        Write-Host "Removing file: $file" -ForegroundColor Yellow
        Remove-Item -Path $path -Force
        $removedCount++
    }
}

Write-Host ""
Write-Host "Cleanup complete! Removed $removedCount Flutter items." -ForegroundColor Green
Write-Host ""
Write-Host "Remaining structure:" -ForegroundColor Cyan
Write-Host "  backend/          (Node.js + Express + MongoDB)" -ForegroundColor Green
Write-Host "  frontend/         (React + Vite)" -ForegroundColor Green
Write-Host "  .git/             (Git repository)" -ForegroundColor Gray
Write-Host "  Documentation files" -ForegroundColor Gray
Write-Host ""
Write-Host "Your web application is ready!" -ForegroundColor Green
