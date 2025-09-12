# SensAi - AI-Powered Document Processing Suite

[![Python 3.13](https://img.shields.io/badge/python-3.13-blue.svg)](https://www.python.org/downloads/)
[![Next.js 15](https://img.shields.io/badge/next.js-15-black.svg)](https://nextjs.org/)
[![FastAPI](https://img.shields.io/badge/fastapi-latest-green.svg)](https://fastapi.tiangolo.com/)
[![Tests](https://img.shields.io/badge/tests-passing-brightgreen.svg)](#testing)

A comprehensive document analysis and AI processing application with three specialized tools for enterprise productivity.

## 🚀 Tools Overview

### 📄 **Chat Agent**
- Upload any document type and have intelligent conversations about content
- **Document Support**: PDF, DOC/DOCX, TXT, MD, XLS/XLSX, PPT/PPTX
- **Text Selection**: Interactive document text selection for contextual queries
- **Streaming AI Chat**: Real-time responses using OpenAI GPT-4o-mini
- **Markdown Canvas**: Interactive editor with download functionality and version history

### 📊 **Presale Agent** 
- AI-powered Excel file processing for Oracle banking solutions and data automation
- **Oracle Banking Expertise**: Specialized AI for Oracle FLEXCUBE solutions
- **Smart Column Analysis**: Intelligent column mapping and data validation
- **Custom AI Processing**: Enhanced data processing with custom prompts
- **Step-by-step Workflow**: Upload → Configure → Process → Download

### 📋 **FSD Agent**
- Generate professional Functional Specification Documents with advanced Word formatting
- **Professional Output**: Publication-ready Word documents with proper formatting
- **Structured Sections**: 11-section FSD template with TOC, bookmarks, and hyperlinks
- **Company Branding**: Logo integration with professional document headers
- **Advanced Formatting**: Table of contents, page numbering, and cross-references

## 🛠️ Quick Start

### Prerequisites
- **Python 3.13+** with [UV package manager](https://github.com/astral-sh/uv)
- **Node.js 18+** with [Bun runtime](https://bun.sh/)
- **OpenAI API Key** (required for AI functionality)

### Installation

1. **Clone the repository**:
   ```bash
   git clone <repository-url>
   cd rfp-ofsaa
   ```

2. **Backend Setup**:
   ```bash
   # Install Python dependencies
   uv sync
   
   # Configure environment variables
   cp .env.example .env
   # Edit .env and add your OpenAI API key
   ```

3. **Frontend Setup**:
   ```bash
   cd frontend
   bun install
   ```

4. **Start the application**:
   ```bash
   # Option 1: Use unified start script (recommended)
   ./start.sh      # Unix/Linux/macOS
   start.bat       # Windows (batch)
   start.ps1       # Windows (PowerShell)
   
   # Option 2: Start manually
   # Terminal 1: Backend
   uv run python main.py
   
   # Terminal 2: Frontend  
   cd frontend && bun run dev -- --port 3001
   ```

5. **Access the application**:
   - **Frontend**: http://localhost:3001
   - **Backend API**: http://localhost:8000
   - **API Documentation**: http://localhost:8000/docs

## 📱 Usage Guide

### Chat Agent
1. **Upload Document**: Click "Upload" to upload supported documents (PDF, DOC, DOCX, etc.)
2. **Interactive Selection**: Highlight text in documents for contextual queries
3. **AI Chat**: Ask questions about selected text or general document content
4. **Markdown Canvas**: View, edit, and download AI responses with version history

### Presale Agent  
1. **Excel Upload**: Upload .xlsx/.xls files for processing
2. **Column Configuration**: Map input/output columns intelligently
3. **AI Processing**: Apply Oracle banking expertise and custom prompts
4. **Download Results**: Get processed Excel files with enhanced data

### FSD Agent
1. **Requirements Input**: Provide functional requirements and specifications
2. **Professional Generation**: Create structured 11-section FSD documents
3. **Word Formatting**: Get publication-ready documents with TOC and branding
4. **Download Output**: Receive professional .docx files

## 🧪 Testing

The project includes comprehensive automated backend testing using an intelligent test generator.

### Quick Start
```bash
# Generate and run all backend tests (recommended)
python run_all_tests.py
```

This automated script:
1. **Scans** all Python backend files (excludes .venv, frontend, __pycache__)
2. **Generates** 6 comprehensive test files for all modules
3. **Installs** pytest dependencies if needed
4. **Executes** all tests with detailed results

### Manual Testing Steps
```bash
# 1. Generate backend tests (creates 6 test files)
python test_generator.py . tests

# 2. Install test dependencies
uv add pytest pytest-cov --dev

# 3. Run backend tests
uv run pytest tests/ -v

# 4. Run with coverage report
uv run pytest tests/ --cov=. --cov-report=html
```

### How Test Generation Works

#### The Problem Solved
Without automation, you'd need to manually write hundreds of test functions like:
```python
def test_chatrequest_creation():
    request = ChatRequest(query="test") 
    assert request.query == "test"

def test_setup_routes():
    # manually write test logic for every function
    pass
# ... repeat for 50+ functions across 6 modules
```

#### Automated Solution
The `test_generator.py` uses **Python AST (Abstract Syntax Tree) parsing** to:

1. **Smart Directory Scanning**:
   ```
   ✅ Includes: main.py, chat_with_doc_backend.py, services/ai_service.py
   ❌ Excludes: .venv/, frontend/, __pycache__/, .git/, node_modules/
   ```

2. **Function Analysis**: 
   - Extracts function names, parameters, return types
   - Identifies classes and methods
   - Analyzes decorators (@staticmethod, @classmethod)
   - Parses type hints and docstrings

3. **Test Generation**:
   - Creates proper imports and fixtures
   - Generates mock data based on parameter names
   - Adds edge cases (None inputs, empty strings, type validation)
   - Creates assertions for return types

#### Generated Test Files (6 total)
- `test_main.py` - FastAPI app initialization, route setup
- `test_chat_with_doc_backend.py` - Document upload, chat endpoints, ChatRequest model
- `test_excelbot_backend.py` - Excel processing, column analysis, ProcessRequest model  
- `test_fsd_generator_backend.py` - Word document generation, FSD creation
- `test_ai_service.py` - OpenAI integration, streaming responses
- `test_run_all_tests.py` - Test runner validation

#### What Each Command Does

**`python test_generator.py . tests`**:
```
Generating tests for chat_with_doc_backend.py
Generated: tests\test_chat_with_doc_backend.py
Generating tests for excelbot_backend.py  
Generated: tests\test_excelbot_backend.py
... (6 files total)
Test generation completed!
```

**`python run_all_tests.py`**:
```
Starting backend test generation and execution

1. Generating backend tests...
   → Creates 6 test files in tests/ directory

2. Installing backend test dependencies...
   → Ensures pytest and pytest-cov are available  

3. Running backend tests...
   → Executes all tests with detailed output

TEST EXECUTION SUMMARY
Backend tests: PASSED (25 tests in 6 files)
```

#### Why This Approach?
- **Time Saving**: 6 comprehensive test files in seconds vs hours of manual work
- **Consistency**: All tests follow the same structure and patterns  
- **Maintenance**: Add new functions → re-run generator → tests updated
- **Coverage**: Every public function gets tested automatically

## 🏗️ Architecture

### Backend (Python/FastAPI)
- **Unified API**: Single FastAPI application serving all three tools
- **Modular Design**: Separate modules for each tool (`chat_with_doc_backend.py`, `excelbot_backend.py`, `fsd_generator_backend.py`)
- **AI Integration**: OpenAI GPT-4o-mini with streaming responses
- **Document Processing**: Docling for document conversion, python-docx for Word generation

### Frontend (Next.js/TypeScript)
- **Modern Stack**: Next.js 15 with TypeScript and Tailwind CSS
- **Theme System**: Light/dark mode with persistent user preferences
- **Responsive Design**: Mobile-friendly interface with professional UI
- **Interactive Components**: Document display, text selection, markdown editing

### Key Technologies
- **Package Management**: UV (Python), Bun (Node.js)  
- **Document Processing**: Docling, python-docx, openpyxl
- **UI Framework**: Next.js 15, React 19, Tailwind CSS
- **Testing**: pytest (backend)
- **AI Integration**: OpenAI GPT-4o-mini with streaming

## ⚙️ Development

### Code Quality
```bash
# Backend linting
uv run ruff check main.py

# Frontend linting and building
cd frontend
bun run lint
bun run build
```

### Environment Variables
Create `.env` from `.env.example` and configure:
```bash
# Required for AI functionality
OPENAI_API_KEY=your_openai_api_key_here

# Optional for enhanced vector search (FSD Generator)
QDRANT_URL=your_qdrant_url_here
QDRANT_API_KEY=your_qdrant_api_key_here

# Alternative API provider
OPENROUTER_API_KEY=your_openrouter_api_key_here
```

## 📡 API Endpoints

### Chat with Doc
- `POST /upload-document`: Upload and convert documents to markdown
- `POST /chat`: Streaming AI chat with document context

### Presale Agent
- `POST /upload`: Upload Excel files and analyze columns
- `POST /process`: AI-powered data processing with custom prompts
- `GET /download/{file_id}`: Download processed Excel files

### FSD Generator
- `POST /generate-fsd`: Generate professional Word documents with advanced formatting

### Common
- `GET /health`: Health check for all services
- `GET /docs`: Interactive API documentation (Swagger)

## 🎨 UI/UX Features

### Theme System
- **Light Mode**: Clean blue (#2563EB) + white theme with professional typography
- **Dark Mode**: Indigo-blue mix (#A5B4FC, #60A5FA, #93C5FD) for optimal visibility
- **Theme Persistence**: User preferences saved in localStorage

### Design System
- **Hero Icons**: Consistent iconography throughout the application
- **Clean Typography**: Focus on readability with proper hierarchy  
- **Minimalist Design**: Text-focused approach without decorative elements
- **Smooth Transitions**: 300ms duration for theme switching and interactions

## 📄 File Structure
```
rfp-ofsaa/
├── main.py                          # Unified backend entry point
├── chat_with_doc_backend.py         # Chat with Doc module
├── excelbot_backend.py              # Presale Agent module
├── fsd_generator_backend.py         # FSD Generator module
├── services/ai_service.py           # AI integration service
├── test_generator.py                # Backend test generator
├── run_all_tests.py                 # Backend test runner
├── tests/                           # Backend tests directory
├── start.sh                         # Cross-platform start scripts
├── start.bat
├── start.ps1
└── frontend/                        # Next.js frontend
    ├── src/app/                     # Application pages
    ├── src/components/              # Shared UI components
    └── package.json
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Make your changes
4. Run tests (`python run_all_tests.py`)
5. Commit your changes (`git commit -m 'Add amazing feature'`)
6. Push to the branch (`git push origin feature/amazing-feature`)  
7. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙋‍♂️ Support

For support, please open an issue in the GitHub repository or contact the development team.