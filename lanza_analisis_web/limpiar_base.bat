@echo off
setlocal

cd /d "%~dp0"
echo Abriendo limpieza de historico...
start "" "%~dp0web\limpiar_historico.html"
