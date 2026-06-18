@echo off

echo Starting PostgreSQL...
cd /d C:\Teamhub
docker compose up -d postgres

echo Starting Backend...
start "TeamHub Backend" cmd /k "cd /d C:\Teamhub\apps\backend && npm run dev"

echo Starting Frontend...
start "TeamHub Frontend" cmd /k "cd /d C:\Teamhub\apps\frontend && npm run dev"

echo.
echo TeamHub gestartet:
echo Frontend: http://localhost:5173
echo Backend:  http://localhost:4000/graphql
pause