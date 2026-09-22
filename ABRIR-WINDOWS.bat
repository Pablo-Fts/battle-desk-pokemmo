@echo off
cd /d "%~dp0"
where node >nul 2>nul
if errorlevel 1 (
  echo Instala Node.js LTS para abrir Battle Desk. Consulta LEEME.md.
  pause
  exit /b 1
)
start "" http://localhost:4173
node serve-local.cjs
pause
