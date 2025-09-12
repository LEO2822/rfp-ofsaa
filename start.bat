@echo off
setlocal enabledelayedexpansion

:: Colors for output (using Windows color codes)
set "RED=[31m"
set "GREEN=[32m"
set "YELLOW=[33m"
set "BLUE=[34m"
set "NC=[0m"

:: Function to print colored output
:print_status
echo [34m[INFO][0m %~1
goto :eof

:print_success
echo [32m[SUCCESS][0m %~1
goto :eof

:print_warning
echo [33m[WARNING][0m %~1
goto :eof

:print_error
echo [31m[ERROR][0m %~1
goto :eof

:: Cleanup function
:cleanup
call :print_warning "Shutting down services..."

:: Kill backend process
if defined BACKEND_PID (
    taskkill /PID %BACKEND_PID% /F >nul 2>&1
    call :print_status "Backend stopped"
)

:: Kill frontend process
if defined FRONTEND_PID (
    taskkill /PID %FRONTEND_PID% /F >nul 2>&1
    call :print_status "Frontend stopped"
)

:: Kill any remaining uvicorn or next processes
taskkill /F /IM python.exe >nul 2>&1
taskkill /F /IM node.exe >nul 2>&1
taskkill /F /IM bun.exe >nul 2>&1

exit /b 0

:: Set up Ctrl+C handler
if "%~1" == "SIGINT" goto cleanup

:: Main script
call :print_status "Starting Document Converter Services..."
echo =================================

:: Check if required commands exist
where uv >nul 2>&1
if %errorlevel% neq 0 (
    call :print_error "uv is not installed. Please install it first."
    exit /b 1
)

where bun >nul 2>&1
if %errorlevel% neq 0 (
    call :print_error "bun is not installed. Please install it first."
    exit /b 1
)

:: Start Backend
call :print_status "Starting FastAPI Backend..."
start /b uv run python main.py
:: Get the PID of the last started process (this is tricky in batch)
for /f "tokens=2 delims=," %%a in ('tasklist /fi "imagename eq python.exe" /fo csv ^| find /c ","') do set BACKEND_COUNT=%%a

:: Wait for backend to start
timeout /t 3 /nobreak >nul

:: Check if backend is running (simplified check)
tasklist /fi "imagename eq python.exe" >nul 2>&1
if %errorlevel% equ 0 (
    call :print_success "Backend started successfully"
    call :print_status "Backend running at: http://localhost:8000"
) else (
    call :print_error "Failed to start backend"
    exit /b 1
)

:: Start Frontend
call :print_status "Starting Next.js Frontend..."
cd frontend
start /b bun run dev -- --port 3001
cd ..

:: Wait for frontend to start
timeout /t 5 /nobreak >nul

:: Check if frontend is running
tasklist /fi "imagename eq node.exe" >nul 2>&1
if %errorlevel% equ 0 (
    call :print_success "Frontend started successfully"
    call :print_status "Frontend running at: http://localhost:3001"
) else (
    call :print_error "Failed to start frontend"
    goto cleanup
)

echo =================================
call :print_success "All services started successfully!"
echo.
call :print_status "🚀 Application URLs:"
call :print_status "   Frontend: http://localhost:3001"
call :print_status "   Backend API: http://localhost:8000"
call :print_status "   API Docs: http://localhost:8000/docs"
echo.
call :print_warning "Press Ctrl+C to stop all services"
echo =================================

:: Wait for user input to keep processes running
pause
goto cleanup