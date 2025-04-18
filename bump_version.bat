@echo off
echo Bumping version...
npm version patch

echo Building distribution...
npm run dist

echo Don't forget to upload new files to GitHub Releases!
pause
