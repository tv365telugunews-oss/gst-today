@echo off
REM Quick start script for deployment on Windows

echo.
echo 🚀 GST Admin Panel - Deployment Setup
echo ======================================
echo.

REM Check Node.js
echo Checking Node.js installation...
where node >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
    echo ❌ Node.js is not installed. Please install Node.js first.
    pause
    exit /b 1
)
for /f "tokens=*" %%i in ('node --version') do set NODE_VERSION=%%i
echo ✅ Node.js %NODE_VERSION% found

REM Check npm
echo Checking npm installation...
where npm >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
    echo ❌ npm is not installed.
    pause
    exit /b 1
)
for /f "tokens=*" %%i in ('npm --version') do set NPM_VERSION=%%i
echo ✅ npm %NPM_VERSION% found

echo.
echo Installing dependencies...
call npm install

echo.
echo Building project...
call npm run build

echo.
echo ✅ Build complete!
echo.
echo Next steps:
echo 1. Install Netlify CLI: npm install -g netlify-cli
echo 2. Login to Netlify: netlify login
echo 3. Deploy: netlify deploy --prod
echo.
echo Or use Git integration for automatic deployments.
echo See NETLIFY_DEPLOYMENT.md for detailed instructions.
echo.
pause
