@echo off
setlocal EnableExtensions EnableDelayedExpansion

cd /d "%~dp0"
set "EXIT_CODE=0"

echo [1/9] Verificando repo...
git rev-parse --is-inside-work-tree >nul 2>nul
if errorlevel 1 (
  echo ERROR: Esta carpeta no es un repositorio git.
  set "EXIT_CODE=1"
  goto :end
)

echo [2/9] Estado actual...
git status -sb
if errorlevel 1 goto :error

echo.
set "BASE_BRANCH=main"
set /p BASE_BRANCH=Rama base para PR [main]: 
if not defined BASE_BRANCH set "BASE_BRANCH=main"

echo.
set "WORK_BRANCH="
set /p WORK_BRANCH=Rama de trabajo (ej: feature/ns-historico-multimes): 
if not defined WORK_BRANCH (
  echo ERROR: Debes ingresar una rama de trabajo.
  set "EXIT_CODE=1"
  goto :end
)

echo.
echo [3/9] Creando/cambiando a rama !WORK_BRANCH!...
git show-ref --verify --quiet refs/heads/!WORK_BRANCH!
if errorlevel 1 (
  git checkout -b !WORK_BRANCH!
) else (
  git checkout !WORK_BRANCH!
)
if errorlevel 1 goto :error

echo.
echo [4/9] Agregando cambios (git add .)...
git add .
if errorlevel 1 goto :error

echo.
set "COMMIT_MSG="
set /p COMMIT_MSG=[5/9] Mensaje del commit: 
if not defined COMMIT_MSG (
  echo ERROR: Debes ingresar un mensaje de commit.
  set "EXIT_CODE=1"
  goto :end
)

echo.
echo [6/9] Creando commit...
git commit -m "!COMMIT_MSG!"
if errorlevel 1 (
  echo.
  echo Aviso: no se creo commit (posible: no hay cambios nuevos).
)

echo.
echo [7/9] Enviando rama !WORK_BRANCH! a origin...
git push -u origin !WORK_BRANCH!
if errorlevel 1 goto :error

echo.
echo [8/9] Preparando URL de PR...
call :get_repo_url
if errorlevel 1 goto :error

set "PR_URL=!REPO_URL!/compare/!BASE_BRANCH!...!WORK_BRANCH!?expand=1"
echo URL para crear PR: !PR_URL!

echo.
echo [9/9] Intentando crear PR automatico con GitHub CLI (gh)...
where gh >nul 2>nul
if errorlevel 1 (
  echo gh no esta instalado. Abriendo link para crear PR manualmente...
  start "" "!PR_URL!"
  goto :summary
)

set "PR_TITLE=!COMMIT_MSG!"
set /p PR_TITLE=Titulo del PR [!COMMIT_MSG!]: 
if not defined PR_TITLE set "PR_TITLE=!COMMIT_MSG!"

set "PR_BODY=PR creado desde script git_pr_push.bat"
set /p PR_BODY=Descripcion del PR [PR creado desde script git_pr_push.bat]: 
if not defined PR_BODY set "PR_BODY=PR creado desde script git_pr_push.bat"

gh pr create --base !BASE_BRANCH! --head !WORK_BRANCH! --title "!PR_TITLE!" --body "!PR_BODY!"
if errorlevel 1 (
  echo No se pudo crear el PR automatico. Abriendo link manual...
  start "" "!PR_URL!"
  goto :summary
)

set "REVIEWER="
set /p REVIEWER=Usuario GitHub reviewer (opcional, ej: pilar-user): 
if defined REVIEWER (
  gh pr edit --add-reviewer !REVIEWER!
  if errorlevel 1 (
    echo Aviso: no se pudo asignar reviewer automaticamente.
  )
)

goto :summary

:get_repo_url
set "REMOTE_URL="
for /f "usebackq delims=" %%R in (`git remote get-url origin 2^>nul`) do set "REMOTE_URL=%%R"
if not defined REMOTE_URL (
  echo ERROR: No se pudo obtener remote origin.
  exit /b 1
)

set "REPO_URL=!REMOTE_URL!"
if /i "!REPO_URL:~0,15!"=="git@github.com:" (
  set "REPO_URL=https://github.com/!REPO_URL:~15!"
)
if /i "!REPO_URL:~0,19!"=="ssh://git@github.com/" (
  set "REPO_URL=https://github.com/!REPO_URL:~19!"
)
if /i not "!REPO_URL:~0,19!"=="https://github.com/" (
  echo ERROR: El remote origin no parece ser GitHub: !REMOTE_URL!
  exit /b 1
)
if /i "!REPO_URL:~-4!"==".git" set "REPO_URL=!REPO_URL:~0,-4!"
exit /b 0

:error
set "EXIT_CODE=%ERRORLEVEL%"
echo.
echo ERROR: Fallo un comando git. Codigo !EXIT_CODE!.
echo Revisa los mensajes de arriba.
goto :summary

:summary
echo.
echo ===== RESUMEN =====
git status -sb
echo.
git log -1 --oneline
echo ===================

:end
echo.
pause
exit /b %EXIT_CODE%
