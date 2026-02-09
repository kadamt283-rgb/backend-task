@echo off
echo Starting Karn Website...

:: Start Backend
echo Starting Backend Server...
start "Karn Backend" cmd /k "cd backend && npm run dev"

:: Start Frontend
echo Starting Frontend Server...
start "Karn Frontend" cmd /k "cd frontend && npm run dev"

echo.
echo Both servers are starting in separate windows.
echo Website will be available at: http://127.0.0.1:5173
echo Backend will be available at: http://127.0.0.1:5000
pause
