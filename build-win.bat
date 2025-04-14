@echo off
title 🧠 ThreadEngine Windows Build
color 0A

echo 🔧 Starting ThreadEngine Windows build process...

:: Step 1: Clean old builds
echo 🧹 Cleaning previous builds...
if exist dist rmdir /s /q dist
if exist dist-electron rmdir /s /q dist-electron

:: Step 2: Install dependencies
echo 📦 Installing dependencies...
call npm install

:: Step 3: Build Vite app
echo 🛠 Building Vite frontend...
call npm run build

:: Step 4: Package Electron app for Windows
echo 🧱 Packaging Electron app into .exe installer...
call npx electron-builder --win --x64

echo ✅ Build complete! Your Windows installer is in the /dist folder.
pause
