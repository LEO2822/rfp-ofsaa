from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from chat_with_doc_backend import setup_chat_with_doc_routes
from fsd_generator_backend import setup_fsd_generator_routes
from loguru import logger
import sys
import os

# Configure Loguru logger (main entrypoint configuration)
logger.remove()  # Remove default handler
logger.add(sys.stdout, format="{time:YYYY-MM-DD HH:mm:ss} | {level} | {message}", level="INFO", enqueue=True, backtrace=True, diagnose=True)
logger.add("logs/app.log", rotation="10 MB", retention="7 days", compression="zip", level="DEBUG", enqueue=True)

# Import the full ExcelBot backend
sys.path.append(os.path.dirname(__file__))

# Import the ExcelBot backend as a module
import excelbot_backend

# Create the main FastAPI app
app = FastAPI(title="Combined API - Chat with Doc & ExcelBot", version="1.0.0")
logger.info("FastAPI application initialized")

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "http://localhost:3001"],  # Next.js dev server
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
logger.info("CORS middleware configured for origins: localhost:3000, localhost:3001")

# Add Chat with Doc routes
setup_chat_with_doc_routes(app)
logger.info("Chat with Doc routes setup completed")

# Add FSD Generator routes
setup_fsd_generator_routes(app)
logger.info("FSD Generator routes setup completed")

# Add ExcelBot routes by copying them from the full backend
# Get all the routes from the ExcelBot backend
route_count = 0
for route in excelbot_backend.app.routes:
    if hasattr(route, 'path') and route.path not in ['/docs', '/redoc', '/openapi.json']:
        # Skip routes that might conflict
        if route.path not in ['/health']:
            app.router.routes.append(route)
            route_count += 1
logger.info(f"ExcelBot routes setup completed - {route_count} routes added")

# Add health check
@app.get("/health")
async def health_check():
    logger.debug("Health check endpoint accessed")
    return {"status": "healthy", "services": ["chat-with-doc", "excelbot", "fsd-generator"]}

if __name__ == "__main__":
    import uvicorn
    logger.info("Starting FastAPI server on host=0.0.0.0, port=8000")
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)