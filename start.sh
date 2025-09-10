#!/bin/bash

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Function to print colored output
print_status() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

print_success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Function to cleanup processes on exit
cleanup() {
    print_warning "Shutting down services..."
    
    # Kill backend process and its children
    if [ ! -z "$BACKEND_PID" ]; then
        pkill -P $BACKEND_PID 2>/dev/null
        kill $BACKEND_PID 2>/dev/null
        wait $BACKEND_PID 2>/dev/null
        print_status "Backend stopped"
    fi
    
    # Kill frontend process and its children
    if [ ! -z "$FRONTEND_PID" ]; then
        pkill -P $FRONTEND_PID 2>/dev/null
        kill $FRONTEND_PID 2>/dev/null
        wait $FRONTEND_PID 2>/dev/null
        print_status "Frontend stopped"
    fi
    
    # Kill any remaining uvicorn or next processes
    pkill -f "uvicorn" 2>/dev/null
    pkill -f "next dev" 2>/dev/null
    
    exit 0
}

# Set trap to cleanup on script exit
trap cleanup SIGINT SIGTERM EXIT

# Get script directory
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
cd "$SCRIPT_DIR"

print_status "Starting Document Converter Services..."
echo "================================="

# Check if required commands exist
if ! command -v uv &> /dev/null; then
    print_error "uv is not installed. Please install it first."
    exit 1
fi

if ! command -v bun &> /dev/null; then
    print_error "bun is not installed. Please install it first."
    exit 1
fi

# Start Backend
print_status "Starting FastAPI Backend..."
uv run python main.py &
BACKEND_PID=$!

# Wait for backend to start
sleep 3

# Check if backend is running
if kill -0 $BACKEND_PID 2>/dev/null; then
    print_success "Backend started successfully (PID: $BACKEND_PID)"
    print_status "Backend running at: http://localhost:8000"
else
    print_error "Failed to start backend"
    exit 1
fi

# Start Frontend
print_status "Starting Next.js Frontend..."
cd frontend
bun run dev &
FRONTEND_PID=$!
cd ..

# Wait for frontend to start
sleep 5

# Check if frontend is running
if kill -0 $FRONTEND_PID 2>/dev/null; then
    print_success "Frontend started successfully (PID: $FRONTEND_PID)"
    print_status "Frontend running at: http://localhost:3000"
else
    print_error "Failed to start frontend"
    kill $BACKEND_PID 2>/dev/null
    exit 1
fi

echo "================================="
print_success "All services started successfully!"
echo ""
print_status "🚀 Application URLs:"
print_status "   Frontend: http://localhost:3000"
print_status "   Backend API: http://localhost:8000"
print_status "   API Docs: http://localhost:8000/docs"
echo ""
print_warning "Press Ctrl+C to stop all services"
echo "================================="

# Wait for processes to finish or be interrupted
wait