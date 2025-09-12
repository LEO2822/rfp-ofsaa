from fastapi import FastAPI, File, UploadFile, HTTPException
from fastapi.responses import StreamingResponse
from pydantic import BaseModel
from docling.document_converter import DocumentConverter
import tempfile
import os
from loguru import logger
from services.ai_service import ai_service

converter = DocumentConverter()

class ChatRequest(BaseModel):
    query: str
    context: str = ""
    canvas_content: str = ""

def setup_chat_with_doc_routes(app: FastAPI):
    """Add Chat with Doc routes to the FastAPI app"""
    
    @app.post("/upload-document")
    async def upload_document(file: UploadFile = File(...)):
        temp_file_path = None
        try:
            # Debug info
            logger.info("=== DOCUMENT UPLOAD DEBUG INFO ===")
            logger.info(f"File: {file.filename}")
            logger.info(f"Content-Type: {file.content_type}")
            logger.info(f"File size: {file.size}")
            
            # Validate file type
            allowed_types = {
                'application/pdf': '.pdf',
                'application/msword': '.doc',
                'application/vnd.openxmlformats-officedocument.wordprocessingml.document': '.docx',
                'text/plain': '.txt',
                'text/markdown': '.md',
                'application/vnd.ms-excel': '.xls',
                'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': '.xlsx',
                'application/vnd.ms-powerpoint': '.ppt',
                'application/vnd.openxmlformats-officedocument.presentationml.presentation': '.pptx'
            }
            
            if file.content_type not in allowed_types:
                logger.warning(f"Rejected content type: {file.content_type}")
                raise HTTPException(status_code=400, detail=f"Unsupported file type: {file.content_type}")
            
            # Create temporary file
            suffix = allowed_types.get(file.content_type, '')
            logger.debug(f"Using suffix: {suffix}")
            
            with tempfile.NamedTemporaryFile(delete=False, suffix=suffix) as temp_file:
                temp_file_path = temp_file.name  # Store the path
                content = await file.read()
                logger.info(f"File content read: {len(content)} bytes")
                temp_file.write(content)
                temp_file.flush()
                logger.debug(f"Temp file created: {temp_file_path}")
            
            # File is now closed, safe to use with docling
            try:
                # Convert document using docling
                logger.info("Starting docling conversion...")
                result = converter.convert(temp_file_path)
                logger.info("Docling conversion completed")
                
                markdown_content = result.document.export_to_markdown()
                logger.info(f"Markdown generated: {len(markdown_content)} chars")
                
                logger.info(f"Document upload successful: {file.filename}")
                return {
                    "filename": file.filename,
                    "content": markdown_content,
                    "status": "success"
                }
                
            except Exception as e:
                logger.error(f"DOCLING ERROR: {str(e)}")
                logger.error(f"ERROR TYPE: {type(e).__name__}")
                logger.exception(f"Docling conversion error for file: {file.filename}")
                raise HTTPException(status_code=500, detail=f"Error converting document: {str(e)}")
                    
        except Exception as e:
            logger.error(f"GENERAL ERROR: {str(e)}")
            logger.error(f"ERROR TYPE: {type(e).__name__}")
            logger.exception(f"General error processing file: {file.filename}")
            raise HTTPException(status_code=500, detail=f"Error processing file: {str(e)}")
        
        finally:
            # Clean up temporary file (moved outside the try block)
            if temp_file_path and os.path.exists(temp_file_path):
                try:
                    os.unlink(temp_file_path)
                    logger.debug("Temp file cleaned up")
                except PermissionError:
                    logger.warning(f"Could not delete temp file {temp_file_path} - will be cleaned up by OS")

    @app.post("/chat")
    async def chat_with_ai(request: ChatRequest):
        try:
            logger.info(f"Chat request received - Query length: {len(request.query)}, Context length: {len(request.context)}, Canvas length: {len(request.canvas_content)}")
            return StreamingResponse(
                ai_service.generate_chat_stream(
                    query=request.query,
                    context=request.context,
                    canvas_content=request.canvas_content
                ),
                media_type="text/plain",
                headers={
                    "Cache-Control": "no-cache",
                    "Connection": "keep-alive",
                    "Content-Type": "text/event-stream"
                }
            )
        except Exception as e:
            logger.error(f"Error in chat endpoint: {str(e)}")
            logger.exception("Chat endpoint error")
            raise HTTPException(status_code=500, detail=f"Error processing chat request: {str(e)}")