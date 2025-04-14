
@echo off
echo ================================
echo Cleaning Node Modules & Cache...
echo ================================
IF EXIST node_modules (
    rmdir /s /q node_modules
)

IF EXIST package-lock.json (
    del /f /q package-lock.json
)

echo Running npm cache clean...
npm cache clean --force

echo ================================
echo Installing dependencies...
echo ================================
npm install --legacy-peer-deps

echo ================================
echo Building ThreadEngine...
echo ================================
npm run build

echo ================================
echo Packaging .exe with Electron Builder...
echo ================================
npm run dist

echo.
echo ✅ DONE! Look for your installer in the /dist folder.
pause
