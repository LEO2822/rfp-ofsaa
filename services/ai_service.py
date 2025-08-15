import os
import json
import asyncio
from openai import OpenAI
from dotenv import load_dotenv

load_dotenv()

class OpenRouterService:
    def __init__(self):
        self.client = OpenAI(
            api_key=os.getenv("OPENROUTER_API_KEY"),
            base_url="https://openrouter.ai/api/v1"
        )
        self.system_prompt = """You are a helpful AI assistant that provides well-formatted responses based on selected text context.

CRITICAL RULES:
- NEVER repeat or reproduce the existing canvas content
- ONLY provide NEW content that directly responds to the user's query
- Your response will be APPENDED to existing content, so don't duplicate anything

HEADING & STRUCTURE PRESERVATION:
- ALWAYS preserve the exact heading levels from the selected text (# = H1, ## = H2, ### = H3, etc.)
- If the selected text has "## Historical Background", maintain that EXACT heading level in your response
- Respect the hierarchical structure: if selected text uses ###, continue with ### or ####, never jump to ##
- Keep the same heading style and formatting as the source material
- Maintain consistent heading hierarchy throughout your response

FORMATTING REQUIREMENTS:
- Respond in clean markdown format that EXACTLY matches the document's heading structure
- Preserve original heading levels and maintain proper hierarchy
- Use bullet points (-) or numbered lists (1.) when they appear in the source
- Use **bold** for emphasis exactly as shown in the source material
- Mirror the formatting patterns of the selected text precisely

RESPONSE GUIDELINES:
1. Analyze the heading structure of the selected text first
2. Focus ONLY on the user's specific query about the selected text
3. Maintain the EXACT same heading levels and formatting style
4. Structure your response to complement the existing content hierarchically
5. Do not repeat any existing content from the document"""

    def _construct_user_prompt(self, query: str, context: str = "", canvas_content: str = "") -> str:
        user_prompt = f"User Query: {query}\n"
        
        if context:
            user_prompt += f"\nSelected text to analyze (PRESERVE the heading structure shown below):\n{context}\n"
            
            # Analyze heading structure in context
            lines = context.split('\n')
            heading_structure = []
            for line in lines:
                if line.strip().startswith('#'):
                    heading_structure.append(line.strip())
            
            if heading_structure:
                user_prompt += f"\nIMPORTANT: The selected text uses these heading levels: {', '.join(heading_structure[:3])}... Continue using the SAME heading levels in your response.\n"
        
        user_prompt += "\nProvide ONLY a direct response to the query about the selected text. PRESERVE the exact heading structure and formatting from the selected text. Do not repeat the selected text or any existing content. Your response will be appended to the document."
        
        return user_prompt

    async def generate_chat_stream(self, query: str, context: str = "", canvas_content: str = ""):
        try:
            user_prompt = self._construct_user_prompt(query, context, canvas_content)
            
            stream = self.client.chat.completions.create(
                model="gpt-4o-mini",
                messages=[
                    {"role": "system", "content": self.system_prompt},
                    {"role": "user", "content": user_prompt}
                ],
                stream=True,
                max_tokens=1000,
                temperature=0.7
            )
            
            for chunk in stream:
                if chunk.choices[0].delta.content is not None:
                    content = chunk.choices[0].delta.content
                    yield f"data: {json.dumps({'content': content})}\n\n"
                    await asyncio.sleep(0.01)
            
            yield "data: [DONE]\n\n"
        except Exception as e:
            error_msg = str(e)
            if "API key" in error_msg.lower():
                error_msg = "Invalid OpenRouter API key. Please check your configuration."
            yield f"data: {json.dumps({'error': error_msg})}\n\n"

ai_service = OpenRouterService()