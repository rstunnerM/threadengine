@echo off
echo Cleaning previous installs...
if exist node_modules rmdir /s /q node_modules
if exist package-lock.json del /f /q package-lock.json

echo Installing dependencies fresh...
npm install

echo Starting full build...
npm run dist

echo.
echo 🚀 Build complete! Your installer should be in the /dist folder.
pause
