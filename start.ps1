# PowerShell script to start Document Converter Services
param(
    [switch]$Help
)

# Colors for output
$Colors = @{
    Red = "Red"
    Green = "Green" 
    Yellow = "Yellow"
    Blue = "Blue"
    White = "White"
}

# Global variables for process tracking
$Global:BackendProcess = $null
$Global:FrontendProcess = $null

# Function to print colored output
function Write-Status {
    param([string]$Message)
    Write-Host "[INFO] $Message" -ForegroundColor Blue
}

function Write-Success {
    param([string]$Message)
    Write-Host "[SUCCESS] $Message" -ForegroundColor Green
}

function Write-Warning {
    param([string]$Message)
    Write-Host "[WARNING] $Message" -ForegroundColor Yellow
}

function Write-Error {
    param([string]$Message)
    Write-Host "[ERROR] $Message" -ForegroundColor Red
}

# Cleanup function
function Stop-Services {
    Write-Warning "Shutting down services..."
    
    # Stop backend process
    if ($Global:BackendProcess -and !$Global:BackendProcess.HasExited) {
        try {
            $Global:BackendProcess.Kill()
            Write-Status "Backend stopped"
        } catch {
            Write-Warning "Could not gracefully stop backend process"
        }
    }
    
    # Stop frontend process
    if ($Global:FrontendProcess -and !$Global:FrontendProcess.HasExited) {
        try {
            $Global:FrontendProcess.Kill()
            Write-Status "Frontend stopped"
        } catch {
            Write-Warning "Could not gracefully stop frontend process"
        }
    }
    
    # Kill any remaining processes
    try {
        Get-Process -Name "python" -ErrorAction SilentlyContinue | Where-Object { $_.ProcessName -eq "python" } | Stop-Process -Force -ErrorAction SilentlyContinue
        Get-Process -Name "node" -ErrorAction SilentlyContinue | Stop-Process -Force -ErrorAction SilentlyContinue
        Get-Process -Name "bun" -ErrorAction SilentlyContinue | Stop-Process -Force -ErrorAction SilentlyContinue
    } catch {
        # Ignore errors when killing processes
    }
}

# Set up Ctrl+C handler
Register-EngineEvent -SourceIdentifier PowerShell.Exiting -Action { Stop-Services }
$null = Register-EngineEvent -SourceIdentifier ConsoleCancel -Action { Stop-Services; exit }

# Help text
if ($Help) {
    Write-Host @"
Document Converter Services Startup Script

Usage: .\start.ps1 [-Help]

This script starts both the FastAPI backend and Next.js frontend services.

Prerequisites:
- uv (Python package manager)
- bun (JavaScript runtime and package manager)

The script will:
1. Start the FastAPI backend on http://localhost:8000
2. Start the Next.js frontend on http://localhost:3001
3. Wait for user input to keep services running
4. Clean up processes when stopped

Press Ctrl+C to stop all services.
"@
    exit 0
}

# Main script execution
try {
    Write-Status "Starting Document Converter Services..."
    Write-Host "================================="
    
    # Check if required commands exist
    if (!(Get-Command "uv" -ErrorAction SilentlyContinue)) {
        Write-Error "uv is not installed. Please install it first."
        exit 1
    }
    
    if (!(Get-Command "bun" -ErrorAction SilentlyContinue)) {
        Write-Error "bun is not installed. Please install it first."
        exit 1
    }
    
    # Start Backend
    Write-Status "Starting FastAPI Backend..."
    $Global:BackendProcess = Start-Process -FilePath "uv" -ArgumentList @("run", "python", "main.py") -PassThru -NoNewWindow
    
    # Wait for backend to start
    Start-Sleep -Seconds 3
    
    # Check if backend is running
    if (!$Global:BackendProcess.HasExited) {
        Write-Success "Backend started successfully (PID: $($Global:BackendProcess.Id))"
        Write-Status "Backend running at: http://localhost:8000"
    } else {
        Write-Error "Failed to start backend"
        exit 1
    }
    
    # Start Frontend
    Write-Status "Starting Next.js Frontend..."
    Set-Location -Path "frontend"
    $Global:FrontendProcess = Start-Process -FilePath "bun" -ArgumentList @("run", "dev", "--", "--port", "3001") -PassThru -NoNewWindow
    Set-Location -Path ".."
    
    # Wait for frontend to start
    Start-Sleep -Seconds 5
    
    # Check if frontend is running
    if (!$Global:FrontendProcess.HasExited) {
        Write-Success "Frontend started successfully (PID: $($Global:FrontendProcess.Id))"
        Write-Status "Frontend running at: http://localhost:3001"
    } else {
        Write-Error "Failed to start frontend"
        Stop-Services
        exit 1
    }
    
    Write-Host "================================="
    Write-Success "All services started successfully!"
    Write-Host ""
    Write-Status "🚀 Application URLs:"
    Write-Status "   Frontend: http://localhost:3001"
    Write-Status "   Backend API: http://localhost:8000"
    Write-Status "   API Docs: http://localhost:8000/docs"
    Write-Host ""
    Write-Warning "Press Ctrl+C to stop all services"
    Write-Host "================================="
    
    # Wait for processes or user interruption
    try {
        while (!$Global:BackendProcess.HasExited -and !$Global:FrontendProcess.HasExited) {
            Start-Sleep -Seconds 1
        }
    } catch {
        # Handle interruption
    }
    
} catch {
    Write-Error "An error occurred: $_"
    Stop-Services
    exit 1
} finally {
    Stop-Services
}