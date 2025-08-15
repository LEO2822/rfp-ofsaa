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
        self.system_prompt = """You are a helpful AI assistant that analyzes documents and provides responses based on user queries. 
You will receive:
1. A user query
2. Selected text context (if any) from the document
3. Current canvas content (if any)

Provide helpful, accurate responses based on the context provided. If there's selected text, focus your response on that specific context."""

    def _construct_user_prompt(self, query: str, context: str = "", canvas_content: str = "") -> str:
        user_prompt = f"Query: {query}"
        
        if context:
            user_prompt += f"\n\nSelected text context: {context}"
        
        if canvas_content:
            user_prompt += f"\n\nCurrent canvas content: {canvas_content}"
        
        return user_prompt

    async def generate_chat_stream(self, query: str, context: str = "", canvas_content: str = ""):
        try:
            user_prompt = self._construct_user_prompt(query, context, canvas_content)
            
            stream = self.client.chat.completions.create(
                model="gpt-3.5-turbo",
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