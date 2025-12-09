#!/usr/bin/env pwsh
# Script para subir repositorios a GitHub
# Usuario: nandah23
# Uso: .\subir_github.ps1

$baseDir = "D:\Universidad\4to Año\Tesis\Versiones Sist\V8"

Write-Host "============================================================" -ForegroundColor Cyan
Write-Host "   SUBIR REPOSITORIOS A GITHUB" -ForegroundColor Cyan
Write-Host "   Usuario: nandah23" -ForegroundColor Cyan
Write-Host "============================================================" -ForegroundColor Cyan
Write-Host ""

# ============================================================
# FRONTEND
# ============================================================
Write-Host "[1/2] Procesando FRONTEND..." -ForegroundColor Yellow
Write-Host ""

Set-Location "$baseDir\rrhh_frontend"

Write-Host "Verificando estado del repositorio..." -ForegroundColor Gray
git status
Write-Host ""

$continuar = Read-Host "¿Deseas continuar con el frontend? (S/N)"
if ($continuar -eq "S" -or $continuar -eq "s") {
    Write-Host "Agregando archivos..." -ForegroundColor Gray
    git add .
    
    Write-Host "Creando commit..." -ForegroundColor Gray
    git commit -m "Initial commit: RRHH Frontend con React, Router y Material-UI"
    
    Write-Host "Subiendo a GitHub..." -ForegroundColor Gray
    git push -u origin master
    
    Write-Host "[✓] Frontend subido exitosamente" -ForegroundColor Green
} else {
    Write-Host "[→] Frontend omitido" -ForegroundColor Gray
}
Write-Host ""

# ============================================================
# BACKEND
# ============================================================
Write-Host "[2/2] Procesando BACKEND..." -ForegroundColor Yellow
Write-Host ""

Set-Location "$baseDir\rrhh_backend"

Write-Host "Verificando estado del repositorio..." -ForegroundColor Gray
git status
Write-Host ""

$continuar = Read-Host "¿Deseas continuar con el backend? (S/N)"
if ($continuar -eq "S" -or $continuar -eq "s") {
    Write-Host "Agregando archivos..." -ForegroundColor Gray
    git add .
    
    Write-Host "Creando commit..." -ForegroundColor Gray
    git commit -m "Initial commit: RRHH Backend con Django, DRF y PostgreSQL"
    
    Write-Host "Subiendo a GitHub..." -ForegroundColor Gray
    git push -u origin master
    
    Write-Host "[✓] Backend subido exitosamente" -ForegroundColor Green
} else {
    Write-Host "[→] Backend omitido" -ForegroundColor Gray
}
Write-Host ""

# ============================================================
# FINALIZACIÓN
# ============================================================
Write-Host "============================================================" -ForegroundColor Cyan
Write-Host "[✓] PROCESO COMPLETADO" -ForegroundColor Cyan
Write-Host "============================================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "Repositorios:" -ForegroundColor Green
Write-Host " - Frontend: https://github.com/nandah23/frontend"
Write-Host " - Backend:  https://github.com/nandah23/backend"
Write-Host ""
