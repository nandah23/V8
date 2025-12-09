@echo off
REM Script para subir ambos repositorios a GitHub
REM Autor: Sistema RRHH
REM Fecha: 2025

echo ============================================================
echo   SUBIR REPOSITORIOS A GITHUB
echo   Usuario: nandah23
echo ============================================================
echo.

REM Directorio base
set "BASE_DIR=D:\Universidad\4to Año\Tesis\Versiones Sist\V8"

REM Colores (en Windows PowerShell)
echo [*] Iniciando proceso de subida...
echo.

REM ============================================================
REM FRONTEND
REM ============================================================
echo [1/2] Procesando FRONTEND...
echo.

cd /d "%BASE_DIR%\rrhh_frontend"

echo Verificando estado del repositorio...
git status

echo.
echo ¿Deseas continuar con el frontend? (S/N)
set /p continuar=Respuesta: 
if /i "%continuar%"=="N" goto skip_frontend

echo Agregando archivos...
git add .

echo Creando commit...
git commit -m "Initial commit: RRHH Frontend con React, Router y Material-UI"

echo Subiendo a GitHub...
git push -u origin master

echo [✓] Frontend subido exitosamente
echo.

:skip_frontend

REM ============================================================
REM BACKEND
REM ============================================================
echo [2/2] Procesando BACKEND...
echo.

cd /d "%BASE_DIR%\rrhh_backend"

echo Verificando estado del repositorio...
git status

echo.
echo ¿Deseas continuar con el backend? (S/N)
set /p continuar=Respuesta: 
if /i "%continuar%"=="N" goto skip_backend

echo Agregando archivos...
git add .

echo Creando commit...
git commit -m "Initial commit: RRHH Backend con Django, DRF y PostgreSQL"

echo Subiendo a GitHub...
git push -u origin master

echo [✓] Backend subido exitosamente
echo.

:skip_backend

REM ============================================================
REM FINALIZACIÓN
REM ============================================================
echo ============================================================
echo [✓] PROCESO COMPLETADO
echo ============================================================
echo.
echo Repositorios:
echo  - Frontend: https://github.com/nandah23/frontend
echo  - Backend:  https://github.com/nandah23/backend
echo.
echo Presiona una tecla para salir...
pause
