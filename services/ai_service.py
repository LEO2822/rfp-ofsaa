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

FORMATTING REQUIREMENTS:
- Respond in clean markdown format that matches the document style
- Use appropriate headings (##, ###, ####) to structure your response
- Use bullet points (-) or numbered lists (1.) when appropriate
- Use **bold** for emphasis and important terms
- Keep formatting consistent with the source document style

RESPONSE GUIDELINES:
1. Focus ONLY on the user's specific query about the selected text
2. Provide concise, relevant analysis or explanation
3. Structure your response to complement the existing content
4. Do not repeat any existing content from the document"""

    def _construct_user_prompt(self, query: str, context: str = "", canvas_content: str = "") -> str:
        user_prompt = f"User Query: {query}\n"
        
        if context:
            user_prompt += f"\nSelected text to analyze:\n{context}\n"
        
        user_prompt += "\nProvide ONLY a direct response to the query about the selected text. Do not repeat the selected text or any existing content. Your response will be appended to the document."
        
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