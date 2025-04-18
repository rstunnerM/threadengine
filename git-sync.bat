@echo off
echo 🚀 Syncing ThreadEngine to GitHub...
git init
git remote add origin https://github.com/rstunnerM/threadengine
git checkout -b main
git add .
git commit -m "🚀 ThreadEngine init push"
git push -u origin main
pause
