# RFP OFSAA - Document Analysis with AI Chat

A Next.js frontend with FastAPI backend for document analysis and AI-powered chat functionality.

## Features

- **Document Upload**: Upload PDF, DOC, DOCX, TXT, MD, XLS, XLSX, PPT, PPTX files
- **Document Display**: View uploaded documents in markdown format
- **Text Selection**: Select text from documents for context-based queries
- **AI Chat**: Ask questions about selected text or general document content
- **Markdown Canvas**: View and edit markdown content with history/versioning
- **Streaming Responses**: Real-time AI responses with OpenAI integration

## Setup

### Backend Setup

1. **Install Python dependencies**:
   ```bash
   cd /path/to/rfp-ofsaa
   uv sync
   ```

2. **Configure OpenAI API Key**:
   ```bash
   # Copy the example environment file
   cp .env.example .env
   
   # Edit .env and add your OpenAI API key
   OPENAI_API_KEY=your_openai_api_key_here
   ```

3. **Run the backend**:
   ```bash
   uv run python main.py
   # or
   ./start.sh
   ```

### Frontend Setup

1. **Install frontend dependencies**:
   ```bash
   cd frontend
   bun install
   ```

2. **Run the frontend**:
   ```bash
   bun run dev
   ```

## Usage Guide

### Document Upload and Analysis

1. **Upload Document**: Click the "Upload" button to upload a supported document
2. **View Content**: Uploaded document content appears in the left panel
3. **Select Text**: Highlight any text in the document to see the text selection toolbar

### AI Chat Functionality

1. **Ask/Write Button**: 
   - Select text and click "Ask/write" to add it as context for your query
   - The selected text appears above the chat composer as reference

2. **Move to Canvas Button**:
   - Select text and click "Move to canvas" to add it to the markdown canvas
   - AI responses will appear below moved content

3. **Chat Composer**:
   - Type your question in the chat input (only enabled after document upload)
   - Press Enter or click the send button to get AI responses
   - Responses stream in real-time to the canvas

### Canvas Features

- **Auto-Preview**: Switches to preview mode after you stop typing
- **Keyboard Shortcuts**: 
  - `Escape` or `Ctrl+Enter`: Switch to preview immediately
  - Click anywhere in preview to return to edit mode
- **Version History**: Access previous versions of your canvas content
- **Undo/Redo**: Navigate through edit history

## Development

### Linting

**Frontend**:
```bash
cd frontend
bun run lint
bun run build
```

**Backend**:
```bash
uv run ruff check main.py
```

## API Endpoints

- `POST /upload-document`: Upload and convert documents to markdown
- `POST /chat`: Stream AI responses based on query and context
- `GET /health`: Health check endpoint

## Technologies

- **Frontend**: Next.js 15, TypeScript, Tailwind CSS
- **Backend**: FastAPI, Python 3.13
- **AI**: OpenAI GPT-3.5-turbo with streaming
- **Document Processing**: Docling
- **Package Management**: Bun (frontend), UV (backend)